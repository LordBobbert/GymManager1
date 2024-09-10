import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const AdminRoute: React.FC = () => {
  const { user } = useAuth();

  return user?.role === 'admin' ? <Outlet /> : <Navigate to="/login" />;
};

export default AdminRoute;
