import { PitOffensiveStats } from "@prisma/client";

export class UpdateOffensiveStatsDto implements Partial<PitOffensiveStats> {
    readonly arrowsHit: number;
    readonly arrowsShot: number;
    readonly assists: number;
    readonly bowDamageDealt: number;
    readonly damageDealt: number;
    readonly highestStreak: number;
    readonly kills: number;
    readonly meleeDamageDealt: number;
    readonly swordHits: number;
}
