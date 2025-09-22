import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { motion } from "framer-motion";
import {
  LocalShipping,
  Security,
  Support,
  Stars,
  MonetizationOn,
  Verified,
} from "@mui/icons-material";

const features = [
  {
    title: "Free Shipping",
    description:
      "Free shipping on all orders over $50. Fast and reliable delivery.",
    icon: <LocalShipping sx={{ fontSize: 40 }} />,
    color: "#4CAF50",
  },
  {
    title: "Secure Payment",
    description: "Your payment information is always safe and secure with us.",
    icon: <Security sx={{ fontSize: 40 }} />,
    color: "#2196F3",
  },
  {
    title: "24/7 Support",
    description: "Our customer support team is here to help you anytime.",
    icon: <Support sx={{ fontSize: 40 }} />,
    color: "#FF9800",
  },
  {
    title: "Quality Guarantee",
    description:
      "All our products are carefully selected for the highest quality.",
    icon: <Stars sx={{ fontSize: 40 }} />,
    color: "#E91E63",
  },
  {
    title: "Best Prices",
    description:
      "Competitive prices with regular discounts and special offers.",
    icon: <MonetizationOn sx={{ fontSize: 40 }} />,
    color: "#9C27B0",
  },
  {
    title: "Trusted Brand",
    description: "Join thousands of satisfied customers who trust our service.",
    icon: <Verified sx={{ fontSize: 40 }} />,
    color: "#00BCD4",
  },
];

const WhyChooseUsSection: React.FC = () => {
  return (
     <Box
      component="section"
      sx={{
        py: { xs: 6, md: 8 },
        px: { xs: 2, md: 4 },
        backgroundColor: "#f8f9fa",
        width: "100%",
        maxWidth: { xs: "100%", sm: "95%", md: "1000px" }, // Responsive maxWidth
        mx: "auto",
      }}
    >
      <Box
        sx={{
          textAlign: "center",
          mb: { xs: 4, md: 6 },
          maxWidth: { xs: "100%", md: "700px" }, // Slightly smaller
          mx: "auto",
        }}
      >
        <Typography
          variant="h2"
          sx={{
            fontSize: { xs: "2rem", md: "2.5rem" },
            fontWeight: 700,
            mb: 2,
            color: "text.primary",
          }}
        >
          Why Choose Us?
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{
            fontSize: { xs: "1rem", md: "1.1rem" },
            color: "text.secondary",
            maxWidth: "600px",
            mx: "auto",
          }}
        >
          Experience the best in online shopping with our commitment to quality,
          service, and customer satisfaction
        </Typography>
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            lg: "repeat(3, 1fr)",
          },
          gap: { xs: 3, md: 4 },
          maxWidth: "1200px",
          mx: "auto",
        }}
      >
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
          >
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                borderRadius: 3,
                overflow: "hidden",
                boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                transition: "all 0.3s ease-in-out",
                backgroundColor: "white",
                border: "1px solid rgba(0,0,0,0.05)",
                "&:hover": {
                  boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
                  transform: "translateY(-2px)",
                },
              }}
            >
              <CardContent
                sx={{
                  flexGrow: 1,
                  textAlign: "center",
                  p: { xs: 3, md: 4 },
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Box
                  sx={{
                    mb: 3,
                    p: 2,
                    borderRadius: "50%",
                    backgroundColor: `${feature.color}15`,
                    color: feature.color,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {feature.icon}
                </Box>

                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 600,
                    mb: 2,
                    color: "text.primary",
                  }}
                >
                  {feature.title}
                </Typography>

                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{
                    fontSize: "1rem",
                    lineHeight: 1.6,
                    textAlign: "center",
                  }}
                >
                  {feature.description}
                </Typography>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </Box>
    </Box>
  );
};

export default WhyChooseUsSection;
