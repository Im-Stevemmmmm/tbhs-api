import { Module } from "@nestjs/common";
import { PitDefensiveStatsModule } from "./routes/game-data/the-pit/defensive-stats/defensive-stats.module";
import { PitOffensiveStatsModule } from "./routes/game-data/the-pit/offensive-stats/offensive-stats.module";
import { PlayersModule } from "./routes/players/players.module";

@Module({
    imports: [PlayersModule, PitOffensiveStatsModule, PitDefensiveStatsModule],
})
export class AppModule {}
