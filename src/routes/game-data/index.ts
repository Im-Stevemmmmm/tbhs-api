import { Router } from "express";
import { thePitRoutes } from "./the-pit";

const router = Router();

router.use("/the-pit", thePitRoutes);

export const gameDataRoutes = router;
