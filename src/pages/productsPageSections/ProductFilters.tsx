const categoryOptions = [
  { name: "Necklaces", value: "Necklaces" },
  { name: "Rings", value: "Rings" },
  { name: "Bracelets", value: "Bracelets" },
  { name: "Earrings", value: "Earrings" },
  { name: "Accessories", value: "Accessories" },
];
import {
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  FormControlLabel,
  Checkbox,
  Divider,
  Slider,
  TextField,
  Button,
  Stack,
  RadioGroup,
  Radio,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CustomLabel from "../../components/common/CustomLabel";
import { useState } from "react";

interface ProductFiltersProps {
  onFilterChange: (filterType: string, value: string) => void;
  onPriceRangeChange: (minPrice: number, maxPrice: number) => void;
  selectedFilters: Record<string, string>;
  priceRange: { min: number; max: number };

}

const sortOptions = [
  { name: "Price: Low to High", value: "price_asc" },
  { name: "Price: High to Low", value: "price_desc" },
];

const ProductFilters = ({
  onFilterChange,
  onPriceRangeChange,
  selectedFilters,
  priceRange,
}: ProductFiltersProps) => {
  const [localPriceRange, setLocalPriceRange] = useState<{min: number; max: number}>(priceRange);
  const [sliderValue, setSliderValue] = useState<number[]>([priceRange.min, priceRange.max]);

  // Multi-select categories
  const selectedCategories: string[] = selectedFilters.category ? selectedFilters.category.split(",") : [];

  const allCategoryValues = categoryOptions.map((option) => option.value);
  const isAllSelected = selectedCategories.length === allCategoryValues.length;

  const handleCategoryChange = (category: string) => {
    let updatedCategories;
    if (selectedCategories.includes(category)) {
      updatedCategories = selectedCategories.filter((c) => c !== category);
    } else {
      updatedCategories = [...selectedCategories, category];
    }
    onFilterChange("category", updatedCategories.join(","));
  };

  const handleSelectAllCategories = () => {
    if (isAllSelected) {
      onFilterChange("category", "");
    } else {
      onFilterChange("category", allCategoryValues.join(","));
    }
  };

  const handleSliderChange = (_: unknown, newValue: number | number[]) => {
    if (Array.isArray(newValue)) {
      setSliderValue(newValue);
    }
  };

  const handleSliderChangeCommitted = (_: unknown, newValue: number | number[]) => {
    if (Array.isArray(newValue)) {
      onPriceRangeChange(newValue[0], newValue[1]);
    }
  };

  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (!isNaN(value) && value >= 0) {
      setLocalPriceRange(prev => ({ ...prev, min: value }));
    }
  };

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (!isNaN(value) && value >= 0) {
      setLocalPriceRange(prev => ({ ...prev, max: value }));
    }
  };

  const applyPriceRange = () => {
    onPriceRangeChange(localPriceRange.min, localPriceRange.max);
    setSliderValue([localPriceRange.min, localPriceRange.max]);
  };

  return (
    <Box sx={{ width: { xs: '100%', sm: 280 }, maxWidth: 380, boxSizing: 'border-box' }}>
      <CustomLabel
        text="SHOPPING OPTIONS"
        variant="h6"
        fontWeight={600}
        sx={{ mb: 2 }}
      />

      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          sx={{
            backgroundColor: "#f8f9fa",
            "& .MuiAccordionSummary-content": { margin: "12px 0" },
          }}
        >
          <CustomLabel text="CATEGORY" fontWeight={500} />
        </AccordionSummary>
        <AccordionDetails>
          <FormControlLabel
            control={
              <Checkbox
                checked={isAllSelected}
                indeterminate={selectedCategories.length > 0 && !isAllSelected}
                onChange={handleSelectAllCategories}
                size="small"
              />
            }
            label={<CustomLabel text="Select All" variant="body2" />}
          />
          {categoryOptions.map((option) => (
            <FormControlLabel
              key={option.value}
              control={
                <Checkbox
                  checked={selectedCategories.includes(option.value)}
                  onChange={() => handleCategoryChange(option.value)}
                  size="small"
                />
              }
              label={
                <CustomLabel
                  text={option.name}
                  variant="body2"
                />
              }
            />
          ))}
        </AccordionDetails>
        <Divider />
      </Accordion>

      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          sx={{
            backgroundColor: "#f8f9fa",
            "& .MuiAccordionSummary-content": { margin: "12px 0" },
          }}
        >
          <CustomLabel text="SORT BY PRICE" fontWeight={500} />
        </AccordionSummary>
        <AccordionDetails>
          <RadioGroup
            value={selectedFilters.sort || ""}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => onFilterChange("sort", e.target.value)}
          >
            <FormControlLabel
              value=""
              control={<Radio size="small" />}
              label={<CustomLabel text="Fetch All" variant="body2" />}
            />
            {sortOptions.map((option) => (
              <FormControlLabel
                key={option.value}
                value={option.value}
                control={<Radio size="small" />}
                label={
                  <CustomLabel
                    text={option.name}
                    variant="body2"
                  />
                }
              />
            ))}
          </RadioGroup>
        </AccordionDetails>
        <Divider />
      </Accordion>

      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          sx={{
            backgroundColor: "#f8f9fa",
            "& .MuiAccordionSummary-content": { margin: "12px 0" },
          }}
        >
          <CustomLabel text="PRICE RANGE" fontWeight={500} />
        </AccordionSummary>
        <AccordionDetails>
          <Box sx={{ px: 1 }}>
            <Slider
              value={sliderValue}
              onChange={handleSliderChange}
              onChangeCommitted={handleSliderChangeCommitted}
              valueLabelDisplay="auto"
              min={0}
              max={1000}
              step={10}
              sx={{ mt: 3, mb: 2 }}
            />
            
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 1, sm: 2 }} sx={{ mb: 2 }}>
              <TextField
                label="Min"
                type="number"
                size="small"
                value={localPriceRange.min}
                onChange={handleMinPriceChange}
                InputProps={{ inputProps: { min: 0 } }}
                fullWidth
              />
              <TextField
                label="Max"
                type="number"
                size="small"
                value={localPriceRange.max}
                onChange={handleMaxPriceChange}
                InputProps={{ inputProps: { min: 0 } }}
                fullWidth
              />
            </Stack>
            
            <Button 
              variant="contained" 
              fullWidth 
              onClick={applyPriceRange}
              size="small"
            >
              Apply
            </Button>
          </Box>
        </AccordionDetails>
        <Divider />
      </Accordion>
    </Box>
  );
};
export default ProductFilters;
