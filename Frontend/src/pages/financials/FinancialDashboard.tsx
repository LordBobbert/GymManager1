import React, { useEffect, useState } from 'react';
import { Box, Grid, Typography, CircularProgress } from '@mui/material';
import StatCard from '../../components/Cards/StatCard';
import FinancialTable from '../../components/Tables/FinancialTable';
import { fetchPayments, fetchFinancialSummary } from '../../api/financialApi';

interface Payment {
    id: number;
    client_name: string;
    amount: number;
    date: string;
    status: string;
}

const FinancialDashboard: React.FC = () => {
    const [payments, setPayments] = useState<Payment[]>([]);
    const [financialSummary, setFinancialSummary] = useState<{ monthly_total: number, yearly_total: number } | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const loadFinancialData = async () => {
            const paymentData = await fetchPayments();
            const summaryData = await fetchFinancialSummary();

            setPayments(paymentData);
            setFinancialSummary(summaryData);
            setLoading(false);
        };

        loadFinancialData();
    }, []);

    if (loading) {
        return <CircularProgress />;
    }

    return (
        <Box>
            <Typography variant="h4" gutterBottom>
                Financial Dashboard
            </Typography>

            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <StatCard title="Monthly Revenue" value={financialSummary?.monthly_total || 0} description="Total revenue for this month" />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <StatCard title="Yearly Revenue" value={financialSummary?.yearly_total || 0} description="Total revenue for this year" />
                </Grid>

                <Grid item xs={12}>
                    <Typography variant="h6" gutterBottom>
                        Payments History
                    </Typography>
                    <FinancialTable payments={payments} />
                </Grid>
            </Grid>
        </Box>
    );
};

export default FinancialDashboard;
