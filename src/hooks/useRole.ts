import { useAuth } from "../context/AuthContext";

export const useIsAdmin = () => {
  const { user, isAuthenticated } = useAuth();
  return isAuthenticated && user?.role === "admin";
};

export const useUserRole = () => {
  const { user } = useAuth();
  return user?.role || null;
};
