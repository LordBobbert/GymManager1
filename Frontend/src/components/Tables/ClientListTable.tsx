// File: src/components/Tables/ClientListTable.tsx

import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { Client } from '../../interfaces/User';

interface ClientListTableProps {
  clients: Client[];
  onClientSelect: (client: Client) => void;  // Add the onClientSelect prop
}

const ClientListTable: React.FC<ClientListTableProps> = ({ clients, onClientSelect }) => {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell>Email</TableCell>
          <TableCell>Phone Number</TableCell>
          <TableCell>Training Status</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {clients.map((client) => (
          <TableRow
            key={client.id}
            onClick={() => onClientSelect(client)} // Call the onClientSelect prop when a row is clicked
            style={{ cursor: 'pointer' }}  // Add pointer cursor for user feedback
          >
            <TableCell>{client.name}</TableCell>
            <TableCell>{client.email}</TableCell>
            <TableCell>{client.phone_number}</TableCell>
            <TableCell>{client.training_status}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ClientListTable;
