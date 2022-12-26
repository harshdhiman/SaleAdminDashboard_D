import { Box, Typography, useTheme } from "@mui/material";
import React from "react";
import { FlexBetween } from "./flex-between";

export const StatBox = (props: {
  title: string;
  value: string;
  increase: string;
  icon: React.ReactNode;
  description: string;
}) => {
  const theme = useTheme();

  return (
    <Box
      gridColumn="span 2"
      gridRow="span 1"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      p="1.25rem 1rem"
      flex="1 1 100%"
      sx={{
        backgroundColor: theme.palette.background.paper,
        borderRadius: "0.55rem",
      }}
    >
      <FlexBetween>
        <Typography
          variant="h6"
          sx={{ color: (theme.palette.secondary as any)[100] }}
        >
          {props.title}
        </Typography>
        {props.icon}
      </FlexBetween>

      <Typography
        variant="h3"
        fontWeight="600"
        sx={{ color: (theme.palette.secondary as any)[200] }}
      >
        {props.value}
      </Typography>
      <FlexBetween gap="1rem">
        <Typography
          variant="h5"
          fontStyle="italic"
          sx={{ color: theme.palette.secondary.light }}
        >
          {props.increase}
        </Typography>
        <Typography>{props.description}</Typography>
      </FlexBetween>
    </Box>
  );
};
