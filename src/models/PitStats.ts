import { isUUID } from "class-validator";
import { objectType } from "nexus";
import { ObjectDefinitionBlock } from "nexus/dist/core";
import { playerUuidSourceType } from ".";
import { PlayerUuid } from "../source-types/player-uuid-type";

const stats = ["offensive", "defensive", "farming"];

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
