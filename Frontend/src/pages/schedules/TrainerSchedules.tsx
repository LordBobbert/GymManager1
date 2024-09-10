import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, CircularProgress } from '@mui/material';
import ScheduleCalendar from './ScheduleCalendar';
import { fetchTrainerSchedule } from '../../api/scheduleApi';

const TrainerSchedules: React.FC = () => {
    const { trainerId } = useParams<{ trainerId: string }>(); // Get trainerId from the URL
    const [events, setEvents] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const loadTrainerSchedule = async () => {
            const data = await fetchTrainerSchedule(Number(trainerId));
            const formattedEvents = data.map((event: any) => ({
                title: `Session with ${event.client_name}`,
                start: new Date(event.start),
                end: new Date(event.end),
            }));
            setEvents(formattedEvents);
            setLoading(false);
        };

        loadTrainerSchedule();
    }, [trainerId]);

    if (loading) {
        return <CircularProgress />;
    }

    return (
        <Box>
            <Typography variant="h4" gutterBottom>
                Trainer Schedule
            </Typography>
            <ScheduleCalendar events={events} />
        </Box>
    );
};

export default TrainerSchedules;
