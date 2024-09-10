import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

interface Session {
    id: number;
    date: string;
    client_name: string;
    trainer_name: string;
    session_type: string;
}

interface SessionTableProps {
    sessions: Session[];
}

const SessionTable: React.FC<SessionTableProps> = ({ sessions }) => {
    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Date</TableCell>
                        <TableCell>Client</TableCell>
                        <TableCell>Trainer</TableCell>
                        <TableCell>Session Type</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {sessions.map((session) => (
                        <TableRow key={session.id}>
                            <TableCell>{new Date(session.date).toLocaleDateString()}</TableCell>
                            <TableCell>{session.client_name}</TableCell>
                            <TableCell>{session.trainer_name}</TableCell>
                            <TableCell>{session.session_type}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default SessionTable;
