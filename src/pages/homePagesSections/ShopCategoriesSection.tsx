import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { motion } from "framer-motion";

const categories = [
  {
    title: "Jewelry",
    description: "Explore our collection of handcrafted jewelry",
    image:
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Watches",
    description: "Discover timeless elegance in our watch collection",
    image:
      "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Accessories",
    description: "Complete your look with our premium accessories",
    image:
      "https://images.unsplash.com/photo-1576053139951-d9f3fd55b8c9?auto=format&fit=crop&w=1200&q=80",
  },
];

const ShopCategoriesSection: React.FC = () => {
  return (
    <Box
      component="section"
      sx={{
        py: { xs: 6, md: 8 },
        px: { xs: 2, md: 4 },
      }}
    >
      <Box sx={{ textAlign: "center", mb: { xs: 4, md: 6 } }}>
        <Typography
          variant="h2"
          sx={{
            fontSize: { xs: "2rem", md: "2.5rem" },
            fontWeight: 700,
            mb: 2,
          }}
        >
          Shop by Category
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
          Discover our curated collection of luxury items across different
          categories
        </Typography>
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
          },
          gap: { xs: 2, md: 4 },
          maxWidth: "1200px",
          mx: "auto",
        }}
      >
        {categories.map((category, index) => (
          <motion.div
            key={category.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            whileHover={{ scale: 1.03 }}
          >
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                borderRadius: 2,
                overflow: "hidden",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                transition: "transform 0.3s ease-in-out",
                "&:hover": {
                  boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
                },
              }}
            >
              <CardMedia
                component="img"
                height={240}
                image={category.image}
                alt={category.title}
                sx={{
                  objectFit: "cover",
                }}
              />
              <CardContent sx={{ flexGrow: 1, textAlign: "center" }}>
                <Typography
                  gutterBottom
                  variant="h5"
                  sx={{
                    fontWeight: 600,
                    mb: 1,
                  }}
                >
                  {category.title}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    fontSize: "0.95rem",
                    lineHeight: 1.5,
                  }}
                >
                  {category.description}
                </Typography>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </Box>
    </Box>
  );
};

export default ShopCategoriesSection;
