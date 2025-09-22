import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { keyframes } from "@mui/system";

const scrollAnimation = keyframes`
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
`;

const NewArrivalsSection: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState(24 * 60 * 60);

  useEffect(() => {
    if (timeLeft > 0) {
      const timerId = setInterval(() => {
        setTimeLeft((time) => time - 1);
      }, 1000);
      return () => clearInterval(timerId);
    }
  }, [timeLeft]);

  const formatTimeLeft = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const resetTimer = () => {
    setTimeLeft(24 * 60 * 60);
  };

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        overflow: "hidden",
        bgcolor: "transparent",
        py: { xs: 2, md: 3 },
        
      }}
    >
      <Box
        sx={{
          display: "flex",
          whiteSpace: "nowrap",
          width: "fit-content",
          animation: `${scrollAnimation} 20s linear infinite`,
          "& > div": {
            display: "flex",
            alignItems: "center",
          },
        }}
      >
        {[...Array(2)].map((_, outerIndex) => (
          <Box
            key={`group-${outerIndex}`}
            sx={{
              display: "flex",
              gap: 0,
            }}
          >
            {[...Array(4)].map((_, index) => (
              <Box
                key={`${outerIndex}-${index}`}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: { xs: 2, md: 4 },
                  mx: { xs: 2, md: 4 },
                }}
              >
                <Typography
                  variant="h5"
                  sx={{
                    color: "#000",
                    fontSize: { xs: "1rem", sm: "1.25rem", md: "1.5rem" },
                    fontWeight: 600,
                    textTransform: "uppercase",
                  }}
                >
                  Shop New Arrivals
                </Typography>
                <Typography
                  sx={{
                    color: "#000",
                    fontSize: { xs: "1rem", sm: "1.25rem", md: "1.5rem" },
                    fontFamily: "monospace",
                  }}
                >
                  {formatTimeLeft(timeLeft)}
                </Typography>
                <Box
                  component="span"
                  onClick={resetTimer}
                  sx={{
                    width: "8px",
                    height: "8px",
                    bgcolor: "#000",
                    borderRadius: "50%",
                    mx: { xs: 1, md: 2 },
                    cursor: "pointer",
                    "&:hover": {
                      transform: "scale(1.2)",
                      transition: "transform 0.2s",
                    },
                  }}
                />
              </Box>
            ))}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default NewArrivalsSection;
