import React from 'react';

interface CertificateMainContentProps {
  userName: string;
  courseTitle: string;
  organizationName: string;
  certificateNumber?: string;
}

const CertificateMainContent: React.FC<CertificateMainContentProps> = ({
  userName,
  courseTitle,
  organizationName,
  certificateNumber
}) => {
  return (
    <div className="py-6 px-8 relative">
      {certificateNumber && (
        <div className="absolute top-4 right-4">
          <div className="text-xs text-right text-gray-500">
            <span>ID: {certificateNumber}</span>
          </div>
        </div>
      )}
      
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
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="40" 
          height="40" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          className="text-lms-teal-600"
        >
          <path d="M8.21 13.89L7 23l5-3 5 3-1.21-9.12"></path>
          <path d="M15 7a3 3 0 1 0-6 0v0h6v0z"></path>
          <path d="M13.45 2.56c-.8-.34-1.72-.56-2.45-.56a5 5 0 0 0-5 5"></path>
          <path d="M10.55 2.56c.8-.34 1.72-.56 2.45-.56a5 5 0 0 1 5 5"></path>
        </svg>
      </div>
    </div>
  );
};

export default CertificateMainContent;
