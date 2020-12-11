import { Injectable } from "@nestjs/common";
import { PitData, Prisma } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class PitDataService {
    constructor(private readonly prisma: PrismaService) {}

    async getPitDataFromPlayer(
        where: Prisma.PitDataWhereUniqueInput,
    ): Promise<PitData> {
        return await this.prisma.pitData.findUnique({ where });
    }
}
