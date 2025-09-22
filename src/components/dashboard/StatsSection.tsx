import React from 'react';
import { Box, Alert, Stack } from '@mui/material';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import PeopleIcon from '@mui/icons-material/People';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import StatsCard from './StatsCard';
import { useStatsCounts } from '../../hooks/useCachedData';

const StatsSection: React.FC = () => {
  const { productCount, userCount, orderCount, isLoading, error } = useStatsCounts();

  return (
    <Box sx={{ mb: 4 }}>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      
      <Stack 
        direction={{ xs: 'column', sm: 'row' }} 
        spacing={3} 
        sx={{ width: '100%' }}
      >
        <Box sx={{ flex: 1 }}>
          <StatsCard
            title="Total Products"
            count={productCount}
            icon={<ShoppingBasketIcon />}
            loading={isLoading}
            color="#4caf50"
          />
        </Box>
        
        <Box sx={{ flex: 1 }}>
          <StatsCard
            title="Total Users"
            count={userCount}
            icon={<PeopleIcon />}
            loading={isLoading}
            color="#2196f3"
          />
        </Box>
        
        <Box sx={{ flex: 1 }}>
          <StatsCard
            title="Total Orders"
            count={orderCount}
            icon={<LocalShippingIcon />}
            loading={isLoading}
            color="#ff9800"
          />
        </Box>
      </Stack>
    </Box>
  );
};

export default StatsSection;
