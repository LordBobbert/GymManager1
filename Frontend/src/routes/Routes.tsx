// File: src/routes/Routes.tsx

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import AdminRoute from './AdminRoute';
import DashboardHome from '../pages/dashboard/DashboardHome';
import AdminDashboard from '../pages/admin/AdminDashboard';
import TrainerDashboard from '../pages/trainers/TrainerDashboard';
import ClientsSection from '../pages/admin/clients/ClientsSection';  // Import ClientsSection for the client management
import NotFound from '../pages/NotFound';
import Login from '../pages/auth/Login';
import DashboardLayout from '../components/Layout/DashboardLayout';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={<Login />} />

      {/* Protected route for all users */}
      <Route element={<PrivateRoute />}>
        <Route element={<DashboardLayout />}>
          <Route path="/" element={<DashboardHome />} />
          <Route path="/client/dashboard" element={<DashboardHome />} /> {/* Adjust as necessary */}
        </Route>
      </Route>

      {/* Admin-specific routes */}
      <Route element={<AdminRoute />}>
        <Route element={<DashboardLayout />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          
          {/* Use ClientsSection instead of ClientList to manage client list and profile */}
          <Route path="/admin/clients/*" element={<ClientsSection />} />
        </Route>
      </Route>

      {/* Trainer-specific routes */}
      <Route element={<PrivateRoute />}>
        <Route element={<DashboardLayout />}>
          <Route path="/trainer/dashboard" element={<TrainerDashboard />} />
        </Route>
      </Route>

      {/* Catch-all for unknown routes */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
