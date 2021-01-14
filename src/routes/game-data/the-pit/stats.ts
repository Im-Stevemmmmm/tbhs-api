import { Router } from "express";
import { prisma } from "../../../prisma";

const router = Router();

const statsRoute = (name: string, router: Router, delegate: any) => {
    const route = `/:uuid/${name}`;

    router.get(route, async ({ params: { uuid } }, res) => {
        const result = await delegate.findUnique({
            where: {
                playerUuid: uuid,
            },
        });

        result
            ? res.send(result)
            : res.status(404).send({
                  error: "404",
                  message: "Player data not found.",
              });
    });

    router.put(route, async ({ body, params: { uuid } }, res) => {
        try {
            const result = await delegate.update({
                where: {
                    playerUuid: uuid,
                },
                data: body,
            });

            res.send(result);
        } catch (err) {
            res.status(409).send({
                error: "409",
                message:
                    "Incorrect JSON body. Please refer to the documentation for the proper JSON body for this route.",
            });
        }
    });
};

statsRoute("offensive", router, prisma.pitOffensiveStats);
statsRoute("defensive", router, prisma.pitDefensiveStats);
statsRoute("farming", router, prisma.pitFarmingStats);
statsRoute("prestige", router, prisma.pitPrestigeStats);
statsRoute("miscellaneous", router, prisma.pitMiscellaneousStats);
statsRoute("performance", router, prisma.pitPerformanceStats);
statsRoute("perks-and-mystics", router, prisma.pitPerksAndMysticStats);

export const pitStatsRoutes = router;
