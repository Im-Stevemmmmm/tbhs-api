import {
    Body,
    Controller,
    Get,
    Param,
    ParseUUIDPipe,
    Post,
} from "@nestjs/common";
import { Player as PlayerModel } from "@prisma/client";
import { PlayerNotFoundException } from "src/exceptions/player-not-found.exception";
import { uuidPipeOptions } from "src/utils/uuid-pipe-config";
import { RegisterPlayerDto } from "./dtos/register-player.dto";
import { ValidateRankPipe } from "./pipes/validate-rank.pipe";
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
        @Param("uuid", new ParseUUIDPipe(uuidPipeOptions)) uuid: string,
    ): Promise<PlayerModel> {
        const player = await this.playersService.findOne({ uuid });

        if (!player) throw new PlayerNotFoundException();

        return player;
    }

    @Post()
    async registerPlayer(
        @Body() data: RegisterPlayerDto,
    ): Promise<PlayerModel> {
        const { uuid } = data;

        return await this.playersService.create({
            uuid,
            rank: "noob",
        });
    }

    @Post("/:uuid/:rank")
    async setPlayerRank(
        @Param("uuid", new ParseUUIDPipe(uuidPipeOptions)) uuid: string,
        @Param("rank", ValidateRankPipe) rank: string,
    ) {
        return await this.playersService.update({
            where: { uuid },
            data: { rank },
        });
    }
}
