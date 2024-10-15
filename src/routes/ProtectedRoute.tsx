import React, { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import {useAuth} from "../auth/AuthContext.tsx";

interface ProtectedRouteProps {
  children: ReactNode;
  requireAuth: boolean;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requireAuth }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (requireAuth && !isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!requireAuth && isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};