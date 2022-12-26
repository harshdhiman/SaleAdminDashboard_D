import { Box, useTheme } from "@mui/material";
import React from "react";
import { Header } from "../../components/header";
import { DataGrid, GridColumns } from "@mui/x-data-grid";
import { useGetCustomersQuery } from "../../state/api";
import { User } from "../../models/User";

export const Customers = () => {
  const theme = useTheme();
  const customers = useGetCustomersQuery();

  const columns: GridColumns<User> = [
    {
      field: "_id",
      headerName: "ID",
      flex: 1,
    },
    {
      field: "name",
      headerName: "Name",
      flex: 0.5,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "phoneNumber",
      headerName: "Phone Number",
      flex: 0.5,
      renderCell: (params) => {
        return params.value.replace(/^(\d{3})(\d{3})(\d{4})/, "($1)$2-$3");
      },
    },
    {
      field: "country",
      headerName: "Country",
      flex: 0.4,
    },
    {
      field: "occupation",
      headerName: "Occupation",
      flex: 1,
    },
    {
      field: "role",
      headerName: "Role",
      flex: 0.5,
    },
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="CUSTOMERS" subtitle="List of Customers" />
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
          rows={customers.data ?? []}
          columns={columns}
          getRowId={(row) => row._id}
          loading={customers.isLoading || !customers.data}
        />
      </Box>
    </Box>
  );
};
