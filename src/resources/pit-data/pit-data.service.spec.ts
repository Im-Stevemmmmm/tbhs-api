import { PitData } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";
import { PitDataController } from "./pit-data.controller";
import { PitDataService } from "./pit-data.service";

test("findAll returns all pit data", async () => {
    const pitDataService = new PitDataService(new PrismaService());
    const pitDataController = new PitDataController(pitDataService);

    const result: PitData[] = [
        { gold: 1, level: 1, player_uuid: "abc", prestige: 0, xp: 184 },
        { gold: 25, level: 5, player_uuid: "alobij", prestige: 21, xp: 349 },
        { gold: 1382, level: 12, player_uuid: "12paijf", prestige: 2, xp: 599 },
    ];

    jest.spyOn(pitDataService, "findAll").mockImplementation(
        async () => result
    );

    expect(await pitDataController.getPitData()).toBe(result);
});

test("findOne returns pit data for a player", async () => {
    const pitDataService = new PitDataService(new PrismaService());
    const pitDataController = new PitDataController(pitDataService);

    const result: PitData = {
        gold: 25,
        level: 5,
        player_uuid: "1234",
        prestige: 21,
        xp: 349,
    };

    jest.spyOn(pitDataService, "findOne").mockImplementation(
        async () => result
    );

    expect(await pitDataController.getPitDataFromUuid("1234")).toBe(result);
});

test("create returns default pit data for a player", async () => {
    const pitDataService = new PitDataService(new PrismaService());
    const pitDataController = new PitDataController(pitDataService);

    const result = {
        gold: 0,
        level: 1,
        prestige: 0,
        player_uuid: "1234",
        xp: 1,
    };

    jest.spyOn(pitDataService, "create").mockImplementation(async () => result);

    expect(await pitDataController.createPitData({ playerUuid: "1234" })).toBe(
        result
    );
});
