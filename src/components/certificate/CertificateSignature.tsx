import React from 'react';
import { formatDomainToOrganizationName } from '@/utils/domainFormatter';
import { Signature } from '@/data/signatureTypes';

interface CertificateSignatureProps {
  signature: Signature | null;
  fallbackTitle: string;
  organizationName: string;
  organizationLogo?: string;
  loading?: boolean;
}

const CertificateSignature: React.FC<CertificateSignatureProps> = ({
  signature,
  fallbackTitle,
  organizationName,
  organizationLogo,
  loading = false
}) => {
  // DEBUG: Log organizationLogo prop
  console.log('[CertificateSignature DEBUG]', { organizationLogo, organizationName });
  
  return (
    <div className="text-center">
      <div className="border-b border-gray-300 pb-1 mb-2">
        <div className="flex justify-center items-end h-12 gap-4">
          {loading ? (
            <div className="animate-pulse w-32 h-8 bg-gray-200 rounded"></div>
          ) : signature ? (
            <img 
              src={signature.imageUrl} 
              alt={`${signature.name}'s signature`}
              className="h-full max-w-[120px] object-contain opacity-80"
            />
          ) : (
            <span 
              className="text-4xl"
              style={{ 
                fontFamily: "'Brother Signature', cursive, 'Golden Signature', 'Comic Sans MS', 'Brush Script MT', sans-serif",
                color: '#111',
                lineHeight: '1',
                display: 'inline-block',
                whiteSpace: 'nowrap',
                textShadow: 'none',
                letterSpacing: '1px',
              }}
            >
              Steven Bouldin
            </span>
          )}
          {organizationLogo && (
            <img
              src={organizationLogo}
              alt="Organization Logo"
              className="h-10 w-auto object-contain ml-3"
              style={{ maxWidth: '80px' }}
            />
          )}
        </div>
      </div>
      <p className="font-medium text-gray-800">{signature?.title || fallbackTitle}</p>
      <p className="text-sm text-gray-500">{formatDomainToOrganizationName(organizationName)}</p>
    </div>
  );
};

export default CertificateSignature;
