import { Module } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { PitDataController } from "./pit-data.controller";
import { PitDataService } from "./pit-data.service";

@Module({
    controllers: [PitDataController],
    providers: [PitDataService, PrismaService],
})
export class PitDataModule {}
