import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

interface Client {
    name: string;
    email: string;
    phone_number: string;
    training_status: string;
}

interface ClientCardProps {
    client: Client;
}

const ClientCard: React.FC<ClientCardProps> = ({ client }) => {
    return (
        <Card>
            <CardContent>
                <Typography variant="h6" gutterBottom>
                    {client.name}
                </Typography>
                <Typography color="textSecondary">Email: {client.email}</Typography>
                <Typography color="textSecondary">Phone: {client.phone_number}</Typography>
                <Typography color="textSecondary">
                    Training Status: {client.training_status}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default ClientCard;
