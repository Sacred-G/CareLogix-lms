import { Certificate, Course } from '@/data/courseTypes';
import { supabase } from '@/integrations/supabase/client';
import { formatDomainToOrganizationName } from '@/utils/domainFormatter';
import { verifyUserDomainAccess, getUserDomain, verifyCertificateAccess } from './domainService';
import { v4 as uuidv4 } from 'uuid';

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
  const organizationMap: Record<string, { name: string; logo: string }> = {
    'centeredsupportservice.org': { 
      name: 'Centered Support Service',
      logo: '/Images/css_logo.png' // Path to CSS logo
    },
    'includemetooplease.com': {
      name: 'Include Me Too Please',
      logo: '/Images/IMTP_LOGO.png' // Path to IMTP logo
    },
    // Default fallback organization
    'default': {
      name: 'DSP Training Program',
      logo: '/placeholder.svg' // Fallback placeholder
    }
  };
  
  // Return the mapped organization or default
  const org = domain && organizationMap[domain] ? organizationMap[domain] : organizationMap['default'];
  console.log('Organization for domain', domain, ':', org);
  return org;
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
  let userDomain = getUserDomain(email);
  // Remove common domain suffixes for best formatting
  const domainForFormatting = userDomain ? userDomain.replace(/\.(com|org|net|edu)$/i, '') : '';
  const formattedOrgName = formatDomainToOrganizationName(domainForFormatting || '');

  return {
    id: uuidv4(), // Generate UUID for database ID
    userId,
    userName,
    courseId: course.id,
    courseTitle: course.title,
    issueDate: currentDate,
    completionDate: currentDate,
    certificateNumber: certNumber, // Store custom certificate number
    organizationName: formattedOrgName || organization.name,
    organizationLogo: organization.logo,
    organizationDomain: userDomain || undefined,
  };
};

// Save certificate to database
export const saveCertificate = async (certificate: Certificate): Promise<{ success: boolean; certificateId?: string }> => {
  console.log('[CertificateService] Attempting to save certificate:', JSON.stringify(certificate, null, 2));
  try {
    // Ensure we have the organization domain
    let organizationDomain = certificate.organizationDomain;
    if (!organizationDomain && certificate.userId) {
      // If domain is missing, try to get it from the user's profile
      const { data: user } = await supabase
        .from('profiles')
        .select('email')
        .eq('id', certificate.userId)
        .single();
      
      if (user?.email) {
        organizationDomain = getUserDomain(user.email) || undefined;
      }
    }
    console.log('[CertificateService] Organization domain for save:', organizationDomain);

    // Remove 'id' if present to prevent UUID errors
    const { id, certificateNumber, completionDate, issueDate, courseId, courseTitle, userId, userName, organizationName, organizationLogo, ...certificateData } = certificate;
    const { data, error } = await supabase
      .from('certificates')
      .insert({
        user_id: userId,
        user_name: userName,
        course_id: courseId,
        course_title: courseTitle,
        issue_date: issueDate,
        completion_date: completionDate,
        certificate_number: certificateNumber,
        organization_name: organizationName || null,
        organization_logo: organizationLogo || null,
        organization_domain: organizationDomain || null,
        valid_until: certificate.validUntil || null
      })
      .select('id')
      .single();
    
    if (error) {
      console.error('[CertificateService] Supabase error object during save:', JSON.stringify(error, null, 2));
      throw error;
    }
    
    return { 
      success: true,
      certificateId: data.id
    };
  } catch (error: any) {
    console.error('[CertificateService] Full error in saveCertificate catch block:', JSON.stringify(error, null, 2));
    console.error('Error saving certificate:', error.message || error);
    return { success: false };
  }
};

// Get a specific certificate by ID with domain validation
export const getCertificateById = async (certificateId: string, currentUserId: string): Promise<Certificate | null> => {
  try {
    if (!certificateId) {
      console.error('Certificate ID is required');
      return null;
    }

    if (!currentUserId) {
      console.error('User ID is required');
      return null;
    }

    // Fetch the certificate with the current user's access check
    const { data: certificate, error: fetchError } = await supabase
      .from('certificates')
      .select('*')
      .eq('id', certificateId)
      .single();
    
    if (fetchError || !certificate) {
      console.error('Certificate not found:', fetchError);
      return null;
    }

    // Verify access using the domain service
    const hasAccess = await verifyCertificateAccess(currentUserId, certificateId);
    if (!hasAccess) {
      console.warn(`Access denied: User ${currentUserId} cannot access certificate ${certificateId}`);
      return null;
    }
    
    return {
      id: certificate.id,
      userId: certificate.user_id,
      userName: certificate.user_name,
      courseId: certificate.course_id,
      courseTitle: certificate.course_title,
      issueDate: certificate.issue_date,
      completionDate: certificate.completion_date,
      validUntil: certificate.valid_until || undefined,
      certificateNumber: certificate.certificate_number,
      organizationName: certificate.organization_name || undefined,
      organizationLogo: certificate.organization_logo || undefined,
      organizationDomain: certificate.organization_domain || undefined,
    };
  } catch (error) {
    console.error('Error in getCertificateById:', error);
    return null;
  }
};

// Get user certificates with domain validation
export const getUserCertificates = async (userId: string, currentUserId: string): Promise<Certificate[]> => {
  try {
    if (!userId || !currentUserId) {
      console.error('Missing user ID or current user ID');
      return [];
    }

    // Verify domain access
    const hasAccess = await verifyUserDomainAccess(currentUserId, userId);
    if (!hasAccess) {
      console.warn(`User ${currentUserId} does not have access to certificates for user ${userId}`);
      return [];
    }

    // First, get the current user's domain
    const { data: currentUser } = await supabase
      .from('profiles')
      .select('email')
      .eq('id', currentUserId)
      .single();

    if (!currentUser?.email) {
      console.error('Current user not found');
      return [];
    }

    const currentUserDomain = getUserDomain(currentUser.email);
    if (!currentUserDomain) {
      console.error('Could not determine user domain');
      return [];
    }

    // Fetch certificates for the user or with matching domain
    const { data, error } = await supabase
      .from('certificates')
      .select('*')
      .or(`user_id.eq.${userId},and(user_id.neq.${userId},organization_domain.eq.${currentUserDomain})`)
      .order('issue_date', { ascending: false });
    
    if (error) {
      console.error('Error fetching certificates:', error);
      throw error;
    }
    
    return (data || []).map(cert => ({
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
      organizationDomain: cert.organization_domain || undefined,
    }));
  } catch (error) {
    console.error('Error in getUserCertificates:', error);
    return [];
  }
};
