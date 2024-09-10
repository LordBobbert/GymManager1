import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

// Fetch all sessions for a specific trainer
export const fetchSessionsForTrainer = async (trainerId: number) => {
    const response = await axios.get(`${API_URL}/trainers/${trainerId}/sessions/`);
    return response.data;
};

// Fetch all sessions for a specific client
export const fetchSessionsForClient = async (clientId: number) => {
    const response = await axios.get(`${API_URL}/clients/${clientId}/sessions/`);
    return response.data;
};

// Fetch details of a specific session
export const fetchSessionDetails = async (sessionId: number) => {
    const response = await axios.get(`${API_URL}/sessions/${sessionId}/`);
    return response.data;
};

// Create a new session
export const createSession = async (sessionData: any) => {
    const response = await axios.post(`${API_URL}/sessions/`, sessionData);
    return response.data;
};

// Update a session
export const updateSession = async (sessionId: number, sessionData: any) => {
    const response = await axios.put(`${API_URL}/sessions/${sessionId}/`, sessionData);
    return response.data;
};

// Delete a session (soft delete or hard delete)
export const deleteSession = async (sessionId: number) => {
    const response = await axios.delete(`${API_URL}/sessions/${sessionId}/`);
    return response.data;
};

export const fetchClientSessions = async (clientId?: number) => {
  // Simulate an API call that fetches sessions for a client.
  return [
    {
      id: 1,
      clientId,
      sessionName: 'Session 1',
      date: '2024-01-01',
      duration: '1 hour',
      trainerId: 101,
      status: 'completed',
    },
    {
      id: 2,
      clientId,
      sessionName: 'Session 2',
      date: '2024-01-02',
      duration: '2 hours',
      trainerId: 102,
      status: 'pending',
    },
  ];
};