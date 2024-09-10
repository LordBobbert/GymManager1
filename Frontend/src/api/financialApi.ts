import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

// Fetch all payments
export const fetchPayments = async () => {
    const response = await axios.get(`${API_URL}/payments/`);
    return response.data;
};

// Fetch payment details by payment ID
export const fetchPaymentDetails = async (paymentId: number) => {
    const response = await axios.get(`${API_URL}/payments/${paymentId}/`);
    return response.data;
};

// Create a new payment record
export const createPayment = async (paymentData: any) => {
    const response = await axios.post(`${API_URL}/payments/`, paymentData);
    return response.data;
};

// Update an existing payment record
export const updatePayment = async (paymentId: number, paymentData: any) => {
    const response = await axios.put(`${API_URL}/payments/${paymentId}/`, paymentData);
    return response.data;
};

// Delete (soft delete) a payment record
export const deletePayment = async (paymentId: number) => {
    const response = await axios.delete(`${API_URL}/payments/${paymentId}/`);
    return response.data;
};

// Fetch summary financial data (e.g., monthly totals)
export const fetchFinancialSummary = async () => {
    const response = await axios.get(`${API_URL}/financials/summary/`);
    return response.data;
};
