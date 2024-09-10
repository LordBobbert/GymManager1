// src/pages/admin/clients/ClientProfile.tsx

import React from 'react';
import { Box, Typography, Grid, Button } from '@mui/material';
import { Client } from '../../../interfaces/User';

interface ClientProfileProps {
  client: Client | null;
  onSave: () => void;
}

const ClientProfile: React.FC<ClientProfileProps> = ({ client, onSave }) => {
  if (!client) {
    return <Typography variant="h6">Select a client to view details</Typography>;
  }

  return (
    <Box sx={{ padding: '1rem' }}>
      <Typography variant="h4" gutterBottom>Client Profile</Typography>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Typography>Name: {client.name}</Typography>
          <Typography>Email: {client.email}</Typography>
          <Typography>Phone: {client.phone_number}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography>Training Status: {client.training_status}</Typography>
          <Typography>Emergency Contact: {client.emergency_contact_name}</Typography>
          <Typography>Emergency Contact Phone: {client.emergency_contact_phone}</Typography>
        </Grid>
      </Grid>
      <Box mt={2}>
        <Button variant="contained" color="primary" onClick={onSave}>Save Changes</Button>
      </Box>
    </Box>
  );
};

export default ClientProfile;
