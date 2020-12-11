import { Module } from "@nestjs/common";
import { PlayersModule } from "./players/players.module";
import { PrismaService } from "./prisma/prisma.service";

@Module({
    imports: [PlayersModule],
    providers: [PrismaService],
})
export class AppModule {}
