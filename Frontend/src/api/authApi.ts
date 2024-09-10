// File: src/api/authApi.ts
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const login = async (email: string, password: string) => {
    try {
        const response = await axios.post(
            `${API_URL}/api/auth/login/`, 
            { email, password }, 
            {
                withCredentials: true,  // Ensure credentials (cookies, etc.) are included
            }
        );

        // Optionally log the successful response
        console.log('Login successful:', response.data);

        // Return response data (e.g., user details or success message)
        return response.data;

    } catch (error) {
        if (axios.isAxiosError(error)) {
            // Specific Axios error handling
            console.error('Login failed:', error.response?.data || error.message);
        } else {
            // Handle unexpected errors
            console.error('Unexpected error during login:', error);
        }
        // Throw the error so that it can be caught further up if necessary
        throw error;
    }
};


export const refreshToken = async () => {
    try {
        const response = await axios.post(`${API_URL}/auth/token/refresh/`, {}, { withCredentials: true });
        return response.data;
    } catch (error: any) {
        console.error('Token refresh failed:', error.response ? error.response.data : error.message);
        throw error;
    }
};
