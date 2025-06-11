import React from 'react';
import { format } from 'date-fns';
import { Certificate as CertificateType } from '@/data/courseTypes';
import { Card } from '@/components/ui/card';

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
  
  // Get organization info and determine which signature to show
  const organizationName = certificate.organizationName || 'CareLogix LMS';
  const isIncludeMeToPlease = organizationName.toLowerCase().includes('includemetoplease');
  const isCenteredSupport = organizationName.toLowerCase().includes('centeredsupportservice');
  
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
          
          {/* Main Content */}
          <div className="flex-1 flex flex-col justify-center text-center px-4">
            <p className="text-gray-800 mb-6">This is to certify that</p>
            <h2 className="text-4xl font-bold text-gray-900 mb-8 tracking-wide">{certificate.userName}</h2>
            
            <div className="max-w-3xl mx-auto space-y-6">
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
                  Date of Completion: {formattedCompletionDate}
                </p>
              </div>
            </div>
          </div>
          
          {/* Signatures Section */}
          <div className="mt-12 pt-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-end" style={{ marginTop: 'auto' }}>
            {/* Signature Section */}
            <div className="flex flex-col items-center">
              {isIncludeMeToPlease && (
                <div className="text-center">
                  <div className="text-2xl font-signature text-gray-800">Woody Woodard</div>
                  <div className="signature-line w-48 h-1 my-1 bg-gradient-to-r from-transparent via-gray-500 to-transparent"></div>
                  <p className="text-sm text-gray-600">CareLogix LMS Administrator</p>
                  <p className="text-xs text-gray-500 mt-2">Authorized Signature</p>
                </div>
              )}
              {isCenteredSupport && (
                <div className="text-center">
                  <div className="text-2xl font-signature text-gray-800">Steven Bouldin</div>
                  <div className="signature-line w-48 h-1 my-1 bg-gradient-to-r from-transparent via-gray-500 to-transparent"></div>
                  <p className="text-sm text-gray-600">centeredsupportservice.org</p>
                  <p className="text-xs text-gray-500 mt-2">Authorized Representative</p>
                </div>
              )}
            </div>
            
            {/* Date and Certificate Number */}
            <div className="flex flex-col items-center">
              <div className="text-center mb-4">
                <p className="text-sm text-gray-600 mb-1">Date of Issue</p>
                <p className="text-base font-medium text-gray-900">{formattedIssueDate}</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-1">Certificate Number</p>
                <p className="text-sm font-mono font-medium text-gray-900">{certificate.certificateNumber}</p>
              </div>
            </div>
          </div>
          
          {/* Footer */}
          <div className="mt-4 pt-4 border-t border-gray-300 text-center text-sm text-gray-800">
            <p>This certificate is proudly presented by {organizationName}</p>
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
