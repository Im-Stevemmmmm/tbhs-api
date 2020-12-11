import { PitData } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";
import { PitDataController } from "./pit-data.controller";
import { PitDataService } from "./pit-data.service";

let pitDataController: PitDataController;
let pitDataService: PitDataService;

beforeEach(() => {
    pitDataService = new PitDataService(new PrismaService());
    pitDataController = new PitDataController(pitDataService);
});

test("getAllPitData returns all pit data", async () => {
    const result: PitData[] = [
        { gold: 1, level: 1, player_uuid: "abc", prestige: 0, xp: 184 },
        { gold: 25, level: 5, player_uuid: "alobij", prestige: 21, xp: 349 },
        { gold: 1382, level: 12, player_uuid: "12paijf", prestige: 2, xp: 599 },
    ];

    jest.spyOn(pitDataService, "findAll").mockImplementation(
        async () => result,
    );

    expect(await pitDataController.getPitData()).toBe(result);
});
