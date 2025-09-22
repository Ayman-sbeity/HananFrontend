import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  LocalOffer,
  Star,
  Percent,
} from "@mui/icons-material";

const offers = [
  {
    id: 1,
    title: "Free Shipping",
    subtitle: "On Orders Over $50",
    description: "Get free standard shipping on all orders above $50. No minimum quantity required.",
    icon: <LocalOffer sx={{ fontSize: 40 }} />,
    color: "#4CAF50",
    backgroundColor: "#E8F5E8",
    action: "Shop Now",
    highlight: "Limited Time",
  },
  {
    id: 2,
    title: "First Order Discount",
    subtitle: "20% Off Your First Purchase",
    description: "New customers get 20% off their first order. Use code WELCOME20 at checkout.",
    icon: <Star sx={{ fontSize: 40 }} />,
    color: "#FF9800",
    backgroundColor: "#FFF3E0",
    action: "Claim Offer",
    highlight: "New Customers",
  },
  {
    id: 3,
    title: "Bulk Savings",
    subtitle: "Buy More, Save More",
    description: "Get increasing discounts when you buy multiple items. Up to 30% off on bulk orders.",
    icon: <Percent sx={{ fontSize: 40 }} />,
    color: "#2196F3",
    backgroundColor: "#E3F2FD",
    action: "View Details",
    highlight: "Best Value",
  },

];

const SpecialOffersSection: React.FC = () => {
  const navigate = useNavigate();

  const handleOfferClick = (offerId: number) => {
    switch (offerId) {
      case 1:
      case 3:
      case 5:
        navigate("/products");
        break;
      case 2:
        navigate("/signup");
        break;
      case 4:
        navigate("/products");
        break;
      case 6:
        navigate("/signup");
        break;
      default:
        navigate("/products");
    }
  };

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
          Special Offers
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
          Don't miss out on these amazing deals and exclusive offers just for you
        </Typography>
      </Box>

     <Box
  sx={{
    display: "grid",
    gridTemplateColumns: {
      xs: "1fr",
      sm: "repeat(2, 1fr)",
      md: "repeat(2, 1fr)",
      lg: "repeat(3, 1fr)",
    },
    gap: { xs: 2, sm: 3, md: 4 },
    maxWidth: "1200px",
    mx: "auto",
    width: "100%",
  }}
>
        {offers.map((offer, index) => (
          <motion.div
            key={offer.id}
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

              <Chip
                label={offer.highlight}
                size="small"
                sx={{
                  position: "absolute",
                  top: 12,
                  right: 12,
                  backgroundColor: offer.color,
                  color: "white",
                  fontWeight: 600,
                  fontSize: "0.75rem",
                  zIndex: 1,
                }}
              />

              <CardContent 
                sx={{ 
                  flexGrow: 1, 
                  p: { xs: 3, md: 4 },
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                }}
              >

                <Box
                  sx={{
                    mb: 3,
                    p: 2,
                    borderRadius: "50%",
                    backgroundColor: offer.backgroundColor,
                    color: offer.color,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {offer.icon}
                </Box>

                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 600,
                    mb: 1,
                    color: "text.primary",
                  }}
                >
                  {offer.title}
                </Typography>

                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 500,
                    mb: 2,
                    color: offer.color,
                    fontSize: "1.1rem",
                  }}
                >
                  {offer.subtitle}
                </Typography>
                
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{
                    fontSize: "0.95rem",
                    lineHeight: 1.6,
                    mb: 3,
                    flexGrow: 1,
                  }}
                >
                  {offer.description}
                </Typography>

                <Button
                  variant="contained"
                  onClick={() => handleOfferClick(offer.id)}
                  sx={{
                    backgroundColor: offer.color,
                    color: "white",
                    px: 3,
                    py: 1,
                    borderRadius: 2,
                    textTransform: "none",
                    fontWeight: 600,
                    width: "100%",
                    "&:hover": {
                      backgroundColor: offer.color,
                      opacity: 0.9,
                      transform: "translateY(-1px)",
                    },
                  }}
                >
                  {offer.action}
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </Box>
    </Box>
  );
};

export default SpecialOffersSection;
