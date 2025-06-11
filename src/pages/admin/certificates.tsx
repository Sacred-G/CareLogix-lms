import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Spin } from 'antd';
import { useAuth } from '@/hooks/useAuth';
import AdminLayout from '@/components/layouts/AdminLayout';
import CertificateGenerator from '@/components/admin/CertificateGenerator';

const AdminCertificatesPage: FC = () => {
  const { user, isAdmin, loading } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!loading && !isAdmin) {
      navigate('/');
    } else if (!loading) {
      setIsLoading(false);
    }
  }, [isAdmin, loading, navigate]);

  if (loading || isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spin size="large" />
      </div>
    );
  }
  return (
    <AdminLayout>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6">Certificate Generator</h1>
        <CertificateGenerator />
      </div>
    </AdminLayout>
  );
};

export default AdminCertificatesPage;
