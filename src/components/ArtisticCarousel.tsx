import React from "react";
import { Box, Typography, Button } from "@mui/material";

const ArtisticCarousel: React.FC = () => {
  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: { xs: "500px", sm: "600px", md: "700px" },
        overflow: "hidden",
      }}
    >
      <Box
        component="img"
        src="blue.jpg"
        alt="Handcrafted organic products"
        sx={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          position: "absolute",
          top: 0,
          left: 0,
        }}
      />

      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.2)",
        }}
      />

      <Box
        sx={{
          position: "absolute",
          top: "50%",
          right: { xs: "5%", sm: "10%", md: "15%" },
          transform: "translateY(-50%)",
          color: "white",
          textAlign: "left",
          maxWidth: { xs: "280px", sm: "400px", md: "500px" },
          zIndex: 2,
        }}
      >
        <Typography
          variant="body2"
          sx={{
            fontSize: { xs: "0.9rem", sm: "1rem" },
            fontWeight: 400,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            mb: 2,
            opacity: 0.9,
          }}
        >
          HANDCRAFTED ORGANIC PRODUCTS
        </Typography>

        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: "2.5rem", sm: "3.5rem", md: "4.5rem" },
            fontWeight: "bold",
            lineHeight: 1.1,
            mb: 3,
            fontFamily: "'Arial', sans-serif",
          }}
        >
          JUST LIKE NATURE
          <br />
          INTENDED
        </Typography>

        <Button
          variant="contained"
          sx={{
            backgroundColor: "rgba(110, 120, 100, 0.9)",
            color: "white",
            px: 4,
            py: 1.5,
            fontSize: "1rem",
            fontWeight: 500,
            textTransform: "none",
            borderRadius: 0,
            boxShadow: "none",
            "&:hover": {
              backgroundColor: "rgba(90, 100, 80, 0.95)",
              boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
            },
          }}
        >
          Shop Now
        </Button>
      </Box>

      <Box
        sx={{
          position: "absolute",
          left: { xs: "20px", sm: "40px" },
          top: "50%",
          transform: "translateY(-50%)",
          display: "flex",
          flexDirection: "column",
          gap: 2,
          zIndex: 2,
        }}
      >
        {["f", "ig", "p"].map((icon, index) => (
          <Box
            key={index}
            sx={{
              width: 40,
              height: 40,
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              border: "1px solid rgba(255, 255, 255, 0.3)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              cursor: "pointer",
              fontSize: "1rem",
              fontWeight: "bold",
              transition: "all 0.3s ease",
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.2)",
                transform: "scale(1.1)",
              },
            }}
          >
            {icon}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default ArtisticCarousel;
