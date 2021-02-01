import { objectType } from "nexus";
import { PitStats } from "./PitStats";
import { playerUuidType } from "./player-uuid-type";

export const GameStats = objectType({
    name: "GameStats",
    sourceType: playerUuidType,
    definition(_) {
        _.field("pit", {
            type: PitStats,
            resolve: ({ playerUuid }) => ({ playerUuid }),
        });
    },
});

export const GameStatsObject = [GameStats];
