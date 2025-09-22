import React, { useState, useEffect } from "react";
import { Typography, Box, Paper, Alert, CircularProgress } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import ItemForm from "../../components/dashboard/ItemForm";
import { getItemById, editItem } from "../../services/api";
import type { Item } from "../../services/api";

const EditItem: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Item | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingProduct, setIsLoadingProduct] = useState(true);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) {
        setError("Product ID not found");
        setIsLoadingProduct(false);
        return;
      }

      try {
        const productData = await getItemById(id);
        setProduct(productData);
      } catch (err: any) {
        console.error("Error fetching product:", err);
        setError(err.response?.data?.message || "Failed to load product");
      } finally {
        setIsLoadingProduct(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleSubmit = async (
    itemData: Omit<Item, "_id" | "id" | "createdAt" | "updatedAt">
  ) => {
    if (!id) return;

    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      await editItem(id, itemData);
      setSuccess("Product updated successfully!");

      setTimeout(() => {
        navigate("/dash");
      }, 2000);
    } catch (err: any) {
      console.error("Error updating product:", err);
      setError(
        err.response?.data?.message ||
          "Failed to update product. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoadingProduct) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "50vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!product) {
    return (
      <Box>
        <Alert severity="error">Product not found or failed to load.</Alert>
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Edit Product: {product.name}
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
        <ItemForm
          initialItem={product}
          onSubmit={handleSubmit}
          isLoading={isLoading}
        />
      </Paper>
    </Box>
  );
};

export default EditItem;
