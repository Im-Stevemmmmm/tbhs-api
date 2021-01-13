import { Router } from "express";
import { playerRoutes } from "./players";

const router = Router();

router.use("/players", playerRoutes);

export const masterRouter = router;
