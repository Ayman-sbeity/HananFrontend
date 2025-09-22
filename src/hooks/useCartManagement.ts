import { useCallback } from "react";
import { useCart } from "../context/CartContext";
import type { CartItem } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

interface UseCartManagementReturn {
  addToCart: (
    productId: string,
    item: Omit<CartItem, "quantity" | "product">,
    quantity?: number
  ) => Promise<void>;
  removeFromCart: (id: string) => Promise<void>;
  updateQuantity: (id: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  getCartTotal: () => number;
  cartItems: CartItem[];
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  itemCount: number;
}

export function useCartManagement(): UseCartManagementReturn {
  const { isAuthenticated } = useAuth();
  const {
    cartItems,
    loading,
    error,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartItemsCount,
  } = useCart();

  const handleAddToCart = useCallback(
    async (
      productId: string,
      item: Omit<CartItem, "quantity" | "product">,
      quantity = 1
    ) => {
      if (!isAuthenticated) {
        throw new Error("Please login to add items to your cart");
      }
      await addToCart(productId, item, quantity);
    },
    [addToCart, isAuthenticated]
  );

  const handleRemoveFromCart = useCallback(
    async (id: string) => {
      await removeFromCart(id);
    },
    [removeFromCart]
  );

  const handleUpdateQuantity = useCallback(
    async (id: string, quantity: number) => {
      await updateQuantity(id, quantity);
    },
    [updateQuantity]
  );

  const handleClearCart = useCallback(async () => {
    await clearCart();
  }, [clearCart]);

  return {
    addToCart: handleAddToCart,
    removeFromCart: handleRemoveFromCart,
    updateQuantity: handleUpdateQuantity,
    clearCart: handleClearCart,
    getCartTotal,
    cartItems,
    loading,
    error,
    isAuthenticated,
    itemCount: getCartItemsCount(),
  };
}
