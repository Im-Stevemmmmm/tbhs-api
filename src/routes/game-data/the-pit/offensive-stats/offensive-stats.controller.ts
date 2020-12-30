import { Body, Controller, Get, Param, Put } from "@nestjs/common";
import { PitOffensiveStats } from "@prisma/client";
import { UUIDv4Pipe } from "src/utils/standard-uuid-pipe";
import { pitStatsRoute } from "../../routes";
import { UpdateOffensiveStatsDto } from "./dtos/update-offensive-stats.dto";
import { PitOffensiveStatsService } from "./offensive-stats.service";

@Controller(pitStatsRoute("offensive-stats"))
export class PitOffensiveStatsController {
    constructor(
        private readonly pitOffensiveStatsService: PitOffensiveStatsService
    ) {}

    @Get()
    async getOffensiveStats(): Promise<PitOffensiveStats[]> {
        return await this.pitOffensiveStatsService.findAll();
    }

    @Get(":uuid")
    async getOffensiveStatsByUuid(
        @Param("uuid", UUIDv4Pipe) uuid: string
    ): Promise<PitOffensiveStats> {
        return await this.pitOffensiveStatsService.findOne({
            playerUuid: uuid,
        });
    }

    @Put(":uuid")
    async updateOffensiveStats(
        @Param("uuid", UUIDv4Pipe) uuid: string,
        @Body() updateOffensiveStatsDto: UpdateOffensiveStatsDto
    ): Promise<PitOffensiveStats> {
        return await this.pitOffensiveStatsService.update(
            { playerUuid: uuid },
            updateOffensiveStatsDto
        );
    }
}
