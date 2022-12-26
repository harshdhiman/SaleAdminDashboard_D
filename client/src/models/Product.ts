import { MongoObject } from "./Mongo-Object";

export interface ProductStat extends MongoObject {
  productId: string;
  yearlySalesTotal: number;
  yearlyTotalSoldUnits: number;
  year: number;
  monthlyData: {
    month: string;
    totalSales: number;
    totalUnits: number;
  }[];
  dailyData: {
    date: string;
    totalSales: number;
    totalUnits: number;
  }[];
}

export interface Product extends MongoObject {
  name: string;
  price: number;
  description: string;
  category: string;
  rating: number;
  supply: number;
  stats: ProductStat;
}
