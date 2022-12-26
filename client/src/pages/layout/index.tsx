import { Box, useMediaQuery } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import { NavBar } from "../../components/nav-bar";
import { SideBar } from "../../components/side-bar";
import { useGetUserQuery } from "../../state/api";
import { useAppSelector } from "../../store";

export const Layout = () => {
  const isNonMobile = useMediaQuery("(min-width: 600px)");
  const userId = useAppSelector((s) => s.global.userId);
  const user = useGetUserQuery(userId);

  return (
    <Box width="100%" height="100%" display={isNonMobile ? "flex" : "block"}>
      <SideBar isNonMobile={isNonMobile} drawerWidth={250} user={user.data} />
      <Box flexGrow={1}>
        <NavBar user={user.data} />
        <Outlet />
      </Box>
    </Box>
  );
};
