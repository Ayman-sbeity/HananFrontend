import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { motion } from "framer-motion";
import { ArrowForward } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import ProductCard from "../productsPageSections/ProductCard";
import { useCachedData } from "../../hooks/useCachedData";
import { fetchItems, type Item } from "../../services/api";
import { Skeleton, Alert } from "@mui/material";

const FeaturedProductsSection: React.FC = () => {
  const navigate = useNavigate();
  
  const {
    data: products,
    loading,
    error,
  } = useCachedData<Item[]>(
    "featured-products",
    () => fetchItems({ showAll: false }),
    5 * 60 * 1000
  );

  const handleViewAllProducts = () => {
    navigate("/products");
  };

  if (error) {
    return (
      <Box
        component="section"
        sx={{
          py: { xs: 6, md: 8 },
          px: { xs: 2, md: 4 },
        }}
      >
        <Alert severity="error" sx={{ maxWidth: 600, mx: "auto" }}>
          Unable to load featured products. Please try again later.
        </Alert>
      </Box>
    );
  }

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
            color: "text.primary",
          }}
        >
          Featured Products
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{
            fontSize: { xs: "1rem", md: "1.1rem" },
            color: "text.secondary",
            maxWidth: "600px",
            mx: "auto",
            mb: 3,
          }}
        >
          Discover our handpicked selection of the best products just for you
        </Typography>
      </Box>

      {loading ? (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
            },
            gap: { xs: 2, md: 3 },
            maxWidth: "1200px",
            mx: "auto",
            mb: 4,
          }}
        >
          {[...Array(3)].map((_, index) => (
            <Box key={index}>
              <Skeleton variant="rectangular" height={250} sx={{ mb: 2, borderRadius: 2 }} />
              <Skeleton variant="text" height={24} width="80%" sx={{ mb: 1 }} />
              <Skeleton variant="text" height={20} width="60%" sx={{ mb: 1 }} />
              <Skeleton variant="text" height={32} width="40%" />
            </Box>
          ))}
        </Box>
      ) : (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
            },
            gap: { xs: 2, md: 3 },
            maxWidth: "1200px",
            mx: "auto",
            mb: 4,
          }}
        >
          {products?.slice(0, 3).map((product, index) => (
            <motion.div
              key={product._id || product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </Box>
      )}

      <Box sx={{ textAlign: "center" }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <Button
            variant="contained"
            size="large"
            endIcon={<ArrowForward />}
            onClick={handleViewAllProducts}
            sx={{
              px: 4,
              py: 1.5,
              borderRadius: 3,
              textTransform: "none",
              fontWeight: 600,
              fontSize: "1.1rem",
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
              "&:hover": {
                boxShadow: "0 6px 20px rgba(0,0,0,0.2)",
                transform: "translateY(-2px)",
              },
            }}
          >
            View All Products
          </Button>
        </motion.div>
      </Box>
    </Box>
  );
};

export default FeaturedProductsSection;
