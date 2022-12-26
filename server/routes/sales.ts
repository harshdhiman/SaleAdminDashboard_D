import { Router } from "express";
import { getOverallStats } from "../controllers/sales";

export const salesRoutes = Router();

salesRoutes.get("/overallStats", getOverallStats);
