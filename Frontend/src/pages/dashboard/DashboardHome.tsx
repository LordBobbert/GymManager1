import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const DashboardHome: React.FC = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            if (user.role === 'admin') {
                navigate('/admin/dashboard');
            } else if (user.role === 'trainer') {
                navigate('/trainer/dashboard');
            } else {
                navigate('/client/dashboard');
            }
        }
    }, [user, navigate]);

    return <div>Loading dashboard...</div>;
};

export default DashboardHome;
