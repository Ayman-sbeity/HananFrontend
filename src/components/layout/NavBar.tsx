import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
  useTheme,
  useMediaQuery,
  Box,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useIsAdmin } from "../../hooks/useRole";

const NavBar: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [userMenuAnchorEl, setUserMenuAnchorEl] = useState<null | HTMLElement>(
    null
  );
  const navigate = useNavigate();
  const { user, logout, isAuthenticated } = useAuth();
  const isAdmin = useIsAdmin();

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleUserMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setUserMenuAnchorEl(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setUserMenuAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleUserMenuClose();
    navigate("/");
  };

  const navLinks = [
    { label: "Home", path: "/" },
    { label: "Products", path: "/products" },
    { label: "Contact", path: "/contact" },
    { label: "Cart", path: "/cart" },
  ];

  const authLinks = isAuthenticated
    ? [...(isAdmin ? [{ label: "Dashboard", path: "/dash" }] : [])]
    : [
        { label: "Login", path: "/login" },
        { label: "Sign Up", path: "/signup" },
      ];

  return (
<AppBar
  position="fixed"
  sx={{
    top: 0,
    left: 0,
    right: 0,
    height: { xs: "80px", sm: "90px" },
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    zIndex: 1100,
    bgcolor: "#fbebeaff", 
  }}
>
      <Toolbar
        disableGutters
        sx={{
          justifyContent: "space-between",
          px: { xs: 2, sm: 4 },
          height: "100%",
          borderBottom: "1px solid #e0e0e0",
        }}
      >
      <img
        src="/lunLogo.png"
        alt="LOA Jewelry Logo"
        style={{
          height: "80px",
          width: "100px",
          marginRight: "12px",
        }}
      />
        {isMobile ? (
          <>
            <IconButton
              color="inherit"
              edge="end"
              onClick={handleMenuOpen}
              sx={{
                ml: "auto",
                color: "#333",
                fontSize: "2rem",
              }}
              aria-label="open navigation"
              size="large"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              sx={{
                "& .MuiPaper-root": {
                  boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                  borderRadius: 2,
                  mt: 1,
                  minWidth: 200,
                  px: 1,
                },
              }}
            >
              <Box sx={{ display: "flex", justifyContent: "flex-end", px: 1 }}>
                <IconButton
                  aria-label="close menu"
                  onClick={handleMenuClose}
                  size="large"
                >
                  <CloseIcon />
                </IconButton>
              </Box>
              {navLinks.map((link) => (
                <MenuItem
                  key={link.label}
                  component={Link}
                  to={link.path}
                  onClick={handleMenuClose}
                  sx={{
                    py: 2,
                    px: 3,
                    fontSize: "1.1rem",
                    fontWeight: 500,
                    "&:hover": {
                      backgroundColor: "#f5f5f5",
                    },
                  }}
                >
                  {link.label}
                </MenuItem>
              ))}
              {authLinks.map((link) => (
                <MenuItem
                  key={link.label}
                  component={Link}
                  to={link.path}
                  onClick={handleMenuClose}
                  sx={{
                    py: 2,
                    px: 3,
                    fontSize: "1.1rem",
                    fontWeight: 500,
                    "&:hover": {
                      backgroundColor: "#f5f5f5",
                    },
                  }}
                >
                  {link.label}
                </MenuItem>
              ))}
              {isAuthenticated && (
                <MenuItem
                  onClick={handleLogout}
                  sx={{
                    py: 2,
                    px: 3,
                    fontSize: "1.1rem",
                    fontWeight: 500,
                    "&:hover": {
                      backgroundColor: "#f5f5f5",
                    },
                  }}
                >
                  Logout
                </MenuItem>
              )}
            </Menu>
          </>
        ) : (
          <Box
            display="flex"
            flexDirection="row"
            sx={{ gap: 1, margin: "0 16px" }}
          >
            {navLinks.map((link) => (
              <Box
                key={link.label}
                component="button"
                onClick={() => navigate(link.path)}
                sx={{
                  px: 3,
                  py: 1,
                  backgroundColor: "transparent",
                  border: "none",
                  color: "#333",
                  fontSize: "1rem",
                  fontWeight: 500,
                  cursor: "pointer",
                  borderRadius: 1,
                  transition: "all 0.2s ease",
                  "&:hover": {
                    backgroundColor: "#f5f5f5",
                    color: "#000",
                  },
                }}
              >
                {link.label}
              </Box>
            ))}
            {authLinks.map((link) => (
              <Box
                key={link.label}
                component="button"
                onClick={() => navigate(link.path)}
                sx={{
                  px: 3,
                  py: 1,
                  backgroundColor: "transparent",
                  border: "none",
                  color: "#333",
                  fontSize: "1rem",
                  fontWeight: 500,
                  cursor: "pointer",
                  borderRadius: 1,
                  transition: "all 0.2s ease",
                  "&:hover": {
                    backgroundColor: "#f5f5f5",
                    color: "#000",
                  },
                }}
              >
                {link.label}
              </Box>
            ))}
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, ml: 2 }}>
              {isAuthenticated ? (
                <>
                  <Typography variant="body1" sx={{ color: "#333" }}>
                    Welcome, {user?.name}
                  </Typography>
                  <IconButton
                    color="inherit"
                    onClick={handleUserMenuOpen}
                    sx={{ color: "#333" }}
                  >
                    <AccountCircle />
                  </IconButton>
                  <Menu
                    anchorEl={userMenuAnchorEl}
                    open={Boolean(userMenuAnchorEl)}
                    onClose={handleUserMenuClose}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "right",
                    }}
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                  >
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                  </Menu>
                </>
              ) : (
                <Box
                  sx={{
                    width: 32,
                    height: 32,
                    backgroundColor: "#333",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    fontSize: "0.8rem",
                    fontWeight: "bold",
                  }}
                >
                  0
                </Box>
              )}
            </Box>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
