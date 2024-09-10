import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { SessionProvider } from './context/SessionContext';
import AppRoutes from './routes/Routes';  // Import the centralized routes

const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <SessionProvider>
          {/* Render the centralized routes */}
          <AppRoutes />
        </SessionProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;
