import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

// Fetch all clients
export const fetchClients = async () => {
    const response = await axios.get(
        `${API_URL}/api/clients/`, {
        withCredentials: true,  // Include cookies (access_token) with the request
    });
    return response.data;
};

// Fetch all trainers
export const fetchTrainers = async () => {
    const response = await axios.get(
        `${API_URL}/api/trainers/`, {
        withCredentials: true,  // Include cookies (access_token) with the request
    });
    return response.data;
};

// Fetch a specific client's profile
export const fetchClientProfile = async (clientId: number) => {
    const response = await axios.get(`${API_URL}/api/clients/${clientId}/`);
    return response.data;
};

// Fetch a specific trainer's profile
export const fetchTrainerProfile = async (trainerId: number) => {
    const response = await axios.get(`${API_URL}/api/trainers/${trainerId}/`);
    return response.data;
};

// Create a new client
export const createClient = async (clientData: any) => {
    const response = await axios.post(`${API_URL}/api/clients/`, clientData);
    return response.data;
};

// Update a client's profile
export const updateClient = async (clientId: number, clientData: any) => {
    const response = await axios.put(`${API_URL}/api/clients/${clientId}/`, clientData);
    return response.data;
};

// Delete a client (soft delete)
export const deleteClient = async (clientId: number) => {
    const response = await axios.delete(`${API_URL}/api/clients/${clientId}/`);
    return response.data;
};

// Create a new trainer
export const createTrainer = async (trainerData: any) => {
    const response = await axios.post(`${API_URL}/api/trainers/`, trainerData);
    return response.data;
};

// Update a trainer's profile
export const updateTrainer = async (trainerId: number, trainerData: any) => {
    const response = await axios.put(`${API_URL}/api/trainers/${trainerId}/`, trainerData);
    return response.data;
};

// Delete a trainer (soft delete)
export const deleteTrainer = async (trainerId: number) => {
    const response = await axios.delete(`${API_URL}/api/trainers/${trainerId}/`);
    return response.data;
};
