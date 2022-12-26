import { Transaction } from "./Transaction";

export interface DashboardStat {
  totalCustomers: number;
  yearlyTotalSoldUnits: number;
  yearlySalesTotal: number;
  monthlyData: {
    month: string;
    totalSoldUnits: number;
    salesTotal: number;
  }[];
  salesByCategory: { [key in string]: number };
  thisMonthStats: {
    month: string;
    totalSoldUnits: number;
    salesTotal: number;
  };
  thisDayStats: {
    date: string;
    totalSoldUnits: number;
    salesTotal: number;
  };
  transactions: Transaction[];
}
