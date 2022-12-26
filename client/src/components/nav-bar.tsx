import {
  AppBar,
  Box,
  Button,
  IconButton,
  InputBase,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import { FlexBetween } from "./flex-between";
import {
  ArrowDropDownOutlined,
  DarkModeOutlined,
  LightModeOutlined,
  Menu as MenuIcon,
  Search,
  Settings,
} from "@mui/icons-material";
import { useAppDispatch } from "../store";
import { setMode } from "../state";
import { useAtom } from "jotai";
import { sideBarState } from "./side-bar";
import profileImage from "../assets/profile.jpeg";
import { User } from "../models/User";

export const NavBar = (props: { user?: User }) => {
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const [sideBarOpen, setSideBarOpen] = useAtom(sideBarState);

  // For Menu bar
  const [anchorEl, setAnchorEl] = useState<HTMLElement | undefined>(undefined);
  const isOpen = Boolean(anchorEl);
  const handleClick = (event: any) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(undefined);

  return (
    <AppBar
      sx={{
        position: "static",
        background: "none",
        boxShadow: "none",
      }}
    >
      <Toolbar
        sx={{
          justifyContent: "space-between",
        }}
      >
        {/* Left Side */}

        <FlexBetween
          sx={{
            gap: "1rem",
          }}
        >
          <IconButton
            onClick={() => {
              setSideBarOpen({
                open: !sideBarOpen.open,
              });
            }}
          >
            <MenuIcon />
          </IconButton>

          <FlexBetween
            sx={{
              backgroundColor: theme.palette.background.paper,
              borderRadius: "9px",
              gap: "3rem",
              p: "0.1rem 0.5rem",
            }}
          >
            <InputBase placeholder="Search" />
            <IconButton>
              <Search />
            </IconButton>
          </FlexBetween>
        </FlexBetween>

        {/* Right Side */}

        <FlexBetween
          sx={{
            gap: "1rem",
          }}
        >
          <IconButton
            onClick={() => {
              dispatch(setMode());
            }}
          >
            {theme.palette.mode === "light" ? (
              <DarkModeOutlined />
            ) : (
              <LightModeOutlined />
            )}
          </IconButton>

          <IconButton>
            <Settings />
          </IconButton>

          {/* User Profile */}
          <FlexBetween>
            <Button
              onClick={handleClick}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                textTransform: "none",
                gap: "1rem",
              }}
            >
              <Box
                component="img"
                alt="profile"
                src={profileImage}
                height="32px"
                width="32px"
                borderRadius="50%"
                sx={{ objectFit: "cover" }}
              />
              <Box textAlign="left">
                <Typography
                  fontWeight="bold"
                  fontSize="0.85rem"
                  sx={{ color: (theme.palette.secondary as any)[100] }}
                >
                  {props.user?.name}
                </Typography>
                <Typography
                  fontSize="0.75rem"
                  sx={{ color: (theme.palette.secondary as any)[200] }}
                >
                  {props.user?.occupation}
                </Typography>
              </Box>
              <ArrowDropDownOutlined
                sx={{
                  color: (theme.palette.secondary as any)[300],
                  fontSize: "25px",
                }}
              />
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={isOpen}
              onClose={handleClose}
              anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
              <MenuItem onClick={handleClose}>Log Out</MenuItem>
            </Menu>
          </FlexBetween>
        </FlexBetween>
      </Toolbar>
    </AppBar>
  );
};
