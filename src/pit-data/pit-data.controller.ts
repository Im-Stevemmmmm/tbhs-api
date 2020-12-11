import {
    Controller,
    Get,
    HttpException,
    HttpStatus,
    Param,
} from "@nestjs/common";
import { PitData as PitDataModel } from "@prisma/client";
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

        if (!pitData) {
            const status = HttpStatus.NOT_FOUND;

            throw new HttpException(
                {
                    status,
                    error: "Player does not exist.",
                },
                status,
            );
        }

        return pitData;
    }
}
