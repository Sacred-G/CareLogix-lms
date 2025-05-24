import React from 'react';
import { Award } from 'lucide-react';

interface CertificateHeaderProps {
  organizationLogo?: string;
  organizationName: string;
}

const CertificateHeader: React.FC<CertificateHeaderProps> = ({
  organizationLogo,
  organizationName,
}) => {
  return (
    <div className="relative z-10 text-center">
      <div className="flex justify-center items-center mb-8">
        <div className="bg-lms-blue-600 rounded-full p-3 shadow-lg">
          {organizationLogo ? (
            <div className="h-14 w-14 flex items-center justify-center">
              <img 
                src={`/logos/${organizationLogo}.svg`} 
                alt={organizationName} 
                className="max-h-12 max-w-12"
                onError={(e) => {
                  // Fallback to default icon if logo fails to load
                  e.currentTarget.style.display = 'none';
                  const parent = e.currentTarget.parentElement;
                  if (parent) {
                    const icon = document.createElement('div');
                    icon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-white"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>';
                    parent.appendChild(icon);
                  }
                }}
              />
            </div>
          ) : (
            <Award className="h-14 w-14 text-white" />
          )}
        </div>
      </div>
      
      <div className="border-b-2 border-lms-blue-300 mb-10">
        <h2 className="text-lms-blue-800 text-2xl font-bold uppercase tracking-wider mb-1">Certificate of Completion</h2>
        <div className="h-1 w-48 bg-lms-teal-500 mx-auto mb-4"></div>
      </div>
    </div>
  );
};

export default CertificateHeader;
