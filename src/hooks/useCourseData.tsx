
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Course } from '@/data/courseTypes';
import { DatabaseCourse, convertDatabaseCourse } from '@/components/courses/utils/courseConverters';
import { allCourses, dspCourses, microLearningCourses, generalCourses } from '@/data/courses/completeDataIndex';
import { useAuth } from '@/hooks/useAuth';

export const useCourseData = () => {
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
      const { data, error } = await supabase
        .from('courses')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching courses:', error);
        throw error;
      }
      
      return data || [];
    },
    enabled: !!user
  });
  
  // Combine static courses with database courses
  const allDbAndStaticCourses = React.useMemo(() => {
    const dbCourses = databaseCourses ? databaseCourses.map(convertDatabaseCourse) : [];
    return [...allCourses, ...dbCourses];
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
      const hasDomainAccess = 
        activeTab === 'micro' || // Always show all micro courses when on micro tab
        !course.domain || // Static courses don't have domain
        course.domain === 'general' || // General courses are visible to everyone
        course.domain === userProfile?.email_domain || // Domain matches user's domain
        !userProfile?.email_domain; // User has no domain - fallback to see all
      
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
};
