import React from "react";
import {
  Box,
  Container,
  Typography,
  IconButton,
  Link,
  Stack,
  Divider,
} from "@mui/material";
import {
  Facebook,
  Twitter,
  Instagram,
  LinkedIn,
  Phone,
  Email,
  LocationOn,
} from "@mui/icons-material";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "#fbebeaff",
        pt: 6,
        pb: 3,
        mt: "auto",
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 4 }}>

          <Box sx={{ flex: "1 1 300px" }}>
            <Box sx={{ mb: 3 }}>
              <img
                src="/logo.png"
                alt="Company Logo"
                style={{ height: "40px" }}
              />
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Your trusted destination for luxury jewelry and accessories. We
              provide exceptional quality and outstanding customer service.
            </Typography>
          </Box>

          <Box sx={{ flex: "1 1 200px" }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              Quick Links
            </Typography>
            <Stack spacing={1}>
              {["About", "Shop", "Categories", "Contact"].map((item) => (
                <Link
                  key={item}
                  href={`/${item.toLowerCase()}`}
                  underline="none"
                  color="text.secondary"
                  sx={{ "&:hover": { color: "primary.main" } }}
                >
                  {item}
                </Link>
              ))}
            </Stack>
          </Box>

          <Box sx={{ flex: "1 1 200px" }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              Categories
            </Typography>
            <Stack spacing={1}>
              {["Necklaces", "Rings", "Earrings", "Bracelets", "Watches"].map(
                (item) => (
                  <Link
                    key={item}
                    href={`/category/${item.toLowerCase()}`}
                    underline="none"
                    color="text.secondary"
                    sx={{ "&:hover": { color: "primary.main" } }}
                  >
                    {item}
                  </Link>
                )
              )}
            </Stack>
          </Box>

          <Box sx={{ flex: "1 1 300px" }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              Contact Us
            </Typography>
            <Stack spacing={2}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <LocationOn color="primary" sx={{ fontSize: 20 }} />
                <Typography variant="body2" color="text.secondary">
                  123 Jewelry Street, New York, NY 10001
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Phone color="primary" sx={{ fontSize: 20 }} />
                <Typography variant="body2" color="text.secondary">
                  +1 (555) 123-4567
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Email color="primary" sx={{ fontSize: 20 }} />
                <Typography variant="body2" color="text.secondary">
                  info@yourjewelrystore.com
                </Typography>
              </Box>
            </Stack>
          </Box>
        </Box>

        <Box sx={{ mt: 4, mb: 3 }}>
          <Divider sx={{ mb: 3 }} />
          <Stack direction="row" spacing={2} justifyContent="center">
            {[
              { icon: <Facebook />, url: "https://facebook.com" },
              { icon: <Twitter />, url: "https://twitter.com" },
              { icon: <Instagram />, url: "https://instagram.com" },
              { icon: <LinkedIn />, url: "https://linkedin.com" },
            ].map((social, index) => (
              <IconButton
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  "&:hover": {
                    color: "primary.main",
                    transform: "translateY(-2px)",
                    transition: "all 0.2s",
                  },
                }}
              >
                {social.icon}
              </IconButton>
            ))}
          </Stack>
        </Box>

        <Typography
          variant="body2"
          color="text.secondary"
          align="center"
          sx={{ mt: 2 }}
        >
          © {currentYear} Your Jewelry Store. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
