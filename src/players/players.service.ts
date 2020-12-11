import { Injectable } from "@nestjs/common";
import { Player, Prisma } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class PlayersService {
    constructor(private prisma: PrismaService) {}

    async players(): Promise<Player[]> {
        return await this.prisma.player.findMany();
    }

    async createPlayer(data: Prisma.PlayerCreateInput): Promise<Player> {
        return await this.prisma.player.create({ data });
    }

    async updatePlayer(params: {
        where: Prisma.PlayerWhereUniqueInput;
        data: Prisma.PlayerUpdateInput;
    }): Promise<Player> {
        const { where, data } = params;

        return await this.prisma.player.update({ where, data });
    }

    async deletePlayer(where: Prisma.PlayerWhereUniqueInput): Promise<Player> {
        return await this.prisma.player.delete({ where });
    }
}
