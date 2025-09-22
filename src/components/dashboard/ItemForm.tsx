import React, { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Card,
  CardMedia,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  FormControlLabel,
  Switch,
} from "@mui/material";
import { CloudUpload } from "@mui/icons-material";
import type { Item } from "../../services/api";

interface ItemFormProps {
  initialItem?: Item;
  onSubmit: (
    item: Omit<Item, "_id" | "id" | "createdAt" | "updatedAt">
  ) => void;
  isLoading?: boolean;
}

 export const CATEGORIES = [
  "Necklaces",
  "Rings",
  "Bracelets",
  "Earrings",
  "Accessories",
];

const ItemForm: React.FC<ItemFormProps> = ({
  initialItem,
  onSubmit,
  isLoading = false,
}) => {
  const [formData, setFormData] = useState({
    name: initialItem?.name || "",
    description: initialItem?.description || "",
    price: initialItem?.price || 0,
    stock: initialItem?.stock || 0,
    image: initialItem?.image || "",
    category: initialItem?.category || "",
    brand: initialItem?.brand || "",
    isActive: initialItem?.isActive !== undefined ? initialItem.isActive : true,
  });
  const [imagePreview, setImagePreview] = useState<string>(
    initialItem?.image || ""
  );
  const [errors, setErrors] = useState<string>("");

  const handleInputChange =
    (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const value =
        event.target.type === "number"
          ? Number(event.target.value)
          : event.target.value;
      setFormData((prev) => ({ ...prev, [field]: value }));
      if (errors) setErrors("");
    };

  const handleSelectChange = (field: string) => (event: any) => {
    setFormData((prev) => ({ ...prev, [field]: event.target.value }));
    if (errors) setErrors("");
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setImagePreview(result);
        setFormData((prev) => ({ ...prev, image: result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const url = event.target.value;
    setFormData((prev) => ({ ...prev, image: url }));
    setImagePreview(url);
  };

  const validateForm = () => {
    if (!formData.name.trim()) return "Product name is required";
    if (!formData.description.trim()) return "Description is required";
    if (!formData.category) return "Category is required";
    if (!formData.image) return "Image is required";
    if (formData.price <= 0) return "Price must be greater than 0";
    if (formData.stock < 0) return "Stock cannot be negative";
    return "";
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const validationError = validateForm();
    if (validationError) {
      setErrors(validationError);
      return;
    }

    onSubmit({ ...formData, quantity: formData.stock });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      {errors && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {errors}
        </Alert>
      )}

      <TextField
        label="Product Name"
        value={formData.name}
        onChange={handleInputChange("name")}
        fullWidth
        required
        sx={{ mb: 2 }}
      />

      <TextField
        label="Description"
        value={formData.description}
        onChange={handleInputChange("description")}
        fullWidth
        required
        multiline
        rows={3}
        sx={{ mb: 2 }}
      />

      <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
        <TextField
          label="Price ($)"
          type="number"
          value={formData.price}
          onChange={handleInputChange("price")}
          fullWidth
          required
          inputProps={{ min: 0, step: 0.01 }}
        />

        <TextField
          label="Stock Quantity"
          type="number"
          value={formData.stock}
          onChange={handleInputChange("stock")}
          fullWidth
          required
          inputProps={{ min: 0 }}
        />
      </Box>

      <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
        <FormControl fullWidth required>
          <InputLabel>Category</InputLabel>
          <Select
            value={formData.category}
            label="Category"
            onChange={handleSelectChange("category")}
          >
            {CATEGORIES.map((category) => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          label="Brand"
          value={formData.brand}
          onChange={handleInputChange("brand")}
          fullWidth
          sx={{ mb: 0 }}
        />
      </Box>

      <Typography variant="h6" sx={{ mb: 1 }}>
        Product Image
      </Typography>

      <Box sx={{ mb: 2 }}>
        <TextField
          label="Image URL"
          value={formData.image}
          onChange={handleImageUrlChange}
          fullWidth
          placeholder="Enter image URL or upload a file below"
          sx={{ mb: 2 }}
        />

        <Button
          component="label"
          variant="outlined"
          startIcon={<CloudUpload />}
          sx={{ mb: 2 }}
        >
          Upload Image File
          <input
            type="file"
            hidden
            accept="image/*"
            onChange={handleImageChange}
          />
        </Button>
      </Box>

      {imagePreview && (
        <Card sx={{ maxWidth: 300, mb: 2 }}>
          <CardMedia
            component="img"
            height="200"
            image={imagePreview}
            alt="Product preview"
            sx={{ objectFit: "contain" }}
          />
        </Card>
      )}

      <Box sx={{ mt: 2, mb: 3 }}>
        <FormControlLabel
          control={
            <Switch
              checked={formData.isActive}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, isActive: e.target.checked }))
              }
              color="primary"
            />
          }
          label={
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography variant="body1">
                {formData.isActive
                  ? "Active (Visible to customers)"
                  : "Inactive (Hidden from customers)"}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {formData.isActive
                  ? "Product will be displayed on the website"
                  : "Product will be hidden from the website"}
              </Typography>
            </Box>
          }
        />
      </Box>

      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={isLoading}
        sx={{ mt: 2 }}
      >
        {isLoading
          ? "Saving..."
          : initialItem
          ? "Update Product"
          : "Add Product"}
      </Button>
    </Box>
  );
};

export default ItemForm;
