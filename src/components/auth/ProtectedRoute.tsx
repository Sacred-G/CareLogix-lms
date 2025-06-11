import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

interface ProtectedRouteProps {
  children: React.ReactNode;
  adminOnly?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, adminOnly = false }) => {
  const { user, loading, isAdmin } = useAuth();
  const location = useLocation();

  // If authentication is still loading, we can show a loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  // If user is not authenticated, redirect to login page
  if (!user) {
    // Save the location they were trying to access
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  // Check if admin access is required and user is not admin
  if (adminOnly && !isAdmin) {
    return <Navigate to="/" replace />;
  }

  // If authenticated (and admin if required), render the children
  return <>{children}</>;
};

export { ProtectedRoute };
