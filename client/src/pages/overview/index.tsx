import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React, { useState } from "react";
import { Header } from "../../components/header";
import { OverviewChart } from "../../components/overview-chart";

export const OverviewPage = () => {
  const [view, setView] = useState<"units" | "sales">("units");

  return (
    <Box m="1.5rem 2.5rem">
      <Header
        title="OVERVIEW"
        subtitle="Overview of general revenue and profit"
      />
      <Box height="75vh">
        <FormControl sx={{ mt: "1rem" }}>
          <InputLabel>View</InputLabel>
          <Select
            value={view}
            label="View"
            onChange={(e) => setView(e.target.value as "units" | "sales")}
          >
            <MenuItem value="sales">Sales</MenuItem>
            <MenuItem value="units">Units</MenuItem>
          </Select>
        </FormControl>

        {/* Chart */}

        <OverviewChart view={view} />
      </Box>
    </Box>
  );
};
