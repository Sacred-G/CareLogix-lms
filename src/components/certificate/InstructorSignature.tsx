import React from 'react';

interface InstructorSignatureProps {
  instructorName: string;
  organizationName: string;
}

const InstructorSignature: React.FC<InstructorSignatureProps> = ({
  instructorName,
  organizationName
}) => {
  return (
    <div className="text-center">
      <div className="border-b border-gray-300 pb-1 mb-2">
        <div className="flex justify-center items-end h-12">
          <span 
            className="font-['Dancing_Script'] text-2xl text-lms-blue-800 opacity-80"
            style={{ fontFamily: "'Dancing Script', cursive" }}
          >
            {instructorName}
          </span>
        </div>
      </div>
      <p className="font-medium text-gray-800">Program Instructor</p>
      <p className="text-sm text-gray-500">{organizationName}</p>
    </div>
  );
};

export default InstructorSignature;
