import React from "react";
import {
  Typography,
  Box,
  type TypographyProps,
  type SxProps,
  type Theme,
} from "@mui/material";

interface CustomLabelProps extends TypographyProps {
  text: string;
  fontWeight?: number | string;
  fontSize?: string | number;
  color?: string;
  highlightLabelStar?: boolean;
  sx?: SxProps<Theme>;
}

const CustomLabel: React.FC<CustomLabelProps> = ({
  text,
  fontWeight,
  fontSize,
  color,
  highlightLabelStar = false,
  variant = "body1",
  sx,
  ...rest
}) => {
  return (
    <Box display="flex" alignItems="center">
      <Typography
        variant={variant}
        sx={{
          fontWeight,
          fontSize,
          color,
          ...sx,
        }}
        {...rest}
      >
        {text}
      </Typography>
      {highlightLabelStar && (
        <Typography
          sx={{
            color: "red",
            fontWeight: "500",
            fontSize: "1rem",
            marginLeft: "4px",
          }}
        >
          *
        </Typography>
      )}
    </Box>
  );
};

export default CustomLabel;
