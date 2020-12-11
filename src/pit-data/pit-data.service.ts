import { Injectable } from "@nestjs/common";
import { PitData, Prisma } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class PitDataService {
    constructor(private readonly prisma: PrismaService) {}

    async getAllPitData(): Promise<PitData[]> {
        return await this.prisma.pitData.findMany();
    }

    async getPitDataFromPlayer(
        where: Prisma.PitDataWhereUniqueInput,
    ): Promise<PitData> {
        return await this.prisma.pitData.findUnique({ where });
    }

    async createPitData(data: Prisma.PitDataCreateInput): Promise<PitData> {
        return await this.prisma.pitData.create({ data });
    }
}
