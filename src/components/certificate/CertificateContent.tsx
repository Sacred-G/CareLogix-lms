import React from 'react';
import { Medal } from 'lucide-react';

interface CertificateContentProps {
  certificateNumber: string;
  userName: string;
  courseTitle: string;
  organizationName: string;
}

const CertificateContent: React.FC<CertificateContentProps> = ({
  certificateNumber,
  userName,
  courseTitle,
  organizationName,
}) => {
  return (
    <div className="py-6 px-8 relative">
      <div className="absolute top-4 right-4">
        <div className="text-xs text-right text-gray-500">
          <span>ID: {certificateNumber}</span>
        </div>
      </div>
      
      <div className="mb-14">
        <p className="text-gray-600 text-lg mb-1">This is to certify that</p>
        <h1 className="text-4xl font-bold text-gray-800 font-serif mb-2">{userName}</h1>
        <p className="text-gray-600 text-lg mb-2">has successfully completed the course</p>
        <h3 className="text-2xl font-bold text-lms-blue-800 mb-2">{courseTitle}</h3>
        <p className="text-gray-600">
          demonstrating proficiency and understanding of all required concepts
          <br />in accordance with {organizationName} training standards.
        </p>
      </div>
      
      <div className="flex items-center justify-center gap-4 mb-10">
        <Medal className="text-lms-teal-600 h-10 w-10" />
      </div>
    </div>
  );
};

export default CertificateContent;
