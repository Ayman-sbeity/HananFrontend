import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export { API_BASE_URL };

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 1000000,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === 'ECONNABORTED') {
      console.warn('Request timeout - API call took too long');
    }
    return Promise.reject(error);
  }
);

export interface Item {
  _id?: string;
  id?: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  image: string;
   quantity: number;
  category: string;
  brand?: string;
  rating?: number;
  numReviews?: number;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface User {
  _id?: string;
  name: string;
  email: string;
  password?: string;
  role: string;
  createdBy?: string;
  createdAt?: string;
  updatedAt?: string;
}

interface ProductFilterOptions {
  showAll?: boolean;
  minPrice?: number;
  maxPrice?: number;
  sort?: string;
  category?: string;
  search?: string;
  includeInactive?: boolean;
}

export const fetchItems = async (options: ProductFilterOptions = { showAll: true }) => {
  const params: Record<string, any> = {};
  if (typeof options.showAll !== 'undefined') params.showAll = options.showAll ? 'true' : 'false';
  if (typeof options.includeInactive !== 'undefined') params.includeInactive = options.includeInactive ? 'true' : 'false';
  if (typeof options.minPrice !== 'undefined') params.minPrice = options.minPrice;
  if (typeof options.maxPrice !== 'undefined') params.maxPrice = options.maxPrice;
  if (typeof options.sort !== 'undefined') params.sort = options.sort;
  if (typeof options.category !== 'undefined') params.category = options.category;
  if (typeof options.search !== 'undefined') params.search = options.search;

  const response = await api.get('/products', { params });
  return response.data.products || response.data;
};

export const getItemById = async (id: string) => {
  const response = await api.get(`/products/${id}`);
  return response.data;
};

export const getProductsCount = async () => {
  const response = await api.get('/products/count');
  return response.data;
};

export const addItem = async (item: Omit<Item, '_id' | 'id' | 'createdAt' | 'updatedAt'>) => {
  const response = await api.post('/products', item);
  try {
    // mark invalidation in localStorage (helps cross-tab) and dispatch an in-window event
    const key = 'product-items';
    try {
      localStorage.setItem(`cacheInvalidation:${key}`, String(Date.now()));
    } catch (e) {
      // ignore localStorage errors
    }
    window.dispatchEvent(new CustomEvent('cacheInvalidated', { detail: { key } }));
  } catch (e) {
    // ignore in non-browser environments
  }
  return response.data;
};

export const editItem = async (id: string, item: Partial<Item>) => {
  const response = await api.put(`/products/${id}`, item);
  try {
    const key = 'product-items';
    try {
      localStorage.setItem(`cacheInvalidation:${key}`, String(Date.now()));
    } catch (e) {}
    window.dispatchEvent(new CustomEvent('cacheInvalidated', { detail: { key } }));
  } catch (e) {
    // ignore
  }
  return response.data;
};

export const deleteItem = async (id: string) => {
  const response = await api.delete(`/products/${id}`);
  try {
    const key = 'product-items';
    try {
      localStorage.setItem(`cacheInvalidation:${key}`, String(Date.now()));
    } catch (e) {}
    window.dispatchEvent(new CustomEvent('cacheInvalidated', { detail: { key } }));
  } catch (e) {
    // ignore
  }
  return response.data;
};

export const registerUser = async (user: { name: string; email: string; password: string; role: string }) => {
  console.log('registerUser called with:', user);
  console.log('API URL:', `${API_BASE_URL}/users/register`);
  const response = await api.post('/users/register', user);
  console.log('registerUser response:', response.data);
  return response.data;
};

export const loginUser = async (user: { email: string; password: string }) => {
  const response = await api.post('/users/login', user);
  return response.data;
};

export const fetchUsers = async () => {
  const response = await api.get('/users');
  return response.data;
};

export const getUsersCount = async () => {
  const response = await api.get('/users/count');
  return response.data;
};

export const getCurrentUser = async () => {
  const response = await api.get('/users/me');
  return response.data;
};

export const getUserById = async (id: string) => {
  const response = await api.get(`/users/${id}`);
  return response.data;
};

export const updateUser = async (id: string, userData: Partial<User>) => {
  const response = await api.put(`/users/${id}`, userData);
  return response.data;
};

export const deleteUser = async (id: string) => {
  const response = await api.delete(`/users/${id}`);
  return response.data;
};

export const fetchCart = async () => {
  const response = await api.get('/cart', { withCredentials: true });
  return response.data;
};

export const addToCart = async (productId: string, quantity: number = 1) => {
  const response = await api.post('/cart/add', { productId, quantity }, { withCredentials: true });
  return response.data;
};

export const updateCartItem = async (productId: string, quantity: number) => {
  const response = await api.put('/cart/update', { productId, quantity }, { withCredentials: true });
  return response.data;
};

export const removeCartItem = async (productId: string) => {
  const response = await api.delete(`/cart/item/${productId}`, { withCredentials: true });
  return response.data;
};

export const clearCart = async () => {
  const response = await api.delete('/cart/clear', { withCredentials: true });
  return response.data;
};

export interface OrderAddress {
  firstName: string;
  lastName: string;
  country: string;
  address: string;
  city: string;
  phone: string;
  email: string;
  specialInstructions?: string;
}

export interface OrderItem {
  product: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

export interface Order {
  _id?: string;
  user?: string;
  items: OrderItem[];
  address: OrderAddress;
  subtotal: number;
  shipping: number;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  paymentMethod: 'cash' | 'paypal' | 'card';
  isPaid: boolean;
  paidAt?: string;
  createdAt?: string;
  updatedAt?: string;
}

export const createOrder = async (orderData: { address: OrderAddress, paymentMethod: 'cash' | 'paypal' | 'card' }) => {
  const response = await api.post('/orders', orderData, { withCredentials: true });
  return response.data;
};

export const fetchOrders = async () => {
  const response = await api.get('/orders');
  return response.data;
};

export const getOrdersCount = async () => {
  const response = await api.get('/orders/count');
  return response.data;
};

export const fetchUserOrders = async () => {
  const response = await api.get('/orders/myorders');
  return response.data;
};

export const getOrderById = async (id: string) => {
  const response = await api.get(`/orders/${id}`);
  return response.data;
};

export const updateOrderStatus = async (id: string, status: string) => {
  const response = await api.put(`/orders/${id}/status`, { status });
  return response.data;
};

export const deleteOrder = async (id: string) => {
  const response = await api.delete(`/orders/${id}`);
  return response.data;
};
