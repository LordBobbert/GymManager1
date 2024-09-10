// src/components/Layout/DashboardLayout.tsx
import React, { ReactNode } from 'react';
import { Box } from '@mui/material';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import { useAuth } from '../../context/AuthContext';

interface DashboardLayoutProps {
    children: ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
    const { user } = useAuth();

    return (
        <Box display="flex" height="100vh">
            <Sidebar role={user?.role || ''} />
            <Box flexGrow={1} display="flex" flexDirection="column">
                <TopBar />
                <Box flexGrow={1} p={3}>
                    {children}
                </Box>
            </Box>
        </Box>
    );
};

export default DashboardLayout;
