import { objectType } from "nexus";
import { playerUuidSourceType } from ".";
import { PitStats } from "./PitStats";

export const GameStats = objectType({
    name: "GameStats",
    sourceType: playerUuidSourceType,
    definition(_) {
        _.field("pit", {
            type: PitStats,
            resolve: ({ playerUuid }) => ({ playerUuid }),
        });
    },
});

export const GameStatsObject = [GameStats];
