import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Stack,
  TextField,
  Button,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CustomLabel from "../../components/common/CustomLabel";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

interface CartItem {
  id: string;
  image: string;
  name: string;
  size?: string;
  price: number;
  quantity: number;
}

interface CartDetailsProps {
  items: CartItem[];
  onRemoveItem: (id: string) => void;
  onUpdateQuantity: (id: string, quantity: number) => void;
}

const CartDetails = ({
  items,
  onRemoveItem,
  onUpdateQuantity,
}: CartDetailsProps) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { isAuthenticated } = useAuth();

  const handleCheckout = () => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    navigate("/checkout", {
      state: {
        cartItems: items.map((item) => ({
          id: item.id,
          name: item.name,
          size: item.size || "",
          price: item.price,
          quantity: item.quantity,
          image: item.image,
        })),
      },
    });
  };

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = subtotal > 35 ? 0 : 5.99;
  const total = subtotal + shipping;

  const MobileCartItem = ({ item }: { item: CartItem }) => (
    <Paper sx={{ p: 2, mb: 2 }}>
      <Stack spacing={2}>
        <Stack direction="row" spacing={2}>
          <Box
            component="img"
            src={item.image}
            alt={item.name}
            sx={{
              width: 80,
              height: 100,
              objectFit: "cover",
              borderRadius: 1,
            }}
          />
          <Stack spacing={1} flex={1}>
            <CustomLabel
              text={item.name}
              variant="body1"
              sx={{ fontWeight: 500 }}
            />
            {item.size && (
              <CustomLabel
                text={`Size: ${item.size}`}
                variant="body2"
                color="text.secondary"
              />
            )}
          </Stack>
          <IconButton
            size="small"
            onClick={() => onRemoveItem(item.id)}
            sx={{ alignSelf: "flex-start" }}
          >
            <CloseIcon />
          </IconButton>
        </Stack>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <TextField
            type="number"
            value={item.quantity}
            onChange={(e) =>
              onUpdateQuantity(item.id, parseInt(e.target.value, 10))
            }
            inputProps={{ min: 1, max: 99 }}
            sx={{ width: 70 }}
            size="small"
          />
          <CustomLabel
            text={`$${(item.price * item.quantity).toFixed(2)}`}
            variant="body1"
            sx={{ fontWeight: 600 }}
          />
        </Stack>
      </Stack>
    </Paper>
  );

  return (
    <Box sx={{ width: "100%", mt: 4 }}>
      <Box
        sx={{
          display: "flex",
          gap: { xs: 2, md: 3 },
          flexDirection: { xs: "column", md: "row" },
          maxWidth: "100%",
        }}
      >
        <Box sx={{ flex: 2 }}>
          {isMobile ? (
            <Stack>
              {items.map((item) => (
                <MobileCartItem key={item.id} item={item} />
              ))}
            </Stack>
          ) : (
            <Paper sx={{ overflow: "auto" }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>PRODUCT</TableCell>
                    <TableCell align="center">Qty</TableCell>
                    <TableCell align="right">TOTAL</TableCell>
                    <TableCell width="50px"></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {items.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <Stack direction="row" spacing={2} alignItems="center">
                          <Box
                            component="img"
                            src={item.image}
                            alt={item.name}
                            sx={{
                              width: 80,
                              height: 100,
                              objectFit: "cover",
                              borderRadius: 1,
                            }}
                          />
                          <Stack spacing={0.5}>
                            <CustomLabel
                              text={item.name}
                              variant="body1"
                              sx={{ fontWeight: 500 }}
                            />
                            {item.size && (
                              <CustomLabel
                                text={`Size: ${item.size}`}
                                variant="body2"
                                color="text.secondary"
                              />
                            )}
                          </Stack>
                        </Stack>
                      </TableCell>
                      <TableCell align="center">
                        <TextField
                          type="number"
                          value={item.quantity}
                          onChange={(e) =>
                            onUpdateQuantity(
                              item.id,
                              parseInt(e.target.value, 10)
                            )
                          }
                          inputProps={{ min: 1, max: 99 }}
                          sx={{ width: 60 }}
                        />
                      </TableCell>
                      <TableCell align="right">
                        <CustomLabel
                          text={`$${(item.price * item.quantity).toFixed(2)}`}
                          variant="body1"
                          sx={{ fontWeight: 500 }}
                        />
                      </TableCell>
                      <TableCell>
                        <IconButton
                          size="small"
                          onClick={() => onRemoveItem(item.id)}
                          aria-label="remove item"
                        >
                          <CloseIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Paper>
          )}
        </Box>

        <Paper
          sx={{
            flex: { md: 1 },
            p: { xs: 2, sm: 3 },
            height: "fit-content",
            position: { xs: "sticky", md: "static" },
            bottom: { xs: 0, md: "auto" },
            zIndex: 10,
            boxShadow: {
              xs: "0px -4px 10px rgba(0, 0, 0, 0.1)",
              md: 1,
            },
            borderRadius: {
              xs: "16px 16px 0 0",
              md: 1,
            },
            backgroundColor: "background.paper",
          }}
        >
          <CustomLabel
            text="SUMMARY"
            variant="h6"
            sx={{
              mb: { xs: 2, md: 3 },
              fontWeight: 600,
              display: { xs: "none", md: "block" },
            }}
          />
          <Stack spacing={2}>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <CustomLabel text="Subtotal" variant="body1" />
              <CustomLabel
                text={`$${subtotal.toFixed(2)}`}
                variant="body1"
                sx={{ fontWeight: 500 }}
              />
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <CustomLabel text="Shipping" variant="body1" />
              <CustomLabel
                text={shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}
                variant="body1"
                sx={{ fontWeight: 500 }}
              />
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
              <CustomLabel text="Grand Total" variant="body1" />
              <CustomLabel
                text={`$${total.toFixed(2)}`}
                variant="body1"
                sx={{ fontWeight: 600 }}
              />
            </Box>
            <TextField
              multiline
              rows={3}
              placeholder="Special Instructions"
              fullWidth
              sx={{ mt: 2 }}
            />
            <Button
              variant="contained"
              color="primary"
              fullWidth
              size={isMobile ? "large" : "medium"}
              onClick={handleCheckout}
              sx={{
                mt: 2,
                py: { xs: 1.5, md: 1 },
                fontSize: { xs: "1rem", md: "0.875rem" },
              }}
            >
              {isAuthenticated ? "Checkout" : "Login to Checkout"}
            </Button>
          </Stack>
        </Paper>
      </Box>
    </Box>
  );
};

export default CartDetails;
