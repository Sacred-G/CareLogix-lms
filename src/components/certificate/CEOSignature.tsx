import React from 'react';

interface CEOSignatureProps {
  ceoName?: string;
  organizationName: string;
}

const CEOSignature: React.FC<CEOSignatureProps> = ({
  ceoName = 'Michael Johnson',
  organizationName
}) => {
  return (
    <div className="text-center">
      <div className="border-b border-gray-300 pb-1 mb-2">
        <div className="flex justify-center items-end h-12">
          <span 
            className="text-2xl text-lms-blue-800 opacity-80"
            style={{ fontFamily: "'Pacifico', cursive" }}
          >
            {ceoName}
          </span>
        </div>
      </div>
      <p className="font-medium text-gray-800">Chief Executive Officer</p>
      <p className="text-sm text-gray-500">{organizationName}</p>
    </div>
  );
};

export default CEOSignature;
