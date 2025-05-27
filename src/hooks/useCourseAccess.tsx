import { useAuth } from '@/hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

/**
 * Custom hook to check if a user has access to a specific course
 * Users can access a course if:
 * 1. They are an admin (any admin role)
 * 2. They are enrolled in the course
 */
export function useCourseAccess() {
  const { user, session } = useAuth();

  // Check if the user is an admin
  const { data: isAdmin, isLoading: isLoadingAdminStatus } = useQuery({
    queryKey: ['is-admin', user?.id],
    queryFn: async () => {
      if (!user) return false;
      
      // Check if user is an admin using the is_admin RPC function
      const { data: isAdmin, error } = await supabase.rpc('is_admin');
      
      if (error) {
        console.error('Error checking admin status:', error);
        return false;
      }
      
      return isAdmin;
    },
    enabled: !!user,
  });

  // Function to check if a user has access to a specific course
  const checkCourseAccess = async (courseId: string): Promise<boolean> => {
    if (!user) return false;
    
    // Admins have access to all courses
    if (isAdmin) return true;
    
    // For non-admins, check if they are enrolled in the course
    const { data: enrollment, error } = await supabase
      .from('enrollments')
      .select('id')
      .eq('user_id', user.id)
      .eq('course_id', courseId)
      .single();
    
    if (error) {
      console.error('Error checking course enrollment:', error);
      return false;
    }
    
    // User has access if they are enrolled
    return !!enrollment;
  };

  return {
    isAdmin,
    isLoadingAdminStatus,
    checkCourseAccess,
  };
}
