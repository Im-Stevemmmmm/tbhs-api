import { PitOffensiveStats } from "@prisma/client";
import { PrismaService } from "src/resources/prisma/prisma.service";
import { PitOffensiveStatsController } from "./offensive-stats.controller";
import { PitOffensiveStatsService } from "./offensive-stats.service";

describe("PitOffensiveStats", () => {
    let pitOffensiveStatsService: PitOffensiveStatsService;
    let pitOffensiveStatsController: PitOffensiveStatsController;

    beforeEach(() => {
        pitOffensiveStatsService = new PitOffensiveStatsService(
            new PrismaService()
        );
        pitOffensiveStatsController = new PitOffensiveStatsController(
            pitOffensiveStatsService
        );
    });

    describe("findAll", () => {
        it("returns the offensive stats for all players", async () => {
            const result: PitOffensiveStats[] = [
                {
                    playerUuid: "1234",
                    arrowsHit: 0,
                    arrowsShot: 0,
                    assists: 0,
                    bowDamageDealt: 0,
                    damageDealt: 0,
                    highestStreak: 0,
                    kills: 0,
                    meleeDamageDealt: 0,
                    swordHits: 0,
                },
                {
                    playerUuid: "5467",
                    arrowsHit: 0,
                    arrowsShot: 0,
                    assists: 0,
                    bowDamageDealt: 0,
                    damageDealt: 0,
                    highestStreak: 0,
                    kills: 0,
                    meleeDamageDealt: 0,
                    swordHits: 0,
                },
            ];

            jest.spyOn(pitOffensiveStatsService, "findAll").mockImplementation(
                async () => result
            );

            expect(await pitOffensiveStatsController.getOffensiveStats()).toBe(
                result
            );
        });
    });

    describe("findOne", () => {
        it("finds a players offensive stats by uuid", async () => {
            const result: PitOffensiveStats = {
                playerUuid: "5467",
                arrowsHit: 0,
                arrowsShot: 0,
                assists: 0,
                bowDamageDealt: 0,
                damageDealt: 0,
                highestStreak: 0,
                kills: 0,
                meleeDamageDealt: 0,
                swordHits: 0,
            };

            jest.spyOn(pitOffensiveStatsService, "findOne").mockImplementation(
                async () => result
            );

            expect(
                await pitOffensiveStatsController.getOffensiveStatsByUuid(
                    "1234"
                )
            ).toBe(result);
        });
    });

    describe("update", () => {
        it("updates the offensive stats for a player", async () => {
            const result: PitOffensiveStats = {
                playerUuid: "5467",
                arrowsHit: 1,
                arrowsShot: 0,
                assists: 0,
                bowDamageDealt: 0,
                damageDealt: 0,
                highestStreak: 0,
                kills: 0,
                meleeDamageDealt: 0,
                swordHits: 0,
            };

            jest.spyOn(pitOffensiveStatsService, "update").mockImplementation(
                async () => result
            );

            expect(
                await pitOffensiveStatsController.updateStats("5467", {
                    arrowsHit: 1,
                })
            ).toBe(result);
        });
    });
});
