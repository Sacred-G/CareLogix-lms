
import { Certificate, Course } from '@/data/courseTypes';
import { supabase } from '@/integrations/supabase/client';

// Generate a unique certificate ID
export const generateCertificateId = (): string => {
  const timestamp = new Date().getTime().toString().slice(-8);
  const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  return `CERT-${timestamp}-${random}`;
};

// Get organization name from email domain
export const getOrganizationFromEmail = (email: string): { name: string; logo?: string } => {
  if (!email) return { name: 'DSP Training Program' };
  
  const domain = email.split('@')[1]?.toLowerCase();
  
  // Map domains to organization names and logos
  const organizationMap: Record<string, { name: string; logo?: string }> = {
    'centeredsupportservice.org': { 
      name: 'Centered Support Service',
      logo: 'centered-learning' // This would be the logo key/name
    },
    // Add more organization mappings as needed
  };
  
  // Return the mapped organization or a default
  return domain && organizationMap[domain] 
    ? organizationMap[domain] 
    : { name: 'DSP Training Program' };
};

// Create a certificate object
export const createCertificate = (
  userId: string,
  userName: string,
  course: Course,
  email: string
): Certificate => {
  const currentDate = new Date().toISOString();
  const organization = getOrganizationFromEmail(email);
  
  return {
    id: generateCertificateId(),
    userId,
    userName,
    courseId: course.id,
    courseTitle: course.title,
    issueDate: currentDate,
    completionDate: currentDate,
    certificateNumber: generateCertificateId(),
    organizationName: organization.name,
    organizationLogo: organization.logo,
  };
};

// Save certificate to database
export const saveCertificate = async (certificate: Certificate): Promise<{ success: boolean; certificateId?: string }> => {
  try {
    const { data, error } = await supabase
      .from('certificates')
      .insert(certificate)
      .select('id')
      .single();
    
    if (error) throw error;
    
    return { 
      success: true,
      certificateId: data.id
    };
  } catch (error) {
    console.error('Error saving certificate:', error);
    return { success: false };
  }
};

// Get a specific certificate by ID
export const getCertificateById = async (certificateId: string): Promise<Certificate | null> => {
  try {
    const { data, error } = await supabase
      .from('certificates')
      .select('*')
      .eq('id', certificateId)
      .single();
    
    if (error) throw error;
    
    return data as Certificate;
  } catch (error) {
    console.error('Error fetching certificate:', error);
    return null;
  }
};

// Get user certificates
export const getUserCertificates = async (userId: string): Promise<Certificate[]> => {
  try {
    const { data, error } = await supabase
      .from('certificates')
      .select('*')
      .eq('userId', userId)
      .order('issueDate', { ascending: false });
    
    if (error) throw error;
    
    return data as Certificate[];
  } catch (error) {
    console.error('Error fetching certificates:', error);
    return [];
  }
};
