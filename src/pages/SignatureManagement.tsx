import React from 'react';
import SignatureManager from '@/components/admin/SignatureManager';
import { useAuth } from '@/hooks/useAuth';
import { Navigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const SignatureManagement: React.FC = () => {
  const { user } = useAuth();

  // In the future, we can add a proper isAdmin check
  // For now, we'll use a placeholder check for authenticated users
  const isAdmin = !!user;

  // Redirect non-authenticated users
  if (!user) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <div className="container mx-auto py-10 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Signature Management</CardTitle>
          <CardDescription>
            Upload and manage signature images for certificates
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SignatureManager />
        </CardContent>
      </Card>
    </div>
  );
};

export default SignatureManagement;
