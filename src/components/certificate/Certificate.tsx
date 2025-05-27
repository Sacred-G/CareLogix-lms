import React from 'react';
import { format } from 'date-fns';
import { Certificate as CertificateType } from '@/data/courseTypes';
import { Card } from '@/components/ui/card';
import CertificateHeader from './CertificateHeader';
import CertificateMainContent from './CertificateMainContent';
import InstructorSignature from './InstructorSignature';
import CEOSignature from './CEOSignature';
import CertificateFooter from './CertificateFooter';

interface CertificateProps {
  certificate: CertificateType;
  onDownload?: () => void;
  preview?: boolean;
}

const Certificate = ({ certificate, onDownload, preview = false }: CertificateProps) => {
  // Format dates
  const formattedIssueDate = format(new Date(certificate.issueDate), 'MMMM dd, yyyy');
  const formattedCompletionDate = format(new Date(certificate.completionDate), 'MMMM dd, yyyy');
  const validUntil = certificate.validUntil ? format(new Date(certificate.validUntil), 'MMMM dd, yyyy') : null;
  
  // Get organization info
  const organizationName = certificate.organizationName || 'DSP Training Program';
  
  return (
    <div className={`certificate-container ${preview ? 'max-w-3xl mx-auto' : 'w-full'}`}>
      <Card className="certificate-card relative overflow-hidden bg-white border-2 border-gray-200 rounded-lg shadow-lg p-8">
        {/* Certificate Background Pattern */}
        <div className="absolute inset-0 z-0 opacity-5">
          <div className="absolute inset-0 bg-repeat" style={{ backgroundImage: 'url(/patterns/certificate-pattern.svg)' }}></div>
        </div>
        
        {/* Certificate Border */}
        <div className="absolute inset-0 z-0 border-[12px] border-double border-lms-blue-100 rounded-lg"></div>
        
        {/* Certificate Content */}
        <div className="relative z-10 flex flex-col h-full">
          {/* Header with Logo */}
          <CertificateHeader 
            organizationLogo={certificate.organizationLogo} 
            organizationName={organizationName} 
          />
          
          {/* Main Certificate Content */}
          <CertificateMainContent 
            userName={certificate.userName}
            courseTitle={certificate.courseTitle}
            organizationName={organizationName}
            certificateNumber={certificate.certificateNumber}
          />
          
          {/* Signatures */}
          <div className="flex justify-between px-10 mb-8">
            <InstructorSignature 
              instructorName="John Smith"
              organizationName={organizationName}
            />
            
            <CEOSignature 
              ceoName="Michael Johnson"
              organizationName={organizationName}
            />
          </div>
          
          {/* Footer with dates and additional info */}
          <CertificateFooter 
            issueDate={formattedIssueDate}
            completionDate={formattedCompletionDate}
            courseTitle={certificate.courseTitle}
            validUntil={validUntil}
          />
        </div>
      </Card>
      
      {onDownload && (
        <div className="mt-6 text-center">
          <button 
            onClick={onDownload}
            className="px-4 py-2 bg-lms-blue-600 text-white rounded hover:bg-lms-blue-700 transition-colors"
          >
            Download Certificate
          </button>
        </div>
      )}
    </div>
  );
};

export default Certificate;
