import { PitOffensiveStats } from "@prisma/client";
import { PLAYER_UUID_INDEX } from "src/utils/constants";

export type UpdateOffensiveStatsDto = Partial<
    Omit<PitOffensiveStats, typeof PLAYER_UUID_INDEX>
>;
