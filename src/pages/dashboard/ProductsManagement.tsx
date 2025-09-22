import React from "react";
import { Box, Typography } from "@mui/material";
import ItemTable from "../../components/dashboard/ItemTable";

const ProductsManagement: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Products Management
      </Typography>

      <ItemTable />
    </Box>
  );
};

export default ProductsManagement;
