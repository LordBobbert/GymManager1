import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

interface Trainer {
    name: string;
    email: string;
    status: string;
}

interface TrainerCardProps {
    trainer: Trainer;
}

const TrainerCard: React.FC<TrainerCardProps> = ({ trainer }) => {
    return (
        <Card>
            <CardContent>
                <Typography variant="h6" gutterBottom>
                    {trainer.name}
                </Typography>
                <Typography color="textSecondary">Email: {trainer.email}</Typography>
                <Typography color="textSecondary">Status: {trainer.status}</Typography>
            </CardContent>
        </Card>
    );
};

export default TrainerCard;
