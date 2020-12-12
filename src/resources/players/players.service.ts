import { Injectable } from "@nestjs/common";
import { Player, Prisma } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class PlayersService {
    constructor(private readonly prisma: PrismaService) {}

    async findAll(): Promise<Player[]> {
        return await this.prisma.player.findMany();
    }

    async findOne(where: Prisma.PlayerWhereUniqueInput): Promise<Player> {
        return this.prisma.player.findUnique({ where });
    }

    async create(data: Prisma.PlayerCreateInput): Promise<Player> {
        return await this.prisma.player.create({ data });
    }

    async update(params: {
        where: Prisma.PlayerWhereUniqueInput;
        data: Prisma.PlayerUpdateInput;
    }): Promise<Player> {
        const { where, data } = params;

        return await this.prisma.player.update({ where, data });
    }
}
