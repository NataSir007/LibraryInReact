import React from 'react';
import { Box, Typography } from '@mui/material';


const Welcome: React.FC = () => {
  return (
    <Box
      sx={{
        p: 2
      }}
    >
    <Typography variant="body1">
      Welcome to the dashboard! This is your main content area.
    </Typography>
    </Box>
  );
};

export default Welcome;