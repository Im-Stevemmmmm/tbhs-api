import { Body, Controller, Get, Param, Put } from "@nestjs/common";
import { PitDefensiveStats } from "@prisma/client";
import { UUIDv4Pipe } from "src/utils/standard-uuid-pipe";
import { pitStatsRoute } from "../../routes";
import { PitDefensiveStatsService } from "./defensive-stats.service";
import { UpdateDefensiveStatsDto } from "./dtos/update-defensive-stats.dto";

@Controller(pitStatsRoute("defensive-stats"))
export class PitDefensiveStatsController {
    constructor(
        private readonly pitDefensiveStatsService: PitDefensiveStatsService
    ) {}

    @Get()
    async getDefensiveStats(): Promise<PitDefensiveStats[]> {
        return await this.pitDefensiveStatsService.findAll();
    }

    @Get(":uuid")
    async getDefensiveStatsByUuid(
        @Param("uuid", UUIDv4Pipe) uuid: string
    ): Promise<PitDefensiveStats> {
        return await this.pitDefensiveStatsService.findOne({
            playerUuid: uuid,
        });
    }

    @Put(":uuid")
    async updateDefensiveStats(
        @Param("uuid", UUIDv4Pipe) uuid: string,
        @Body() updateOffensiveStatsDto: UpdateDefensiveStatsDto
    ): Promise<PitDefensiveStats> {
        return await this.pitDefensiveStatsService.update(
            { playerUuid: uuid },
            updateOffensiveStatsDto
        );
    }
}
