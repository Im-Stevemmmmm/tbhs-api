import {
    Body,
    Controller,
    Get,
    HttpException,
    HttpStatus,
    Param,
    Post,
} from "@nestjs/common";
import { Player as PlayerModel } from "@prisma/client";
import { RegisterPlayerDto } from "./dtos/register-player.dto";
import { PlayersService } from "./players.service";

@Controller("players")
export class PlayersController {
    constructor(private readonly playersService: PlayersService) {}

    @Get()
    async getPlayers(): Promise<PlayerModel[]> {
        return await this.playersService.players();
    }

    @Get("/:uuid")
    async getPlayerByUuid(@Param("uuid") uuid: string): Promise<PlayerModel> {
        const player = await this.playersService.player({ uuid });

        if (!player) {
            const status = HttpStatus.NOT_FOUND;

            throw new HttpException(
                {
                    status,
                    error: "Player does not exist.",
                },
                status,
            );
        }

        return player;
    }

    @Post()
    async registerPlayer(
        @Body() data: RegisterPlayerDto,
    ): Promise<PlayerModel> {
        const { uuid } = data;

        return await this.playersService.createPlayer({
            uuid,
            rank: "noob",
        });
    }
}
