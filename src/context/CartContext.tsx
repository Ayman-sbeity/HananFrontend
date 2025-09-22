import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import { API_BASE_URL } from "../services/api";

export interface CartItem {
  product: string;
  _id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  category?: string;
  brand?: string;
}

interface Cart {
  _id?: string;
  items: CartItem[];
  totalPrice: number;
  user?: string;
}

interface CartContextType {
  cartItems: CartItem[];
  loading: boolean;
  error: string | null;
  addToCart: (
    productId: string,
    _item: Omit<CartItem, "quantity" | "product">,
    quantity?: number
  ) => Promise<void>;
  removeFromCart: (id: string) => Promise<void>;
  updateQuantity: (id: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  getCartTotal: () => number;
  getCartItemsCount: () => number;
  fetchCart: () => Promise<void>;
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  getCart: () => CartItem[];
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

interface CartProviderProps {
  children: React.ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();
  const GUEST_CART_STORAGE_KEY = "guest_cart";

  useEffect(() => {
    if (user && user._id) {
      fetchCart();
    } else {
      setCartItems([]);
    }
  }, [user]);

  useEffect(() => {
    if (!user && cartItems.length > 0) {
      localStorage.setItem(GUEST_CART_STORAGE_KEY, JSON.stringify(cartItems));
    }
  }, [cartItems, user]);

  const fetchCart = async () => {
    if (!user || !user._id) {
      setCartItems([]);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_BASE_URL}/cart/user/${user._id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        credentials: "include",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Could not fetch cart");
      }

      const data: Cart = await response.json();
      setCartItems(data.items || []);
    } catch (err) {
      console.error("Error fetching cart:", err);
      setError(err instanceof Error ? err.message : "Failed to fetch cart");
      
      setCartItems([]);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (
    productId: string,
    _item: Omit<CartItem, "quantity" | "product">,
    quantity = 1
  ) => {
    setLoading(true);
    setError(null);

    try {
      if (!user) {
        setError("Please login to add items to your cart");
        return;
      }
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_BASE_URL}/cart/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        credentials: "include",
        body: JSON.stringify({ productId, quantity }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Could not add item to cart");
      }

      const data: Cart = await response.json();
      setCartItems(data.items || []);
    } catch (err) {
      console.error("Error adding to cart:", err);
      setError(err instanceof Error ? err.message : "Failed to add to cart");
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (id: string, quantity: number) => {
    setLoading(true);
    setError(null);

    try {
      if (!user) {
        if (quantity <= 0) {
          setCartItems((prevItems) =>
            prevItems.filter((item) => item.product !== id)
          );
        } else {
          setCartItems((prevItems) =>
            prevItems.map((item) =>
              item.product === id ? { ...item, quantity } : item
            )
          );
        }
        return;
      }
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_BASE_URL}/cart/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        credentials: "include",
        body: JSON.stringify({ productId: id, quantity }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Could not update cart");
      }

      const data: Cart = await response.json();
      setCartItems(data.items || []);
    } catch (err) {
      console.error("Error updating cart:", err);
      setError(err instanceof Error ? err.message : "Failed to update cart");
    } finally {
      setLoading(false);
    }
  };

  const removeFromCart = async (id: string) => {
    setLoading(true);
    setError(null);

    try {
      if (!user) {
        setCartItems((prevItems) =>
          prevItems.filter((item) => item.product !== id)
        );
        return;
      }

      const token = localStorage.getItem("token");
      const response = await fetch(`${API_BASE_URL}/cart/item/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        credentials: "include",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Could not remove item from cart");
      }

      const data: Cart = await response.json();
      setCartItems(data.items || []);
    } catch (err) {
      console.error("Error removing from cart:", err);
      setError(
        err instanceof Error ? err.message : "Failed to remove from cart"
      );
    } finally {
      setLoading(false);
    }
  };

  const clearCart = async () => {
    setLoading(true);
    setError(null);

    try {
      if (!user) {
        setCartItems([]);
        localStorage.removeItem(GUEST_CART_STORAGE_KEY);
        return;
      }

      const token = localStorage.getItem("token");
      const response = await fetch(`${API_BASE_URL}/cart/clear`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        credentials: "include",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Could not clear cart");
      }

      setCartItems([]);
    } catch (err) {
      console.error("Error clearing cart:", err);
      setError(err instanceof Error ? err.message : "Failed to clear cart");
    } finally {
      setLoading(false);
    }
  };

  const addItem = (item: CartItem) => {
    const existingItemIndex = cartItems.findIndex(
      (i) => i.product === item.product
    );

    if (existingItemIndex >= 0) {
      const updatedItems = [...cartItems];
      updatedItems[existingItemIndex].quantity += item.quantity;
      setCartItems(updatedItems);
    } else {
      setCartItems((prevItems) => [...prevItems, item]);
    }

    if (!user) {
      const updatedCart =
        existingItemIndex >= 0
          ? cartItems.map((i, index) =>
              index === existingItemIndex
                ? { ...i, quantity: i.quantity + item.quantity }
                : i
            )
          : [...cartItems, item];

      localStorage.setItem(GUEST_CART_STORAGE_KEY, JSON.stringify(updatedCart));
    }
  };

  const removeItem = (id: string) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.product !== id)
    );

    if (!user) {
      const updatedCart = cartItems.filter((item) => item.product !== id);
      localStorage.setItem(GUEST_CART_STORAGE_KEY, JSON.stringify(updatedCart));
    }
  };

  const getCart = (): CartItem[] => {
    return cartItems;
  };

  const getCartTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const getCartItemsCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const value: CartContextType = {
    cartItems,
    loading,
    error,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartItemsCount,
    fetchCart,
    addItem,
    removeItem,
    getCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
