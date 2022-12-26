import React from "react";
import { atom, useAtom } from "jotai";
import profileImage from "../assets/profile.jpeg";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import { FlexBetween } from "./flex-between";
import {
  AdminPanelSettingsOutlined,
  CalendarMonthOutlined,
  ChevronLeft,
  ChevronRight,
  ChevronRightOutlined,
  Dashboard,
  Groups2Outlined,
  HomeOutlined,
  PieChartOutlined,
  PointOfSaleOutlined,
  PublicOutlined,
  ReceiptLongOutlined,
  SettingsOutlined,
  ShoppingCartOutlined,
  TodayOutlined,
  TrendingUpOutlined,
} from "@mui/icons-material";
import { User } from "../models/User";

// Global Sidebar State
export const sideBarState = atom({
  open: true,
});

type NavItem = {
  text: string;
  icon: React.ReactNode | null;
};
const navItems: NavItem[] = [
  {
    text: "Dashboard",
    icon: <HomeOutlined />,
  },
  {
    text: "Client Facing",
    icon: null,
  },
  {
    text: "Products",
    icon: <ShoppingCartOutlined />,
  },
  {
    text: "Customers",
    icon: <Groups2Outlined />,
  },
  {
    text: "Transactions",
    icon: <ReceiptLongOutlined />,
  },
  {
    text: "Geography",
    icon: <PublicOutlined />,
  },
  {
    text: "Sales",
    icon: null,
  },
  {
    text: "Overview",
    icon: <PointOfSaleOutlined />,
  },
  {
    text: "Daily",
    icon: <TodayOutlined />,
  },
  {
    text: "Monthly",
    icon: <CalendarMonthOutlined />,
  },
  {
    text: "Breakdown",
    icon: <PieChartOutlined />,
  },
  {
    text: "Management",
    icon: null,
  },
  {
    text: "Admin",
    icon: <AdminPanelSettingsOutlined />,
  },
  {
    text: "Performance",
    icon: <TrendingUpOutlined />,
  },
];

export const SideBar = (props: {
  isNonMobile: boolean;
  drawerWidth: number;
  user?: User;
}) => {
  const [sideBarOpen, setSideBarOpen] = useAtom(sideBarState);
  const { pathname } = useLocation();
  const activePath = pathname.substring(1);

  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <Box component="nav">
      {sideBarOpen.open && (
        <Drawer
          variant="persistent"
          anchor="left"
          open={true}
          onClose={() => setSideBarOpen({ open: false })}
          sx={{
            width: props.drawerWidth,
            "& .MuiDrawer-paper": {
              color: (theme.palette.secondary as any)[200],
              backgroundColor: theme.palette.background.paper,
              boxSizing: "border-box",
              borderWidth: props.isNonMobile ? 0 : "2px",
              width: props.drawerWidth,
            },
          }}
        >
          <Box width="100%" paddingBottom="120px">
            <Box m="1.5rem 2rem 2rem 3rem">
              <FlexBetween>
                <Typography fontWeight="bold" variant="h4">
                  SALES Z
                </Typography>
                {!props.isNonMobile && (
                  <IconButton onClick={() => setSideBarOpen({ open: false })}>
                    <ChevronLeft />
                  </IconButton>
                )}
              </FlexBetween>
            </Box>

            {/* List */}

            <List>
              {navItems.map((item, index) => {
                if (!item.icon) {
                  return (
                    <Typography key={item.text} m="2.25rem 0 1rem 3rem">
                      {item.text}
                    </Typography>
                  );
                }

                const isActive = activePath === item.text.toLowerCase();
                const color = isActive
                  ? (theme.palette.primary as any)[600]
                  : (theme.palette.secondary as any)[200];
                const bgColor = isActive
                  ? (theme.palette.secondary as any)[300]
                  : undefined;

                return (
                  <ListItem key={item.text} disablePadding>
                    <ListItemButton
                      onClick={() => {
                        navigate(`/${item.text.toLowerCase()}`);
                      }}
                      sx={{
                        backgroundColor: bgColor,
                        color: color,
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          color: color,
                          marginLeft: "2rem",
                        }}
                      >
                        {item.icon}
                      </ListItemIcon>
                      <ListItemText primary={item.text} />
                      {isActive && <ChevronRightOutlined sx={{ ml: "auto" }} />}
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          </Box>

          {/* Bottom Section */}
          <Box
            position="fixed"
            bottom="0"
            sx={{
              backgroundColor: theme.palette.background.paper,
            }}
          >
            <Box paddingBottom="2rem">
              <Divider />
              <FlexBetween
                textTransform="none"
                gap="1rem"
                m="1.5rem 2rem 0 3rem"
              >
                <Box
                  component="img"
                  src={profileImage}
                  alt="Profile Image"
                  borderRadius="50%"
                  width="40px"
                  height="40px"
                  sx={{
                    objectFit: "cover",
                  }}
                />
                <Box textAlign="left">
                  <Typography
                    fontWeight="bold"
                    fontSize="0.9rem"
                    sx={{
                      color: (theme.palette.secondary as any)[100],
                    }}
                  >
                    {props.user?.name}
                  </Typography>
                  <Typography
                    fontSize="0.8rem"
                    sx={{
                      color: (theme.palette.secondary as any)[200],
                    }}
                  >
                    {props.user?.occupation}
                  </Typography>
                </Box>
                <SettingsOutlined
                  color={(theme.palette.secondary as any)[200]}
                />
              </FlexBetween>
            </Box>
          </Box>

          {/*  */}
        </Drawer>
      )}
    </Box>
  );
};
