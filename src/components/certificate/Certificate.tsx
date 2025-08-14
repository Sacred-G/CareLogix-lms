import React, { useEffect } from 'react';
import { format } from 'date-fns';
import { Certificate as CertificateType } from '@/data/courseTypes';
import { formatDomainToOrganizationName } from '@/utils/domainFormatter';
import { Card } from '@/components/ui/card';
import CertificateSignature from './CertificateSignature';

interface CertificateProps {
  certificate: CertificateType;
  onDownload?: () => void;
  preview?: boolean;
}

const Certificate = ({ certificate, onDownload, preview = false }: CertificateProps) => {
  // Always display a formatted, human-friendly org name
  const organizationName = formatDomainToOrganizationName(certificate.organizationName) || 'Your Organization';
  // DEBUG: Log certificate and organizationName
  // eslint-disable-next-line no-console
  console.log('[Certificate DEBUG]', { certificate, organizationName, organizationLogo: certificate.organizationLogo });

  useEffect(() => {
    console.log('[Certificate MOUNT]', 'Certificate component mounted, about to render signature with logo:', certificate.organizationLogo);
  }, [certificate.organizationLogo]);
  // Format dates
  const formattedIssueDate = format(new Date(certificate.issueDate), 'MMMM dd, yyyy');
  const formattedCompletionDate = format(new Date(certificate.completionDate), 'MMMM dd, yyyy');
  const validUntil = certificate.validUntil ? format(new Date(certificate.validUntil), 'MMMM dd, yyyy') : null;
  

  // const isCenteredSupport = organizationName.toLowerCase().includes('centered support'); // Optionally theme by org name
  
  return (
    <div className={`certificate-container ${preview ? 'max-w-4xl mx-auto' : 'w-full'}`} style={{
      minHeight: '11in',
      width: '100%',
      position: 'relative',
      padding: '0 2rem 2rem',
      boxSizing: 'border-box'
    }}>
      <Card className="certificate-card relative overflow-hidden h-full w-full flex flex-col">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/Images/image.png" 
            alt="Certificate Background" 
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Certificate Content */}
        <div className="relative z-10 flex-1 flex flex-col justify-between py-8 px-12">
          {/* Header - Pushed down by 1 inch (96px) more */}
          <div className="text-center mb-4" style={{ marginTop: '7rem' }}> {/* 7rem = 112px (mt-24) + 96px */}
            <h1 className="text-4xl font-bold text-gray-900 mb-2">CERTIFICATE</h1>
            <p className="text-lg text-gray-800">OF COMPLETION</p>
          </div>
          
          {/* Main Content with Logo */}
          <div className="flex-1 flex justify-between items-center px-4">
            {/* Left Side - Certificate Text */}
            <div className="flex-1 flex flex-col justify-center text-center max-w-2xl">
              <p className="text-gray-800 mb-6">This is to certify that</p>
              <h2 className="text-4xl font-bold text-gray-900 mb-8 tracking-wide">{certificate.userName}</h2>
              
              <div className="space-y-6">
                <p className="text-gray-800 text-lg leading-relaxed">
                  has successfully completed the course
                </p>
                
                <h3 className="text-3xl font-semibold text-gray-900 my-6 px-4 py-2 border-l-4 border-r-4 border-lms-blue-500 border-r-lms-blue-300 bg-blue-50 rounded">
                  {certificate.courseTitle}
                </h3>
                
                <p className="text-gray-700 leading-relaxed">
                  This course is designed to enhance the skills and knowledge of support staff 
                  in providing exceptional care and assistance to individuals with diverse needs. The course 
                  covers essential topics including person-centered approaches, effective communication, 
                  and best practices in support services.
                </p>
                
                <p className="text-gray-700 leading-relaxed">
                  Completion of this course demonstrates a commitment to professional development 
                  and excellence in the field of support services.
                </p>
                
                <div className="mt-6 pt-4 border-t border-gray-200">
                  <p className="text-gray-900 font-medium">
                    Completed on: {formattedCompletionDate}
                  </p>
                </div>
              </div>
            </div>
            {/* Remove logo from here */}
          </div>

          {/* Organization Logo at Bottom Right */}
          {certificate.organizationLogo && (
            <div
              style={{
                position: 'absolute',
                right: 120, // moved further left
                bottom: 120, // adjust as needed to sit above the footer
                zIndex: 20,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-end',
                pointerEvents: 'none',
              }}
            >
              <img
                src={certificate.organizationLogo}
                alt={`${organizationName} Logo`}
                className="object-contain opacity-90"
                style={{ maxWidth: '220px', maxHeight: '130px', boxShadow: '0 2px 6px rgba(0,0,0,0.08)' }}
              />
            </div>
          )}
          
          {/* Signatures Section */}
          <div className="mt-12 pt-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-end" style={{ marginTop: 'auto' }}>
            {/* Signature Section */}
            <div className="flex justify-center items-center mt-8">
                <CertificateSignature 
                  signature={null}
                  fallbackTitle="Authorized Representative"
                  organizationName={certificate.organizationName}
                />
            </div>
            
            {/* Empty div to maintain flex spacing */}
            <div></div>
          </div>
          
          {/* Footer */}
          <div className="mt-4 pt-4 border-t border-gray-300 text-center space-y-2">
            <p className="text-sm text-gray-800">This certificate is proudly presented by {organizationName}</p>
            <div className="flex justify-center items-center space-x-2 text-xs text-gray-600">
              <span>Certificate ID:</span>
              <span className="font-mono bg-gray-100 px-2 py-1 rounded">{certificate.certificateNumber}</span>
            </div>
          </div>
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
