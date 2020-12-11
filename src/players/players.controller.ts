import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { Player as PlayerModel } from "@prisma/client";
import { RegisterPlayerDto } from "./dtos/register-player";
import { PlayersService } from "./players.service";

@Controller("players")
export class PlayersController {
    constructor(private readonly playersService: PlayersService) {}

    @Get()
    async getPlayers(): Promise<PlayerModel[]> {
        return this.playersService.players();
    }

    @Get("/:uuid")
    async getPlayerByUuid(@Param("uuid") uuid: string): Promise<PlayerModel> {
        return this.playersService.player({ uuid });
    }

    @Post()
    async registerPlayer(
        @Body() data: RegisterPlayerDto,
    ): Promise<PlayerModel> {
        const { uuid } = data;

        return this.playersService.createPlayer({
            uuid,
            rank: "noob",
        });
    }
}
