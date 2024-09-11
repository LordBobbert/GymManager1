// src/components/Layout/Sidebar.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { List, ListItem, ListItemText, ListItemIcon, Box } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import SettingsIcon from '@mui/icons-material/Settings';
import { colors } from '../../styles/theme';  // Import the new theme

const Sidebar: React.FC = () => {
  return (
    <Box
      sx={{
        width: '240px',
        height: '100vh',
        bgcolor: colors.lightGray,  // Light gray background like the screenshot
        color: colors.text,         // Use dark gray for text
        paddingTop: '20px',
        borderRight: `1px solid ${colors.borderGray}`,  // Light border on the right
      }}
    >
      <Box sx={{ padding: '20px', textAlign: 'center', fontWeight: 'bold', fontSize: '1.2rem' }}>
        <img src="/path-to-logo.png" alt="Logo" style={{ maxWidth: '50%' }} />
        <span>Gym Manager</span>
      </Box>
      <List>
        {/* Link to Dashboard */}
        <ListItem
          component={Link}
          to="/admin/dashboard"
          sx={{
            '&:hover': { 
              bgcolor: '#EFEFFF',   // Purple background on hover
              color: 'white',            // Change text color on hover
            },
            '& .MuiListItemIcon-root': { color: colors.accentBlue },  // Icon color
            '&:hover .MuiListItemIcon-root': { color: 'white' },      // Change icon color on hover
            '&.Mui-selected': { 
              bgcolor: colors.primary,   // Active item is purple
              color: 'white',
            },
            padding: '15px',
          }}
        >
          <ListItemIcon sx={{ color: colors.accentBlue }}>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>

        {/* Link to Clients */}
        <ListItem
          component={Link}
          to="/admin/clients"
          sx={{
            '&:hover': { 
              bgcolor: '#EFEFFF', 
              color: 'white',
            },
            '& .MuiListItemIcon-root': { color: colors.accentBlue },
            '&:hover .MuiListItemIcon-root': { color: 'white' },
            '&.Mui-selected': { 
              bgcolor: colors.primary, 
              color: 'white',
            },
            padding: '15px',
          }}
        >
          <ListItemIcon sx={{ color: colors.accentBlue }}>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText primary="Clients" />
        </ListItem>

        {/* Link to Settings */}
        <ListItem
          component={Link}
          to="/admin/settings"
          sx={{
            '&:hover': { 
              bgcolor: '#EFEFFF', 
              color: 'white',
            },
            '& .MuiListItemIcon-root': { color: colors.accentBlue },
            '&:hover .MuiListItemIcon-root': { color: 'white' },
            '&.Mui-selected': { 
              bgcolor: colors.primary, 
              color: 'white',
            },
            padding: '15px',
          }}
        >
          <ListItemIcon sx={{ color: colors.accentBlue }}>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText primary="Settings" />
        </ListItem>
      </List>
    </Box>
  );
};

export default Sidebar;
