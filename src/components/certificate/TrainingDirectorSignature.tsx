import React from 'react';

interface TrainingDirectorSignatureProps {
  directorName: string;
  organizationName: string;
  signatureImageUrl?: string;
}

const TrainingDirectorSignature: React.FC<TrainingDirectorSignatureProps> = ({
  directorName = 'Steven Bouldin',
  organizationName,
  signatureImageUrl
}) => {
  return (
    <div className="text-center">
      <div className="relative inline-block">
        {signatureImageUrl ? (
          <div className="mb-1">
            <img 
              src={signatureImageUrl} 
              alt={`${directorName}'s signature`} 
              className="h-16 object-contain mx-auto"
            />
          </div>
        ) : (
          <div className="mb-1">
            <span 
              className="text-4xl text-lms-blue-900"
              style={{ 
                fontFamily: "'Golden Signature', cursive",
                lineHeight: '1',
                display: 'inline-block',
                whiteSpace: 'nowrap'
              }}
            >
              {directorName}
            </span>
          </div>
        )}
        <div className="w-48 h-px bg-gray-400 mx-auto my-2"></div>
        <p className="text-gray-700 font-medium text-sm">Training Director</p>
        <p className="text-gray-600 text-xs mt-0.5">{organizationName}</p>
      </div>
    </div>
  );
};

export default TrainingDirectorSignature;
