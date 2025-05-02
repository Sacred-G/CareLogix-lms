
import React, { useState, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { useParams, Link, Navigate } from 'react-router-dom';
import Header from '@/components/navigation/Header';
import Footer from '@/components/navigation/Footer';
import Certificate from '@/components/certificate/Certificate';
import { Button } from '@/components/ui/button';
import { Download, Share2, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '@/hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Certificate as CertificateType } from '@/data/courseTypes';

const CertificatePage = () => {
  const { certificateId } = useParams<{ certificateId: string }>();
  const { user } = useAuth();
  const certificateRef = useRef<HTMLDivElement>(null);

  // For now, since we don't have actual certificate data in Supabase yet,
  // we'll mock a certificate for demo purposes
  const mockCertificate: CertificateType = {
    id: certificateId || 'cert-123',
    userId: user?.id || 'user-123',
    userName: user?.user_metadata?.full_name || 'DSP Professional',
    courseId: 'intro-dev-disabilities',
    courseTitle: 'Introduction to Developmental Disabilities',
    issueDate: new Date().toISOString(),
    completionDate: new Date().toISOString(),
    certificateNumber: certificateId || 'CERT-12345678',
    // Add any additional fields needed for signatures if necessary
  };

  const { data: certificate, isLoading, error } = useQuery({
    queryKey: ['certificate', certificateId],
    queryFn: async () => {
      // In a real app, you'd fetch from Supabase
      // For now, return the mock certificate
      return Promise.resolve(mockCertificate);
    }
  });

  const handlePrint = useReactToPrint({
    content: () => certificateRef.current,
    documentTitle: certificate ? `${certificate.courseTitle} Certificate` : 'Certificate',
    onAfterPrint: () => {
      toast.success('Certificate downloaded successfully');
    }
  });

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: `${certificate?.courseTitle} Certificate`,
          text: `Check out my certificate for completing ${certificate?.courseTitle}!`,
          // In a real app, you'd have a URL to the certificate
          url: window.location.href,
        });
      } else {
        toast('Sharing is not supported on this device');
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 container px-4 py-8">
          <div className="animate-pulse flex flex-col items-center py-16">
            <div className="h-64 bg-slate-200 rounded w-full max-w-3xl mb-4"></div>
            <div className="h-4 bg-slate-200 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-slate-200 rounded w-1/2"></div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !certificate) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <Button variant="outline" asChild className="mb-6">
              <Link to="/dashboard" className="flex items-center gap-2">
                <ArrowLeft size={16} />
                Back to Dashboard
              </Link>
            </Button>
            
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <h1 className="text-2xl font-bold">Your Certificate</h1>
              <div className="flex gap-2">
                <Button onClick={handlePrint} className="flex items-center gap-2">
                  <Download size={16} />
                  Download
                </Button>
                <Button onClick={handleShare} variant="outline" className="flex items-center gap-2">
                  <Share2 size={16} />
                  Share
                </Button>
              </div>
            </div>
          </div>
          
          <div ref={certificateRef}>
            <Certificate certificate={certificate} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CertificatePage;
