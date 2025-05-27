import React from 'react';
import { Signature } from '@/data/signatureTypes';

interface CertificateSignatureProps {
  signature: Signature | null;
  fallbackTitle: string;
  organizationName: string;
  loading?: boolean;
}

const CertificateSignature: React.FC<CertificateSignatureProps> = ({
  signature,
  fallbackTitle,
  organizationName,
  loading = false
}) => {
  return (
    <div className="text-center">
      <div className="border-b border-gray-300 pb-1 mb-2">
        <div className="flex justify-center items-end h-12">
          {loading ? (
            <div className="animate-pulse w-32 h-8 bg-gray-200 rounded"></div>
          ) : signature ? (
            <img 
              src={signature.imageUrl} 
              alt={`${signature.name}'s signature`}
              className="h-full max-w-[120px] object-contain opacity-80"
            />
          ) : (
            <span className="font-serif italic text-xl text-lms-blue-800 opacity-80">
              {fallbackTitle === 'Program Instructor' ? 'Jane Smith' : 'Michael Johnson'}
            </span>
          )}
        </div>
      </div>
      <p className="font-medium text-gray-800">{signature?.title || fallbackTitle}</p>
      <p className="text-sm text-gray-500">{organizationName}</p>
    </div>
  );
};

export default CertificateSignature;
