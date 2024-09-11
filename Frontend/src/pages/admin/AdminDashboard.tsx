// src/pages/admin/AdminDashboard.tsx
import React from 'react';
import { Box, Typography } from '@mui/material';

const AdminDashboard: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4" sx={{ color: '#264027', fontWeight: 'bold' }}>
        Admin Dashboard Overview
      </Typography>
      {/* Add your admin-specific content here */}
    </Box>
  );
};

export default AdminDashboard;
