import { Request, Response } from "express";
import { InferSchemaType, Types } from "mongoose";
import { AffiliateStat, AffiliateStatType } from "../models/AffiliateStat";
import { Transaction } from "../models/Transaction";
import { User, UserType } from "../models/User";

export const getAdmins = async (req: Request, res: Response) => {
  try {
    const admins = await User.find({ role: "admin" }).select("-password");
    res.status(200).json({ admins });
  } catch (error) {
    const { message } = error as Error;
    res.status(500).json({ error: message });
  }
};

export const getUserPerformance = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    //

    type UserWithStats = UserType & {
      affiliateStats: AffiliateStatType;
    };
    const userWithStats = await User.aggregate([
      {
        $match: {
          _id: new Types.ObjectId(id),
        },
      },
      {
        $lookup: {
          from: "affiliatestats",
          localField: "_id",
          foreignField: "userId",
          as: "affiliateStats",
        },
      },
      {
        $unwind: {
          path: "$affiliateStats",
        },
      },
    ]);

    const transactions = await Promise.all(
      (userWithStats[0] as UserWithStats).affiliateStats.affiliateSales.map(
        (id) => {
          return Transaction.findById(id);
        }
      )
    );

    const filteredTransactions = transactions.filter(
      (transaction) => transaction !== null
    );

    res
      .status(200)
      .json({ user: userWithStats[0], transactions: filteredTransactions });

    //
  } catch (error) {
    const { message } = error as Error;
    res.status(500).json({ error: message });
  }
};
