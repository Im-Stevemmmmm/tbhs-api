import { Player } from "@prisma/client";
import { isUUID } from "class-validator";
import { NextFunction, Request, Response, Router } from "express";
import { prisma, redis } from "../context";
import { adminApiKeyAuth } from "../utils/auth-middleware";
import { camelCaseKeys } from "../utils/camel-case-keys";
import { createError } from "../utils/error";
import { verifyQuery } from "../utils/verify-query";

const router = Router();

const playerCacheKey = (uuid: string) => `player:global:${uuid}`;
const setPlayerCache = (uuid: string, player: Player) =>
    redis.setex(playerCacheKey(uuid), 180, JSON.stringify(player));

const playerCache = async (
    { params: { uuid } }: Request,
    res: Response,
    next: NextFunction
) => {
    const cachedValue = await redis.get(playerCacheKey(uuid));

    return cachedValue ? res.send(JSON.parse(cachedValue)) : next();
};

router.get("/", async ({ query: { rank } }, res) => {
    const queryParams = {
        rank: {
            none: "none",
            donor: "donor",
        },
    };

    const parsedRank = queryParams.rank[rank as string];

    if (!verifyQuery(res, rank, parsedRank, "Rank must be none or donor.")) {
        return;
    }

    const players = await prisma.player.findMany({
        where: {
            rank: parsedRank,
        },
    });

    return res.send(players);
});

router.get("/:uuid", playerCache, async ({ params: { uuid } }, res) => {
    const player = await prisma.player.findUnique({
        where: {
            uuid,
        },
    });

    if (!player) {
        return createError(res, 404, "Player not found.");
    }

    setPlayerCache(uuid, player);

    return res.send(player);
});

router.post("/", adminApiKeyAuth, async ({ body }, res) => {
    const { uuid } = body as { uuid: string };

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
            PitPlayerGold: { create: {} },
            PitDefensiveStats: { create: {} },
            PitFarmingStats: { create: {} },
            PitMiscellaneousStats: { create: {} },
            PitOffensiveStats: { create: {} },
            PitPerformanceStats: { create: {} },
            PitPerksAndMysticStats: { create: {} },
            PitPrestigeStats: { create: {} },
        },
    });

    setPlayerCache(uuid, result);

    return res.send(camelCaseKeys(result));
});

export const playerRoutes = router;
