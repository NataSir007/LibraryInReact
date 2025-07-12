import React from 'react';
import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';


const Dashboard: React.FC = () => {
  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh", // optional: makes sure it fills the viewport vertically
        boxSizing: "border-box",
        p: 2,       
        pt: 8, // space for the fixed navbar
        pl: 20,
      }}
    >
    <Outlet />
    </Box>
  );
};

export default Dashboard;
