
import { Certificate, Course } from '@/data/courseTypes';
import { supabase } from '@/integrations/supabase/client';

// Generate a unique certificate ID
export const generateCertificateId = (): string => {
  const timestamp = new Date().getTime().toString().slice(-8);
  const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  return `CERT-${timestamp}-${random}`;
};

// Create a certificate object
export const createCertificate = (
  userId: string,
  userName: string,
  course: Course
): Certificate => {
  const currentDate = new Date().toISOString();
  
  return {
    id: generateCertificateId(),
    userId,
    userName,
    courseId: course.id,
    courseTitle: course.title,
    issueDate: currentDate,
    completionDate: currentDate,
    certificateNumber: generateCertificateId(),
  };
};

// Save certificate to database if needed - using a mock implementation
// We'll mock data storage since there's no certificates table in Supabase yet
export const saveCertificate = async (certificate: Certificate): Promise<boolean> => {
  try {
    // Mock implementation - in a real app, this would save to Supabase
    console.log('Saving certificate:', certificate);
    
    // Mock successful save
    return true;
  } catch (error) {
    console.error('Error saving certificate:', error);
    return false;
  }
};

// Get user certificates - using a mock implementation
// We'll return mock certificates since there's no certificates table yet
export const getUserCertificates = async (userId: string): Promise<Certificate[]> => {
  try {
    // Mock implementation - in a real app, this would fetch from Supabase
    console.log('Fetching certificates for user:', userId);
    
    // Return a mock certificate
    const mockCertificate: Certificate = {
      id: 'CERT-12345678',
      userId: userId,
      userName: 'DSP Professional',
      courseId: 'intro-dev-disabilities',
      courseTitle: 'Introduction to Developmental Disabilities',
      issueDate: new Date().toISOString(),
      completionDate: new Date().toISOString(),
      certificateNumber: 'CERT-12345678',
    };
    
    return [mockCertificate];
  } catch (error) {
    console.error('Error fetching certificates:', error);
    return [];
  }
};
