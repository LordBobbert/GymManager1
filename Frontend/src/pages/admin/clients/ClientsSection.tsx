// src/pages/admin/clients/ClientsSection.tsx

import React, { useState, useEffect } from 'react';
import { Box, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ClientList from './ClientList';
import ClientProfile from './ClientProfile';
import { fetchClients } from '../../../api/userApi';
import { Client } from '../../../interfaces/User';

const ClientsSection: React.FC = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadClients = async () => {
      const data = await fetchClients();
      setClients(data);
    };
    loadClients();
  }, []);

  const handleClientSelect = (client: Client) => {
    setSelectedClient(client);
    navigate(`/admin/clients/${client.id}`);
  };

  const handleSave = () => {
    // Implement the save logic
    alert('Client data saved');
  };

  return (
    <Box sx={{ display: 'flex', height: '100%' }}>
      <Grid container spacing={2}>
        <Grid item xs={3} sx={{ borderRight: '1px solid #ddd' }}>
          <ClientList clients={clients} onClientSelect={handleClientSelect} />
        </Grid>
        <Grid item xs={9}>
          <ClientProfile client={selectedClient} onSave={handleSave} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default ClientsSection;
