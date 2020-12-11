import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { PitData as PitDataModel } from "@prisma/client";
import { PlayerNotFoundException } from "src/exceptions/player-not-found.exception";
import { CreatePitDataDto } from "./dtos/create-pit-data.dto";
import { PitDataService } from "./pit-data.service";

@Controller("game-data/the-pit")
export class PitDataController {
    constructor(private readonly pitDataService: PitDataService) {}

    @Get()
    async getPitData(): Promise<PitDataModel[]> {
        return await this.pitDataService.getAllPitData();
    }

    @Get("/:uuid")
    async getPitDataFromUuid(
        @Param("uuid") player_uuid: string,
    ): Promise<PitDataModel> {
        const pitData = await this.pitDataService.getPitDataFromPlayer({
            player_uuid,
        });

        if (!pitData) throw new PlayerNotFoundException();

        return pitData;
    }

    @Post()
    async createPitData(
        @Body() createPitDataDto: CreatePitDataDto,
    ): Promise<PitDataModel> {
        const { gold, level, prestige, uuid, xp } = createPitDataDto;

        return await this.pitDataService.createPitData({
            Player: { connect: { uuid } },
            gold,
            xp,
            level,
            prestige,
        });
    }
}
