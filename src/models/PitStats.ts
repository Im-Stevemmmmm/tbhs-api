import { isUUID } from "class-validator";
import { objectType } from "nexus";
import { ObjectDefinitionBlock } from "nexus/dist/core";
import { NexusGenObjects } from "../generated/nexus";
import { ServerContext } from "../server-context";
import { playerUuidType } from "./player-uuid-type";

export const PitStats = objectType({
    name: "PitStats",
    sourceType: playerUuidType,
    definition(_) {
        _.field("offensive", {
            type: Offensive,
            resolve: statsResolver("Offensive"),
        });
        _.field("defensive", {
            type: Defensive,
            resolve: statsResolver("Defensive"),
        });
        _.field("farming", {
            type: Farming,
            resolve: statsResolver("Farming"),
        });
    },
});

const statsResolver = (tableName: string) => async (
    { playerUuid }: { playerUuid: string },
    _: {},
    { client }: ServerContext
) => {
    if (!isUUID(playerUuid, "4")) {
        return null;
    }

    const result = await client.query<NexusGenObjects["Defensive"]>(
        `SELECT * FROM pit."${tableName + "Stats"}" WHERE "playerUuid" = $1`,
        [playerUuid]
    );

    return result.rows[0];
};

const commonFields = (_: ObjectDefinitionBlock<any>) => {
    _.int("id");
    _.string("playerUuid");
};

const Offensive = objectType({
    name: "Offensive",
    definition(_) {
        commonFields(_);
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
        commonFields(_);
        _.int("deaths");
        _.float("damageTaken");
        _.float("meleeDamageTaken");
        _.float("bowDamageTaken");
    },
});

const Farming = objectType({
    name: "Farming",
    definition(_) {
        commonFields(_);
        _.int("wheatFarmed");
        _.int("fishedAnything");
        _.int("fishedFish");
        _.int("fishSold");
        _.int("hayBalesSold");
        _.int("kingsQuestCompleted");
        _.int("sewerTreasuresFound");
        _.int("nightQuestsCompleted");
    },
});

export const PitStatsObject = [PitStats, Offensive, Defensive, Farming];
