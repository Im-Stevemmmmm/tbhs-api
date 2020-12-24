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
        it("returns all players who have logged on", async () => {
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

    describe("findOne", () => {
        it("finds one player by uuid", async () => {
            const result: Player = {
                uuid: "1234",
                rank: "noob",
            };

            jest.spyOn(playersService, "findOne").mockImplementation(
                async () => result
            );

            expect(await playersController.getPlayerByUuid("1234")).toBe(
                result
            );
        });
    });

    describe("create", () => {
        it("creates a new player", async () => {
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
        it("updates the players data", async () => {
            const result: Player = {
                uuid: "1234",
                rank: "noob",
            };

            jest.spyOn(playersService, "update").mockImplementation(
                async () => result
            );

            expect(
                await playersController.updatePlayer("1234", { rank: "noob" })
            ).toBe(result);
        });
    });
});
