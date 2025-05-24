
import React from 'react';
import Header from '@/components/navigation/Header';
import Footer from '@/components/navigation/Footer';
import DashboardStats from '@/components/dashboard/DashboardStats';
import CourseTabs from '@/components/dashboard/CourseTabs';
import CertificatesList from '@/components/dashboard/CertificatesList';
import { useEnrollments } from '@/hooks/useEnrollments';
import { useCertificates } from '@/hooks/useCertificates';

const Dashboard = () => {
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
