import React from 'react';
import { List, ListItem, ListItemText, ListItemIcon } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupIcon from '@mui/icons-material/Group';
import { Link } from 'react-router-dom';  // Use Link for internal routing

interface Props {
    role: string;
}

const colors = {
    dark: '#0D1F22',
    green: '#264027',
    lighterGreen: '#3C5233',
    yellowGreen: '#6F732F',
    lightBrown: '#B38A58',
};

const Sidebar: React.FC<Props> = ({ role }) => {
    return (
        <List component="nav" sx={{ backgroundColor: colors.green, color: '#FFF', minHeight: '100vh', width: '250px' }}>
            <ListItem component={Link} to="/admin/dashboard" sx={{ '&:hover': { backgroundColor: colors.lighterGreen } }}>
                <ListItemIcon sx={{ color: '#FFF' }}>
                    <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Dashboard" sx={{ '& .MuiTypography-root': { fontWeight: 'bold' } }} />
            </ListItem>
            {role === 'admin' && (
                <ListItem component={Link} to="/admin/clients" sx={{ '&:hover': { backgroundColor: colors.lighterGreen } }}>
                    <ListItemIcon sx={{ color: '#FFF' }}>
                        <GroupIcon />
                    </ListItemIcon>
                    <ListItemText primary="Manage Clients" sx={{ '& .MuiTypography-root': { fontWeight: 'bold' } }} />
                </ListItem>
            )}
            {/* Add more menu items here */}
        </List>
    );
};

export default Sidebar;
