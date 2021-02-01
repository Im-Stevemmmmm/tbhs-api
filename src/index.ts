import { ApolloServer } from "apollo-server-express";
import argon from "argon2";
import { isUUID } from "class-validator";
import "dotenv/config";
import express from "express";
import { applyMiddleware } from "graphql-middleware";
import { and, shield } from "graphql-shield";
import { makeSchema } from "nexus";
import path from "path";
import { Client } from "pg";
import uuidApiKey from "uuid-apikey";
import { isAdminAuthenticated, isAuthenticated } from "./authentication-rules";
import { GameStatsObject } from "./models/GameStats";
import { PitStatsObject } from "./models/PitStats";
import { PlayerObject } from "./models/Player";
import { ServerContext } from "./server-context";

const main = async () => {
    const client = new Client({
        connectionString: process.env.DATABASE_URL,
    });

    await client.connect();

    const app = express();

    const schema = makeSchema({
        types: [PlayerObject, GameStatsObject, PitStatsObject],
        outputs: {
            schema: path.join(__dirname, "../src/generated/schema.graphql"),
            typegen: path.join(__dirname, "../src/generated/nexus.ts"),
        },
        contextType: {
            module: path.join(__dirname, "../src/server-context.ts"),
            export: "ServerContext",
        },
    });

    const apolloServer = new ApolloServer({
        schema: applyMiddleware(
            schema,
            shield({
                Query: isAuthenticated,
                Mutation: isAdminAuthenticated,
            })
        ),
        context: async ({ req, res }): Promise<ServerContext> => {
            const ctx = { req, res, client };

            const apiKeyHeader = req.headers["x-api-key"] as string;

            if (!apiKeyHeader) {
                return ctx;
            }

            const apiKey = apiKeyHeader.split(" ")[1];

            let uuid: string;

            try {
                uuid = uuidApiKey.toUUID(apiKey);

                if (!isUUID(uuid)) {
                    return ctx;
                }
            } catch (err) {
                return ctx;
            }

            const checkKey = async (table: "Generic" | "Admin") => {
                const result = await client.query<{ key: string }>(
                    `SELECT key FROM public."${table}ApiKey" WHERE uuid = $1`,
                    [uuid]
                );

                const row = result.rows[0];

                if (!row) {
                    return false;
                }

                return argon.verify(row.key, apiKey);
            };

            const genericKeyCheck = await checkKey("Generic");

            if (!genericKeyCheck) {
                const adminKeyCheck = await checkKey("Admin");

                return {
                    ...ctx,
                    userRole: adminKeyCheck ? "admin" : undefined,
                };
            }

            return { ...ctx, userRole: "generic" };
        },
    });

    apolloServer.applyMiddleware({ app });

    app.listen(4000, () =>
        console.log("GraphQL server started at http://localhost:4000/graphql")
    );
};

main();
