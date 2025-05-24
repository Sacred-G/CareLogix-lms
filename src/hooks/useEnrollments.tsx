
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Course } from '@/data/courseTypes';
import { allCourses } from '@/data/courses/completeDataIndex';

// Using function declaration for Fast Refresh compatibility
function useEnrollments() {
  const { user } = useAuth();
  
  // Fetch user enrollments
  const { data: enrollments, isLoading: isLoadingEnrollments } = useQuery({
    queryKey: ['user-enrollments', user?.id],
    queryFn: async () => {
      if (!user) return [];
      
      const { data, error } = await supabase
        .from('enrollments')
        .select(`
          id,
          progress,
          completed,
          course_id,
          courses:course_id (
            id,
            title,
            description,
            thumbnail,
            domain
          )
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
        
      if (error) {
        console.error('Error fetching enrollments:', error);
        throw error;
      }
      
      return data || [];
    },
    enabled: !!user
  });

  // Map enrolled database courses to the Course type
  const mapDatabaseCourse = (enrollment: any): Course => {
    const dbCourse = enrollment.courses;
    if (!dbCourse) {
      // Find the course in static courses
      const staticCourse = allCourses.find(c => c.id === enrollment.course_id);
      return staticCourse || {
        id: enrollment.course_id,
        title: 'Unknown Course',
        description: '',
        category: 'General',
        instructor: '',
        thumbnail: '',
        duration: '',
        modules: [],
        domain: ''
      };
    }
    
    return {
      id: dbCourse.id,
      title: dbCourse.title || 'Untitled Course',
      description: dbCourse.description || '',
      category: dbCourse.domain || 'General',
      instructor: 'Course Instructor',
      thumbnail: dbCourse.thumbnail || 'https://placehold.co/600x400/png',
      duration: 'Self-paced',
      modules: [],
      domain: dbCourse.domain
    };
  };
  
  // Process enrollments into courses with progress
  const inProgressCourses = enrollments && !isLoadingEnrollments
    ? enrollments
        .filter(enrollment => !enrollment.completed)
        .map(enrollment => ({
          ...mapDatabaseCourse(enrollment),
          progress: enrollment.progress || 0
        }))
    : [];
    
  const completedCourses = enrollments && !isLoadingEnrollments
    ? enrollments
        .filter(enrollment => enrollment.completed)
        .map(enrollment => ({
          ...mapDatabaseCourse(enrollment),
          progress: 100
        }))
    : [];
  
  // Get recommended courses by excluding enrolled courses
  const enrolledCourseIds = enrollments?.map(e => e.course_id) || [];
  
  const recommendedCourses = allCourses
    .filter(course => !enrolledCourseIds.includes(course.id))
    .slice(0, 3);
  
  // Calculate stats
  const totalEnrollments = enrollments?.length || 0;
  const completedCount = completedCourses.length;
  const inProgressCount = inProgressCourses.length;

  return {
    inProgressCourses,
    completedCourses,
    recommendedCourses,
    isLoadingEnrollments,
    totalEnrollments,
    completedCount,
    inProgressCount,
    enrollments
  };
}

// Export the hook separately for Fast Refresh compatibility
export { useEnrollments };
