import { Box } from "@mui/material";
import React from "react";
import { BreakdownChart } from "../../components/breakdown-chart";
import { Header } from "../../components/header";

export const BreakdownPage = () => {
  return (
    <Box m="1.5rem 2.5rem">
      <Header title="BREAKDOWN" subtitle="Breakdown of Sales By Category" />
      <Box mt="40px" height="75vh">
        <BreakdownChart />
      </Box>
    </Box>
  );
};
