import { PitDefensiveStats } from "@prisma/client";
import { PLAYER_UUID_INDEX } from "src/utils/constants";

export type UpdateDefensiveStatsDto = Partial<
    Omit<PitDefensiveStats, typeof PLAYER_UUID_INDEX>
>;
