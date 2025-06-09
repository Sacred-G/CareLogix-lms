import React from 'react';
import Header from '@/components/navigation/Header';
import Footer from '@/components/navigation/Footer';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-muted/30 py-8">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default AdminLayout;
