import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const TrainerRoute: React.FC = () => {
  const { user } = useAuth();

  return user?.role === 'trainer' ? <Outlet /> : <Navigate to="/login" />;
};

export default TrainerRoute;
