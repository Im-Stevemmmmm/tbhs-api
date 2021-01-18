import express from "express";
import { prisma } from "./context";
import { masterRouter } from "./routes";
import { privateRoutes } from "./routes/private";
import { adminApiKeyAuth, apiKeyAuth } from "./utils/auth-middleware";

const main = async () => {
    const app = express();

    app.use(express.json());

    app.use("/private", [adminApiKeyAuth, privateRoutes]);
    app.use("/api/v1", [apiKeyAuth, masterRouter]);

    app.listen(4000, () => console.log("Started on http://localhost:4000"));
};

main()
    .finally(() => prisma.$disconnect())
    .catch(err => console.log(err));
