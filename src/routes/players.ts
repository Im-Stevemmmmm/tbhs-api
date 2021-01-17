import { isUUID } from "class-validator";
import { NextFunction, Request, Response, Router } from "express";
import { prisma, redis } from "../context";
import { adminAuth, apiKeyAuth } from "../utils/auth-middleware";
import { createError } from "../utils/error";
import { verifyQuery } from "../utils/verify-query";

const router = Router();

router.get(
    "/",
    apiKeyAuth,
    async ({ query: { rank } }: Request, res: Response) => {
        const queryParams = {
            rank: {
                none: "none",
                donor: "donor",
            },
        };

        const parsedRank = queryParams.rank[rank as string];

        if (
            !verifyQuery(res, rank, parsedRank, "Rank must be none or donor.")
        ) {
            return;
        }

        const players = await prisma.player.findMany({
            where: {
                rank: parsedRank,
            },
        });

        return res.send(players);
    }
);

const playerRedisValue = (uuid: string) => `player:${uuid}`;

const playerCache = async (
    { params: { uuid } }: Request,
    res: Response,
    next: NextFunction
) => {
    const cachedValue = await redis.get(playerRedisValue(uuid));

    return cachedValue ? res.send(JSON.parse(cachedValue)) : next();
};

router.get(
    "/:uuid",
    [apiKeyAuth, playerCache],
    async ({ params: { uuid } }: Request, res: Response) => {
        const player = await prisma.player.findUnique({
            where: {
                uuid,
            },
        });

        if (!player) {
            return createError(res, 404, "Player not found.");
        }

        redis.setex(playerRedisValue(uuid), 60, JSON.stringify(player));

        return res.send(player);
    }
);

interface PlayerPost {
    uuid: string;
}

router.post("", adminAuth, async ({ body }: Request, res: Response) => {
    const { uuid } = body as PlayerPost;

    if (!isUUID(uuid, "4")) {
        return createError(res, 422, "The uuid value must be a UUIDv4.");
    }

    const player = await prisma.player.findUnique({
        where: {
            uuid,
        },
    });

    if (player) {
        return createError(res, 409, "This player is already registered.");
    }

    const result = await prisma.player.create({
        data: {
            uuid,
            PitDefensiveStats: { create: {} },
            PitFarmingStats: { create: {} },
            PitMiscellaneousStats: { create: {} },
            PitOffensiveStats: { create: {} },
            PitPerformanceStats: { create: {} },
            PitPerksAndMysticStats: { create: {} },
            PitPrestigeStats: { create: {} },
        },
    });

    return res.send(result);
});

export const playerRoutes = router;
