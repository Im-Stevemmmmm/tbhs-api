import { Module } from "@nestjs/common";
import { PitOffensiveStatsModule } from "./routes/game-data/the-pit/offensive-stats/offensive-stats.module";
import { PlayersModule } from "./routes/players/players.module";

@Module({
    imports: [PlayersModule, PitOffensiveStatsModule],
})
export class AppModule {}
