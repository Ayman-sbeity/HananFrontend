import CustomLabel from "../components/common/CustomLabel";
import CartDetails from "./CartPageSections/CratDetails";
import { Box, Typography, Alert } from "@mui/material";
import { useCartManagement } from "../hooks/useCartManagement";
import { useCart } from "../context/CartContext";

export default function CartPage() {
  const { cartItems, error, removeFromCart, updateQuantity, isAuthenticated } =
    useCartManagement();

  const { removeItem, fetchCart } = useCart();

  const formattedCartItems = cartItems.map((item) => {
    const productId =
      typeof item.product === "string"
        ? item.product
        : (item.product && (item.product as any)._id) || item._id || "";

    return {
      id: productId,
      image: item.image || "https://via.placeholder.com/150",
      name: item.name,
      size: "Standard",
      price: item.price,
      quantity: item.quantity,
    };
  });

  const handleRemoveItem = async (id: string) => {
    try {
      removeItem(id);
    } catch (err) {}

    try {
      await removeFromCart(id);
    } catch (err) {
      try {
        await fetchCart();
      } catch (e) {
        console.error("Failed to refetch cart after remove error", e);
      }
    }
  };

  const handleUpdateQuantity = async (id: string, quantity: number) => {
    await updateQuantity(id, quantity);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <CustomLabel
        text="Your Cart"
        variant="h4"
        component="h1"
        sx={{ textAlign: "center", mb: 4 }}
      />

      {error ? (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      ) : !isAuthenticated ? (
        <Box sx={{ textAlign: "center", py: 4 }}>
          <Alert severity="info" sx={{ mb: 2 }}>
            Please login to view and manage your cart
          </Alert>
          <Typography variant="h6">Sign in to start shopping</Typography>
        </Box>
      ) : cartItems.length === 0 ? (
        <Box sx={{ textAlign: "center", py: 4 }}>
          <Typography variant="h6">Your cart is empty</Typography>
        </Box>
      ) : (
        <CartDetails
          items={formattedCartItems}
          onRemoveItem={handleRemoveItem}
          onUpdateQuantity={handleUpdateQuantity}
        />
      )}
    </Box>
  );
}
