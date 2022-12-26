import mongoose, { Schema } from "mongoose";

const overallStatSchema = new Schema(
  {
    totalCustomers: String,
    yearlySalesTotal: Number,
    yearlyTotalSoldUnits: Number,
    year: Number,
    monthlyData: [
      {
        month: String,
        totalSales: Number,
        totalUnits: Number,
      },
    ],
    dailyData: [
      {
        date: String,
        totalSales: Number,
        totalUnits: Number,
      },
    ],
    salesByCategory: {
      type: Map,
      of: Number,
    },
  },
  {
    timestamps: true,
  }
);

export const OverallStat = mongoose.model("OverallStat", overallStatSchema);
