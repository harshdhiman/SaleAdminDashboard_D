import e, { Request, Response } from "express";
import { OverallStat } from "../models/OverallStat";
import { Transaction } from "../models/Transaction";
import { User } from "../models/User";

export const getUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ user });

    //
  } catch (error) {
    const { message } = error as Error;
    res.status(500).json({ error: message });
  }
};

//
//
//

export const getDashboardStats = async (req: Request, res: Response) => {
  try {
    //

    const currentMonth = "November";
    const currentYear = 2021;
    const currentDay = "2021-11-15";

    const transactions = await Transaction.find()
      .limit(50)
      .sort({ createdOn: -1 });

    const overallStat = await OverallStat.find({ year: currentYear });

    const {
      totalCustomers,
      yearlyTotalSoldUnits,
      yearlySalesTotal,
      monthlyData,
      salesByCategory,
    } = overallStat[0];
    const thisMonthStats = overallStat[0].monthlyData.find(({ month }) => {
      return month === currentMonth;
    });
    const thisDayStats = overallStat[0].dailyData.find(({ date }) => {
      return date === currentDay;
    });

    return res.status(200).json({
      totalCustomers,
      yearlyTotalSoldUnits,
      yearlySalesTotal,
      monthlyData,
      salesByCategory,
      thisMonthStats,
      thisDayStats,
      transactions,
    });

    //
  } catch (error) {
    const { message } = error as Error;
    res.status(500).json({ error: message });
  }
};
