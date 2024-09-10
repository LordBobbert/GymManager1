import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

// Fetch all assessments for a specific client
export const fetchAssessmentsForClient = async (clientId: number) => {
    const response = await axios.get(`${API_URL}/clients/${clientId}/assessments/`);
    return response.data;
};

// Fetch details of a specific assessment
export const fetchAssessmentDetails = async (assessmentId: number) => {
    const response = await axios.get(`${API_URL}/assessments/${assessmentId}/`);
    return response.data;
};

// Create a new assessment for a client
export const createAssessment = async (clientId: number, assessmentData: any) => {
    const response = await axios.post(`${API_URL}/clients/${clientId}/assessments/`, assessmentData);
    return response.data;
};

// Update an existing assessment
export const updateAssessment = async (assessmentId: number, assessmentData: any) => {
    const response = await axios.put(`${API_URL}/assessments/${assessmentId}/`, assessmentData);
    return response.data;
};

// Delete an assessment (soft delete or hard delete depending on your implementation)
export const deleteAssessment = async (assessmentId: number) => {
    const response = await axios.delete(`${API_URL}/assessments/${assessmentId}/`);
    return response.data;
};
