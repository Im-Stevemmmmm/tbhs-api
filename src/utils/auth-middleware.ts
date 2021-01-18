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
    key: string,
    delegate: any
): Promise<ApiKeyCheckResult> => {
    if (!key) {
        return {
            successful: false,
            errorObject: {
                error: 409,
                message: "No API key provided.",
            },
        };
    }

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

const getKey = ({
    query: { key },
    headers: { "x-api-key": apiKeyHeader },
}: Request) => {
    const inKey = key ? key : apiKeyHeader;

    return Array.isArray(inKey) ? (inKey[0] as string) : (inKey as string);
};

export const apiKeyAuth = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const key = getKey(req);

    const { successful: genericSuccess } = await apiKeyCheck(
        key,
        prisma.genericApiKey
    );

    if (!genericSuccess) {
        const { successful, errorObject } = await apiKeyCheck(
            key,
            prisma.adminApiKey
        );

        if (!successful) {
            return res.status(errorObject.error).send(errorObject);
        }
    }

    next();
};

export const adminApiKeyAuth = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const key = getKey(req);

    const { successful } = await apiKeyCheck(key, prisma.adminApiKey);

    if (!successful) {
        return createError(res, 403, "Unauthorized action.");
    }

    next();
};
