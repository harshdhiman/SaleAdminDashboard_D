import { Router } from "express";
import { getAdmins, getUserPerformance } from "../controllers/management";

export const managementRoutes = Router();

managementRoutes.get("/admins", getAdmins);
managementRoutes.get("/performance/:id", getUserPerformance);
