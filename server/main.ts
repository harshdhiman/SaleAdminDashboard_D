import express, { Express } from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import bodyParser from "body-parser";
import cors from "cors";
import { generalRoutes } from "./routes/general";
import { clientRoutes } from "./routes/client";
import { managementRoutes } from "./routes/management";
import { salesRoutes } from "./routes/sales";
import mongoose from "mongoose";
import { Transaction } from "./models/Transaction";
import {
  dataAffiliateStat,
  dataOverallStat,
  dataProduct,
  dataProductStat,
  dataTransaction,
  dataUser,
} from "./data";
import { OverallStat } from "./models/OverallStat";
import { AffiliateStat } from "./models/AffiliateStat";
import { User } from "./models/User";
import { Product } from "./models/Product";
import { ProductStat } from "./models/ProductStat";

dotenv.config();
const PORT = process.env.PORT || 5001;

const app: Express = express();

// Middleware
app.use(express.json());

// Helmet (Security)
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

// Morgan (Logging)
app.use(morgan("common"));

// Body Parser (Parsing)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// CORS (Cross-Origin Resource Sharing) - Allows us to make requests from a different domain
app.use(cors());

// Routes
app.use("/general", generalRoutes);
app.use("/client", clientRoutes);
app.use("/management", managementRoutes);
app.use("/sales", salesRoutes);

// MongoDB Connection
async function init() {
  try {
    await mongoose.connect(process.env.MONGO_URL!, {
      dbName: "saleAdminDashboard",
    });

    // Start Server
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.log("Error connecting to MongoDB", error);
  }
}
init();

async function insertMockData() {
  try {
    await Transaction.insertMany(dataTransaction);
    await OverallStat.insertMany(dataOverallStat);
    await AffiliateStat.insertMany(dataAffiliateStat);
    await User.insertMany(dataUser);
    await Product.insertMany(dataProduct);
    await ProductStat.insertMany(dataProductStat);
  } catch (error) {
    console.log("Error inserting mock data", error);
  }
}
