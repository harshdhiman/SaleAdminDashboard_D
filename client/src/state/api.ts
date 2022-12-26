import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { DashboardStat } from "../models/DashboardStat";
import { Geography } from "../models/Geography";
import { OverallStat } from "../models/OverallStats";
import { PerformanceResult } from "../models/Performace";
import { Product } from "../models/Product";
import {
  TransactionQueryParams,
  TransactionQueryResult,
} from "../models/Transaction";
import { User } from "../models/User";

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_APP_BASE_URL }),
  reducerPath: "adminAPI",
  tagTypes: [
    "User",
    "Products",
    "Customers",
    "Transactions",
    "Geography",
    "Sales",
    "Admins",
    "Performance",
    "Dashboard",
  ],
  endpoints: (builder) => {
    return {
      getUser: builder.query<User, string>({
        query: (id: string) => `general/user/${id}`,
        providesTags: ["User"],
        transformResponse: (response: any) => {
          return response.user as User;
        },
      }),
      getProducts: builder.query<Product[], void>({
        query: () => `client/products`,
        providesTags: ["Products"],
        transformResponse: (response: any) => {
          return response.products as Product[];
        },
      }),
      getCustomers: builder.query<User[], void>({
        query: () => `client/customers`,
        providesTags: ["Customers"],
        transformResponse: (response: any) => {
          return response.customers as User[];
        },
      }),
      getTransactions: builder.query<
        TransactionQueryResult,
        TransactionQueryParams
      >({
        query: (transactionParams) => {
          return {
            url: `client/transactions`,
            params: {
              _page: transactionParams.page,
              _pageSize: transactionParams.pageSize,
              _sort: JSON.stringify(transactionParams.sort),
              search: transactionParams.search,
            },
            method: "GET",
          };
        },
        providesTags: ["Transactions"],
      }),
      getGeography: builder.query<Geography[], void>({
        query: () => `client/geography`,
        providesTags: ["Geography"],
        transformResponse: (response: any) => {
          return response.geography as Geography[];
        },
      }),
      getOverallStats: builder.query<OverallStat, void>({
        query: () => `sales/overallStats`,
        transformResponse: (response: any) => {
          return response.overallStats as OverallStat;
        },
        providesTags: ["Sales"],
      }),
      getAdmins: builder.query<User[], void>({
        query: () => `management/admins`,
        transformResponse: (response: any) => {
          return response.admins as User[];
        },
        providesTags: ["Admins"],
      }),
      getPerformance: builder.query<PerformanceResult, string>({
        query: (id: string) => `management/performance/${id}`,
        transformResponse: (response: any) => {
          return response as PerformanceResult;
        },
        providesTags: ["Performance"],
      }),
      getDashboardStats: builder.query<DashboardStat, void>({
        query: () => `general/dashboard`,
        transformResponse: (response: any) => {
          return response as DashboardStat;
        },
        providesTags: ["Dashboard"],
      }),
    };
  },
});

export const {
  useGetUserQuery,
  useGetProductsQuery,
  useGetCustomersQuery,
  useGetTransactionsQuery,
  useGetGeographyQuery,
  useGetOverallStatsQuery,
  useGetAdminsQuery,
  useGetPerformanceQuery,
  useGetDashboardStatsQuery,
} = api;
