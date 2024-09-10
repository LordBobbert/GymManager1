import React, { createContext, useState, useContext, ReactNode } from 'react';
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

// Create the AuthContext
export const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any | null>(null); // Holds user information after login
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Tracks authentication state
  const navigate = useNavigate();

  // Function to fetch user details (including the role) from the backend after login
  const fetchUserDetails = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/auth/user/`, {
        withCredentials: true,  // Ensure cookies (access_token, refresh_token) are sent
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching user details:', error);
      return null;
    }
  };

  // Function to log the user in
  const loginUser = async (email: string, password: string) => {
    try {
      const response = await login(email, password); // Call the login API

      // At this point, the backend has stored the tokens in HTTP-only cookies.
      // Now fetch the user details using a separate API call.
      const userDetails = await fetchUserDetails();

      if (userDetails) {
        setIsAuthenticated(true);  // Set authentication to true
        setUser(userDetails);  // Store user details in state

        // Navigate based on user role
        if (userDetails.role === 'admin') {
          navigate('/admin/dashboard');
        } else if (userDetails.role === 'trainer') {
          navigate('/trainer/dashboard');
        } else if (userDetails.role === 'client') {
          navigate('/client/dashboard');
        } else {
          console.warn('Unknown role:', userDetails.role);
          navigate('/dashboard');  // Fallback for unknown roles
        }
      } else {
        throw new Error('Failed to fetch user details after login');
      }

    } catch (error) {
      console.error('Login error:', error);
    }
  };

  // Function to log the user out
  const logoutUser = async () => {
    try {
      await axios.post(`${API_URL}/auth/logout/`, {}, { withCredentials: true });

      // Reset user and authentication state
      setUser(null);
      setIsAuthenticated(false);

      // Redirect to the login page
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
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
