import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Header: React.FC = () => {
  const headerHeight = 64;
  const navigate = useNavigate();

  const handleLogout = () => {

    navigate("/");
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        width: "100%",
        height: `${headerHeight}px`,
      }}
    >
      <Toolbar sx={{ minHeight: `${headerHeight}px !important` }}>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Admin Dashboard
        </Typography>
        <Box>
          <Button color="inherit">Profile</Button>
          <Button color="inherit" onClick={handleLogout}>Logout</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
