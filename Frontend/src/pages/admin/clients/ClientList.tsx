// src/pages/admin/clients/ClientList.tsx

import React from 'react';
import { List, ListItem, ListItemText, Typography } from '@mui/material';
import { Client } from '../../../interfaces/User';

interface ClientListProps {
  clients: Client[];
  onClientSelect: (client: Client) => void;
}

const ClientList: React.FC<ClientListProps> = ({ clients, onClientSelect }) => {
  return (
    <div>
      <Typography variant="h5" gutterBottom>Clients</Typography>
      <List>
        {clients.map(client => (
          <ListItem 
            key={client.id} 
            button 
            onClick={() => onClientSelect(client)}
            sx={{ 
              borderBottom: '1px solid #ccc', 
              '&:hover': { backgroundColor: '#f5f5f5' }
            }}
          >
            <ListItemText 
              primary={client.name} 
              secondary={client.email} 
            />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default ClientList;
