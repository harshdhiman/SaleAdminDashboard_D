import {
  DownloadOutlined,
  Email,
  PersonAdd,
  PointOfSale,
  Traffic,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { DataGrid, GridColumns } from "@mui/x-data-grid";
import React from "react";
import { BreakdownChart } from "../../components/breakdown-chart";
import { FlexBetween } from "../../components/flex-between";
import { Header } from "../../components/header";
import { OverviewChart } from "../../components/overview-chart";
import { StatBox } from "../../components/stat-box";
import { Transaction } from "../../models/Transaction";
import { useGetDashboardStatsQuery } from "../../state/api";

export const Dashboard = () => {
  const theme = useTheme();
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
  const dashboardStat = useGetDashboardStatsQuery();

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
      <FlexBetween>
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />

        <Box>
          <Button
            sx={{
              backgroundColor: theme.palette.secondary.light,
              color: theme.palette.background.paper,
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            <DownloadOutlined sx={{ mr: "10px" }} />
            Download Reports
          </Button>
        </Box>
      </FlexBetween>

      {/*  */}

      <Box
        display="grid"
        mt="20px"
        gridTemplateColumns="repeat(12, 1fr)"
        gridTemplateRows="160px"
        gap="20px"
        sx={{
          "& > div": {
            gridColumn: isNonMediumScreens ? undefined : "span 12",
          },
        }}
      >
        <StatBox
          title="Total Customers"
          value={dashboardStat.data?.totalCustomers?.toString() ?? "0"}
          increase="+15%"
          description="Since last month"
          icon={
            <Email
              sx={{
                color: (theme.palette.secondary as any)[300],
                fontSize: "26px",
              }}
            />
          }
        />
        <StatBox
          title="Sales Today"
          value={dashboardStat.data?.thisDayStats.salesTotal?.toString() ?? "0"}
          increase="+21%"
          description="Since last month"
          icon={
            <PointOfSale
              sx={{
                color: (theme.palette.secondary as any)[300],
                fontSize: "26px",
              }}
            />
          }
        />
        <Box
          gridColumn="span 8"
          gridRow="span 2"
          height="340px"
          sx={{
            backgroundColor: theme.palette.background.paper,
          }}
          p="1rem"
          borderRadius="0.55rem"
        >
          <OverviewChart isDashboard view="sales" />
        </Box>

        <StatBox
          title="Monthly Sales"
          value={
            dashboardStat.data?.thisMonthStats?.salesTotal?.toString() ?? "0"
          }
          increase="+5%"
          description="Since last month"
          icon={
            <PersonAdd
              sx={{
                color: (theme.palette.secondary as any)[300],
                fontSize: "26px",
              }}
            />
          }
        />
        <StatBox
          title="Yearly Sales"
          value={dashboardStat.data?.yearlySalesTotal?.toString() ?? "0"}
          increase="+43%"
          description="Since last month"
          icon={
            <Traffic
              sx={{
                color: (theme.palette.secondary as any)[300],
                fontSize: "26px",
              }}
            />
          }
        />
        {/* ROW 2 */}
        <Box
          gridColumn="span 8"
          gridRow="span 3"
          sx={{
            "& .MuiDataGrid-root": {
              border: "none",
              borderRadius: "5rem",
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
              backgroundColor: theme.palette.background.paper,
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
            loading={dashboardStat.isLoading || !dashboardStat.data}
            getRowId={(row) => row._id}
            rows={(dashboardStat.data && dashboardStat.data.transactions) || []}
            columns={columns}
          />
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 3"
          p="1.5rem"
          borderRadius="0.55rem"
          sx={{
            backgroundColor: theme.palette.background.paper,
          }}
        >
          <Typography
            variant="h6"
            sx={{ color: (theme.palette.secondary as any)[100] }}
          >
            Sales By Category
          </Typography>
          <BreakdownChart isDashboard={true} />
          <Typography
            p="0 0.6rem"
            fontSize="0.8rem"
            sx={{ color: (theme.palette.secondary as any)[200] }}
          >
            Breakdown of real states and information via category for revenue
            made for this year and total sales.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
