// src/components/clients/ClientsList.tsx
import React from 'react';
import { Grid, Box, Typography, Paper, Button } from '@mui/material';
import { Phone, Email } from '@mui/icons-material';  // Import phone and email icons
import { Client } from '../../../interfaces/User';
import { colors } from '../../../styles/theme';  // Import theme colors
import { Add } from '@mui/icons-material';  // Import Add icon

interface ClientsListProps {
  clients: Client[];
  onSelectClient: (clientId: number) => void;
  onAddClient: () => void;
}

const ClientsList: React.FC<ClientsListProps> = ({ clients, onSelectClient, onAddClient }) => {
  return (
    <Box sx={{ padding: 2 }}>
      {/* Header section with title and Add Client button */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        {/* Title */}
        <Typography variant="h5" sx={{ color: colors.text, fontWeight: 'bold' }}>
          Clients
        </Typography>

        {/* Add Client button */}
        <Button
          variant="contained"
          color="primary"
          startIcon={<Add />}
          onClick={onAddClient}
          sx={{
            backgroundColor: colors.accentBlue,
            '&:hover': { backgroundColor: colors.primary },  // Darker purple on hover
          }}
        >
          Add Client
        </Button>
      </Box>

      {/* Clients Grid */}
      <Grid container spacing={2}>
        {clients.map((client) => (
          <Grid item xs={12} sm={6} md={4} key={client.id}>
            <Paper
              elevation={3}
              sx={{
                padding: 1.5,  // Less padding for a compact card
                cursor: 'pointer',
                width: '100%',  // Ensure the card takes up the full grid width
                minWidth: '200px',  // Minimum width for smaller screen sizes
                '&:hover': {
                  backgroundColor: '#EFEFFF',  // Light hover effect
                },
              }}
              onClick={() => onSelectClient(client.id)}
            >
              <Typography variant="h6" gutterBottom>
                {client.name}  {/* Display client name */}
              </Typography>

              {/* Email and Phone in a single line */}
              <Box display="flex" alignItems="center" mt={1}>
                {/* Email */}
                <Email fontSize="small" sx={{ marginRight: 1, color: colors.accentBlue }} />
                <Typography variant="body2" color="textSecondary" sx={{ marginRight: 2 }}>
                  {client.email}
                </Typography>

                {/* Phone */}
                <Phone fontSize="small" sx={{ marginRight: 1, color: colors.accentBlue }} />
                <Typography variant="body2" color="textSecondary">
                  {client.phone_number}
                </Typography>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ClientsList;
