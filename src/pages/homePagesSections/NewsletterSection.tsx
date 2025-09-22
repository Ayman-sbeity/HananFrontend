import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { motion } from "framer-motion";
import { Email, Send } from "@mui/icons-material";

const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">("success");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes("@")) {
      setSnackbarMessage("Please enter a valid email address");
      setSnackbarSeverity("error");
      setShowSnackbar(true);
      return;
    }

    setIsLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSnackbarMessage("Thank you for subscribing to our newsletter!");
      setSnackbarSeverity("success");
      setEmail("");
    } catch (error) {
      setSnackbarMessage("Something went wrong. Please try again.");
      setSnackbarSeverity("error");
    } finally {
      setIsLoading(false);
      setShowSnackbar(true);
    }
  };

  return (
    <Box
      component="section"
      sx={{
        py: { xs: 6, md: 8 },
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
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
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          opacity: 0.3,
        }}
      />
      
      <Container maxWidth="md" sx={{ position: "relative", zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Box sx={{ textAlign: "center" }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                mb: 3,
              }}
            >
              <Box
                sx={{
                  p: 2,
                  borderRadius: "50%",
                  backgroundColor: "rgba(255,255,255,0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Email sx={{ fontSize: 40, color: "white" }} />
              </Box>
            </Box>
            
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: "2rem", md: "2.5rem" },
                fontWeight: 700,
                mb: 2,
                color: "white",
              }}
            >
              Stay Updated
            </Typography>
            
            <Typography
              variant="subtitle1"
              sx={{
                fontSize: { xs: "1rem", md: "1.1rem" },
                mb: 4,
                opacity: 0.9,
                maxWidth: "500px",
                mx: "auto",
              }}
            >
              Subscribe to our newsletter and be the first to know about new products, 
              exclusive offers, and exciting updates.
            </Typography>

            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                gap: 2,
                maxWidth: "500px",
                mx: "auto",
                alignItems: "stretch",
              }}
            >
              <TextField
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                sx={{
                  flex: 1,
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "rgba(255,255,255,0.9)",
                    borderRadius: 2,
                    "& fieldset": {
                      border: "none",
                    },
                    "&:hover fieldset": {
                      border: "none",
                    },
                    "&.Mui-focused fieldset": {
                      border: "2px solid white",
                    },
                  },
                  "& .MuiInputBase-input": {
                    py: { xs: 2, sm: 1.5 },
                    fontSize: "1rem",
                  },
                }}
              />
              
              <Button
                type="submit"
                variant="contained"
                disabled={isLoading}
                endIcon={<Send />}
                sx={{
                  px: { xs: 4, sm: 3 },
                  py: { xs: 2, sm: 1.5 },
                  borderRadius: 2,
                  backgroundColor: "rgba(255,255,255,0.2)",
                  color: "white",
                  border: "2px solid white",
                  fontWeight: 600,
                  fontSize: "1rem",
                  textTransform: "none",
                  minWidth: { xs: "auto", sm: "140px" },
                  "&:hover": {
                    backgroundColor: "white",
                    color: "primary.main",
                    transform: "translateY(-2px)",
                  },
                  "&:disabled": {
                    backgroundColor: "rgba(255,255,255,0.1)",
                    color: "rgba(255,255,255,0.5)",
                    border: "2px solid rgba(255,255,255,0.3)",
                  },
                }}
              >
                {isLoading ? "Subscribing..." : "Subscribe"}
              </Button>
            </Box>

            <Typography
              variant="body2"
              sx={{
                mt: 3,
                opacity: 0.8,
                fontSize: "0.875rem",
              }}
            >
              We respect your privacy. Unsubscribe at any time.
            </Typography>
          </Box>
        </motion.div>
      </Container>

      <Snackbar
        open={showSnackbar}
        autoHideDuration={4000}
        onClose={() => setShowSnackbar(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={() => setShowSnackbar(false)} 
          severity={snackbarSeverity}
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default NewsletterSection;
