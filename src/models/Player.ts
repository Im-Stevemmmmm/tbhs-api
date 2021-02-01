import { isUUID } from "class-validator";
import {
    enumType,
    list,
    mutationField,
    nonNull,
    objectType,
    queryField,
    stringArg,
} from "nexus";
import { NexusGenObjects } from "../generated/nexus";
import { GameStats } from "./GameStats";

type PlayerType = NexusGenObjects["Player"];

const Player = objectType({
    name: "Player",
    definition(_) {
        _.string("uuid");
        _.string("rank");
        _.string("joinedAt");
        _.string("lastJoin");
        _.field("gameStats", {
            type: GameStats,
            resolve: ({ uuid }) => ({ playerUuid: uuid }),
        });
    },
});

const RegistrationResponse = objectType({
    name: "RegistrationResponse",
    definition(_) {
        _.field("error", {
            type: objectType({
                name: "RegistrationError",
                definition(_) {
                    _.field("name", {
                        type: enumType({
                            name: "RegistrationErrorName",
                            members: ["ALREADY_REGISTERED", "INVALID_UUID"],
                        }),
                    });
                    _.string("description");
                },
            }),
        });
        _.field("player", {
            type: Player,
        });
    },
});

const player = queryField("player", {
    type: Player,
    args: {
        uuid: nonNull(stringArg()),
    },
    resolve: async (_, { uuid }, { client }) => {
        const result = await client.query<PlayerType>(
            `SELECT * FROM public."Player" WHERE uuid = $1`,
            [uuid]
        );

        return result.rows[0];
    },
});

const players = queryField("players", {
    type: list(Player),
    resolve: async (_, __, { client }) => {
        const result = await client.query<PlayerType>(
            `SELECT * FROM public."Player"`
        );

        return result.rows;
    },
});

const registerPlayer = mutationField("registerPlayer", {
    type: RegistrationResponse,
    args: {
        uuid: nonNull(stringArg()),
    },
    resolve: async (_, { uuid }, { client }) => {
        if (!isUUID(uuid, "4")) {
            return {
                error: {
                    name: "INVALID_UUID",
                    description: "The uuid field must be a valid UUIDv4.",
                },
            };
        }

        const check = await client.query<PlayerType>(
            `SELECT 1 FROM "Player" WHERE uuid = $1`,
            [uuid]
        );

        if (check.rows.length > 0) {
            return {
                error: {
                    name: "ALREADY_REGISTERED",
                    description: "The player is already registered.",
                },
            };
        }

        const result = await client.query<PlayerType>(
            `INSERT INTO public."Player" (uuid) VALUES ($1) RETURNING *`,
            [uuid]
        );

        return {
            player: result.rows[0],
        };
    },
});

export const PlayerObject = [
    Player,
    registerPlayer,
    players,
    player,
    RegistrationResponse,
];
