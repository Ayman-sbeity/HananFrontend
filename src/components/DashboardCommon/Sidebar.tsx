import React from "react";
import { Link } from "react-router-dom";
import {
  Box,
  List,
  ListItemText,
  ListItemButton,
  Drawer,
  Typography,
} from "@mui/material";

const Sidebar: React.FC = () => {
  const drawerWidth = 250;
  const headerHeight = 64;

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          top: `${headerHeight}px`,
          height: `calc(100vh - ${headerHeight}px)`,
          zIndex: (theme) => theme.zIndex.drawer,
          position: "fixed",
        },
      }}
    >
      <Box sx={{ overflow: "auto", pt: 2 }}>
        <Typography
          variant="h6"
          sx={{
            px: 2,
            pb: 2,
            fontWeight: "bold",
            color: "primary.main",
          }}
        >
          Hanan Store
        </Typography>
        <List>
          <ListItemButton component={Link} to="/dash">
            <ListItemText primary="Dashboard" />
          </ListItemButton>
          <ListItemButton component={Link} to="/dash/add-item">
            <ListItemText primary="Add Product" />
          </ListItemButton>
          <ListItemButton component={Link} to="/dash/products">
            <ListItemText primary="Products" />
          </ListItemButton>
          <ListItemButton component={Link} to="/dash/users">
            <ListItemText primary="Users" />
          </ListItemButton>
          <ListItemButton component={Link} to="/dash/contacts">
            <ListItemText primary="Contacts" />
          </ListItemButton>
          <ListItemButton component={Link} to="/dash/orders">
            <ListItemText primary="Orders" />
          </ListItemButton>
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
