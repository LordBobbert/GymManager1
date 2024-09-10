import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

interface StatCardProps {
    title: string;
    value: number;
    description?: string;
    titleColor?: string;
    valueColor?: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, description, titleColor, valueColor }) => {
    return (
        <Card sx={{ backgroundColor: '#FFF', boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)' }}>
            <CardContent>
                <Typography variant="h6" sx={{ color: titleColor || '#000', fontWeight: 'bold' }}>
                    {title}
                </Typography>
                <Typography variant="h4" sx={{ color: valueColor || '#000', marginTop: '0.5rem' }}>
                    {value}
                </Typography>
                {description && (
                    <Typography variant="body2" sx={{ color: '#757575', marginTop: '0.25rem' }}>
                        {description}
                    </Typography>
                )}
            </CardContent>
        </Card>
    );
};

export default StatCard;
