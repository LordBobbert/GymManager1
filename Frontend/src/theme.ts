import { createTheme } from '@mui/material/styles';

// Define your custom colors
const colors = {
    primary: {
        main: '#0D1F22', // My-Color-Theme-1
    },
    secondary: {
        main: '#264027', // My-Color-Theme-2
    },
    success: {
        main: '#3C5233', // My-Color-Theme-3
    },
    warning: {
        main: '#6F732F', // My-Color-Theme-4
    },
};

// Create a theme instance
const theme = createTheme({
    palette: {
        primary: {
            main: colors.primary.main,
        },
        secondary: {
            main: colors.secondary.main,
        },
        success: {
            main: colors.success.main,
        },
        warning: {
            main: colors.warning.main,
        },
        background: {
            default: '#f5f5f5', // Light background for the entire app
        },
    },
    typography: {
        fontFamily: 'Roboto, Arial, sans-serif', // Custom typography if needed
    },
});

export default theme;
