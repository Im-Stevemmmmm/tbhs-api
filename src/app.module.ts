import { Module } from "@nestjs/common";
import { PitDataModule } from "./resources/pit-data/pit-data.module";
import { PlayersModule } from "./resources/players/players.module";

@Module({
    imports: [PlayersModule, PitDataModule],
})
export class AppModule {}
