import { PitData } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";
import { PitDataController } from "./pit-data.controller";
import { PitDataService } from "./pit-data.service";

describe("PitDataController", () => {
    let pitDataService: PitDataService;
    let pitDataController: PitDataController;

    beforeEach(() => {
        pitDataService = new PitDataService(new PrismaService());
        pitDataController = new PitDataController(pitDataService);
    });

    describe("findAll", () => {
        it("should return an array of pit data", async () => {
            const result: PitData[] = [
                {
                    playerUuid: "random-uuid",
                    defensiveStatsId: 0,
                    farmingStatsId: 0,
                    miscellaneousStatsId: 0,
                    offensiveStatsId: 0,
                    performanceStatsId: 0,
                    perksAndMysticStatsId: 0,
                    prestigeStatsId: 0,
                },
                {
                    playerUuid: "random-uuid2",
                    defensiveStatsId: 0,
                    farmingStatsId: 0,
                    miscellaneousStatsId: 0,
                    offensiveStatsId: 0,
                    performanceStatsId: 0,
                    perksAndMysticStatsId: 0,
                    prestigeStatsId: 0,
                },
                {
                    playerUuid: "random-uuid3",
                    defensiveStatsId: 0,
                    farmingStatsId: 0,
                    miscellaneousStatsId: 0,
                    offensiveStatsId: 0,
                    performanceStatsId: 0,
                    perksAndMysticStatsId: 0,
                    prestigeStatsId: 0,
                },
            ];

            jest.spyOn(pitDataService, "findAll").mockImplementation(
                async () => result
            );

            expect(await pitDataController.getPitData()).toBe(result);
        });
    });

    describe("findOne", () => {
        it("returns the pit data for a single player", async () => {
            const result: PitData = {
                playerUuid: "1234",
                defensiveStatsId: 0,
                farmingStatsId: 0,
                miscellaneousStatsId: 0,
                offensiveStatsId: 0,
                performanceStatsId: 0,
                perksAndMysticStatsId: 0,
                prestigeStatsId: 0,
            };

            jest.spyOn(pitDataService, "findOne").mockImplementation(
                async () => result
            );

            expect(await pitDataController.getPitDataFromUuid("1234")).toBe(
                result
            );
        });
    });

    describe("create", () => {
        it("creates the default pit data for a player", async () => {
            const pitDataService = new PitDataService(new PrismaService());
            const pitDataController = new PitDataController(pitDataService);

            const result: PitData = {
                playerUuid: "1234",
                defensiveStatsId: 0,
                farmingStatsId: 0,
                miscellaneousStatsId: 0,
                offensiveStatsId: 0,
                performanceStatsId: 0,
                perksAndMysticStatsId: 0,
                prestigeStatsId: 0,
            };

            jest.spyOn(pitDataService, "create").mockImplementation(
                async () => result
            );

            expect(
                await pitDataController.createPitData({ playerUuid: "1234" })
            ).toBe(result);
        });
    });
});
