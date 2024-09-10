import React, { useEffect, useState } from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import ScheduleCalendar from './ScheduleCalendar';
import { fetchGymSchedule } from '../../api/scheduleApi';

const GymSchedules: React.FC = () => {
    const [events, setEvents] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const loadGymSchedule = async () => {
            const data = await fetchGymSchedule();
            const formattedEvents = data.map((event: any) => ({
                title: `${event.client_name} with ${event.trainer_name}`,
                start: new Date(event.start),
                end: new Date(event.end),
            }));
            setEvents(formattedEvents);
            setLoading(false);
        };

        loadGymSchedule();
    }, []);

    if (loading) {
        return <CircularProgress />;
    }

    return (
        <Box>
            <Typography variant="h4" gutterBottom>
                Gym Schedule
            </Typography>
            <ScheduleCalendar events={events} />
        </Box>
    );
};

export default GymSchedules;
