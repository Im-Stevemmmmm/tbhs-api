import { Module } from "@nestjs/common";
import { PlayersModule } from "./players/players.module";
import { PitDataModule } from './pit-data/pit-data.module';

@Module({
    imports: [PlayersModule, PitDataModule],
})
export class AppModule {}
