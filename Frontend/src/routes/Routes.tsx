// src/routes/AppRoutes.tsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import AdminRoute from './AdminRoute';
import DashboardHome from '../pages/dashboard/DashboardHome';
import AdminDashboard from '../pages/admin/AdminDashboard';
import ClientsSection from '../pages/admin/clients/ClientsSection';  // Import the ClientsSection
import TrainerDashboard from '../pages/trainers/TrainerDashboard';
import DashboardLayout from '../components/Layout/DashboardLayout';
import Login from '../pages/auth/Login';
import ClientDashboard from '../pages/clients/ClientDashboard';

const AppRoutes: React.FC = () => {
    return (
        <Routes>
            {/* Public route */}
            <Route path="/login" element={<Login />} />

            {/* Protected routes for all users */}
            <Route element={<PrivateRoute />}>
                <Route element={<DashboardLayout />}>
                    {/* Add the main dashboard route */}
                    <Route path="/" element={<DashboardHome />} />
                    <Route path="/client/dashboard" element={<ClientDashboard />} />
                </Route>
            </Route>

            {/* Admin-specific routes */}
            <Route element={<AdminRoute />}>
                <Route element={<DashboardLayout />}>
                    <Route path="/admin/dashboard" element={<AdminDashboard />} />
                    <Route path="/admin/clients" element={<ClientsSection />} />  {/* Route to ClientsSection */}
                </Route>
            </Route>

            {/* Trainer-specific routes */}
            <Route element={<PrivateRoute />}>
                <Route element={<DashboardLayout />}>
                    <Route path="/trainer/dashboard" element={<TrainerDashboard />} />
                </Route>
            </Route>
        </Routes>
    );
};

export default AppRoutes;
