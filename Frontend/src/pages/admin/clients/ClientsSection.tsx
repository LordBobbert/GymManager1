import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import ClientsList from './ClientList';
import ClientProfile from './ClientProfile';
import { fetchClients } from '../../../api/userApi';
import { Client } from '../../../interfaces/User';

const ClientsSection: React.FC = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [selectedClientId, setSelectedClientId] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadClients = async () => {
      try {
        const data = await fetchClients();
        setClients(data);
      } catch (error) {
        setError('Failed to load clients.');
      } finally {
        setLoading(false);
      }
    };

    loadClients();
  }, []);

  const handleClientSelect = (clientId: number) => {
    setSelectedClientId(clientId);
  };

  const handleAddClient = () => {
    // Add client logic here (e.g., open a modal or redirect to an Add Client page)
    console.log('Add client button clicked');
  };

  if (loading) {
    return <div>Loading clients...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Box display="flex" width="100%" height="100%">
      {/* Clients List (25% width) */}
      <Box width="25%" p={2} sx={{ borderRight: '1px solid #e0e0e0' }}>
        <ClientsList 
          clients={clients} 
          onSelectClient={handleClientSelect} 
          onAddClient={handleAddClient}  // Pass the onAddClient prop
        />
      </Box>

      {/* Client Profile (75% width) */}
      <Box width="75%" p={2} bgcolor="#f0f0f0">
        {selectedClientId ? (
          <ClientProfile clientId={selectedClientId} /> 
        ) : (
          <h2>Select a client to view their profile</h2>
        )}
      </Box>
    </Box>
  );
};

export default ClientsSection;
