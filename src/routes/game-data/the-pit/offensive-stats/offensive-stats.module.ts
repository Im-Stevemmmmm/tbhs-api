import { Module } from "@nestjs/common";
import { PrismaService } from "src/resources/prisma/prisma.service";
import { PitOffensiveStatsController } from "./offensive-stats.controller";
import { PitOffensiveStatsService } from "./offensive-stats.service";

@Module({
    controllers: [PitOffensiveStatsController],
    providers: [PitOffensiveStatsService, PrismaService],
})
export class PitOffensiveStatsModule {}
