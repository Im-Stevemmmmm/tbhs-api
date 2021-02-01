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

type Player = NexusGenObjects["Player"];

const player = objectType({
    name: "Player",
    definition(_) {
        _.string("uuid");
        _.string("rank");
        _.string("joinedAt");
        _.string("lastJoin");
    },
});

const players = queryField("players", {
    type: list("Player"),
    resolve: async (_, __, { client }: ServerContext) => {
        const result = await client.query<Player>(`SELECT * FROM "Player"`);

        return result.rows;
    },
});

const registerPlayer = mutationField("registerPlayer", {
    type: "Player",
    args: {
        uuid: nonNull(stringArg()),
    },
    resolve: async (_, { uuid }, { client }: ServerContext) => {
        const check = await client.query<Player>(
            `SELECT 1 FROM "Player" WHERE uuid = $1`,
            [uuid]
        );

        if (check.rows.length > 0) {
            return {};
        }

        const result = await client.query<Player>(
            `INSERT INTO "Player" (uuid) VALUES ($1) RETURNING *`,
            [uuid]
        );

        return result.rows[0];
    },
});

export const PlayerObject = [player, registerPlayer, players];
