// File: src/hooks/useAuth.ts

import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { login } from '../api/authApi'; // This is the login API call

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
