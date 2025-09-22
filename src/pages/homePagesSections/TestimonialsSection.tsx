import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Rating from "@mui/material/Rating";
import { motion } from "framer-motion";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Verified Customer",
    rating: 5,
    comment: "Absolutely love the quality of products! Fast shipping and excellent customer service. Will definitely shop here again.",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b1-3?auto=format&fit=crop&w=150&q=80",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Regular Customer",
    rating: 5,
    comment: "Best online shopping experience I've had. The products arrived exactly as described and the packaging was perfect.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Happy Customer",
    rating: 5,
    comment: "Great variety of products and competitive prices. The customer support team was very helpful when I had questions.",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80",
  },
  {
    id: 4,
    name: "David Thompson",
    role: "Satisfied Buyer",
    rating: 4,
    comment: "High-quality products and reliable service. The website is easy to navigate and the checkout process is smooth.",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80",
  },
  {
    id: 5,
    name: "Lisa Anderson",
    role: "Loyal Customer",
    rating: 5,
    comment: "I've been shopping here for months and every purchase has exceeded my expectations. Highly recommended!",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80",
  },
  {
    id: 6,
    name: "James Wilson",
    role: "Recent Customer",
    rating: 5,
    comment: "Fast delivery, excellent packaging, and the product quality is outstanding. Will be ordering again soon!",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
  },
];

const TestimonialsSection: React.FC = () => {
  return (
    <Box
      component="section"
      sx={{
        py: { xs: 6, md: 8 },
        px: { xs: 2, md: 4 },
        backgroundColor: "#f8f9fa",
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
          What Our Customers Say
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
          Don't just take our word for it - hear from our satisfied customers
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
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={testimonial.id}
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
                position: "relative",
                "&:hover": {
                  boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
                  transform: "translateY(-2px)",
                },
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  top: 16,
                  right: 16,
                  color: "primary.main",
                  opacity: 0.3,
                }}
              >
                <FormatQuoteIcon sx={{ fontSize: 32 }} />
              </Box>
              
              <CardContent 
                sx={{ 
                  flexGrow: 1, 
                  p: { xs: 3, md: 4 },
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Box sx={{ mb: 3 }}>
                  <Rating
                    value={testimonial.rating}
                    readOnly
                    sx={{
                      mb: 2,
                      "& .MuiRating-iconFilled": {
                        color: "#ffd700",
                      },
                    }}
                  />
                  <Typography
                    variant="body1"
                    sx={{
                      fontSize: "1rem",
                      lineHeight: 1.6,
                      color: "text.secondary",
                      fontStyle: "italic",
                      mb: 3,
                    }}
                  >
                    "{testimonial.comment}"
                  </Typography>
                </Box>
                
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    mt: "auto",
                  }}
                >
                  <Avatar
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    sx={{
                      width: 50,
                      height: 50,
                      border: "2px solid",
                      borderColor: "primary.main",
                    }}
                  />
                  <Box>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 600,
                        color: "text.primary",
                        fontSize: "1rem",
                      }}
                    >
                      {testimonial.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: "text.secondary",
                        fontSize: "0.875rem",
                      }}
                    >
                      {testimonial.role}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </Box>
    </Box>
  );
};

export default TestimonialsSection;
