import { User } from "../interfaces/User";

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface AuthResponse {
    user: User;
    access: string;  // JWT access token
    refresh: string; // JWT refresh token
}
