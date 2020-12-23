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
        return await this.pitDataService.findAll();
    }

    @Get("/:uuid")
    async getPitDataFromUuid(
        @Param("uuid") playerUuid: string
    ): Promise<PitDataModel> {
        const pitData = await this.pitDataService.findOne({
            player_uuid: playerUuid,
        });

        if (!pitData) throw new PlayerNotFoundException();

        return pitData;
    }

    @Post()
    async createPitData(
        @Body() createPitDataDto: CreatePitDataDto
    ): Promise<PitDataModel> {
        const { playerUuid } = createPitDataDto;

        return await this.pitDataService.create(playerUuid);
    }
}
