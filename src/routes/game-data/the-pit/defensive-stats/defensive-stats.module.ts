import { Module } from "@nestjs/common";
import { PrismaService } from "src/resources/prisma/prisma.service";
import { PitDefensiveStatsController } from "./defensive-stats.controller";
import { PitDefensiveStatsService } from "./defensive-stats.service";

@Module({
    controllers: [PitDefensiveStatsController],
    providers: [PitDefensiveStatsService, PrismaService],
})
export class PitDefensiveStatsModule {}
