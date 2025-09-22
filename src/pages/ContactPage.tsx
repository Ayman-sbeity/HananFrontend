import React, { useState } from "react";
import { API_BASE_URL } from "../services/api";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Alert,
  CircularProgress,
} from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledContainer = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(8),
  paddingBottom: theme.spacing(8),
  maxWidth: "800px",
}));

const ContactSection = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(6),
}));

const FormPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  backgroundColor: "white",
}));

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const response = await fetch(`${API_BASE_URL}/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      setSuccess(true);
      setFormData({
        name: "",
        email: "",
        phoneNumber: "",
        message: "",
      });
    } catch (err: any) {
      setError(err.message || "Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <StyledContainer>
      <Box textAlign="center" mb={6}>
        <Typography
          variant="h3"
          component="h1"
          fontWeight="bold"
          letterSpacing="0.1em"
          mb={2}
          sx={{ textTransform: "uppercase", color: "#333" }}
        >
          CONTACT US
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          maxWidth="600px"
          mx="auto"
        >
          Hey! We are located in Washington and Texas. Feel free to use the
          contact form to the right to reach out to us, or write us the old fashion
          way.
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 4,
        }}
      >

        <Box sx={{ flex: { xs: "none", md: "0 0 40%" } }}>
          <ContactSection>
            <Typography
              variant="h6"
              fontWeight="bold"
              mb={2}
              sx={{ textTransform: "uppercase", letterSpacing: "0.05em" }}
            >
              SNAIL MAIL
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Beardbrand
            </Typography>
            <Typography variant="body2" color="text.secondary">
              PO Box 13124
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Austin, TX 78711
            </Typography>
          </ContactSection>

          <ContactSection>
            <Typography
              variant="h6"
              fontWeight="bold"
              mb={2}
              sx={{ textTransform: "uppercase", letterSpacing: "0.05em" }}
            >
              ELECTRONIC MAIL
            </Typography>
            <Typography variant="body2" color="text.secondary">
              support@beardbrand.com
            </Typography>
          </ContactSection>

          <ContactSection>
            <Typography
              variant="h6"
              fontWeight="bold"
              mb={2}
              sx={{ textTransform: "uppercase", letterSpacing: "0.05em" }}
            >
              PHONE SUPPORT
            </Typography>
            <Typography variant="body2" color="text.secondary" mb={1}>
              Hours: 9am - 5pm (CST) Monday - Friday
            </Typography>
            <Typography variant="body2" color="text.secondary">
              844-662-3273
            </Typography>
          </ContactSection>
        </Box>

        <Box sx={{ flex: 1 }}>
          <FormPaper elevation={1}>
            {success && (
              <Alert severity="success" sx={{ mb: 3 }}>
                Thank you for contacting us! We'll get back to you soon.
              </Alert>
            )}

            {error && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {error}
              </Alert>
            )}

            <form onSubmit={handleSubmit}>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                <TextField
                  fullWidth
                  label="NAME"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  variant="outlined"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      backgroundColor: "#f8f9fa",
                    },
                  }}
                />

                <TextField
                  fullWidth
                  label="EMAIL"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  variant="outlined"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      backgroundColor: "#f8f9fa",
                    },
                  }}
                />

                <TextField
                  fullWidth
                  label="PHONE NUMBER"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  variant="outlined"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      backgroundColor: "#f8f9fa",
                    },
                  }}
                />

                <TextField
                  fullWidth
                  label="MESSAGE"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  multiline
                  rows={4}
                  variant="outlined"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      backgroundColor: "#f8f9fa",
                    },
                  }}
                />

                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  disabled={loading}
                  sx={{
                    backgroundColor: "#333",
                    color: "white",
                    padding: "12px 48px",
                    fontSize: "1rem",
                    fontWeight: "bold",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    "&:hover": {
                      backgroundColor: "#555",
                    },
                    "&:disabled": {
                      backgroundColor: "#ccc",
                    },
                  }}
                >
                  {loading ? (
                    <>
                      <CircularProgress size={20} sx={{ mr: 1, color: "white" }} />
                      Sending...
                    </>
                  ) : (
                    "Send Message"
                  )}
                </Button>
              </Box>
            </form>
          </FormPaper>
        </Box>
      </Box>
    </StyledContainer>
  );
};

export default ContactPage;
