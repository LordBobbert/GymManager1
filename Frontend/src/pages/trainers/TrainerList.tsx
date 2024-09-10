import React, { useEffect, useState } from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import TrainerListTable from '../../components/Tables/TrainerListTable';
import { fetchTrainers } from '../../api/userApi';

const TrainerList: React.FC = () => {
    const [trainers, setTrainers] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const loadTrainers = async () => {
            const data = await fetchTrainers();
            setTrainers(data);
            setLoading(false);
        };

        loadTrainers();
    }, []);

    if (loading) {
        return <CircularProgress />;
    }

    return (
        <Box>
            <Typography variant="h4" gutterBottom>
                All Trainers
            </Typography>
            <TrainerListTable trainers={trainers} />
        </Box>
    );
};

export default TrainerList;
