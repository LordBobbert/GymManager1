import React, { useState } from 'react';
import { Button, TextField, Typography, Container, Box } from '@mui/material';
import { useAuth } from '../../hooks/useAuth';  // Keep your existing login logic intact

const colors = {
  dark: '#0D1F22',
  green: '#264027',
  lighterGreen: '#3C5233',
  yellowGreen: '#6F732F',
  lightBrown: '#B38A58',
};

const Login: React.FC = () => {
  const { loginUser } = useAuth();  // Keep your login function intact
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await loginUser(email, password);
    } catch (err) {
      setError('Login failed. Please check your credentials.');
    }
  };

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: '8rem',
          backgroundColor: '#F9F9F9',
          padding: '2rem',
          borderRadius: '8px',
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: 'bold',
            color: colors.dark, // Dark color for the title text
            marginBottom: '1.5rem',
          }}
        >
          Login
        </Typography>
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <TextField
            label="Email"
            type="email"
            fullWidth
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{
              marginBottom: '1.5rem',
              '& label.Mui-focused': {
                color: colors.green, // Dark green when focused
              },
              '& .MuiOutlinedInput-root': {
                '&.Mui-focused fieldset': {
                  borderColor: colors.green, // Dark green border when focused
                },
              },
            }}
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{
              marginBottom: '1.5rem',
              '& label.Mui-focused': {
                color: colors.green, // Dark green when focused
              },
              '& .MuiOutlinedInput-root': {
                '&.Mui-focused fieldset': {
                  borderColor: colors.green, // Dark green border when focused
                },
              },
            }}
          />
          {error && (
            <Typography
              sx={{
                color: colors.lightBrown, // Error message in light brown
                marginBottom: '1rem',
                fontSize: '0.875rem',
              }}
            >
              {error}
            </Typography>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              backgroundColor: colors.yellowGreen, // Primary button color
              '&:hover': {
                backgroundColor: colors.lighterGreen, // Darker green when hoveexiy
              },
              color: '#FFF',
              padding: '0.75rem',
              fontWeight: 'bold',
            }}
          >
            Login
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default Login;
