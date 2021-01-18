import argon from "argon2";
import { Router } from "express";
import uuidApiKey from "uuid-apikey";
import { prisma } from "../context";

const router = Router();

router.post("/api-key", async ({ body }, res) => {
    const { uuid } = body;
    const { apiKey, uuid: keyUuid } = uuidApiKey.create();

    if (!uuid) {
        return res.status(404).send({
            error: 404,
            message: "UUID not found.",
        });
    }

    const keyCheck = await prisma.genericApiKey.findUnique({
        where: {
            playerUuid: uuid,
        },
    });

    const hashedKey = await argon.hash(apiKey);

    if (keyCheck) {
        await prisma.genericApiKey.update({
            where: {
                playerUuid: uuid,
            },
            data: {
                key: hashedKey,
                uuid: keyUuid,
            },
            select: {
                key: true,
            },
        });
    } else {
        await prisma.genericApiKey.create({
            data: {
                Player: {
                    connect: {
                        uuid,
                    },
                },
                key: hashedKey,
                uuid: keyUuid,
            },
            select: {
                key: true,
            },
        });
    }

    return res.send({
        key: apiKey,
    });
});

export const privateRoutes = router;
