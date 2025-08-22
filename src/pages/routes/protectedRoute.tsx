import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

interface Props {
    children: React.ReactNode;
}

export const ProtectedRoute = ({ children }: Props) => {
    const { isLoggedIn } = useAuth();
    return isLoggedIn ? children : <Navigate to="/" replace />;
};
