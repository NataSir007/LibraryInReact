import { Box, Alert, Typography, Chip } from '@mui/material';
import { CheckCircle, Map, Public, Security } from '@mui/icons-material';
import { type ReactElement } from 'react';

const OpenStreetMapBenefitsAlert = (): ReactElement => {
  return (
    <Alert 
      severity="success" 
      icon={<Map />}
      sx={{ mb: 2 }}
    >
      <Typography variant="h6" gutterBottom>
        🌍 Powered by OpenStreetMap - Completely Free!
      </Typography>
      
      <Box display="flex" flexWrap="wrap" gap={1} mt={1}>
        <Chip 
          icon={<CheckCircle />} 
          label="No API Keys Required" 
          color="success" 
          size="small" 
        />
        <Chip 
          icon={<Public />} 
          label="Open Source" 
          color="success" 
          size="small" 
        />
        <Chip 
          icon={<Security />} 
          label="Privacy Friendly" 
          color="success" 
          size="small" 
        />
        <Chip 
          label="Zero Cost" 
          color="success" 
          size="small" 
        />
      </Box>
      
      <Typography variant="body2" sx={{ mt: 1 }}>
        This interactive map uses free and open-source mapping services. 
        No registration, setup, or costs required!
      </Typography>
    </Alert>
  );
};

export default OpenStreetMapBenefitsAlert;
