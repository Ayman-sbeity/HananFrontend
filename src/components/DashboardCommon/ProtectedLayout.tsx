import React from "react";
import Layout from "./Layout";
import AdminRoute from "../common/AdminRoute";

const ProtectedLayout: React.FC = () => {
  return (
    <AdminRoute>
      <Layout />
    </AdminRoute>
  );
};

export default ProtectedLayout;
