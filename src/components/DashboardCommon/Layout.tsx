import React from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";

interface LayoutProps {
  children?: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const drawerWidth = 250;
  const headerHeight = 64;

  return (
    <Box sx={{ display: "flex" }}>
      <Header />

      <Sidebar />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          bgcolor: "background.default",
          minHeight: "100vh",
          marginTop: `${headerHeight}px`,
          width: `calc(100% - ${drawerWidth}px)`,
          maxWidth: "100%",
          overflow: "hidden",
        }}
      >
        {children || <Outlet />}
      </Box>
    </Box>
  );
};

export default Layout;
