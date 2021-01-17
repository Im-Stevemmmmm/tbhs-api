import argon from "argon2";
import { Request, Response, Router } from "express";
import uuidApiKey from "uuid-apikey";
import { prisma } from "../prisma";
import { adminAuth } from "../utils/auth-middleware";

const router = Router();

router.post("/api-key", adminAuth, async ({ body }: Request, res: Response) => {
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
