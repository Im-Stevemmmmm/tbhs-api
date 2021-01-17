import { Response } from "express";

export const createError = (res: Response, code: number, err: string) =>
    res.status(code).send({
        error: code,
        message: err,
    });
