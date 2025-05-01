
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Header from '@/components/navigation/Header';
import Footer from '@/components/navigation/Footer';

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 flex items-center justify-center py-20">
        <div className="text-center px-4">
          <h1 className="text-6xl font-bold text-lms-blue-500 mb-6">404</h1>
          <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            The page you are looking for doesn't exist or has been moved. Please check the URL or navigate back to the homepage.
          </p>
          <Button asChild>
            <Link to="/">Back to Homepage</Link>
          </Button>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default NotFound;
