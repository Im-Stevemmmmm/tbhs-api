import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { Player as PlayerModel } from "@prisma/client";
import { PlayerNotFoundException } from "src/exceptions/player-not-found.exception";
import { UUIDv4Pipe } from "../../utils/standard-uuid-pipe";
import { RegisterPlayerDto } from "./dtos/register-player.dto";
import { UpdatePlayerDto } from "./dtos/update-player.dto";
import { PlayersService } from "./players.service";

@Controller("players")
export class PlayersController {
    constructor(private readonly playersService: PlayersService) {}

    @Get()
    async getPlayers(): Promise<PlayerModel[]> {
        return await this.playersService.findAll();
    }

    @Get("/:uuid")
    async getPlayerByUuid(
        @Param("uuid", UUIDv4Pipe) uuid: string
    ): Promise<PlayerModel> {
        const player = await this.playersService.findOne({ uuid });

        if (!player) throw new PlayerNotFoundException();

        return player;
    }

    @Post()
    async registerPlayer(
        @Body() data: RegisterPlayerDto
    ): Promise<PlayerModel> {
        const { uuid } = data;

        return await this.playersService.create({
            uuid,
            rank: "noob",
        });
    }

    @Post("/:uuid")
    async updatePlayer(
        @Param("uuid", UUIDv4Pipe) uuid: string,
        @Body() updatePlayerDto: UpdatePlayerDto
    ): Promise<PlayerModel> {
        return await this.playersService.update({
            where: { uuid },
            data: updatePlayerDto,
        });
    }
}
