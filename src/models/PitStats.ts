import { objectType } from "nexus";
import { NexusGenObjects } from "../generated/nexus";
import { ServerContext } from "../server-context";

export const PitStats = objectType({
    name: "PitStats",
    definition(_) {
        _.string("playerUuid");
        _.field("offensive", {
            type: Offensive,
            resolve: statsResolver("OffensiveStats"),
        });
        _.field("defensive", {
            type: Defensive,
            resolve: statsResolver("DefensiveStats"),
        });
    },
});

const statsResolver = (tableName: string) => async (
    { playerUuid }: { playerUuid: string },
    _: {},
    { client }: ServerContext
) => {
    const result = await client.query<NexusGenObjects["Defensive"]>(
        `SELECT * FROM pit."${tableName}" WHERE "playerUuid" = $1`,
        [playerUuid]
    );

    return result.rows[0];
};

const Offensive = objectType({
    name: "Offensive",
    definition(_) {
        _.string("playerUuid");
        _.int("kills");
        _.int("assists");
        _.int("swordHits");
        _.int("arrowsShot");
        _.int("arrowsHit");
        _.float("damageDealt");
        _.float("meleeDamageDealt");
        _.float("bowDamageDealt");
        _.int("highestStreak");
    },
});

const Defensive = objectType({
    name: "Defensive",
    definition(_) {
        _.string("playerUuid");
        _.int("deaths");
        _.float("damageTaken");
        _.float("meleeDamageTaken");
        _.float("bowDamageTaken");
    },
});

export const PitStatsObject = [PitStats, Offensive, Defensive];
