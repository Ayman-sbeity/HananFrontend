import React, { useState } from "react";
import { Typography, Box, Paper, Alert } from "@mui/material";
import ItemForm from "../../components/dashboard/ItemForm";
import { useNavigate } from "react-router-dom";
import { addItem } from "../../services/api";
import type { Item } from "../../services/api";

const AddItem: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  const handleSubmit = async (
    itemData: Omit<Item, "_id" | "id" | "createdAt" | "updatedAt">
  ) => {
    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      await addItem(itemData);
      setSuccess("Product added successfully!");
      setTimeout(() => {
        navigate("/dash");
      }, 2000);
    } catch (err: any) {
      console.error("Error adding product:", err);
      setError(
        err.response?.data?.message ||
          "Failed to add product. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Add New Product
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {success && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {success}
        </Alert>
      )}

      <Paper sx={{ p: 3, mt: 2 }}>
        <ItemForm onSubmit={handleSubmit} isLoading={isLoading} />
      </Paper>
    </Box>
  );
};

export default AddItem;
