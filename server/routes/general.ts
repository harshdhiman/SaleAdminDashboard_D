import { Router } from "express";
import { getDashboardStats, getUser } from "../controllers/general";

export const generalRoutes = Router();

generalRoutes.get("/user/:id", getUser);
generalRoutes.get("/dashboard", getDashboardStats);
