import React, { useEffect, useState } from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import SessionTable from '../../components/Tables/SessionTable';
import { fetchSessionsForClient } from '../../api/sessionApi';

const ClientDashboard: React.FC = () => {
    const [sessions, setSessions] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const clientId = 1; // Replace with actual logged-in client ID

    useEffect(() => {
        const loadClientSessions = async () => {
            const data = await fetchSessionsForClient(clientId);
            setSessions(data);
            setLoading(false);
        };

        loadClientSessions();
    }, [clientId]);

    if (loading) {
        return <CircularProgress />;
    }

    return (
        <Box>
            <Typography variant="h4" gutterBottom>
                My Sessions
            </Typography>
            <SessionTable sessions={sessions} />
        </Box>
    );
};

export default ClientDashboard;
