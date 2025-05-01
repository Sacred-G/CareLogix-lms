
import React from 'react';
import { format } from 'date-fns';
import { Certificate as CertificateType } from '@/data/courseTypes';
import { Card } from '@/components/ui/card';
import { FileBadge2 } from 'lucide-react';

interface CertificateProps {
  certificate: CertificateType;
  onDownload?: () => void;
  preview?: boolean;
}

const Certificate = ({ certificate, onDownload, preview = false }: CertificateProps) => {
  const formattedIssueDate = format(new Date(certificate.issueDate), 'MMMM dd, yyyy');
  const formattedCompletionDate = format(new Date(certificate.completionDate), 'MMMM dd, yyyy');
  
  return (
    <div className={`certificate-container ${preview ? 'max-w-3xl mx-auto' : 'w-full'}`}>
      <Card className="certificate bg-gradient-to-b from-white to-lms-blue-50 p-8 border-2 border-lms-blue-300 relative overflow-hidden">
        {/* Watermark */}
        <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
          <FileBadge2 size={400} />
        </div>
        
        {/* Certificate Content */}
        <div className="relative z-10 text-center space-y-6">
          <div className="mb-8">
            <h2 className="text-lms-blue-600 text-xl font-bold uppercase tracking-wider">Certificate of Completion</h2>
            <div className="h-1 w-32 bg-lms-teal-500 mx-auto mt-2"></div>
          </div>
          
          <div className="mb-10">
            <p className="text-gray-600 mb-1">This certificate is awarded to</p>
            <h1 className="text-3xl font-bold text-gray-800 font-serif">{certificate.userName}</h1>
          </div>
          
          <div className="mb-10">
            <p className="text-gray-600 mb-1">for successfully completing</p>
            <h3 className="text-2xl font-bold text-lms-blue-800">{certificate.courseTitle}</h3>
            <p className="text-sm text-gray-500 mt-2">
              Course completed on {formattedCompletionDate}
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-8 my-10">
            <div className="text-center">
              <div className="h-px w-40 bg-gray-300 mx-auto mb-2"></div>
              <p className="text-gray-600">Date Issued</p>
              <p className="font-medium">{formattedIssueDate}</p>
            </div>
            <div className="text-center">
              <div className="h-px w-40 bg-gray-300 mx-auto mb-2"></div>
              <p className="text-gray-600">Certificate ID</p>
              <p className="font-medium">{certificate.certificateNumber}</p>
            </div>
          </div>
          
          <div className="mt-8">
            <p className="text-sm text-gray-500">
              This certificate verifies that the above-named individual has completed the required coursework and demonstrated proficiency in DSP training standards.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Certificate;
