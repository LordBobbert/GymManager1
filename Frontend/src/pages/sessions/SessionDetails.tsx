import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, CircularProgress, Paper, Grid } from '@mui/material';
import { fetchSessionDetails } from '../../api/sessionApi';

interface Session {
    id: number;
    client_name: string;
    trainer_name: string;
    session_type: string;
    date: string;
    duration: number;
    status: string;
}

const SessionDetails: React.FC = () => {
    const { sessionId } = useParams<{ sessionId: string }>(); // Get sessionId from URL params
    const [session, setSession] = useState<Session | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const loadSessionDetails = async () => {
            const sessionData = await fetchSessionDetails(Number(sessionId));
            setSession(sessionData);
            setLoading(false);
        };

        loadSessionDetails();
    }, [sessionId]);

    if (loading) {
        return <CircularProgress />;
    }

    if (!session) {
        return <Typography variant="h6">Session not found</Typography>;
    }

    return (
        <Box sx={{ maxWidth: '600px', margin: '0 auto', padding: '2rem' }}>
            <Typography variant="h4" gutterBottom>
                Session Details
            </Typography>
            <Paper elevation={3} sx={{ padding: '1.5rem' }}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="h6">Client Name</Typography>
                        <Typography>{session.client_name}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h6">Trainer Name</Typography>
                        <Typography>{session.trainer_name}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h6">Session Type</Typography>
                        <Typography>{session.session_type}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h6">Date</Typography>
                        <Typography>{new Date(session.date).toLocaleDateString()}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h6">Duration</Typography>
                        <Typography>{session.duration} minutes</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h6">Status</Typography>
                        <Typography>{session.status}</Typography>
                    </Grid>
                </Grid>
            </Paper>
        </Box>
    );
};

export default SessionDetails;
