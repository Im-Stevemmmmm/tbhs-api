import { Module } from "@nestjs/common";
import { PitDataService } from "./pit-data.service";
import { PitDataController } from "./pit-data.controller";

@Module({
    controllers: [PitDataController],
    providers: [PitDataService],
})
export class PitDataModule {}
