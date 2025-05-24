
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Course } from '@/data/courseTypes';
import { DatabaseCourse, convertDatabaseCourse } from '@/components/courses/utils/courseConverters';
import { allCourses, dspCourses, microLearningCourses, generalCourses } from '@/data/courses/completeDataIndex';
import { useAuth } from '@/hooks/useAuth';

// Using function declaration for Fast Refresh compatibility
function useCourseData() {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [categoryFilter, setCategoryFilter] = React.useState('all');
  const [activeTab, setActiveTab] = React.useState('all');
  const { user } = useAuth();

  // Get user profile to determine their email domain
  const { data: userProfile } = useQuery({
    queryKey: ['user-profile-courses', user?.id],
    queryFn: async () => {
      if (!user) return null;
      
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
      
      if (error) {
        console.error('Error fetching user profile:', error);
        throw error;
      }
      
      return data;
    },
    enabled: !!user
  });

  // Fetch courses from Supabase
  const { data: databaseCourses, isLoading: isLoadingDbCourses } = useQuery({
    queryKey: ['database-courses'],
    queryFn: async () => {
      // Create a list of course IDs to exclude - specifically targeting duplicate developmental disabilities courses
      const excludedCourseIds = [
        'intro-dev-disabilities',
        'developmental-disabilities',
        'dev-disabilities',
        'introduction-developmental-disabilities'
      ];
      
      // Filter out these courses directly in the query
      const { data, error } = await supabase
        .from('courses')
        .select('*')
        .not('id', 'in', `(${excludedCourseIds.join(',')})`) // Exclude specific course IDs
        .order('created_at', { ascending: false });
      
      console.log('Excluded course IDs from database query:', excludedCourseIds);
      
      if (error) {
        console.error('Error fetching courses:', error);
        throw error;
      }
      
      return data || [];
    },
    enabled: !!user
  });
  
  // Combine static courses with database courses, but prevent duplicates
  const allDbAndStaticCourses = React.useMemo(() => {
    const dbCourses = databaseCourses ? databaseCourses.map(convertDatabaseCourse) : [];
    
    // Create a map of normalized course IDs to detect variations of the same course
    // This handles both exact matches and similar IDs like 'intro-dev-disabilities' and 'developmental-disabilities'
    const staticCourseIdMap = new Map();
    allCourses.forEach(course => {
      // Store the original ID
      staticCourseIdMap.set(course.id.toLowerCase(), true);
      
      // Also check for common variations of developmental disabilities courses
      if (course.id.includes('dev-disabilities') || course.id.includes('developmental')) {
        staticCourseIdMap.set('dev-disabilities', true);
        staticCourseIdMap.set('developmental-disabilities', true);
        staticCourseIdMap.set('intro-dev-disabilities', true);
        staticCourseIdMap.set('introduction-developmental-disabilities', true);
      }
    });
    
    // Only add database courses that don't match any of our static courses
    const uniqueDbCourses = dbCourses.filter(dbCourse => {
      const normalizedId = dbCourse.id.toLowerCase();
      const isDuplicate = staticCourseIdMap.has(normalizedId) || 
                         (normalizedId.includes('dev') && normalizedId.includes('disab'));
      return !isDuplicate;
    });
    
    console.log('Filtered out duplicate courses:', 
               dbCourses.length - uniqueDbCourses.length, 
               'courses removed');
    
    // Combine static courses with unique database courses
    return [...allCourses, ...uniqueDbCourses];
  }, [databaseCourses]);
  
  // Get unique categories from all courses
  const categories = React.useMemo(() => {
    if (allDbAndStaticCourses.length === 0) return ['all'];
    
    const uniqueCategories = new Set(['all']);
    allDbAndStaticCourses.forEach(course => {
      if (course.category) uniqueCategories.add(course.category);
    });
    
    return Array.from(uniqueCategories);
  }, [allDbAndStaticCourses]);
  
  // Filter courses based on search query, category, and domain access
  const filteredCourses = React.useMemo(() => {
    // First filter by tab selection
    let coursesToFilter: Course[] = [];
    
    if (activeTab === 'dsp') {
      coursesToFilter = [...dspCourses];
      console.log('DSP courses tab selected:', dspCourses);
    } else if (activeTab === 'micro') {
      // For micro learning tab, show all micro learning courses regardless of domain
      coursesToFilter = [...microLearningCourses];
      console.log('Micro learning courses tab selected:', microLearningCourses);
    } else if (activeTab === 'general') {
      coursesToFilter = [...generalCourses];
      console.log('General courses tab selected:', generalCourses);
    } else {
      // 'all' tab - show all courses
      coursesToFilter = allDbAndStaticCourses;
      console.log('All courses tab selected:', allDbAndStaticCourses);
    }

    // Apply search and category filters
    return coursesToFilter.filter(course => {
      // Filter by search query
      const matchesSearch = 
        (course.title || '').toLowerCase().includes(searchQuery.toLowerCase()) || 
        (course.description || '').toLowerCase().includes(searchQuery.toLowerCase());
      
      // Filter by category
      const matchesCategory = 
        categoryFilter === 'all' || 
        course.category === categoryFilter;
      
      // Filter by domain - only if course has a domain restriction and not on micro tab
      // When in the 'micro' tab, we want to show all micro courses regardless of domain
      let hasDomainAccess = 
        activeTab === 'micro' || // Always show all micro courses when on micro tab
        !course.domain || // Courses without domain restriction are visible to everyone
        course.domain === 'general'; // General courses are visible to everyone
      
      // Special handling for the new hire orientation course
      if (!hasDomainAccess && course.id === 'new-hire-orientation') {
        // Check for various versions of the includemetooplease domain
        const userDomain = userProfile?.email_domain?.toLowerCase() || '';
        hasDomainAccess = 
          userDomain.includes('includemetooplease') || 
          userDomain.includes('imtp') || 
          userDomain === 'includeme' || 
          course.domain === userDomain; // Only show to users with matching domains
        
        console.log('Checking domain access for new-hire-orientation:', 
                    { userDomain, courseDomain: course.domain, hasDomainAccess });
      } else if (!hasDomainAccess) {
        // Regular domain matching for other courses
        hasDomainAccess = (course.domain === userProfile?.email_domain); // Organization-specific courses are only visible to matching domains
      }
      
      return matchesSearch && matchesCategory && hasDomainAccess;
    });
  }, [allDbAndStaticCourses, searchQuery, categoryFilter, activeTab, userProfile, dspCourses, microLearningCourses, generalCourses]);

  const isLoading = isLoadingDbCourses;

  return {
    searchQuery,
    setSearchQuery,
    categoryFilter,
    setCategoryFilter,
    activeTab,
    setActiveTab,
    categories,
    filteredCourses,
    isLoading,
    userProfile
  };
}

// Export the hook separately for Fast Refresh compatibility
export { useCourseData };
