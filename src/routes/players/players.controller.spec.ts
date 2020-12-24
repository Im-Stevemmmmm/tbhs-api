import { Player } from "@prisma/client";
import { PrismaService } from "../../resources/prisma/prisma.service";
import { PlayersController } from "./players.controller";
import { PlayersService } from "./players.service";

describe("PlayersController", () => {
    let playersService: PlayersService;
    let playersController: PlayersController;

    beforeEach(() => {
        playersService = new PlayersService(new PrismaService());
        playersController = new PlayersController(playersService);
    });

    describe("findAll", () => {
        it("returns the pit data for all players", async () => {
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
    });

    describe("create", () => {
        it("returns a new player", async () => {
            const playersService = new PlayersService(new PrismaService());
            const playersController = new PlayersController(playersService);

            const result: Player = {
                uuid: "1234",
                rank: "noob",
            };

            jest.spyOn(playersService, "create").mockImplementation(
                async () => result
            );

            expect(
                await playersController.registerPlayer({ uuid: "1234" })
            ).toBe(result);
        });
    });

    describe("update", () => {
        it("sets the players rank", async () => {
            const playersService = new PlayersService(new PrismaService());
            const playersController = new PlayersController(playersService);

            const result: Player = {
                uuid: "1234",
                rank: "noob",
            };

            jest.spyOn(playersService, "update").mockImplementation(
                async () => result
            );

            expect(await playersController.setPlayerRank("1234", "noob")).toBe(
                result
            );
        });
    });
});
