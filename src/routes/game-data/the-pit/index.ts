import { Prisma } from "@prisma/client";
import { Router } from "express";
import { prisma } from "../../../prisma";
import { capitilize } from "../../../utils/capitilize";
import { pitStatsRoutes } from "./stats";

const router = Router();

router.get("/:uuid", async ({ query: { stats }, params: { uuid } }, res) => {
    if (stats) {
        const select: Prisma.PlayerSelect = {};
        const fieldArray = [].concat(stats as string[]);

        fieldArray.forEach(s => (select[`Pit${capitilize(s)}Stats`] = true));

        const result = await prisma.player.findFirst({ select });

        res.send(result);
    } else {
        const {
            uuid: queriedUuid,
            rank,
            ...rest
        } = await prisma.player.findUnique({
            where: {
                uuid,
            },
            include: {
                PitDefensiveStats: true,
                PitFarmingStats: true,
                PitMiscellaneousStats: true,
                PitOffensiveStats: true,
                PitPerformanceStats: true,
                PitPerksAndMysticStats: true,
                PitPrestigeStats: true,
            },
        });

        res.send(rest);
    }
});

router.use(pitStatsRoutes);

export const thePitRoutes = router;
