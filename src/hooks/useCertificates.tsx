
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Certificate } from '@/data/courseTypes';

export const useCertificates = () => {
  const { user } = useAuth();
  
  // Fetch certificates
  const { data: rawCertificates, isLoading: isLoadingCertificates } = useQuery({
    queryKey: ['user-certificates', user?.id],
    queryFn: async () => {
      if (!user) return [];
      
      const { data, error } = await supabase
        .from('certificates')
        .select('*')
        .eq('user_id', user.id)
        .order('issue_date', { ascending: false });
        
      if (error) {
        console.error('Error fetching certificates:', error);
        throw error;
      }
      
      return data || [];
    },
    enabled: !!user
  });

  // Convert raw certificates to Certificate type
  const certificates: Certificate[] = rawCertificates?.map(cert => ({
    id: cert.id,
    userId: cert.user_id,
    userName: cert.user_name,
    courseId: cert.course_id,
    courseTitle: cert.course_title,
    issueDate: cert.issue_date,
    completionDate: cert.completion_date,
    validUntil: cert.valid_until,
    certificateNumber: cert.certificate_number,
    organizationName: cert.organization_name,
    organizationLogo: cert.organization_logo
  })) || [];

  return {
    certificates,
    isLoadingCertificates
  };
};
