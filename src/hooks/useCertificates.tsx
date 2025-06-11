
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Certificate } from '@/data/courseTypes';

export const useCertificates = () => {
  const { user } = useAuth();
  
  // Fetch certificates for the current user
  const { data: rawCertificates, isLoading: isLoadingCertificates, error } = useQuery({
    queryKey: ['user-certificates', user?.id],
    queryFn: async () => {
      if (!user?.id) return [];
      
      console.log('Fetching certificates for user:', user.id);
      
      // Get certificates for the user
      const { data, error } = await supabase
        .from('certificates')
        .select('*')
        .eq('user_id', user.id)
        .order('issue_date', { ascending: false });
        
      if (error) {
        console.error('Error fetching certificates:', error);
        throw error;
      }
      
      console.log('Fetched certificates:', data);
      return data || [];
    },
    enabled: !!user?.id,
    retry: 2
  });

  // Convert raw certificates to Certificate type
  const certificates: Certificate[] = (rawCertificates || []).map(cert => {
    // Ensure logo path is valid - prefix with / if it's a filename without path
    let logoPath = cert.organization_logo || '';
    if (logoPath && !logoPath.startsWith('/') && !logoPath.startsWith('http')) {
      logoPath = `/${logoPath}`;
    }
    
    return {
      id: cert.id,
      userId: cert.user_id,
      userName: cert.user_name,
      courseId: cert.course_id,
      courseTitle: cert.course_title,
      issueDate: cert.issue_date,
      completionDate: cert.completion_date || cert.issue_date,
      validUntil: cert.valid_until,
      certificateNumber: cert.certificate_number || cert.id,
      organizationName: cert.organization_name || 'DSP Training Program',
      organizationLogo: logoPath || '/placeholder.svg'
    };
  });

  console.log('Processed certificates:', { rawCertificates, certificates });

  return {
    certificates,
    isLoadingCertificates,
    error
  };
};
