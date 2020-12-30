import { Injectable } from "@nestjs/common";
import { PitDefensiveStats, Prisma } from "@prisma/client";
import { PrismaService } from "src/resources/prisma/prisma.service";

@Injectable()
export class PitDefensiveStatsService {
    constructor(private readonly prisma: PrismaService) {}

    async findAll(): Promise<PitDefensiveStats[]> {
        return await this.prisma.pitDefensiveStats.findMany();
    }

    async findOne(
        where: Prisma.PitOffensiveStatsWhereUniqueInput
    ): Promise<PitDefensiveStats> {
        return await this.prisma.pitDefensiveStats.findUnique({ where });
    }

    async update(
        where: Prisma.PitDefensiveStatsWhereUniqueInput,
        data: Prisma.PitDefensiveStatsUpdateInput
    ): Promise<PitDefensiveStats> {
        return await this.prisma.pitDefensiveStats.update({ where, data });
    }
}
