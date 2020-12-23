import { Player } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";
import { PlayersController } from "./players.controller";
import { PlayersService } from "./players.service";

test("findAll returns all players", async () => {
    const playersService = new PlayersService(new PrismaService());
    const playersController = new PlayersController(playersService);

    const result: Player[] = [
        {
            uuid: "1234",
            rank: "noob",
        },
        {
            uuid: "12345",
            rank: "noob",
        },
    ];

    jest.spyOn(playersService, "findAll").mockImplementation(
        async () => result
    );

    expect(await playersController.getPlayers()).toBe(result);
});

test("findOne returns one player from a uuid", async () => {
    const playersService = new PlayersService(new PrismaService());
    const playersController = new PlayersController(playersService);

    const result: Player = {
        uuid: "1234",
        rank: "noob",
    };

    jest.spyOn(playersService, "findOne").mockImplementation(
        async () => result
    );

    expect(await playersController.getPlayerByUuid("1234")).toBe(result);
});

test("create returns a new player", async () => {
    const playersService = new PlayersService(new PrismaService());
    const playersController = new PlayersController(playersService);

    const result: Player = {
        uuid: "1234",
        rank: "noob",
    };

    jest.spyOn(playersService, "create").mockImplementation(async () => result);

    expect(await playersController.registerPlayer({ uuid: "1234" })).toBe(
        result
    );
});

test("update sets the player's rank", async () => {
    const playersService = new PlayersService(new PrismaService());
    const playersController = new PlayersController(playersService);

    const result: Player = {
        uuid: "1234",
        rank: "noob",
    };

    jest.spyOn(playersService, "update").mockImplementation(async () => result);

    expect(await playersController.setPlayerRank("1234", "noob")).toBe(result);
});
