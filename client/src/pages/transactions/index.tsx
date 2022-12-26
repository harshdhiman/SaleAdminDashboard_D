import { Box, useTheme } from "@mui/material";
import { DataGrid, GridColumns } from "@mui/x-data-grid";
import React, { useState } from "react";
import { DatagridToolbar } from "../../components/datagrid-toolbar";
import { Header } from "../../components/header";
import { Transaction, TransactionSort } from "../../models/Transaction";
import { useGetTransactionsQuery } from "../../state/api";

export const Transactions = () => {
  const theme = useTheme();

  // params
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [sort, setSort] = useState<TransactionSort | null>(null);
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");

  const transactions = useGetTransactionsQuery({
    page,
    pageSize,
    sort,
    search,
  });

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
      <Header title="TRANSACTIONS" subtitle="List of Transactions" />
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
        <DataGrid<Transaction>
          rows={transactions.data?.transactions ?? []}
          columns={columns}
          getRowId={(row) => row._id}
          loading={transactions.isLoading || !transactions.data}
          page={page}
          pageSize={pageSize}
          rowCount={transactions.data?.total ?? 0}
          onPageChange={(page) => setPage(page)}
          onPageSizeChange={(pageSize) => setPageSize(pageSize)}
          pagination
          paginationMode="server"
          sortingMode="server"
          rowsPerPageOptions={[10, 20, 50]}
          onSortModelChange={(sortModel) => {
            if (sortModel.length > 0) {
              setSort({
                feild: sortModel[0].field,
                sort: sortModel[0].sort as "asc" | "desc",
              });
            } else {
              setSort(null);
            }
          }}
          components={{
            Toolbar: DatagridToolbar,
          }}
          componentsProps={{
            toolbar: {
              searchInput,
              setSearchInput,
              setSearch,
            },
          }}
        />
      </Box>
    </Box>
  );
};
