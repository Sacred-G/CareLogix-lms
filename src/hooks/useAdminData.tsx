
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export function useAdminData() {
  const queryClient = useQueryClient();

  // Fetch all profiles (admin access)
  const { data: profiles, isLoading: loadingProfiles } = useQuery({
    queryKey: ['admin-profiles'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('full_name');
      
      if (error) {
        console.error('Error fetching profiles:', error);
        throw error;
      }
      
      return data || [];
    }
  });

  // Function to refetch profiles
  const refetchProfiles = () => {
    queryClient.invalidateQueries({ queryKey: ['admin-profiles'] });
  };

  // Fetch all enrollments with course info
  const { data: enrollments, isLoading: loadingEnrollments } = useQuery({
    queryKey: ['admin-enrollments'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('enrollments')
        .select(`
          *,
          profiles:user_id(id, full_name, email),
          courses:course_id(id, title)
        `)
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching enrollments:', error);
        throw error;
      }
      
      return data || [];
    }
  });

  // Fetch course completion statistics
  const { data: courseStats, isLoading: loadingStats } = useQuery({
    queryKey: ['admin-course-stats'],
    queryFn: async () => {
      const { data: courses, error: coursesError } = await supabase
        .from('courses')
        .select('id, title');
      
      if (coursesError) {
        console.error('Error fetching courses:', coursesError);
        throw coursesError;
      }
      
      const stats = await Promise.all(courses.map(async (course) => {
        const { count: enrollmentCount, error: countError } = await supabase
          .from('enrollments')
          .select('id', { count: 'exact', head: true })
          .eq('course_id', course.id);
        
        const { count: completedCount, error: completedError } = await supabase
          .from('enrollments')
          .select('id', { count: 'exact', head: true })
          .eq('course_id', course.id)
          .eq('completed', true);
        
        if (countError || completedError) {
          console.error('Error fetching course stats:', countError || completedError);
          return {
            id: course.id,
            title: course.title,
            totalEnrollments: 0,
            completedEnrollments: 0
          };
        }
        
        return {
          id: course.id,
          title: course.title,
          totalEnrollments: enrollmentCount || 0,
          completedEnrollments: completedCount || 0
        };
      }));
      
      return stats;
    }
  });

  return {
    profiles,
    enrollments,
    courseStats,
    loadingProfiles,
    loadingEnrollments,
    loadingStats,
    refetchProfiles
  };
}
