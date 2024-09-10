import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { useAuth } from '../../context/AuthContext';

const colors = {
  dark: '#0D1F22',
  green: '#264027',
  lighterGreen: '#3C5233',
  yellowGreen: '#6F732F',
  lightBrown: '#B38A58',
};

const TopBar: React.FC = () => {
    const { user, logoutUser } = useAuth();

    return (
        <AppBar position="static" sx={{ backgroundColor: colors.green }}>
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: '#FFF' }}>
                    {user?.name}
                </Typography>
                <Button color="inherit" onClick={logoutUser} sx={{ fontWeight: 'bold' }}>
                    Logout
                </Button>
            </Toolbar>
        </AppBar>
    );
};

export default TopBar;
