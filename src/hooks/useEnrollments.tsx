import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Course } from '@/data/courseTypes';
import { allCourses } from '@/data/courses/completeDataIndex';

// Using function declaration for Fast Refresh compatibility
function useEnrollments(isAdminView = false) { // Add isAdminView flag
  const { user } = useAuth(); // Still needed for user_id in certificate creation if not fetched otherwise

  // Fetch enrollments (all for admin, user-specific otherwise)
  const { data: rawEnrollments, isLoading: isLoadingEnrollments, refetch: refetchEnrollments } = useQuery({
    queryKey: isAdminView ? ['all-enrollments-admin'] : ['user-enrollments', user?.id],
    queryFn: async () => {
      if (!isAdminView && !user) return []; // For non-admin, user is required
      
      let query = supabase
        .from('enrollments')
        .select(`
          id,
          user_id,
          progress,
          completed,
          course_id,
          profile:profiles!inner (
            full_name,
            email
          ),
          courses!inner (
            id,
            title,
            description,
            domain,
            thumbnail
          )
        `)
        .order('created_at', { ascending: false });

      if (!isAdminView && user) {
        query = query.eq('user_id', user.id);
      }
        
      const { data, error } = await query;
        
      if (error) {
        console.error('Error fetching enrollments:', error);
        throw error;
      }
      
      // console.log('Fetched raw enrollments:', data); // Debug log
      return data || [];
    },
    enabled: isAdminView || !!user // Enable if admin view or if user is available for non-admin
  });

  // Processed enrollments - structure them as EnrollmentsTable expects
  const enrollments = React.useMemo(() => {
    if (!rawEnrollments) return [];
    return rawEnrollments.map((enrollment: any) => {
      // The data should already be in the correct structure from the query
      // but we ensure profile and course objects exist
      // enrollment.courses (plural) will be the object fetched from the 'courses' table.
      const rawCourseData = enrollment.courses; 

      let processedCourseData;
      if (rawCourseData) {
        processedCourseData = {
          ...rawCourseData,
          // Ensure all expected fields from the query are present or have fallbacks
          id: rawCourseData.id || enrollment.course_id, // Prefer joined ID, fallback to FK
          title: rawCourseData.title || 'Unknown Course',
          description: rawCourseData.description || '',
          domain: rawCourseData.domain || 'General',
          category: rawCourseData.domain || 'General', // Map domain to category
          thumbnail: rawCourseData.thumbnail || 'https://placehold.co/600x400/png',
          certificateAvailable: rawCourseData.certificateAvailable !== undefined ? rawCourseData.certificateAvailable : false,
          instructor: rawCourseData.instructor || 'Unknown Instructor',
          duration: rawCourseData.duration || 0,
          modules: rawCourseData.modules || [],
        };
      } else {
        // Fallback if 'enrollment.course' is somehow null despite inner join (should not happen)
        processedCourseData = { 
          id: enrollment.course_id, // Use the FK from enrollments table
          title: 'Unknown Course',
          description: '',
          category: 'General',
          thumbnail: 'https://placehold.co/600x400/png',
          certificateAvailable: false,
          domain: 'General',
          instructor: 'Unknown Instructor',
          duration: 0,
          modules: [],
        };
      }

      return {
        ...enrollment,
        profile: enrollment.profile || { full_name: 'N/A', email: 'N/A' },
        course: processedCourseData,
      };
    });
  }, [rawEnrollments]);

  // The mapDatabaseCourse, inProgressCourses, completedCourses, recommendedCourses logic 
  // might need adjustment or removal if this hook is now solely for the admin enrollments table.
  // For now, let's assume they might still be used elsewhere or can be adapted.

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
        thumbnail: dbCourseDetails?.thumbnail || 'https://placehold.co/600x400/png',
        certificateAvailable: dbCourseDetails?.certificateAvailable !== undefined ? dbCourseDetails?.certificateAvailable : false,
        domain: dbCourseDetails?.domain || '', // Keep domain if it's used elsewhere
        instructor: dbCourseDetails?.instructor || 'Unknown Instructor',
        duration: dbCourseDetails?.duration || 0,
        modules: dbCourseDetails?.modules || [],
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
  // This userProfile fetching is for the non-admin part (recommended courses for logged-in user)
  const { data: userProfile } = useQuery({
    queryKey: ['user-profile-for-recommendations', user?.id],
    queryFn: async () => {
      if (!user || isAdminView) return null; // Don't fetch if admin view or no user
      const { data, error } = await supabase.from('profiles').select('email_domain').eq('id', user.id).single();
      if (error) { console.error('Error fetching user profile for recommendations:', error); return null; }
      return data;
    },
    enabled: !!user && !isAdminView
  });

  const enrolledCourseIds = rawEnrollments?.map(e => e.course_id) || [];
  
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
  }, [enrolledCourseIds, userProfile, isAdminView]); // Add isAdminView
  
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
    enrollments, // This is now the processed enrollments
    refetchEnrollments // Expose refetch
  };
}

// Export the hook separately for Fast Refresh compatibility
export { useEnrollments };
