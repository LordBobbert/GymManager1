import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, CircularProgress } from '@mui/material';
import ScheduleCalendar from './ScheduleCalendar';
import { fetchClientSchedule } from '../../api/scheduleApi';

const ClientSchedules: React.FC = () => {
    const { clientId } = useParams<{ clientId: string }>(); // Get clientId from the URL
    const [events, setEvents] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const loadClientSchedule = async () => {
            const data = await fetchClientSchedule(Number(clientId));
            const formattedEvents = data.map((event: any) => ({
                title: `Session with ${event.trainer_name}`,
                start: new Date(event.start),
                end: new Date(event.end),
            }));
            setEvents(formattedEvents);
            setLoading(false);
        };

        loadClientSchedule();
    }, [clientId]);

    if (loading) {
        return <CircularProgress />;
    }

    return (
        <Box>
            <Typography variant="h4" gutterBottom>
                Client Schedule
            </Typography>
            <ScheduleCalendar events={events} />
        </Box>
    );
};

export default ClientSchedules;
