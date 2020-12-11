import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class PitDataService {
    constructor(private readonly prisma: PrismaService) {}
}
