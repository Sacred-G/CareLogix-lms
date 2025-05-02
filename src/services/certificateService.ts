
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
  const certNumber = generateCertificateId();
  
  return {
    id: certNumber,
    userId,
    userName,
    courseId: course.id,
    courseTitle: course.title,
    issueDate: currentDate,
    completionDate: currentDate,
    certificateNumber: certNumber,
    organizationName: organization.name,
    organizationLogo: organization.logo,
  };
};

// Save certificate to database
export const saveCertificate = async (certificate: Certificate): Promise<{ success: boolean; certificateId?: string }> => {
  try {
    const { data, error } = await supabase
      .from('certificates')
      .insert({
        id: certificate.id,
        user_id: certificate.userId,
        user_name: certificate.userName,
        course_id: certificate.courseId,
        course_title: certificate.courseTitle,
        issue_date: certificate.issueDate,
        completion_date: certificate.completionDate,
        valid_until: certificate.validUntil || null,
        certificate_number: certificate.certificateNumber,
        organization_name: certificate.organizationName || null,
        organization_logo: certificate.organizationLogo || null
      })
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
    
    if (!data) return null;
    
    return {
      id: data.id,
      userId: data.user_id,
      userName: data.user_name,
      courseId: data.course_id,
      courseTitle: data.course_title,
      issueDate: data.issue_date,
      completionDate: data.completion_date,
      validUntil: data.valid_until || undefined,
      certificateNumber: data.certificate_number,
      organizationName: data.organization_name || undefined,
      organizationLogo: data.organization_logo || undefined,
    };
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
      .eq('user_id', userId)
      .order('issue_date', { ascending: false });
    
    if (error) throw error;
    
    return data.map(cert => ({
      id: cert.id,
      userId: cert.user_id,
      userName: cert.user_name,
      courseId: cert.course_id,
      courseTitle: cert.course_title,
      issueDate: cert.issue_date,
      completionDate: cert.completion_date,
      validUntil: cert.valid_until || undefined,
      certificateNumber: cert.certificate_number,
      organizationName: cert.organization_name || undefined,
      organizationLogo: cert.organization_logo || undefined,
    }));
  } catch (error) {
    console.error('Error fetching certificates:', error);
    return [];
  }
};
