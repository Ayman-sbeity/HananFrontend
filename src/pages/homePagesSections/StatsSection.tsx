import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { motion } from "framer-motion";
import {
  People,
  ShoppingBag,
  Star,
  LocalShipping,
} from "@mui/icons-material";

const stats = [
  {
    id: 1,
    title: "Happy Customers",
    value: "10,000+",
    icon: <People sx={{ fontSize: 48 }} />,
    color: "#4CAF50",
  },
  {
    id: 2,
    title: "Products Sold",
    value: "50,000+",
    icon: <ShoppingBag sx={{ fontSize: 48 }} />,
    color: "#2196F3",
  },
  {
    id: 3,
    title: "Customer Rating",
    value: "4.9/5",
    icon: <Star sx={{ fontSize: 48 }} />,
    color: "#FF9800",
  },
  {
    id: 4,
    title: "Orders Delivered",
    value: "99.8%",
    icon: <LocalShipping sx={{ fontSize: 48 }} />,
    color: "#9C27B0",
  },
];

const StatsSection: React.FC = () => {
  return (
    <Box
      component="section"
      sx={{
        py: { xs: 6, md: 8 },
        background: "linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)",
        color: "white",
        position: "relative",
        overflow: "hidden",
      }}
    >

      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffffff' fill-opacity='0.05' fill-rule='evenodd'/%3E%3C/svg%3E")`,
          opacity: 0.3,
        }}
      />
      
      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Box sx={{ textAlign: "center", mb: { xs: 4, md: 6 } }}>
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: "2rem", md: "2.5rem" },
                fontWeight: 700,
                mb: 2,
                color: "white",
              }}
            >
              Our Achievements
            </Typography>
            <Typography
              variant="subtitle1"
              sx={{
                fontSize: { xs: "1rem", md: "1.1rem" },
                opacity: 0.9,
                maxWidth: "600px",
                mx: "auto",
              }}
            >
              These numbers reflect our commitment to excellence and customer satisfaction
            </Typography>
          </Box>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "repeat(2, 1fr)",
                md: "repeat(4, 1fr)",
              },
              gap: { xs: 3, md: 4 },
            }}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <Box
                  sx={{
                    textAlign: "center",
                    p: { xs: 3, md: 4 },
                    borderRadius: 3,
                    backgroundColor: "rgba(255,255,255,0.1)",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(255,255,255,0.2)",
                    transition: "all 0.3s ease-in-out",
                    "&:hover": {
                      backgroundColor: "rgba(255,255,255,0.15)",
                      transform: "translateY(-5px)",
                    },
                  }}
                >
                  <Box
                    sx={{
                      mb: 2,
                      color: stat.color,
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    {stat.icon}
                  </Box>
                  
                  <Typography
                    variant="h3"
                    sx={{
                      fontSize: { xs: "1.8rem", md: "2.2rem" },
                      fontWeight: 700,
                      mb: 1,
                      color: "white",
                    }}
                  >
                    {stat.value}
                  </Typography>
                  
                  <Typography
                    variant="body1"
                    sx={{
                      fontSize: { xs: "0.9rem", md: "1rem" },
                      opacity: 0.9,
                      fontWeight: 500,
                    }}
                  >
                    {stat.title}
                  </Typography>
                </Box>
              </motion.div>
            ))}
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
};

export default StatsSection;
