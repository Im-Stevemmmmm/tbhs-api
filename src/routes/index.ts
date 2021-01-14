import { Router } from "express";
import { gameDataRoutes } from "./game-data";
import { playerRoutes } from "./players";

const router = Router();

router.use("/players", playerRoutes);
router.use("/game-data", gameDataRoutes);

export const masterRouter = router;
