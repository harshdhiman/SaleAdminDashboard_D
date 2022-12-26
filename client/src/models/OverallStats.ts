import { MongoObject } from "./Mongo-Object";

export interface OverallStat extends MongoObject {
  totalCustomers: string;
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
  salesByCategory: { [key: string]: number };
}
