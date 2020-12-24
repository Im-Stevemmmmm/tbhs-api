import { Injectable } from "@nestjs/common";
import { PitOffensiveStats, Prisma } from "@prisma/client";
import { PrismaService } from "../../../../resources/prisma/prisma.service";

@Injectable()
export class PitOffensiveStatsService {
    constructor(private readonly prisma: PrismaService) {}

    async findAll(): Promise<PitOffensiveStats[]> {
        return await this.prisma.pitOffensiveStats.findMany();
    }

    async findOne(
        where: Prisma.PitOffensiveStatsWhereUniqueInput
    ): Promise<PitOffensiveStats> {
        return await this.prisma.pitOffensiveStats.findUnique({ where });
    }

    async create(playerUuid: string): Promise<PitOffensiveStats> {
        return await this.prisma.pitOffensiveStats.create({
            data: { player: { connect: { uuid: playerUuid } } },
        });
    }

    async update(
        where: Prisma.PitOffensiveStatsWhereUniqueInput,
        data: Prisma.PitOffensiveStatsUpdateInput
    ) {
        await this.prisma.pitOffensiveStats.update({ where, data });
    }
}
