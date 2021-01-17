import { PrismaClient } from "@prisma/client";
import Redis from "ioredis";

export const prisma = new PrismaClient();
export const redis = new Redis({
    db: 0,
});
