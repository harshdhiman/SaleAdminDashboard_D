import { Request, Response } from "express";
import { SortOrder } from "mongoose";
import { Product } from "../models/Product";
import { ProductStat } from "../models/ProductStat";
import { Transaction } from "../models/Transaction";
import { User } from "../models/User";
import { countryToAlpha3 } from "country-to-iso";

export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.find();
    const productStats = await ProductStat.find();

    const productsWithStat = products.map((product) => {
      const productStat = productStats.find(
        (stat) => stat.productId === product._id.toString()
      );
      return {
        ...product.toJSON(),
        stats: productStat,
      };
    });

    return res.status(200).json({ products: productsWithStat });
  } catch (error) {
    const { message } = error as Error;
    return res.status(500).json({ error: message });
  }
};

export const getCustomers = async (req: Request, res: Response) => {
  try {
    const customers = await User.find({
      role: "user",
    }).select("-password");

    return res.status(200).json({ customers });
  } catch (error) {
    const { message } = error as Error;
    return res.status(500).json({ error: message });
  }
};

//
//
//

export const getTransactions = async (req: Request, res: Response) => {
  try {
    const {
      _page = "1",
      _pageSize = "20",
      _sort = null,
      search = "",
    } = req.query;

    const page = parseInt(_page as string);
    const pageSize = parseInt(_pageSize as string);

    const sort: { feild: string; sort: "asc" | "desc" } | null =
      _sort == null ? null : JSON.parse(_sort as string);
    const mongoSort: { [key: string]: SortOrder } = (() => {
      if (sort == null) return {};
      return { [sort.feild]: sort.sort === "asc" ? 1 : -1 };
    })();

    //

    const transactions = await Transaction.find({
      $or: [
        {
          userId: {
            $regex: new RegExp(search as string, "i"),
          },
          cost: {
            $regex: new RegExp(search as string, "i"),
          },
        },
      ],
    })
      .sort(mongoSort)
      .skip(page * pageSize)
      .limit(pageSize);

    const total = await Transaction.countDocuments({
      name: { $regex: search as string, $options: "i" },
    });

    return res.status(200).json({ transactions, total });

    //
  } catch (error) {
    const { message } = error as Error;
    return res.status(500).json({ error: message });
  }
};

//
//
//

export const getGeography = async (req: Request, res: Response) => {
  try {
    const users = await User.find({ role: "user" }).select("country");

    const countries = users.reduce((acc, user) => {
      const country = countryToAlpha3(user.country ?? "unknown");

      const index = acc.findIndex((item) => item.id === country);
      if (index === -1) {
        acc.push({
          id: country ?? "unknown",
          value: 1,
        });
      } else {
        acc[index].value += 1;
      }
      return acc;
    }, [] as { id: string; value: number }[]);

    return res.status(200).json({ geography: countries });
  } catch (error) {
    const { message } = error as Error;
    return res.status(500).json({ error: message });
  }
};
