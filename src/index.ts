import { ApolloServer } from "apollo-server-express";
import "dotenv/config";
import express from "express";
import { makeSchema } from "nexus";
import path from "path";
import { Client } from "pg";
import { PitStatsObject } from "./models/PitStats";
import { GameStatsObject } from "./models/GameStats";
import { PlayerObject } from "./models/Player";
import { ServerContext } from "./server-context";

const main = async () => {
    const client = new Client({
        connectionString: process.env.DATABASE_URL,
    });

    await client.connect();

    const app = express();

    const apolloServer = new ApolloServer({
        schema: makeSchema({
            types: [PlayerObject, GameStatsObject, PitStatsObject],
            outputs: {
                schema: path.join(__dirname, "../src/generated/schema.graphql"),
                typegen: path.join(__dirname, "../src/generated/nexus.ts"),
            },
        }),
        context: ({ req, res }): ServerContext => ({ req, res, client }),
    });

    apolloServer.applyMiddleware({ app });

    app.listen(4000, () =>
        console.log("GraphQL server started at http://localhost:4000/graphql")
    );
};

main();
