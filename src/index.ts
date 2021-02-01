import { ApolloServer } from "apollo-server-express";
import express from "express";
import "dotenv/config";
import { makeSchema } from "nexus";
import { PlayerObject } from "./models/Player";
import { ServerContext } from "./server-context";
import { Client } from "pg";
import path from "path";

const client = new Client({
    connectionString: process.env.DATABASE_URL,
});

const main = async () => {
    await client.connect();

    const app = express();

    const apolloServer = new ApolloServer({
        schema: makeSchema({
            types: [PlayerObject],
            outputs: {
                schema: path.join(__dirname, "../src/generated/schema.graphql"),
                typegen: path.join(__dirname, "../src/generated/nexus.ts"),
            },
        }),
        context: ({ req, res }): ServerContext => ({ req, res, client }),
    });

    apolloServer.applyMiddleware({ app });

    app.listen(4000, () =>
        console.log("graphql started at http://localhost:4000/graphql")
    );
};

main();
