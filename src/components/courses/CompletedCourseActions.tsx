
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { FileBadge2, Award } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { Course, Certificate } from '@/data/courseTypes';
import { createCertificate } from '@/services/certificateService';
import CertificateModal from '../certificate/CertificateModal';
import { toast } from 'sonner';

interface CompletedCourseActionsProps {
  course: Course;
  isCompleted: boolean;
}

const CompletedCourseActions = ({ course, isCompleted }: CompletedCourseActionsProps) => {
  const [certificateModalOpen, setCertificateModalOpen] = useState(false);
  const [certificate, setCertificate] = useState<Certificate | null>(null);
  const { user, session } = useAuth();
  
  if (!isCompleted) {
    return null;
  }
  
  const handleGenerateCertificate = () => {
    if (!user || !session) {
      toast.error("You must be logged in to generate a certificate");
      return;
    }
    
    const userName = user.user_metadata?.full_name || 'DSP Learner';
    const newCertificate = createCertificate(user.id, userName, course);
    
    setCertificate(newCertificate);
    setCertificateModalOpen(true);
  };
  
  return (
    <>
      <div className="flex flex-col sm:flex-row gap-4 p-4 bg-green-50 border border-green-200 rounded-md">
        <div className="flex-1">
          <div className="flex items-center gap-2 text-green-800 font-medium mb-1">
            <Award size={18} />
            <span>Course Completed!</span>
          </div>
          <p className="text-green-700 text-sm">
            Congratulations on completing this course! You can now download your certificate.
          </p>
        </div>
        <Button 
          onClick={handleGenerateCertificate}
          className="shrink-0 bg-green-600 hover:bg-green-700"
        >
          <FileBadge2 className="mr-2 h-4 w-4" />
          Get Certificate
        </Button>
      </div>
      
      {certificate && (
        <CertificateModal 
          open={certificateModalOpen} 
          onOpenChange={setCertificateModalOpen}
          certificate={certificate} 
        />
      )}
    </>
  );
};

export default CompletedCourseActions;
