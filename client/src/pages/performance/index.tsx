import { Box, useTheme } from "@mui/material";
import { DataGrid, GridColumns } from "@mui/x-data-grid";
import React from "react";
import { DatagridColumnMenu } from "../../components/datagrid-column-menu";
import { Header } from "../../components/header";
import { Transaction } from "../../models/Transaction";
import { User } from "../../models/User";
import { useGetPerformanceQuery } from "../../state/api";
import { useAppSelector } from "../../store";

export const PerformancePage = () => {
  const theme = useTheme();

  const userId = useAppSelector((s) => s.global.userId);
  const performanceData = useGetPerformanceQuery(userId);

  const columns: GridColumns<Transaction> = [
    {
      field: "_id",
      headerName: "ID",
      flex: 1,
    },
    {
      field: "userId",
      headerName: "User ID",
      flex: 1,
    },
    {
      field: "createdAt",
      headerName: "CreatedAt",
      flex: 1,
    },
    {
      field: "products",
      headerName: "# of Products",
      flex: 0.5,
      sortable: false,
      renderCell: (params) => params.value.length,
    },
    {
      field: "cost",
      headerName: "Cost",
      flex: 1,
      renderCell: (params) => `$${Number(params.value).toFixed(2)}`,
    },
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="PERFORMANCE" subtitle="Track your Performance" />
      <Box
        mt="40px"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: theme.palette.background.paper,
            color: (theme.palette.secondary as any)[100],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: theme.palette.primary.light,
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: theme.palette.background.paper,
            color: (theme.palette.secondary as any)[100],
            borderTop: "none",
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${(theme.palette.secondary as any)[200]} !important`,
          },
        }}
      >
        <DataGrid
          rows={performanceData.data?.transactions ?? []}
          columns={columns}
          getRowId={(row) => row._id}
          loading={performanceData.isLoading || !performanceData.data}
          components={{
            ColumnMenu: DatagridColumnMenu,
          }}
        />
      </Box>
    </Box>
  );
};
