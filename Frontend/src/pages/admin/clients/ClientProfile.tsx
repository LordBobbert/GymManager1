// src/components/clients/ClientProfile.tsx
import React, { useState, useEffect } from 'react';
import { Box, Grid, Paper, Typography, TextField, Button, MenuItem } from '@mui/material';
import { colors } from '../../../styles/theme'; // Use the shared color scheme
import { Save } from '@mui/icons-material'; // Import Save icon
import { fetchClientProfile } from '../../../api/userApi'; // Import the API function

interface ClientProfileProps {
  clientId: number; // Pass the clientId as a prop to fetch client details
}

const trainingStatusOptions = [
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
  { value: 'on_vacation', label: 'On Vacation' }
];

const ClientProfile: React.FC<ClientProfileProps> = ({ clientId }) => {
  const [client, setClient] = useState<any>(null); // State to hold client data
  const [loading, setLoading] = useState<boolean>(true); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state

  // Fetch client profile on component mount
  useEffect(() => {
    const loadClientProfile = async () => {
      try {
        const clientData = await fetchClientProfile(clientId); // API call to fetch client data
        setClient(clientData); // Set client data to state
        setLoading(false); // Set loading to false once data is fetched
      } catch (error) {
        setError('Failed to load client details.');
        setLoading(false);
      }
    };

    loadClientProfile();
  }, [clientId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setClient({ ...client, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    // Save the client details (API call)
    console.log('Client saved:', client);
  };

  if (loading) {
    return <Typography>Loading client details...</Typography>;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Paper elevation={3} sx={{ padding: 3, margin: 3 }}>
      {/* Profile Header */}
      <Box display="flex" alignItems="center" mb={3}>
        <img
          src="https://via.placeholder.com/100" // Replace with client image upload or display
          alt="Profile"
          style={{ borderRadius: '50%', marginRight: 16 }}
        />
        <Button variant="outlined" sx={{ marginRight: 2 }}>
          Upload new photo
        </Button>
        <Button variant="text">Reset</Button>
      </Box>

      {/* Client Profile Details */}
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
        Profile Details
      </Typography>

      {/* Form Fields */}
      <Grid container spacing={3}>
        {/* First Name and Last Name */}
        <Grid item xs={12} md={6}>
          <TextField
            label="First Name"
            name="firstName"
            value={client?.user?.name.split(' ')[0] || ''} // First name
            onChange={handleInputChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label="Last Name"
            name="lastName"
            value={client?.user?.name.split(' ')[1] || ''} // Last name
            onChange={handleInputChange}
            fullWidth
          />
        </Grid>

        {/* Email */}
        <Grid item xs={12} md={6}>
          <TextField
            label="Email"
            name="email"
            value={client?.user?.email || ''}
            onChange={handleInputChange}
            fullWidth
          />
        </Grid>

        {/* Phone Number */}
        <Grid item xs={12} md={6}>
          <TextField
            label="Phone Number"
            name="phoneNumber"
            value={client?.user?.phone_number || ''}
            onChange={handleInputChange}
            fullWidth
          />
        </Grid>

        {/* Training Status */}
        <Grid item xs={12} md={6}>
          <TextField
            select
            label="Training Status"
            name="trainingStatus"
            value={client?.training_status || ''}
            onChange={handleInputChange}
            fullWidth
          >
            {trainingStatusOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        {/* Emergency Contact */}
        <Grid item xs={12} md={4}>
          <TextField
            label="Emergency Contact Name"
            name="emergencyContactName"
            value={client?.emergency_contact_name || ''}
            onChange={handleInputChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            label="Emergency Contact Phone"
            name="emergencyContactPhone"
            value={client?.emergency_contact_phone || ''}
            onChange={handleInputChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            label="Emergency Contact Relation"
            name="emergencyContactRelation"
            value={client?.emergency_contact_relation || ''}
            onChange={handleInputChange}
            fullWidth
          />
        </Grid>

        {/* Session Rates */}
        <Grid item xs={12} md={6}>
          <TextField
            label="One-on-One Session Rate"
            name="oneOnOneRate"
            value={client?.one_on_one_rate || ''}
            onChange={handleInputChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label="Partner Session Rate"
            name="partnerSessionRate"
            value={client?.partner_session_rate || ''}
            onChange={handleInputChange}
            fullWidth
          />
        </Grid>

        {/* Assigned Trainer */}
        <Grid item xs={12} md={6}>
          <TextField
            label="Assigned Trainer"
            name="assignedTrainer"
            value={client?.assigned_trainer?.user?.name || 'Unassigned'}
            onChange={handleInputChange}
            fullWidth
          />
        </Grid>
      </Grid>

      {/* Save Button */}
      <Box mt={3}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<Save />}
          onClick={handleSave}
          sx={{ backgroundColor: colors.accentBlue, '&:hover': { backgroundColor: colors.primary } }}
        >
          Save
        </Button>
      </Box>
    </Paper>
  );
};

export default ClientProfile;
