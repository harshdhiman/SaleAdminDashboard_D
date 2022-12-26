import { Box, Typography, useTheme } from "@mui/material";
import React from "react";

export const Header = (props: { title: string; subtitle: string }) => {
  const theme = useTheme();
  return (
    <Box>
      <Typography
        variant="h2"
        color={(theme.palette.secondary as any)[100]}
        fontWeight="bold"
        sx={{ mb: "5px" }}
      >
        {props.title}
      </Typography>
      <Typography variant="h5" color={(theme.palette.secondary as any)[300]}>
        {props.subtitle}
      </Typography>
    </Box>
  );
};
