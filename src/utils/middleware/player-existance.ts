import { NextFunction, Request, Response } from "express";
import { prisma } from "../../context";
import { createError } from "../error";

export const checkPlayerExistance = async (
    { params: { uuid } }: Request,
    res: Response,
    next: NextFunction
) => {
    const player = await prisma.player.findUnique({
        where: {
            uuid,
        },
    });

    if (!player) {
        return createError(res, 404, "Player not found.");
    }

    return next();
};
