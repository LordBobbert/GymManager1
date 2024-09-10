import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, CircularProgress, Paper, Grid } from '@mui/material';
import { fetchPaymentDetails } from '../../api/financialApi';

interface Payment {
    id: number;
    client_name: string;
    amount: number;
    date: string;
    status: string;
    method: string;
    description: string;
}

const PaymentDetails: React.FC = () => {
    const { paymentId } = useParams<{ paymentId: string }>(); // Get paymentId from URL params
    const [payment, setPayment] = useState<Payment | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const loadPaymentDetails = async () => {
            const paymentData = await fetchPaymentDetails(Number(paymentId));
            setPayment(paymentData);
            setLoading(false);
        };

        loadPaymentDetails();
    }, [paymentId]);

    if (loading) {
        return <CircularProgress />;
    }

    if (!payment) {
        return <Typography variant="h6">Payment not found</Typography>;
    }

    return (
        <Box sx={{ maxWidth: '600px', margin: '0 auto', padding: '2rem' }}>
            <Typography variant="h4" gutterBottom>
                Payment Details
            </Typography>
            <Paper elevation={3} sx={{ padding: '1.5rem' }}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="h6">Client Name</Typography>
                        <Typography>{payment.client_name}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h6">Amount</Typography>
                        <Typography>${payment.amount.toFixed(2)}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h6">Payment Date</Typography>
                        <Typography>{new Date(payment.date).toLocaleDateString()}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h6">Payment Status</Typography>
                        <Typography>{payment.status}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h6">Payment Method</Typography>
                        <Typography>{payment.method}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h6">Description</Typography>
                        <Typography>{payment.description}</Typography>
                    </Grid>
                </Grid>
            </Paper>
        </Box>
    );
};

export default PaymentDetails;
