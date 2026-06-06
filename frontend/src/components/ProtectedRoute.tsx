import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import React from 'react';

export const ProtectedRoute = ({ children }: { children: React.ReactElement }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};