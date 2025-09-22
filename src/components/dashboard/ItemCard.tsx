import React from "react";
import { Box, Card, CardContent, Typography, Button } from "@mui/material";

interface ItemCardProps {
  id: number;
  name: string;
  description: string;
  price: number;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

const ItemCard: React.FC<ItemCardProps> = ({
  id,
  name,
  description,
  price,
  onEdit,
  onDelete,
}) => {
  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="h5" component="div">
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
        <Typography variant="h6" color="primary">
          ${price.toFixed(2)}
        </Typography>
        <Box mt={2}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => onEdit(id)}
          >
            Edit
          </Button>
          <Button
            variant="outlined"
            color="error"
            onClick={() => onDelete(id)}
            style={{ marginLeft: "8px" }}
          >
            Delete
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ItemCard;
