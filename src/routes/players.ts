import { Router } from "express";
import { prisma } from "../prisma";

const router = Router();

router.get("/", async (_, res) => {
    const players = await prisma.player.findMany();

    res.send(players);
});

router.get("/:uuid", async ({ params: { uuid } }, res) => {
    const player = await prisma.player.findUnique({
        where: {
            uuid,
        },
    });

    if (!player) {
        res.status(404).send({
            error: "404",
            message: "Player not found.",
        });

        return;
    }

    res.send(player);
});

export const playerRoutes = router;
