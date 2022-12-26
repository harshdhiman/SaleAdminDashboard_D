import { Request, Response } from "express";
import { OverallStat } from "../models/OverallStat";

export const getOverallStats = async (req: Request, res: Response) => {
  try {
    const overallStats = await OverallStat.find();

    return res.status(200).json({ overallStats: overallStats[0] });
  } catch (error) {
    const { message } = error as Error;
    return res.status(500).json({ error: message });
  }
};
