import { isUUID } from "class-validator";
import { Router } from "express";
import { prisma } from "../../../prisma";
import { adminApiKeyAuth, apiKeyAuth } from "../../../utils/auth-middleware";
import { createError } from "../../../utils/error";

const router = Router();

const types = {
    offensive: prisma.pitOffensiveStats,
    defensive: prisma.pitDefensiveStats,
    farming: prisma.pitFarmingStats,
    miscellaneous: prisma.pitMiscellaneousStats,
    performance: prisma.pitPerformanceStats,
    prestige: prisma.pitPrestigeStats,
    "perks-and-mystics": prisma.pitPerksAndMysticStats,
};

const getKeys = () => {
    const keys = Object.keys(types);
    const finalKey = keys.pop();

    return `${keys.join(", ")} or ${finalKey}`;
};

router.get(
    "/:uuid",
    apiKeyAuth,
    async ({ params: { uuid }, query: { type } }, res) => {
        if (!uuid) {
            return createError(res, 404, "No UUID provided.");
        }

        if (!isUUID(uuid)) {
            return createError(res, 409, "Parameter uuid is not a UUIDv4.");
        }

        if (type) {
            const typeArr: string[] = [].concat(type);

            if (typeArr.some(t => !types[t])) {
                return createError(res, 409, `Type must be ${getKeys()}.`);
            }

            const data = await Promise.all(
                typeArr.map(
                    async t =>
                        await types[t.toLowerCase()].findUnique({
                            where: {
                                playerUuid: uuid,
                            },
                        })
                )
            );

            return res.send(data);
        }

        const result = await prisma.player.findUnique({
            where: {
                uuid,
            },
            select: {
                PitDefensiveStats: true,
                PitFarmingStats: true,
                PitMiscellaneousStats: true,
                PitOffensiveStats: true,
                PitPerformanceStats: true,
                PitPerksAndMysticStats: true,
                PitPrestigeStats: true,
            },
        });

        if (!result) {
            return createError(res, 404, "Player not found.");
        }

        return res.send(result);
    }
);

interface UpdateStatsBody {
    type: string;
    data: unknown;
}

router.put(
    "/:uuid",
    adminApiKeyAuth,
    async ({ body, params: { uuid } }, res) => {
        try {
            const { data, type } = body as UpdateStatsBody;

            const result = await types[type.toLowerCase()].update({
                where: {
                    playerUuid: uuid,
                },
                data,
            });

            return res.send(result);
        } catch (err) {
            return createError(
                res,
                409,
                "Incorrect JSON body. Please refer to the documentation for the proper JSON body for this route."
            );
        }
    }
);

export const thePitRoutes = router;
