import {
  Box,
  Container,
  Paper,
  Stack,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  Divider,
  Button,
  Checkbox,
  Alert,
  CircularProgress,
} from "@mui/material";
import CustomLabel from "../components/common/CustomLabel";
import { useCartManagement } from "../hooks/useCartManagement";
import { useState } from "react";
import { createOrder } from "../services/api";
import { useNavigate } from "react-router-dom";

export default function CheckoutPage() {
  const { cartItems, error, clearCart } = useCartManagement();
  const [loading, setLoading] = useState(false);
  const [orderError, setOrderError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    phone: "",
    email: "",
    specialInstructions: "",
  });

  const [formErrors, setFormErrors] = useState({
    firstName: false,
    lastName: false,
    address: false,
    city: false, 
    phone: false,
    email: false,
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (formErrors[name as keyof typeof formErrors]) {
      setFormErrors({
        ...formErrors,
        [name]: false,
      });
    }
  };
  
  const formattedCartItems = cartItems.map(item => ({
    id: item.product,
    name: item.name,
    size: "Standard",
    price: item.price,
    quantity: item.quantity
  }));
  
  const subtotal = formattedCartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = 0;
  const total = subtotal + shipping;
  
  const handleSubmit = async () => {
    const newErrors = {
      firstName: !formData.firstName,
      lastName: !formData.lastName,
      address: !formData.address,
      city: !formData.city,
      phone: !formData.phone,
      email: !formData.email,
    };
    
    setFormErrors(newErrors);
    if (Object.values(newErrors).some(Boolean)) {
      setOrderError("Please fill in all required fields");
      return;
    }
    
    try {
      setLoading(true);
      setOrderError(null);
      
      const orderData = {
        address: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          country: "Lebanon",
          address: formData.address,
          city: formData.city,
          phone: formData.phone,
          email: formData.email,
          specialInstructions: formData.specialInstructions,
        },
        paymentMethod: paymentMethod as 'cash' | 'paypal' | 'card'
      };
      
      await createOrder(orderData);
      await clearCart();
      setSuccessMessage("Order placed successfully!");

      setTimeout(() => {
        navigate("/");
      }, 2000);
      
    } catch (err) {
      console.error("Failed to create order:", err);
      setOrderError("Failed to place order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  if (formattedCartItems.length === 0) {
    return (
      <Container maxWidth="lg" sx={{ py: 4, textAlign: 'center' }}>
        <CustomLabel
          text="Your cart is empty"
          variant="h5"
          sx={{ mb: 2 }}
        />
        <Button 
          variant="contained" 
          color="primary"
          href="/products"
        >
          Continue Shopping
        </Button>
      </Container>
    );
  }

  return (
    <Container
      maxWidth="lg"
      sx={{ py: { xs: 2, md: 4 }, px: { xs: 1, sm: 2, md: 3 } }}
    >
      <CustomLabel
        text="Checkout"
        variant="h4"
        component="h1"
        sx={{
          textAlign: "center",
          mb: { xs: 2, md: 4 },
          fontSize: { xs: "1.5rem", md: "2rem" },
        }}
      />

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
          gap: { xs: 2, md: 4 },
        }}
      >
        <Paper sx={{ p: { xs: 2, sm: 2.5, md: 3 } }}>
          <Stack spacing={{ xs: 2, md: 3 }}>
            <CustomLabel
              text="BILLING ADDRESS"
              variant="h6"
              sx={{
                fontWeight: 600,
                fontSize: { xs: "1rem", md: "1.25rem" },
              }}
            />

            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                gap: { xs: 2, sm: 2 },
              }}
            >
              <TextField
                fullWidth
                name="firstName"
                label="First Name"
                variant="outlined"
                size="small"
                value={formData.firstName}
                onChange={handleChange}
                error={formErrors.firstName}
                helperText={formErrors.firstName ? "First name is required" : ""}
              />
              <TextField
                fullWidth
                name="lastName"
                label="Last Name"
                variant="outlined"
                size="small"
                value={formData.lastName}
                onChange={handleChange}
                error={formErrors.lastName}
                helperText={formErrors.lastName ? "Last name is required" : ""}
              />
            </Box>

            <TextField
              fullWidth
              label="Country"
              value="Lebanon"
              InputProps={{
                readOnly: true,
              }}
              size="small"
            />

            <TextField
              fullWidth
              name="address"
              label="Address"
              placeholder="Address, street, apartment, etc."
              variant="outlined"
              size="small"
              value={formData.address}
              onChange={handleChange}
              error={formErrors.address}
              helperText={formErrors.address ? "Address is required" : ""}
            />

            <TextField 
              fullWidth 
              name="city"
              label="City" 
              variant="outlined" 
              size="small" 
              value={formData.city}
              onChange={handleChange}
              error={formErrors.city}
              helperText={formErrors.city ? "City is required" : ""}
            />

            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                gap: { xs: 2, sm: 2 },
              }}
            >
              <TextField
                fullWidth
                name="phone"
                label="Phone"
                variant="outlined"
                size="small"
                value={formData.phone}
                onChange={handleChange}
                error={formErrors.phone}
                helperText={formErrors.phone ? "Phone number is required" : ""}
              />
              <TextField
                fullWidth
                name="email"
                label="Email"
                type="email"
                variant="outlined"
                size="small"
                value={formData.email}
                onChange={handleChange}
                error={formErrors.email}
                helperText={formErrors.email ? "Email is required" : ""}
              />
            </Box>

            <TextField
              fullWidth
              name="specialInstructions"
              multiline
              rows={4}
              label="Special Instructions (optional)"
              variant="outlined"
              size="small"
              value={formData.specialInstructions}
              onChange={handleChange}
            />

            <FormControlLabel
              control={<Checkbox />}
              label="Ship to this address"
            />
          </Stack>
        </Paper>

        <Stack spacing={{ xs: 2, md: 3 }}>
          <Paper sx={{ p: { xs: 2, sm: 2.5, md: 3 } }}>
            <CustomLabel
              text="SUMMARY"
              variant="h6"
              sx={{
                fontWeight: 600,
                mb: { xs: 1.5, md: 2 },
                fontSize: { xs: "1rem", md: "1.25rem" },
              }}
            />

            <Stack spacing={2}>
              {formattedCartItems.map((item) => (
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: { xs: "column", sm: "row" },
                    alignItems: { xs: "flex-start", sm: "center" },
                    gap: { xs: 1, sm: 0 },
                  }}
                >
                  <Stack>
                    <CustomLabel text={item.name} variant="body2" />
                    <CustomLabel
                      text={`Size: ${item.size} × ${item.quantity}`}
                      variant="body2"
                      color="text.secondary"
                    />
                  </Stack>
                  <CustomLabel
                    text={`$${(item.price * item.quantity).toFixed(2)}`}
                    variant="body2"
                  />
                </Box>
              ))}

              <Divider />

              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <CustomLabel text="Cart Subtotal" variant="body2" />
                <CustomLabel
                  text={`$${subtotal.toFixed(2)}`}
                  variant="body2"
                  sx={{ fontWeight: 500 }}
                />
              </Box>

              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <CustomLabel text="Free Shipping" variant="body2" />
                <CustomLabel text="$0.00" variant="body2" />
              </Box>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  borderTop: 1,
                  borderColor: "divider",
                  pt: 2,
                }}
              >
                <CustomLabel
                  text="Order Total"
                  variant="body1"
                  sx={{ fontWeight: 600 }}
                />
                <CustomLabel
                  text={`$${total.toFixed(2)}`}
                  variant="body1"
                  color="error"
                  sx={{ fontWeight: 600 }}
                />
              </Box>
            </Stack>
          </Paper>

          <Paper sx={{ p: { xs: 2, md: 3 } }}>
            <CustomLabel
              text="PAYMENT METHOD"
              variant="h6"
              sx={{ fontWeight: 600, mb: 2 }}
            />

            <RadioGroup defaultValue="cash">
              <FormControlLabel
                value="cash"
                control={
                  <Radio 
                    checked={paymentMethod === 'cash'} 
                    onChange={() => setPaymentMethod('cash')}
                  />
                }
                label={
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <CustomLabel text="Cash on Delivery" />
                  </Box>
                }
              />
            </RadioGroup>
          </Paper>

          {orderError && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {orderError}
            </Alert>
          )}
          
          {successMessage && (
            <Alert severity="success" sx={{ mb: 2 }}>
              {successMessage}
            </Alert>
          )}
          
          <Button
            variant="contained"
            color="error"
            size="large"
            fullWidth
            sx={{
              py: 1.5,
              fontSize: "1.1rem",
              textTransform: "none",
            }}
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Checkout"
            )}
          </Button>
        </Stack>
      </Box>
    </Container>
  );
}
