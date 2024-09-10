import React, { createContext, useContext, useState } from 'react';
import { fetchClients, fetchTrainers } from '../api/userApi';

interface User {
    id: number;
    name: string;
    email: string;
}

interface UserContextProps {
    clients: User[];
    trainers: User[];
    loadClients: () => Promise<void>;
    loadTrainers: () => Promise<void>;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [clients, setClients] = useState<User[]>([]);
    const [trainers, setTrainers] = useState<User[]>([]);

    const loadClients = async () => {
        const data = await fetchClients();
        setClients(data);
    };

    const loadTrainers = async () => {
        const data = await fetchTrainers();
        setTrainers(data);
    };

    return (
        <UserContext.Provider value={{ clients, trainers, loadClients, loadTrainers }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};
