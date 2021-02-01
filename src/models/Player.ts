import {
    list,
    mutationField,
    nonNull,
    objectType,
    queryField,
    stringArg,
} from "nexus";
import { NexusGenObjects } from "../generated/nexus";
import { ServerContext } from "../server-context";
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
    type: Player,
    args: {
        uuid: nonNull(stringArg()),
    },
    resolve: async (_, { uuid }, { client }) => {
        const check = await client.query<PlayerType>(
            `SELECT 1 FROM "Player" WHERE uuid = $1`,
            [uuid]
        );

        if (check.rows.length > 0) {
            return null;
        }

        const result = await client.query<PlayerType>(
            `INSERT INTO public."Player" (uuid) VALUES ($1) RETURNING *`,
            [uuid]
        );

        return result.rows[0];
    },
});

export const PlayerObject = [Player, registerPlayer, players, player];
