
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import Header from '@/components/navigation/Header';
import Footer from '@/components/navigation/Footer';
import CourseCard from '@/components/courses/CourseCard';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useAuth } from '@/hooks/useAuth';

// Define a type that matches our database structure
type DatabaseCourse = {
  id: string;
  title: string;
  description: string | null;
  thumbnail: string | null;
  created_at: string | null;
  created_by: string | null;
  domain: string | null;
  updated_at: string | null;
};

// Define a mapper function to convert DatabaseCourse to the format CourseCard expects
const mapDatabaseCourseToCardCourse = (dbCourse: DatabaseCourse) => {
  return {
    id: dbCourse.id,
    title: dbCourse.title,
    description: dbCourse.description || '',
    thumbnail: dbCourse.thumbnail || 'https://placehold.co/600x400/png',
    category: dbCourse.domain || 'General', // Use domain as category
    instructor: 'Instructor', // Default value
    duration: 'Self-paced', // Default value
    modules: [] // Required by type but not used in the card view
  };
};

const Courses = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
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

  // Fetch all courses from Supabase
  const { data: allDatabaseCourses, isLoading } = useQuery({
    queryKey: ['all-courses'],
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

  // Filter courses based on user's domain
  const databaseCourses = allDatabaseCourses?.filter(course => {
    // Show courses with no domain to everyone
    if (!course.domain) return true;
    // Show domain-specific courses only to users from that domain
    return !userProfile?.email_domain || course.domain === userProfile.email_domain;
  });

  // Convert database courses to the format expected by CourseCard
  const courses = databaseCourses?.map(mapDatabaseCourseToCardCourse) || [];
  
  // Get unique categories from the filtered courses
  const categories = courses && courses.length > 0 
    ? ['all', ...new Set(courses.map(course => course.category).filter(Boolean))]
    : ['all'];
  
  // Filter courses based on search query and category
  const filteredCourses = courses?.filter(course => {
    const matchesSearch = 
      (course.title || '').toLowerCase().includes(searchQuery.toLowerCase()) || 
      (course.description || '').toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = 
      categoryFilter === 'all' || 
      course.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  }) || [];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Header */}
        <section className="bg-muted py-12">
          <div className="container px-4">
            <h1 className="text-3xl font-bold mb-2">All Courses</h1>
            <p className="text-muted-foreground">
              Browse our collection of courses designed for Direct Support Professionals
              {userProfile?.email_domain && (
                <span className="font-medium"> for {userProfile.email_domain}</span>
              )}
            </p>
          </div>
        </section>
        
        {/* Filters */}
        <section className="py-8 border-b">
          <div className="container px-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <Input
                  placeholder="Search courses..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="w-full md:w-64">
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category === 'all' ? 'All Categories' : category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </section>
        
        {/* Course Grid */}
        <section className="py-12">
          <div className="container px-4">
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[...Array(6)].map((_, i) => (
                  <Skeleton key={i} className="h-72 w-full rounded-lg" />
                ))}
              </div>
            ) : filteredCourses.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredCourses.map((course) => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-xl font-medium mb-2">No courses found</h3>
                <p className="text-muted-foreground">
                  {searchQuery || categoryFilter !== 'all' 
                    ? 'Try adjusting your search or filter criteria'
                    : 'No courses available yet'}
                </p>
              </div>
            )}
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Courses;
