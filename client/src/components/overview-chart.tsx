import { useTheme } from "@mui/material";
import React, { useMemo } from "react";
import { useGetOverallStatsQuery } from "../state/api";
import { ResponsiveLine, Serie } from "@nivo/line";

export const OverviewChart = (props: {
  view: "sales" | "units";
  isDashboard?: boolean;
}) => {
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

    monthlyData.reduce(
      (acc, curr) => {
        const { month, totalSales, totalUnits } = curr;

        acc.sales += totalSales;
        acc.units += totalUnits;

        totalSalesLine.data.push({ x: month, y: acc.sales });
        totalUnitsLine.data.push({ x: month, y: acc.units });

        return acc;
      },
      { sales: 0, units: 0 }
    );

    return { totalSalesLine, totalUnitsLine };
  }, [overallStats.data]);

  if (!overallStats.data) return <div>Loading...</div>;

  return (
    <ResponsiveLine
      data={props.view === "sales" ? [totalSalesLine!] : [totalUnitsLine!]}
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
      enableArea={props.isDashboard}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        format: (v) => {
          if (props.isDashboard) return v.slice(0, 3);
          return v;
        },
        // orient: "bottom",
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: props.isDashboard ? "" : "Month",
        legendOffset: 36,
        legendPosition: "middle",
      }}
      axisLeft={{
        // orient: "left",
        tickValues: 5,
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: props.isDashboard
          ? ""
          : `Total ${props.view === "sales" ? "Revenue" : "Units"} for Year`,
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
      legends={
        !props.isDashboard
          ? [
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
            ]
          : undefined
      }
    />
  );
};
