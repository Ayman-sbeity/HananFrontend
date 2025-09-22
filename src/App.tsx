import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import CartPage from "./pages/CartPage";
import ContactPage from "./pages/ContactPage";
import MainLayout from "./components/layout/MainLayout";
import CheckoutPage from "./pages/CheckoutPage";
import Dashboard from "./pages/dashboard/Dashboard";
import AddItem from "./pages/dashboard/AddItem";
import EditItem from "./pages/dashboard/EditItem";
import Users from "./pages/dashboard/Users";
import Contacts from "./pages/dashboard/Contacts";
import Orders from "./pages/dashboard/Orders";
import ProductsManagement from "./pages/dashboard/ProductsManagement";
import Layout from "./components/DashboardCommon/Layout";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import AdminRoute from "./components/common/AdminRoute";
import ProtectedRoute from "./components/common/ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
        <Routes>

          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />

          <Route path="/dash" element={
            <AdminRoute>
              <Layout />
            </AdminRoute>
          }>
            <Route index element={<Dashboard />} />
            <Route path="add-item" element={<AddItem />} />
            <Route path="edit-item/:id" element={<EditItem />} />
            <Route path="products" element={<ProductsManagement />} />
            <Route path="users" element={<Users />} />
            <Route path="contacts" element={<Contacts />} />
            <Route path="orders" element={<Orders />} />
          </Route>

          <Route path="/" element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path="products" element={<ProductsPage />} />
            <Route path="contact" element={<ContactPage />} />
            <Route path="cart" element={<CartPage />} />
            <Route path="checkout" element={
              <ProtectedRoute>
                <CheckoutPage />
              </ProtectedRoute>
            } />
          </Route>
        </Routes>
      </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
