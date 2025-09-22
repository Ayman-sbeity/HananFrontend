import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Stack,
  styled,
  Chip,
  CardActionArea,
  Button,
  IconButton,
  Snackbar,
  Alert,
} from "@mui/material";
import { AddShoppingCart, Add, Remove } from "@mui/icons-material";
import { useState } from "react";
import CustomLabel from "../../components/common/CustomLabel";
import { useCartManagement } from "../../hooks/useCartManagement";
import type { Item } from "../../services/api";

const StyledCard = styled(Card)(({ theme }) => ({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  transition: "all 0.3s ease",
  border: "1px solid #eee",
  borderRadius: theme.spacing(2),
  overflow: "hidden",
  "&:hover": {
    transform: "translateY(-5px)",
    boxShadow: theme.shadows[4],
  },
}));

const ProductImage = styled(Box)({
  position: "relative",
  paddingTop: "100%", 
  overflow: "hidden",
  backgroundColor: "#f5f5f5",
});

const StyledChip = styled(Chip)(({ theme }) => ({
  backgroundColor: theme.palette.grey[100],
  fontSize: "0.75rem",
  height: 24,
  borderRadius: 12,
}));

interface ProductCardProps {
  product: Item;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart, isAuthenticated } = useCartManagement();
  const [quantity, setQuantity] = useState(1);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error" | "warning" | "info">("success");

  const handleAddToCart = async () => {
    if (!product._id) return;
    
    try {
      if (!isAuthenticated) {
        setSnackbarMessage("Please login to add items to your cart");
        setSnackbarSeverity("warning");
        setShowSnackbar(true);
        return;
      }
      
      await addToCart(product._id, {
        _id: product._id,
        name: product.name,
        price: product.price,
        image: product.image,
        category: product.category,
        brand: product.brand,
      }, quantity);
      
      setSnackbarMessage("Item added to cart successfully");
      setSnackbarSeverity("success");
      setShowSnackbar(true);
      setQuantity(1); 
    } catch (error) {
      setSnackbarMessage(error instanceof Error ? error.message : "Failed to add item to cart");
      setSnackbarSeverity("error");
      setShowSnackbar(true);
    }
  };

  const incrementQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(prev => prev + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const isOutOfStock = product.stock === 0;

  return (
    <Box
      sx={{
        flex: {
          xs: "1 1 100%",
          sm: "1 1 calc(50% - 16px)",
          md: "1 1 calc(33.333% - 16px)",
          lg: "1 1 calc(25% - 16px)",
        },
        minWidth: 0,
      }}
    >
      <StyledCard>
        <CardActionArea>
          <ProductImage>
            <CardMedia
              component="img"
              image={product.image}
              alt={product.name}
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                transition: "transform 0.3s ease",
                "&:hover": {
                  transform: "scale(1.05)",
                },
              }}
            />
            {isOutOfStock && (
              <Chip
                label="Out of Stock"
                color="error"
                size="small"
                sx={{
                  position: "absolute",
                  top: 12,
                  right: 12,
                  fontWeight: "bold",
                }}
              />
            )}
            {product.stock > 0 && product.stock <= 5 && (
              <Chip
                label={`Only ${product.stock} left`}
                color="warning"
                size="small"
                sx={{
                  position: "absolute",
                  top: 12,
                  right: 12,
                  fontWeight: "bold",
                }}
              />
            )}
          </ProductImage>
        </CardActionArea>

        <CardContent sx={{ flexGrow: 1, p: 2 }}>
          <Stack spacing={2}>
            <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
              <StyledChip label={product.category} size="small" />
              {product.brand && (
                <StyledChip label={product.brand} size="small" />
              )}
            </Stack>

            <CustomLabel
              text={product.name}
              variant="h6"
              component="h2"
              sx={{
                fontSize: "1rem",
                fontWeight: 600,
                color: "text.primary",
                lineHeight: 1.2,
                mb: 1,
                height: "2.4em",
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
              }}
            />

            <CustomLabel
              text={product.description}
              variant="body2"
              color="text.secondary"
              sx={{
                fontSize: "0.875rem",
                height: "3em",
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
              }}
            />

            <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between">
              <CustomLabel
                text={`$${product.price.toFixed(2)}`}
                variant="h6"
                color="primary"
                fontWeight="bold"
                sx={{ fontSize: "1.125rem" }}
              />
              <Typography variant="body2" color="text.secondary">
                Stock: {product.stock}
              </Typography>
            </Stack>

            <Stack spacing={2}>
              <Stack direction="row" alignItems="center" spacing={1}>
                <IconButton 
                  size="small" 
                  onClick={decrementQuantity}
                  disabled={quantity <= 1}
                >
                  <Remove />
                </IconButton>
                <Typography variant="body1" sx={{ minWidth: '30px', textAlign: 'center' }}>
                  {quantity}
                </Typography>
                <IconButton 
                  size="small" 
                  onClick={incrementQuantity}
                  disabled={quantity >= product.stock || isOutOfStock}
                >
                  <Add />
                </IconButton>
              </Stack>

              <Button
                variant="contained"
                startIcon={<AddShoppingCart />}
                onClick={handleAddToCart}
                disabled={isOutOfStock}
                fullWidth
                sx={{
                  borderRadius: 2,
                  textTransform: 'none',
                  fontWeight: 600,
                }}
              >
                {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
              </Button>
            </Stack>
          </Stack>
        </CardContent>
      </StyledCard>

      <Snackbar
        open={showSnackbar}
        autoHideDuration={3000}
        onClose={() => setShowSnackbar(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={() => setShowSnackbar(false)} 
          severity={snackbarSeverity} 
          sx={{ width: '100%' }}
        >
          {snackbarMessage || `${quantity} ${product.name} added to cart!`}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ProductCard;
