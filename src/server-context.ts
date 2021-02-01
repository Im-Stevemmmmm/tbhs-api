import { Request, Response } from "express";
import { Client } from "pg";

export type ServerContext = {
    req: Request;
    res: Response;
    client: Client;
    userRole?: "generic" | "admin";
};
