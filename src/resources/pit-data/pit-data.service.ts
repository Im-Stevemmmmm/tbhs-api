import { Injectable } from "@nestjs/common";
import { PitData, Prisma } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class PitDataService {
    constructor(private readonly prisma: PrismaService) {}

    async findAll(): Promise<PitData[]> {
        return await this.prisma.pitData.findMany();
    }

    async findOne(where: Prisma.PitDataWhereUniqueInput): Promise<PitData> {
        return await this.prisma.pitData.findUnique({ where });
    }

    async create(playerUuid: string): Promise<PitData> {
        return await this.prisma.pitData.create({
            data: { Player: { connect: { uuid: playerUuid } } },
        });
    }
}
