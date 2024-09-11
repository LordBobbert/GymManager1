// src/components/Layout/DashboardLayout.tsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import { colors } from '../../styles/theme'; // Import the new theme

const DashboardLayout: React.FC = () => {
  return (
    <Box display="flex" height="100vh">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content area */}
      <Box flexGrow={1} display="flex" flexDirection="column" sx={{ backgroundColor: colors.lightGray }}>
        <TopBar />
        <Box flexGrow={1} p={3}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default DashboardLayout;
