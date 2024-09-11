import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { login } from '../api/authApi';  // Adjust the path if necessary

const API_URL = process.env.REACT_APP_API_URL;

interface AuthContextProps {
  user: any | null;
  isAuthenticated: boolean;
  loginUser: (email: string, password: string) => Promise<void>;
  logoutUser: () => void;
}

export const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);  // Error handling for login
  const navigate = useNavigate();

  // Function to fetch user details after login
  const fetchUserDetails = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/auth/user/`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching user details:', error);
      return null;
    }
  };

  // Check if user is already authenticated on app load
  useEffect(() => {
    const checkAuth = async () => {
      const userDetails = await fetchUserDetails();
      if (userDetails) {
        setUser(userDetails);
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  // Function to log in
  const loginUser = async (email: string, password: string) => {
    try {
      await login(email, password);
      const userDetails = await fetchUserDetails();
      if (userDetails) {
        setIsAuthenticated(true);
        setUser(userDetails);
        setErrorMessage(null);
        navigateBasedOnRole(userDetails);
      } else {
        throw new Error('Failed to fetch user details after login');
      }
    } catch (error) {
      console.error('Login error:', error);
      setErrorMessage('Invalid login credentials. Please try again.');
    }
  };

  // Navigate based on user role
  const navigateBasedOnRole = (userDetails: any) => {
    if (userDetails.role === 'admin') {
      navigate('/admin/dashboard');
    } else if (userDetails.role === 'trainer') {
      navigate('/trainer/dashboard');
    } else if (userDetails.role === 'client') {
      navigate('/client/dashboard');
    } else {
      console.warn('Unknown role:', userDetails.role);
      navigate('/dashboard');
    }
  };

  // Function to log out
  const logoutUser = async () => {
    try {
      await axios.post(`${API_URL}/auth/logout/`, {}, { withCredentials: true });
      setUser(null);
      setIsAuthenticated(false);
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
      alert('There was an issue logging you out. Please try again.');
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
