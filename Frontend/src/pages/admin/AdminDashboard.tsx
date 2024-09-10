import React, { useEffect, useState } from 'react';
import { Box, Grid, Typography, CircularProgress } from '@mui/material';
import StatCard from '../../components/Cards/StatCard';
import { fetchClients, fetchTrainers } from '../../api/userApi';
import { fetchFinancialSummary } from '../../api/financialApi';

const colors = {
  dark: '#0D1F22',
  green: '#264027',
  lighterGreen: '#3C5233',
  yellowGreen: '#6F732F',
  lightBrown: '#B38A58',
};

const AdminDashboard: React.FC = () => {
    const [clientCount, setClientCount] = useState<number | null>(null);
    const [trainerCount, setTrainerCount] = useState<number | null>(null);
    const [financialSummary, setFinancialSummary] = useState<{ monthly_total: number, yearly_total: number } | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const loadDashboardData = async () => {
            try {
                const clients = await fetchClients();
                const trainers = await fetchTrainers();
                const financialData = await fetchFinancialSummary();

                setClientCount(clients.length);
                setTrainerCount(trainers.length);
                setFinancialSummary(financialData);
            } catch (error) {
                console.error('Error loading dashboard data:', error);
            } finally {
                setLoading(false);
            }
        };

        loadDashboardData();
    }, []);

    if (loading) {
        return <CircularProgress />;
    }

    return (
        <Box sx={{ backgroundColor: '#F9F9F9', padding: '2rem', borderRadius: '8px' }}>
            <Typography variant="h4" gutterBottom sx={{ color: colors.dark, fontWeight: 'bold', marginBottom: '1.5rem' }}>
                Admin Dashboard
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={4}>
                    <StatCard title="Total Clients" value={clientCount || 0} titleColor={colors.green} valueColor={colors.yellowGreen} />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <StatCard title="Total Trainers" value={trainerCount || 0} titleColor={colors.green} valueColor={colors.yellowGreen} />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <StatCard title="Monthly Revenue" value={financialSummary?.monthly_total || 0} description="This month's total revenue" titleColor={colors.green} valueColor={colors.yellowGreen} />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <StatCard title="Yearly Revenue" value={financialSummary?.yearly_total || 0} description="This year's total revenue" titleColor={colors.green} valueColor={colors.yellowGreen} />
                </Grid>
            </Grid>
        </Box>
    );
};

export default AdminDashboard;
