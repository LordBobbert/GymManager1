import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

interface Trainer {
    id: number;
    name: string;
    email: string;
    status: string;
}

interface TrainerListTableProps {
    trainers: Trainer[];
}

const TrainerListTable: React.FC<TrainerListTableProps> = ({ trainers }) => {
    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Status</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {trainers.map((trainer) => (
                        <TableRow key={trainer.id}>
                            <TableCell>{trainer.name}</TableCell>
                            <TableCell>{trainer.email}</TableCell>
                            <TableCell>{trainer.status}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default TrainerListTable;
