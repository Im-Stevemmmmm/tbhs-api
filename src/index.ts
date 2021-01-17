import express from "express";
import { prisma } from "./prisma";
import { masterRouter } from "./routes";
import { privateRoutes } from "./routes/private";

const main = async () => {
    const app = express();

    app.use(express.json());

    app.use("/", privateRoutes);
    app.use("/api/v1", masterRouter);

    app.listen(4000, () => console.log("Started on http://localhost:4000"));
};

main()
    .finally(() => prisma.$disconnect())
    .catch(err => console.log(err));
