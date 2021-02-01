import { isUUID } from "class-validator";
import { objectType } from "nexus";
import { ObjectDefinitionBlock } from "nexus/dist/core";
import { Client } from "pg";
import { playerUuidSourceType } from ".";
import { PlayerUuid } from "../source-types/player-uuid-type";

export const stats = [
    "defensive",
    "farming",
    "miscellaneous",
    "offensive",
    "performance",
    "perksAndMystic",
    "prestige",
];

export const PitStats = objectType({
    name: "PitStats",
    sourceType: playerUuidSourceType,
    definition(_) {
        stats.forEach(s => createField(_, s));
    },
});

const createField = (_: ObjectDefinitionBlock<any>, name: string) => {
    const typeName = name.charAt(0).toUpperCase() + name.slice(1);

    _.field(name, {
        type: typeName as any,
        resolve: async ({ playerUuid }: PlayerUuid, _, { client }) => {
            if (!isUUID(playerUuid, "4")) {
                return null;
            }

            const result = await client.query(
                `SELECT * FROM pit."${
                    typeName + "Stats"
                }" WHERE "playerUuid" = $1`,
                [playerUuid]
            );

            return result.rows[0];
        },
    });
};

export const introspectObject = async (stat: string, client: Client) => {
    const typeName = stat.charAt(0).toUpperCase() + stat.slice(1);

    console.log(typeName);

    const result = await client.query<{
        column_name: string;
        data_type: string;
    }>(
        `SELECT column_name, data_type FROM information_schema.columns WHERE table_schema = 'pit' AND table_name = '${typeName}Stats';`
    );

    const rowTypeMap: {
        [key: string]: (o: ObjectDefinitionBlock<any>, n: string) => void;
    } = {
        text: (o, n) => o.string(n),
        integer: (o, n) => o.int(n),
        numeric: (o, n) => o.float(n),
    };

    const gqlObject = objectType({
        name: typeName,
        definition(_) {
            _.int("id");
            _.string("playerUuid");

            result.rows.forEach(row => {
                const rowType = rowTypeMap[row.data_type];

                rowType(_, row.column_name);
            });
        },
    });

    const mutationObject = objectType({
        name: `Update${typeName}Stats`,
        definition(_) {
            result.rows.forEach(row => {
                const rowType = rowTypeMap[row.data_type];

                if (
                    row.column_name !== "id" &&
                    row.column_name !== "playerUuid"
                ) {
                    rowType(_, row.column_name);
                }
            });
        },
    });

    // TODO add resolver

    return [gqlObject, mutationObject];
};

export const PitStatsObject = [PitStats];
