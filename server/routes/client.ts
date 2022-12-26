import { Router } from "express";
import {
  getCustomers,
  getGeography,
  getProducts,
  getTransactions,
} from "../controllers/client";

export const clientRoutes = Router();

clientRoutes.get("/products", getProducts);
clientRoutes.get("/customers", getCustomers);
clientRoutes.get("/transactions", getTransactions);
clientRoutes.get("/geography", getGeography);
