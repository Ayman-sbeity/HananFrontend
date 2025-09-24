import React from "react";
import { Box } from "@mui/material";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

interface MainLayoutProps {
  children?: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <>
      <Box
        sx={{
          minHeight: "100vh",
          bgcolor: "white",
          width: "100%",
          overflowX: "hidden",
        }}
      >
        <NavBar />
        <Box
          sx={{
            mt: { xs: "60px", sm: "70px" },
            px: { xs: 0.5, sm: 2, md: 3 },
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            minHeight: {
              xs: "calc(100vh - 60px)",
              sm: "calc(100vh - 70px)",
            },
            width: "100%",
          }}
        >
          <Box
            sx={{
              width: "100%", // Fix: use 100% instead of 100vw
              maxWidth: { xs: "100%", sm: "600px", md: "900px", lg: "1100px" }, // Responsive maxWidth
              minHeight: { xs: "calc(100vh - 60px)", sm: "auto" },
            }}
          >
            {children || <Outlet />}
          </Box>
        </Box>
        <Footer />
      </Box>
    </>
  );
};

export default MainLayout;
