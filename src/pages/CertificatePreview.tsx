import React from 'react';
import Certificate from '@/components/certificate/Certificate';
import { Certificate as CertificateType } from '@/data/courseTypes';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const CertificatePreview = () => {
  // Sample certificate data
  const sampleCertificate: CertificateType = {
    id: "sample-123",
    certificateNumber: "LWCL-2025-12345",
    userName: "Jane Smith",
    courseId: "intro-dev-disabilities",
    courseTitle: "Introduction to Developmental Disabilities for Support Staff",
    completionDate: new Date().toISOString(),
    issueDate: new Date().toISOString(),
    organizationName: "DSP Training Program",
    userId: "user-123",
  };

  return (
    <div className="container mx-auto py-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Certificate Preview</h1>
        <Link to="/dashboard">
          <Button variant="outline">Back to Dashboard</Button>
        </Link>
      </div>
      
      <div className="bg-gray-50 p-8 rounded-lg shadow-sm">
        <Certificate certificate={sampleCertificate} />
      </div>
      
      <div className="mt-8 p-4 bg-blue-50 rounded border border-blue-200">
        <h2 className="text-lg font-semibold mb-2">About This Preview</h2>
        <p>This is a sample preview of what certificates look like in the Learn with Compassion LMS.</p>
        <p className="mt-2">The actual certificates will contain the student's real name and course completion details.</p>
      </div>
    </div>
  );
};

export default CertificatePreview;
