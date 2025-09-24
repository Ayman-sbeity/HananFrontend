import Box from "@mui/material/Box";
import ProductCard from "./productsPageSections/ProductCard";
import ProductFilters from "./productsPageSections/ProductFilters";
import { useState, useMemo } from "react";
import CustomLabel from "../components/common/CustomLabel";
import { Drawer, IconButton, Alert, Button, Skeleton } from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import CloseIcon from "@mui/icons-material/Close";
import RefreshIcon from "@mui/icons-material/Refresh";
import { fetchItems } from "../services/api";
import type { Item } from "../services/api";
import { useCachedData } from "../hooks/useCachedData";

export default function ProductsPage() {
  const [selectedFilters, setSelectedFilters] = useState({
    sort: "",
    category: "",
  });
  const [priceRange, setPriceRange] = useState({
    min: 0,
    max: 1000,
  });
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [showDebug, setShowDebug] = useState(false);

  const fetchOptions = {
    showAll: true,
    minPrice: priceRange.min > 0 ? priceRange.min : undefined,
    maxPrice: priceRange.max < 1000 ? priceRange.max : undefined,
    sort: selectedFilters.sort || undefined,
    category: selectedFilters.category || undefined,
  };

  const cacheKey = `products-${priceRange.min}-${priceRange.max}-${selectedFilters.sort}-${selectedFilters.category}`;

  const {
    data: fetchedProducts,
    loading,
    error,
    refresh: refreshProducts,
  } = useCachedData<Item[]>(cacheKey, () => fetchItems(fetchOptions), 5 * 60 * 1000);

  const handleFilterChange = (filterType: string, value: string) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }));
  };

  const handlePriceRangeChange = (min: number, max: number) => {
    setPriceRange({ min, max });
  };

  const toggleMobileFilters = () => {
    setMobileFiltersOpen(!mobileFiltersOpen);
  };

  const filteredProducts = useMemo(() => {
    if (!fetchedProducts) return [];

    let filtered = fetchedProducts.filter((product: Item) => {
      const price = product.price;
      const matchesCategory = selectedFilters.category
        ? product.category === selectedFilters.category
        : true;
      return (
        price >= priceRange.min &&
        price <= priceRange.max &&
        product.isActive !== false &&
        matchesCategory
      );
    });

    if (selectedFilters.sort === "price_asc") {
      filtered = [...filtered].sort((a, b) => a.price - b.price);
    } else if (selectedFilters.sort === "price_desc") {
      filtered = [...filtered].sort((a, b) => b.price - a.price);
    }

    return filtered;
  }, [fetchedProducts, selectedFilters, priceRange]);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 4,
          p: { xs: 2, sm: 3 },
          justifyContent: "flex-start",
          alignItems: "flex-start",
          m: 0,
          mt: 0,
          width: "100%",
          boxSizing: "border-box",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            display: { xs: "none", md: "block" },
            width: 280,
            flexShrink: 0,
          }}
        >
          <Box sx={{ p: 2 }}>
            <Skeleton variant="text" height={32} width="80%" sx={{ mb: 2 }} />
            <Skeleton variant="text" height={20} width="60%" sx={{ mb: 1 }} />
            <Skeleton variant="rectangular" height={120} sx={{ mb: 3 }} />
            <Skeleton variant="text" height={20} width="70%" sx={{ mb: 1 }} />
            <Skeleton variant="rectangular" height={120} sx={{ mb: 3 }} />
            <Skeleton variant="text" height={20} width="65%" sx={{ mb: 1 }} />
            <Skeleton variant="rectangular" height={120} />
          </Box>
        </Box>

          <Box sx={{ flex: 1, minWidth: 0 }}>
          <Box sx={{ mb: 3 }}>
            <Skeleton variant="text" height={40} width="30%" sx={{ mb: 2 }} />
            <Skeleton variant="text" height={24} width="20%" />
          </Box>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: '1fr',
                sm: 'repeat(2, minmax(0, 1fr))',
                md: 'repeat(3, minmax(0, 1fr))',
              },
              gap: { xs: 2, sm: 3 },
            }}
          >
            {[...Array(6)].map((_, index) => (
              <Box key={index} sx={{ width: '100%' }}>
                <Skeleton
                  variant="rectangular"
                  height={200}
                  sx={{ mb: 1, borderRadius: 1 }}
                />
                <Skeleton variant="text" height={24} width="70%" sx={{ mb: 0.5 }} />
                <Skeleton variant="text" height={18} width="40%" sx={{ mb: 0.5 }} />
                <Skeleton variant="text" height={24} width="30%" />
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3, textAlign: "center" }}>
        <Alert
          severity="error"
          sx={{ mb: 2, maxWidth: 500, mx: "auto" }}
          action={
            <Button
              color="inherit"
              size="small"
              onClick={refreshProducts}
              startIcon={<RefreshIcon />}
            >
              Retry
            </Button>
          }
        >
          {error}
        </Alert>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        gap: 4,
        p: { xs: 2, sm: 3 },
        justifyContent: "flex-start",
        alignItems: "flex-start",
        m: 0,
        mt: 0,
        width: "100%",
        boxSizing: "border-box",
        overflow: "hidden",
      }}
    >
      {/* Filters always visible */}
      <Box
        sx={{
          display: { xs: "none", md: "block" },
          width: 280,
          flexShrink: 0,
        }}
      >
        <ProductFilters
          onFilterChange={handleFilterChange}
          onPriceRangeChange={handlePriceRangeChange}
          selectedFilters={selectedFilters}
          priceRange={priceRange}
        />
      </Box>

      <Drawer
        anchor="left"
        open={mobileFiltersOpen}
        onClose={toggleMobileFilters}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            width: "100%",
            maxWidth: { xs: "100%", sm: 380 },
            height: "100%",
            boxSizing: "border-box",
            p: { xs: 2, sm: 3 },
            borderRadius: { xs: "0", sm: "0 16px 16px 0" },
            boxShadow: 3,
          },
          "& .MuiBackdrop-root": {
            backgroundColor: "rgba(0, 0, 0, 0.2)",
          },
        }}
        PaperProps={{
          elevation: 0,
        }}
        ModalProps={{
          keepMounted: true,
        }}
      >
        <Box
          sx={{
            display: "flex",
            // alignItems: "center",
            justifyContent: "space-between",
            mb: 2,
            borderBottom: "1px solid",
            borderColor: "divider",
            pb: 2,
          }}
        >
          <CustomLabel text="FILTERS" variant="h6" fontWeight={600} />
          <IconButton
            onClick={toggleMobileFilters}
            size="small"
            sx={{
              bgcolor: "grey.100",
              "&:hover": {
                bgcolor: "grey.200",
              },
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>

        <Box
          sx={{
            overflow: "hidden",
            display: { xs: "none", md: "block" },
            width: 280,
            flexShrink: 0,
            height: "calc(100% - 60px)",
            pb: 2,
          }}
        >
          <ProductFilters
            onFilterChange={handleFilterChange}
            onPriceRangeChange={handlePriceRangeChange}
            selectedFilters={selectedFilters}
            priceRange={priceRange}
          />
        </Box>
      </Drawer>

      {/* Products section */}
      <Box sx={{ flex: 1, minWidth: 0 }}>
        {/* Debug toggle and panel */}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 1 }}>
          <Button size="small" onClick={() => setShowDebug((s) => !s)}>
            {showDebug ? 'Hide' : 'Show'} Fetch Debug
          </Button>
        </Box>
        {showDebug && (
          <Box sx={{ mb: 2, p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
            <CustomLabel text="Fetch Debug" variant="subtitle2" sx={{ mb: 1 }} />
            <Box component="pre" sx={{ whiteSpace: 'pre-wrap', fontSize: 12, maxHeight: 200, overflow: 'auto' }}>
              {`cacheKey: ${cacheKey}\n\nfetchOptions:\n${JSON.stringify(fetchOptions, null, 2)}\n\nfetched response (first 3 items):\n${fetchedProducts ? JSON.stringify(fetchedProducts.slice(0,3), null, 2) : 'no data'}`}
            </Box>
          </Box>
        )}
        <Box
          sx={{
            mb: 3,
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-between",
            // alignItems: { xs: "flex-start", sm: "center" },
            gap: 2,
          }}
        >
          <Box
            sx={{
              display: "flex",
              // alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <CustomLabel
              text="PRODUCTS"
              variant="h4"
              fontWeight={600}
              sx={{
                letterSpacing: "0.5px",
                fontSize: { xs: "1.5rem", sm: "2rem" },
              }}
            />
            <IconButton
              onClick={toggleMobileFilters}
              sx={{ display: { xs: "flex", md: "none" } }}
              aria-label="open filters"
            >
              <FilterListIcon />
            </IconButton>
          </Box>

          <Box sx={{ display: "flex", gap: 1 }}>
            <CustomLabel
              text={`${filteredProducts.length} PRODUCTS`}
              variant="body2"
              color="text.secondary"
              fontSize="0.875rem"
            />
            <IconButton
              size="small"
              onClick={refreshProducts}
              sx={{ ml: 1 }}
              aria-label="refresh products"
            >
              <RefreshIcon fontSize="small" />
            </IconButton>
          </Box>
        </Box>

        {/* Error message for products only */}
        {error && (
          <Box sx={{ p: 3, textAlign: "center" }}>
            <Alert
              severity="error"
              sx={{ mb: 2, maxWidth: 500, mx: "auto" }}
              action={
                <Button
                  color="inherit"
                  size="small"
                  onClick={refreshProducts}
                  startIcon={<RefreshIcon />}
                >
                  Retry
                </Button>
              }
            >
              {error}
            </Alert>
          </Box>
        )}

        {/* Loading skeleton for products only */}
        {loading ? (
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: '1fr',
                sm: 'repeat(2, minmax(0, 1fr))',
                md: 'repeat(3, minmax(0, 1fr))',
              },
              gap: { xs: 2, sm: 3 },
            }}
          >
            {[...Array(6)].map((_, index) => (
              <Box key={index} sx={{ width: '100%' }}>
                <Skeleton
                  variant="rectangular"
                  height={200}
                  sx={{ mb: 1, borderRadius: 1 }}
                />
                <Skeleton variant="text" height={24} width="70%" sx={{ mb: 0.5 }} />
                <Skeleton variant="text" height={18} width="40%" sx={{ mb: 0.5 }} />
                <Skeleton variant="text" height={24} width="30%" />
              </Box>
            ))}
          </Box>
        ) : filteredProducts.length === 0 ? (
          <Box >
            <CustomLabel
              text="No products found"
              variant="h6"
              color="text.secondary"
              gutterBottom
            />
            <CustomLabel
              text="Try adjusting your filters or check back later"
              variant="body1"
              color="text.secondary"
              sx={{ mb: 2 }}
            />
            <Button
              variant="outlined"
              startIcon={<RefreshIcon />}
              onClick={refreshProducts}
              size="small"
            >
              Refresh Products
            </Button>
          </Box>
        ) : (
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: '1fr',
                sm: 'repeat(2, minmax(0, 1fr))',
                md: 'repeat(3, minmax(0, 1fr))',
              },
              gap: { xs: 2, sm: 3 },
            }}
          >
            {filteredProducts.map((product: Item) => (
              <Box key={product._id || product.id} sx={{ width: '100%' }}>
                <ProductCard product={product} />
              </Box>
            ))}
          </Box>
        )}
      </Box>
    </Box>
  );
}
