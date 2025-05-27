import React from 'react';

interface CertificateFooterProps {
  issueDate: string;
  completionDate: string;
  courseTitle: string;
  validUntil?: string | null;
}

const CertificateFooter: React.FC<CertificateFooterProps> = ({
  issueDate,
  completionDate,
  courseTitle,
  validUntil
}) => {
  return (
    <>
      {/* Date Issued */}
      <div className="mt-6 text-center">
        <p className="font-medium text-gray-800">{issueDate}</p>
        <p className="text-sm text-gray-500">Date Issued</p>
      </div>
      
      {/* Additional Information */}
      <div className="mt-8 text-center text-sm text-gray-500">
        <p>This certificate verifies completion of the DSP training course: {courseTitle}</p>
        <p className="mt-1">Course completed on {completionDate}</p>
        {validUntil && <p className="mt-1">Valid until {validUntil}</p>}
      </div>
    </>
  );
};

export default CertificateFooter;
