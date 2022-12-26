import { Box, Typography, useTheme } from "@mui/material";
import React from "react";
import { useGetOverallStatsQuery } from "../state/api";
import { ResponsivePie } from "@nivo/pie";

export const BreakdownChart = (props: { isDashboard?: boolean }) => {
  const overallStats = useGetOverallStatsQuery();
  const theme = useTheme();

  if (!overallStats.data) {
    return <div>Loading...</div>;
  }

  const colors = [
    (theme.palette.secondary as any)[500],
    (theme.palette.secondary as any)[300],
    (theme.palette.secondary as any)[300],
    (theme.palette.secondary as any)[500],
  ];

  const data = Object.entries(overallStats.data.salesByCategory).map(
    (item, i) => {
      const [category, sales] = item;
      return {
        id: category,
        label: category,
        value: sales,
        color: colors[i],
      };
    }
  );

  return (
    <Box
      height={props.isDashboard ? "400px" : "100%"}
      width={undefined}
      minHeight={props.isDashboard ? "325px" : undefined}
      minWidth={props.isDashboard ? "325px" : undefined}
      position="relative"
    >
      <ResponsivePie
        data={data}
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
        colors={{ datum: "data.color" }}
        margin={
          props.isDashboard
            ? { top: 40, right: 80, bottom: 100, left: 50 }
            : { top: 40, right: 80, bottom: 80, left: 80 }
        }
        sortByValue={true}
        innerRadius={0.45}
        activeOuterRadiusOffset={8}
        borderWidth={1}
        borderColor={{
          from: "color",
          modifiers: [["darker", 0.2]],
        }}
        enableArcLinkLabels={!props.isDashboard}
        arcLinkLabelsTextColor={(theme.palette.secondary as any)[200]}
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: "color" }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{
          from: "color",
          modifiers: [["darker", 2]],
        }}
        legends={[
          {
            anchor: "bottom",
            direction: "row",
            justify: false,
            translateX: props.isDashboard ? 20 : 0,
            translateY: props.isDashboard ? 50 : 56,
            itemsSpacing: 0,
            itemWidth: 85,
            itemHeight: 18,
            itemTextColor: "#999",
            itemDirection: "left-to-right",
            itemOpacity: 1,
            symbolSize: 18,
            symbolShape: "circle",
            effects: [
              {
                on: "hover",
                style: {
                  itemTextColor: (theme.palette.primary as any)[500],
                },
              },
            ],
          },
        ]}
      />
      <Box
        position="absolute"
        top="50%"
        left="50%"
        color={(theme.palette.secondary as any)[400]}
        textAlign="center"
        sx={{
          transform: props.isDashboard
            ? "translate(-75%, -170%)"
            : "translate(-50%, -100%)",
        }}
      >
        <Typography variant="h6">
          {!props.isDashboard && "Total:"} ${overallStats.data.yearlySalesTotal}
        </Typography>
      </Box>
    </Box>
  );
};
