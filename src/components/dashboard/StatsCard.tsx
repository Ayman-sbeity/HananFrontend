import React from 'react';
import { Box, Paper, Typography, CircularProgress } from '@mui/material';
import type { SxProps } from '@mui/system';

interface StatsCardProps {
  title: string;
  count: number;
  icon: React.ReactNode;
  loading?: boolean;
  color?: string;
  sx?: SxProps;
}

const StatsCard: React.FC<StatsCardProps> = ({ 
  title, 
  count, 
  icon, 
  loading = false,
  color = '#1976d2',
  sx = {} 
}) => {
  return (
    <Paper 
      elevation={2} 
      sx={{ 
        p: 3, 
        borderRadius: 2, 
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        ...sx
      }}
    >
      <Box>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          {title}
        </Typography>
        {loading ? (
          <CircularProgress size={24} />
        ) : (
          <Typography variant="h4" component="div" fontWeight="medium">
            {count}
          </Typography>
        )}
      </Box>

      <Box 
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: `${color}15`,
          p: 1.5,
          borderRadius: '50%',
          color: color,
          '& svg': { fontSize: 30 }
        }}
      >
        {icon}
      </Box>
      
      <Box 
        sx={{
          position: 'absolute',
          right: -15,
          bottom: -15,
          width: 100,
          height: 100,
          borderRadius: '50%',
          backgroundColor: `${color}05`,
          zIndex: 0
        }}
      />
    </Paper>
  );
};

export default StatsCard;
