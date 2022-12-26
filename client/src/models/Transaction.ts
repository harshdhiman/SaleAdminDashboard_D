import { MongoObject } from "./Mongo-Object";

export interface Transaction extends MongoObject {
  userId: string;
  cost: string;
  products: string[];
}

export type TransactionSort = {
  feild: string;
  sort: "asc" | "desc";
};

export type TransactionQueryParams = {
  page: number;
  pageSize: number;
  sort: TransactionSort | null;
  search: string;
};

export type TransactionQueryResult = {
  transactions: Transaction[];
  total: number;
};
