import React, { useState, useEffect } from "react";
import {
  Typography,
  Box,
  CircularProgress,
  Alert,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  IconButton,
  Avatar,
  Snackbar,
  Tooltip,
  Pagination,
  Skeleton,
} from "@mui/material";
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
  Refresh as RefreshIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { fetchItems, deleteItem, editItem } from "../../services/api";
import type { Item } from "../../services/api";
import { useCachedData } from "../../hooks/useCachedData";

const ITEMS_PER_PAGE = 10;

const ItemTable: React.FC = () => {
  const navigate = useNavigate();

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<Item | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [processingId, setProcessingId] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<
    "all" | "active" | "inactive"
  >("all");
  const [page, setPage] = useState(1);
  const [toast, setToast] = useState<{
    open: boolean;
    message: string;
    type: "success" | "error";
  }>({
    open: false,
    message: "",
    type: "success",
  });

  const {
    data: fetchedItems,
    loading,
    error: fetchError,
    refresh: refreshItems,
  } = useCachedData<Item[]>(
    "product-items",
    () => fetchItems({ includeInactive: true }),
    5 * 60 * 1000
  );

  const filteredItems = fetchedItems
    ? fetchedItems.filter((item) => {
        if (activeFilter === "all") return true;
        if (activeFilter === "active") return item.isActive === true;
        if (activeFilter === "inactive") return item.isActive === false;
        return true;
      })
    : [];

  const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE);
  const paginatedItems = filteredItems.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  const activeItemsCount = fetchedItems
    ? fetchedItems.filter((item) => item.isActive === true).length
    : 0;
  const inactiveItemsCount = fetchedItems
    ? fetchedItems.filter((item) => item.isActive === false).length
    : 0;

  useEffect(() => {
    setPage(1);
  }, [activeFilter]);

  useEffect(() => {
    refreshItems();
  }, []);

  const handleDeleteClick = (item: Item) => {
    setItemToDelete(item);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!itemToDelete?._id) return;

    try {
      setDeleting(true);
      await deleteItem(itemToDelete._id);
      setDeleteDialogOpen(false);
      setItemToDelete(null);
      showToast("Product deleted successfully", "success");
      
      refreshItems();
    } catch (err: any) {
      console.error("Error deleting item:", err);
      showToast("Failed to delete product", "error");
    } finally {
      setDeleting(false);
    }
  };

  const handleToggleActive = async (item: Item) => {
    if (!item._id) return;

    try {
      setProcessingId(item._id);

      const updatedItem = await editItem(item._id, {
        ...item,
        isActive: !item.isActive,
      });
      refreshItems();

      showToast(
        `Product ${
          updatedItem.isActive ? "activated" : "deactivated"
        } successfully`,
        "success"
      );
    } catch (err: any) {
      console.error("Error updating item status:", err);
      showToast(`Failed to update product status`, "error");
    } finally {
      setProcessingId(null);
    }
  };

  const handleEditClick = (item: Item) => {
    navigate(`/dash/edit-item/${item._id}`);
  };

  const showToast = (message: string, type: "success" | "error") => {
    setToast({ open: true, message, type });
  };

  const handleCloseToast = () => {
    setToast({ ...toast, open: false });
  };

  if (loading) {
    return (
      <Box sx={{ p: 2 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
          <Box sx={{ width: "70%" }}>
            <Skeleton variant="text" height={40} width="40%" />
            <Skeleton variant="rectangular" height={80} sx={{ mt: 1 }} />
          </Box>
          <Skeleton variant="rectangular" width={120} height={40} />
        </Box>
        <Paper>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Product</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell align="right">Price</TableCell>
                  <TableCell align="right">Stock</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Visibility</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {[...Array(5)].map((_, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 2 }}
                      >
                        <Skeleton
                          variant="rectangular"
                          width={50}
                          height={50}
                        />
                        <Box>
                          <Skeleton variant="text" width={120} />
                          <Skeleton variant="text" width={200} />
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Skeleton variant="text" width={80} />
                    </TableCell>
                    <TableCell align="right">
                      <Skeleton variant="text" width={60} />
                    </TableCell>
                    <TableCell align="right">
                      <Skeleton variant="text" width={40} />
                    </TableCell>
                    <TableCell>
                      <Skeleton variant="rectangular" width={80} height={24} />
                    </TableCell>
                    <TableCell>
                      <Skeleton variant="rectangular" width={80} height={24} />
                    </TableCell>
                    <TableCell align="center">
                      <Box sx={{ display: "flex", justifyContent: "center" }}>
                        <Skeleton
                          variant="circular"
                          width={30}
                          height={30}
                          sx={{ mr: 1 }}
                        />
                        <Skeleton variant="circular" width={30} height={30} />
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>
    );
  }

  if (fetchError) {
    return (
      <Alert severity="error" sx={{ mb: 2 }}>
        {fetchError}
        <Button
          onClick={refreshItems}
          startIcon={<RefreshIcon />}
          sx={{ ml: 2 }}
        >
          Retry
        </Button>
      </Alert>
    );
  }

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          mb: 3,
        }}
      >
        <Box>
          <Typography variant="h5" component="h2" gutterBottom>
            Products List
          </Typography>
          <Paper sx={{ p: 2, mb: 2 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 1,
              }}
            >
              <Typography variant="subtitle1" fontWeight="medium">
                Filter Products
              </Typography>
              <Button
                size="small"
                startIcon={<RefreshIcon />}
                onClick={refreshItems}
                disabled={loading}
              >
                Refresh
              </Button>
            </Box>
            <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
              <Chip
                label={`All Products (${fetchedItems?.length || 0})`}
                color={activeFilter === "all" ? "primary" : "default"}
                onClick={() => setActiveFilter("all")}
                sx={{ cursor: "pointer" }}
                variant={activeFilter === "all" ? "filled" : "outlined"}
              />
              <Chip
                icon={<VisibilityIcon fontSize="small" />}
                label={`Active (${activeItemsCount})`}
                color={activeFilter === "active" ? "success" : "default"}
                onClick={() => setActiveFilter("active")}
                sx={{ cursor: "pointer" }}
                variant={activeFilter === "active" ? "filled" : "outlined"}
              />
              <Chip
                icon={<VisibilityOffIcon fontSize="small" />}
                label={`Inactive (${inactiveItemsCount})`}
                color={activeFilter === "inactive" ? "warning" : "default"}
                onClick={() => setActiveFilter("inactive")}
                sx={{ cursor: "pointer" }}
                variant={activeFilter === "inactive" ? "filled" : "outlined"}
              />
            </Box>
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ display: "block", mt: 1 }}
            >
              {activeFilter === "all"
                ? "Showing all products regardless of status"
                : activeFilter === "active"
                ? "Showing only products that are visible to customers"
                : "Showing only products that are hidden from customers"}
            </Typography>
          </Paper>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => navigate("/dash/add-item")}
        >
          Add Product
        </Button>
      </Box>

      {filteredItems.length === 0 ? (
        <Box sx={{ textAlign: "center", py: 4 }}>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            {fetchedItems?.length === 0
              ? "No products found"
              : `No ${activeFilter} products found`}
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
            {fetchedItems?.length === 0
              ? "Get started by adding your first product"
              : activeFilter === "active"
              ? "All your products are currently inactive"
              : "All your products are currently active"}
          </Typography>
          {fetchedItems?.length === 0 && (
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => navigate("/dash/add-item")}
            >
              Add Product
            </Button>
          )}
        </Box>
      ) : (
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <TableContainer sx={{ maxHeight: "70vh" }}>
            <Table stickyHeader aria-label="products table">
              <TableHead>
                <TableRow>
                  <TableCell>Product</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell align="right">Price</TableCell>
                  <TableCell align="right">Stock</TableCell>
                  <TableCell>Inventory Status</TableCell>
                  <TableCell>Visibility</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedItems.map((item) => (
                  <TableRow
                    hover
                    key={item._id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 2 }}
                      >
                        <Avatar
                          alt={item.name}
                          src={item.image}
                          variant="rounded"
                          sx={{ width: 50, height: 50 }}
                        />
                        <Box>
                          <Typography variant="body1" fontWeight="medium">
                            {item.name}
                          </Typography>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            noWrap
                            sx={{ maxWidth: 250 }}
                          >
                            {item.description}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>{item.category}</TableCell>
                    <TableCell align="right">
                      ${item.price.toFixed(2)}
                    </TableCell>
                    <TableCell align="right">{item.stock}</TableCell>
                    <TableCell>
                      <Chip
                        label={item.stock > 0 ? "In Stock" : "Out of Stock"}
                        color={item.stock > 0 ? "success" : "error"}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <Tooltip
                        title={
                          processingId === item._id
                            ? "Updating status..."
                            : item.isActive
                            ? "Product is visible to customers - Click to hide"
                            : "Product is hidden from customers - Click to make visible"
                        }
                      >
                        <Chip
                          icon={
                            processingId === item._id ? (
                              <CircularProgress size={12} color="inherit" />
                            ) : item.isActive ? (
                              <VisibilityIcon fontSize="small" />
                            ) : (
                              <VisibilityOffIcon fontSize="small" />
                            )
                          }
                          label={
                            processingId === item._id
                              ? "Updating..."
                              : item.isActive
                              ? "Visible"
                              : "Hidden"
                          }
                          color={
                            processingId === item._id
                              ? "default"
                              : item.isActive
                              ? "success"
                              : "warning"
                          }
                          size="small"
                          onClick={() => handleToggleActive(item)}
                          disabled={processingId === item._id}
                          sx={{
                            cursor:
                              processingId === item._id ? "default" : "pointer",
                            fontWeight: "medium",
                            borderWidth: 2,
                          }}
                          variant={item.isActive ? "filled" : "outlined"}
                        />
                      </Tooltip>
                    </TableCell>
                    <TableCell align="center">
                      <Box sx={{ display: "flex", justifyContent: "center" }}>
                        <IconButton
                          color="primary"
                          onClick={() => handleEditClick(item)}
                          size="small"
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          color="error"
                          onClick={() => handleDeleteClick(item)}
                          size="small"
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      )}

      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        aria-labelledby="delete-dialog-title"
      >
        <DialogTitle id="delete-dialog-title">Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete "{itemToDelete?.name}"? This action
            cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setDeleteDialogOpen(false)}
            disabled={deleting}
          >
            Cancel
          </Button>
          <Button
            onClick={handleDeleteConfirm}
            color="error"
            disabled={deleting}
          >
            {deleting ? "Deleting..." : "Delete"}
          </Button>
        </DialogActions>
      </Dialog>

      {filteredItems.length > ITEMS_PER_PAGE && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4, mb: 2 }}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={(_, newPage) => setPage(newPage)}
            color="primary"
            showFirstButton
            showLastButton
            size="large"
          />
        </Box>
      )}

      <Snackbar
        open={toast.open}
        autoHideDuration={6000}
        onClose={handleCloseToast}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseToast}
          severity={toast.type}
          sx={{ width: "100%" }}
        >
          {toast.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ItemTable;
