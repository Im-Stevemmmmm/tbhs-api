import { Prisma } from "@prisma/client";
import { isUUID } from "class-validator";
import { Router } from "express";
import { prisma } from "../../../context";
import { adminApiKeyAuth, apiKeyAuth } from "../../../utils/auth-middleware";
import { camelCaseKeys } from "../../../utils/camel-case-keys";
import { createError } from "../../../utils/error";
import { formatPitResponse } from "../../../utils/the-pit/format-response";

const router = Router();

interface Types {
    [x: string]: { key: keyof Prisma.PlayerSelect; delegate: any };
}

const types: Types = {
    offensive: { key: "PitOffensiveStats", delegate: prisma.pitOffensiveStats },
    defensive: { key: "PitDefensiveStats", delegate: prisma.pitDefensiveStats },
    farming: { key: "PitFarmingStats", delegate: prisma.pitFarmingStats },
    miscellaneous: {
        key: "PitMiscellaneousStats",
        delegate: prisma.pitMiscellaneousStats,
    },
    performance: {
        key: "PitPerformanceStats",
        delegate: prisma.pitPerformanceStats,
    },
    prestige: { key: "PitPrestigeStats", delegate: prisma.pitPrestigeStats },
    "perks-and-mystics": {
        key: "PitPerksAndMysticStats",
        delegate: prisma.pitPerksAndMysticStats,
    },
};

const getAvailabieStats = () => {
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

            if (typeArr.some(t => !types[t.toLowerCase()])) {
                return createError(
                    res,
                    409,
                    `Type must be ${getAvailabieStats()}.`
                );
            }

            const selectionObject: Prisma.PlayerSelect = {};

            typeArr.forEach(t => {
                const casedKey = t.toLowerCase();
                const key = types[casedKey].key as string;

                selectionObject[key] = true;
            });

            const data = await prisma.player.findUnique({
                where: {
                    uuid,
                },
                select: selectionObject,
            });

            return res.send(formatPitResponse(data));
        }

        const selectionObject: Prisma.PlayerSelect = {};

        Object.keys(types).forEach(
            k => (selectionObject[types[k].key as string] = true)
        );

        const data = await prisma.player.findUnique({
            where: {
                uuid,
            },
            select: selectionObject,
        });

        if (!data) {
            return createError(res, 404, "Player not found.");
        }

        return res.send(formatPitResponse(data));
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

            const result = await types[type.toLowerCase()].delegate.update({
                where: {
                    playerUuid: uuid,
                },
                data,
            });

            return res.send(formatPitResponse(result));
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
