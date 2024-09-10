import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

// Fetch the schedule for a specific client
export const fetchClientSchedule = async (clientId: number) => {
    const response = await axios.get(`${API_URL}/clients/${clientId}/schedule/`);
    return response.data;
};

// Fetch the schedule for a specific trainer
export const fetchTrainerSchedule = async (trainerId: number) => {
    const response = await axios.get(`${API_URL}/trainers/${trainerId}/schedule/`);
    return response.data;
};

// Fetch the gym-wide schedule
export const fetchGymSchedule = async () => {
    const response = await axios.get(`${API_URL}/schedule/gym/`);
    return response.data;
};

// Create a new schedule entry
export const createSchedule = async (scheduleData: any) => {
    const response = await axios.post(`${API_URL}/schedule/`, scheduleData);
    return response.data;
};

// Update a schedule entry
export const updateSchedule = async (scheduleId: number, scheduleData: any) => {
    const response = await axios.put(`${API_URL}/schedule/${scheduleId}/`, scheduleData);
    return response.data;
};

// Delete a schedule entry
export const deleteSchedule = async (scheduleId: number) => {
    const response = await axios.delete(`${API_URL}/schedule/${scheduleId}/`);
    return response.data;
};
