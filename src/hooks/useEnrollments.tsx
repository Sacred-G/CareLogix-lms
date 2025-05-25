import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Course } from '@/data/courseTypes';
import { allCourses } from '@/data/courses/completeDataIndex';

// Using function declaration for Fast Refresh compatibility
function useEnrollments() {
  const { user } = useAuth();
  
  // Fetch user profile to determine their email domain
  const { data: userProfile } = useQuery({
    queryKey: ['user-profile-enrollments', user?.id], // Different queryKey from useCourseData
    queryFn: async () => {
      if (!user) return null;
      
      const { data, error } = await supabase
        .from('profiles')
        .select('email_domain') // Only select email_domain
        .eq('id', user.id)
        .single();
      
      if (error) {
        console.error('Error fetching user profile for enrollments:', error);
        // Don't throw, allow fallback to no domain filtering if profile fails for some reason
        return null; 
      }
      
      return data;
    },
    enabled: !!user
  });
  
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
    const stringCourseId = enrollment.course_id; // This is now expected to be the string course ID
    const dbCourseDetails = enrollment.courses; // This is the joined 'courses' table data (if any)

    // Find the static course definition using the stringCourseId
    const staticCourse = allCourses.find(c => c.id === stringCourseId);

    if (staticCourse) {
      // Prioritize static course data, supplement with DB data if necessary
      return {
        ...staticCourse,
        // Ensure essential fields from staticCourse are used, possibly overridden by dbCourseDetails if more up-to-date
        title: staticCourse.title || dbCourseDetails?.title || 'Unknown Course',
        description: staticCourse.description || dbCourseDetails?.description || '',
        thumbnail: staticCourse.thumbnail || dbCourseDetails?.thumbnail || 'https://placehold.co/600x400/png',
        category: staticCourse.category || dbCourseDetails?.domain || 'General',
        domain: staticCourse.domain || dbCourseDetails?.domain || '',
      };
    } else {
      // This case means the stringCourseId from the enrollments table was not found in allCourses
      // This could happen if a course was removed from static definitions but enrollments still exist,
      // or if an invalid string ID was somehow saved in enrollments.
      console.warn(`Course with string ID '${stringCourseId}' from enrollments not found in static course definitions. Using DB data or placeholders as fallback.`);
      return {
        id: stringCourseId, // Use the resolved string ID
        title: dbCourseDetails?.title || 'Unknown Course',
        description: dbCourseDetails?.description || '',
        category: dbCourseDetails?.domain || 'General', // Fallback category from DB domain or 'General'
        instructor: 'N/A',
        thumbnail: dbCourseDetails?.thumbnail || 'https://placehold.co/600x400/png',
        duration: 'N/A',
        modules: [], // Modules should ideally come from static data
        domain: dbCourseDetails?.domain || '' // Keep domain if it's used elsewhere
      };
    }
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
  
  const recommendedCourses = React.useMemo(() => {
    const potentialRecommended = allCourses.filter(course => !enrolledCourseIds.includes(course.id));
    const domainFilteredRecommended: Course[] = [];
    const userEmailDomain = userProfile?.email_domain?.toLowerCase() || '';

    for (const course of potentialRecommended) {
      let hasDomainAccess = false;
      if (!course.domain || course.domain === 'general') {
        hasDomainAccess = true;
      } else if (course.id === 'new-hire-orientation') {
        hasDomainAccess =
          userEmailDomain.includes('includemetooplease') ||
          userEmailDomain.includes('imtp') ||
          userEmailDomain === 'includeme' ||
          course.domain === userEmailDomain;
      } else {
        hasDomainAccess = course.domain === userEmailDomain;
      }

      if (hasDomainAccess) {
        domainFilteredRecommended.push(course);
      }
    }
    return domainFilteredRecommended.slice(0, 3);
  }, [enrolledCourseIds, userProfile]); // allCourses is stable, so not strictly needed in deps if it never changes instance
  
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
