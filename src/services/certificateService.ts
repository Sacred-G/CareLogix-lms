
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

// Save certificate to database if needed
export const saveCertificate = async (certificate: Certificate): Promise<boolean> => {
  try {
    // This would save to Supabase in a real implementation
    const { error } = await supabase
      .from('certificates')
      .insert(certificate);
    
    if (error) {
      console.error('Error saving certificate:', error);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Error saving certificate:', error);
    return false;
  }
};

// Get user certificates
export const getUserCertificates = async (userId: string): Promise<Certificate[]> => {
  try {
    const { data, error } = await supabase
      .from('certificates')
      .select('*')
      .eq('userId', userId);
    
    if (error) {
      console.error('Error fetching certificates:', error);
      return [];
    }
    
    return data as Certificate[];
  } catch (error) {
    console.error('Error fetching certificates:', error);
    return [];
  }
};
