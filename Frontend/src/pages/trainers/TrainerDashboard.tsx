import React, { useEffect, useState } from 'react';
import { Box, Typography, CircularProgress, Grid } from '@mui/material';
import StatCard from '../../components/Cards/StatCard';
import SessionTable from '../../components/Tables/SessionTable';
import { fetchSessionsForTrainer } from '../../api/sessionApi';
import { fetchClients } from '../../api/userApi';

const TrainerDashboard: React.FC = () => {
    const [sessions, setSessions] = useState<any[]>([]);
    const [clientCount, setClientCount] = useState<number | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const trainerId = 1; // Replace with actual logged-in trainer ID

    useEffect(() => {
        const loadDashboardData = async () => {
            const sessions = await fetchSessionsForTrainer(trainerId);
            const clients = await fetchClients(); // Filter clients by trainer later if needed

            setSessions(sessions);
            setClientCount(clients.length); // Assuming trainer's clients are returned in this array
            setLoading(false);
        };

        loadDashboardData();
    }, [trainerId]);

    if (loading) {
        return <CircularProgress />;
    }

    return (
        <Box>
            <Typography variant="h4" gutterBottom>
                Trainer Dashboard
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={4}>
                    <StatCard title="My Clients" value={clientCount || 0} />
                </Grid>
                <Grid item xs={12} sm={8}>
                    <Typography variant="h6">Upcoming Sessions</Typography>
                    <SessionTable sessions={sessions} />
                </Grid>
            </Grid>
        </Box>
    );
};

export default TrainerDashboard;
