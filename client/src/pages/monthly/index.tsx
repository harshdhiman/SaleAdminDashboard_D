import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  useTheme,
} from "@mui/material";
import React, { useMemo, useState } from "react";
import { Header } from "../../components/header";
import { OverviewChart } from "../../components/overview-chart";
import { useGetOverallStatsQuery } from "../../state/api";
import { Serie, ResponsiveLine } from "@nivo/line";

export const MonthlyPage = (props: {}) => {
  const theme = useTheme();
  const overallStats = useGetOverallStatsQuery();

  const { totalSalesLine, totalUnitsLine } = useMemo((): {
    totalSalesLine?: Serie;
    totalUnitsLine?: Serie;
  } => {
    if (!overallStats.data)
      return { totalSalesLine: undefined, totalUnitsLine: undefined };

    const { monthlyData } = overallStats.data;

    const totalSalesLine: Serie = {
      id: "totalSales",
      color: theme.palette.secondary.main,
      data: [],
    };

    const totalUnitsLine: Serie = {
      id: "totalUnits",
      color: (theme.palette.secondary as any)[600],
      data: [],
    };

    monthlyData.forEach((data) => {
      const { month, totalSales, totalUnits } = data;

      totalSalesLine.data.push({ x: month, y: totalSales });
      totalUnitsLine.data.push({ x: month, y: totalUnits });
    });

    return { totalSalesLine, totalUnitsLine };
  }, [overallStats.data]);

  return (
    <Box m="1.5rem 2.5rem">
      <Header
        title="MONTHLY"
        subtitle="Overview of general revenue and profit"
      />
      <Box height="75vh">
        {/* Chart */}
        {overallStats.data ? (
          <ResponsiveLine
            data={[totalSalesLine!, totalUnitsLine!]}
            theme={{
              axis: {
                domain: {
                  line: {
                    stroke: (theme.palette.secondary as any)[200],
                  },
                },
                legend: {
                  text: {
                    fill: (theme.palette.secondary as any)[200],
                  },
                },
                ticks: {
                  line: {
                    stroke: (theme.palette.secondary as any)[200],
                    strokeWidth: 1,
                  },
                  text: {
                    fill: (theme.palette.secondary as any)[200],
                  },
                },
              },
              legends: {
                text: {
                  fill: (theme.palette.secondary as any)[200],
                },
              },
              tooltip: {
                container: {
                  color: theme.palette.primary.main,
                },
              },
            }}
            margin={{ top: 20, right: 50, bottom: 50, left: 70 }}
            xScale={{ type: "point" }}
            yScale={{
              type: "linear",
              min: "auto",
              max: "auto",
              stacked: false,
              reverse: false,
            }}
            yFormat=" >-.2f"
            curve="catmullRom"
            axisTop={null}
            axisRight={null}
            axisBottom={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: "Month",
              legendOffset: 36,
              legendPosition: "middle",
            }}
            axisLeft={{
              // orient: "left",
              tickValues: 5,
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: `Total for Year`,
              legendOffset: -60,
              legendPosition: "middle",
            }}
            enableGridX={false}
            enableGridY={false}
            pointSize={10}
            pointColor={{ theme: "background" }}
            pointBorderWidth={2}
            pointBorderColor={{ from: "serieColor" }}
            pointLabelYOffset={-12}
            useMesh={true}
            legends={[
              {
                anchor: "bottom-right",
                direction: "column",
                justify: false,
                translateX: 30,
                translateY: -40,
                itemsSpacing: 0,
                itemDirection: "left-to-right",
                itemWidth: 80,
                itemHeight: 20,
                itemOpacity: 0.75,
                symbolSize: 12,
                symbolShape: "circle",
                symbolBorderColor: "rgba(0, 0, 0, .5)",
                effects: [
                  {
                    on: "hover",
                    style: {
                      itemBackground: "rgba(0, 0, 0, .03)",
                      itemOpacity: 1,
                    },
                  },
                ],
              },
            ]}
          />
        ) : (
          <div>Loading...</div>
        )}
      </Box>
    </Box>
  );
};
