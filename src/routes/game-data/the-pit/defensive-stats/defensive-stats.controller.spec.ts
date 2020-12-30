import { PitDefensiveStats } from "@prisma/client";
import { PrismaService } from "src/resources/prisma/prisma.service";
import { PitDefensiveStatsController } from "./defensive-stats.controller";
import { PitDefensiveStatsService } from "./defensive-stats.service";

describe("PitDefensiveStats", () => {
    let pitOffensiveStatsService: PitDefensiveStatsService;
    let pitOffensiveStatsController: PitDefensiveStatsController;

    beforeEach(() => {
        pitOffensiveStatsService = new PitDefensiveStatsService(
            new PrismaService()
        );
        pitOffensiveStatsController = new PitDefensiveStatsController(
            pitOffensiveStatsService
        );
    });

    describe("findAll", () => {
        it("returns the offensive stats for all players", async () => {
            const result: PitDefensiveStats[] = [
                {
                    playerUuid: "1234",
                    bowDamageTaken: 0,
                    damageTaken: 0,
                    deaths: 0,
                    meleeDamageTaken: 0,
                },
                {
                    playerUuid: "5467",
                    bowDamageTaken: 0,
                    damageTaken: 0,
                    deaths: 0,
                    meleeDamageTaken: 0,
                },
            ];

            jest.spyOn(pitOffensiveStatsService, "findAll").mockImplementation(
                async () => result
            );

            expect(await pitOffensiveStatsController.getDefensiveStats()).toBe(
                result
            );
        });
    });

    describe("findOne", () => {
        it("finds a players offensive stats by uuid", async () => {
            const result: PitDefensiveStats = {
                playerUuid: "5467",
                bowDamageTaken: 0,
                damageTaken: 0,
                deaths: 0,
                meleeDamageTaken: 0,
            };

            jest.spyOn(pitOffensiveStatsService, "findOne").mockImplementation(
                async () => result
            );

            expect(
                await pitOffensiveStatsController.getDefensiveStatsByUuid(
                    "1234"
                )
            ).toBe(result);
        });
    });

    describe("update", () => {
        it("updates the offensive stats for a player", async () => {
            const result: PitDefensiveStats = {
                playerUuid: "5467",
                bowDamageTaken: 1,
                damageTaken: 0,
                deaths: 0,
                meleeDamageTaken: 0,
            };

            jest.spyOn(pitOffensiveStatsService, "update").mockImplementation(
                async () => result
            );

            expect(
                await pitOffensiveStatsController.updateDefensiveStats("5467", {
                    bowDamageTaken: 1,
                })
            ).toBe(result);
        });
    });
});
