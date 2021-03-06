import argon from "argon2";
import { NextFunction, Request, Response } from "express";
import uuidApiKey from "uuid-apikey";
import { prisma } from "../context";
import { createError } from "./error";

interface ApiKeyCheckResult {
    successful: boolean;
    errorObject?: {
        error: number;
        message: string;
    };
}

const apiKeyCheck = async (
    qKey: unknown,
    delegate: any
): Promise<ApiKeyCheckResult> => {
    if (!qKey) {
        return {
            successful: false,
            errorObject: {
                error: 409,
                message: "No API key provided.",
            },
        };
    }

    const key = qKey as string;
    const keyUuid = uuidApiKey.toUUID(key);

    const keyResult = await delegate.findUnique({
        where: {
            uuid: keyUuid,
        },
        select: {
            key: true,
        },
    });

    if (!keyResult) {
        return {
            successful: false,
            errorObject: {
                error: 409,
                message: "API key not found.",
            },
        };
    }

    const isApiKey = await argon.verify(keyResult.key, key);

    if (!isApiKey) {
        return {
            successful: false,
            errorObject: {
                error: 404,
                message: "API key not found.",
            },
        };
    }

    return {
        successful: true,
    };
};

export const apiKeyAuth = async (
    { query: { key: qKey } }: Request,
    res: Response,
    next: NextFunction
) => {
    const { successful: genericSuccess } = await apiKeyCheck(
        qKey,
        prisma.genericApiKey
    );

    if (!genericSuccess) {
        const { successful, errorObject } = await apiKeyCheck(
            qKey,
            prisma.adminApiKey
        );

        if (!successful) {
            return res.status(errorObject.error).send(errorObject);
        }
    }

    next();
};

export const adminApiKeyAuth = async (
    { query: { key: qKey } }: Request,
    res: Response,
    next: NextFunction
) => {
    const { successful } = await apiKeyCheck(qKey, prisma.adminApiKey);

    if (!successful) {
        return createError(res, 403, "Unauthorized action.");
    }

    next();
};
