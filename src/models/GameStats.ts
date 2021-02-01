import { objectType } from "nexus";
import { PitStats } from "./PitStats";

export const GameStats = objectType({
    name: "GameStats",
    definition(_) {
        _.string("playerUuid");
        _.field("pit", {
            type: PitStats,
            resolve: ({ playerUuid }) => ({ playerUuid }),
        });
    },
});

export const GameStatsObject = [GameStats];
