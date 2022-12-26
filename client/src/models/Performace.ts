import { MongoObject } from "./Mongo-Object";
import { Transaction } from "./Transaction";
import { User } from "./User";

export interface AffiliateStat extends MongoObject {
  userId: string;
  affiliateSales: string[];
}

export interface UserWithAffiliateStat extends User {
  affiliateStats: AffiliateStat;
}

export interface PerformanceResult {
  user: UserWithAffiliateStat;
  transactions: Transaction[];
}
