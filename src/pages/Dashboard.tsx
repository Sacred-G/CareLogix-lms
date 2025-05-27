
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '@/components/navigation/Header';
import Footer from '@/components/navigation/Footer';
import DashboardStats from '@/components/dashboard/DashboardStats';
import CourseTabs from '@/components/dashboard/CourseTabs';
import CertificatesList from '@/components/dashboard/CertificatesList';
import { useEnrollments } from '@/hooks/useEnrollments';
import { useCertificates } from '@/hooks/useCertificates';
import { toast } from 'sonner';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

const Dashboard = () => {
  const location = useLocation();
  const { 
    inProgressCourses,
    completedCourses,
    recommendedCourses,
    isLoadingEnrollments,
    totalEnrollments,
    completedCount,
    inProgressCount
  } = useEnrollments();
  
  const { certificates, isLoadingCertificates } = useCertificates();
  
  // Check if user was redirected due to lack of course access
  const accessDenied = location.state?.accessDenied;
  const accessDeniedMessage = location.state?.message;
  
  useEffect(() => {
    // Show toast notification if user was redirected due to lack of course access
    if (accessDenied) {
      toast.error(accessDeniedMessage || "You don't have access to this course. Please contact your system administrator to request access.");
    }
  }, [accessDenied, accessDeniedMessage]);

  return (
    <div className="min-h-screen flex flex-col bg-include-glow text-foreground">
      <Header />
      
      <main className="flex-1">
        {/* Dashboard Header */}
        <section className="py-8 border-b border-border bg-transparent">
          <div className="container px-4">
            <h1 className="text-3xl font-bold mb-2 heading-pink">Student Dashboard</h1>
            <p className="text-slate-300">Track your learning progress and continue your courses</p>
          </div>
        </section>
        
        {/* Stats Overview */}
        <section className="py-8 bg-card/50">
          <div className="container px-4">
            <DashboardStats 
              totalEnrollments={totalEnrollments}
              completedCount={completedCount}
              inProgressCount={inProgressCount}
              isLoading={isLoadingEnrollments}
            />
          </div>
        </section>
        
        {/* Course Progress */}
        <section className="py-8">
          <div className="container px-4">
            <CourseTabs 
              inProgressCourses={inProgressCourses}
              completedCourses={completedCourses}
              recommendedCourses={recommendedCourses}
              isLoadingEnrollments={isLoadingEnrollments}
            />
          </div>
        </section>
        
        {/* Certificates Section */}
        <section className="py-8 bg-card/50 border-t border-border">
          <div className="container px-4">
            <CertificatesList 
              certificates={certificates} 
              loading={isLoadingCertificates}
            />
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
