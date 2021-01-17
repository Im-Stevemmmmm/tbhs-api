import { Response } from "express";
import { createError } from "./error";

export const verifyQuery = (
    res: Response,
    query: unknown,
    parsedQuery: unknown,
    err: string
) => {
    if (query && parsedQuery === undefined) {
        createError(res, 400, err);

        return false;
    }

    return true;
};
