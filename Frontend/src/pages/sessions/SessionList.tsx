import React, { useEffect, useState } from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import SessionTable from '../../components/Tables/SessionTable';
import { fetchSessionsForTrainer } from '../../api/sessionApi'; // Can also use fetchSessionsForClient for client-specific list

const SessionList: React.FC = () => {
    const [sessions, setSessions] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const trainerId = 1; // Replace with actual logged-in trainer ID or admin filter logic

    useEffect(() => {
        const loadSessions = async () => {
            const data = await fetchSessionsForTrainer(trainerId); // For trainers, can be replaced for admin
            setSessions(data);
            setLoading(false);
        };

        loadSessions();
    }, [trainerId]);

    if (loading) {
        return <CircularProgress />;
    }

    return (
        <Box>
            <Typography variant="h4" gutterBottom>
                All Sessions
            </Typography>
            <SessionTable sessions={sessions} />
        </Box>
    );
};

export default SessionList;
