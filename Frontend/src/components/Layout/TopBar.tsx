// src/components/Layout/TopBar.tsx
import React from 'react';
import { AppBar, Toolbar, IconButton, InputBase, Box, Avatar, Badge } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import StarIcon from '@mui/icons-material/Star';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { colors } from '../../styles/theme';  // Import the new theme

const TopBar: React.FC = () => {
  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: colors.background,  // White background
        boxShadow: 'none',
        borderBottom: `1px solid ${colors.borderGray}`,  // Light border at the bottom
        padding: '0 20px',
      }}
    >
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        {/* Search bar */}
        <Box sx={{ display: 'flex', alignItems: 'center', bgcolor: colors.lightGray, borderRadius: '8px', padding: '5px 15px', width: '40%' }}>
          <SearchIcon sx={{ color: colors.accentBlue }} />
          <InputBase placeholder="Search..." sx={{ marginLeft: '10px', flexGrow: 1 }} />
        </Box>

        {/* Right side (notifications, avatar, star button) */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {/* Star/Favorite button */}
          <IconButton>
            <StarIcon sx={{ color: colors.orange }} />
          </IconButton>

          {/* Notifications */}
          <IconButton>
            <Badge badgeContent={4} color="secondary">
              <NotificationsIcon sx={{ color: colors.accentBlue }} />
            </Badge>
          </IconButton>

          {/* User avatar */}
          <Avatar sx={{ bgcolor: colors.orange, marginLeft: '15px' }}>J</Avatar>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
