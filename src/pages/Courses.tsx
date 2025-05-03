
import React from 'react';
import Header from '@/components/navigation/Header';
import Footer from '@/components/navigation/Footer';
import { useCourseData } from '@/hooks/useCourseData';
import CourseTabs from '@/components/courses/CourseTabs';
import CourseFilters from '@/components/courses/CourseFilters';
import CourseGrid from '@/components/courses/CourseGrid';

const Courses = () => {
  const { 
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
  } = useCourseData();

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
        
        {/* Course Type Tabs */}
        <CourseTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        
        {/* Filters */}
        <CourseFilters 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          categoryFilter={categoryFilter}
          setCategoryFilter={setCategoryFilter}
          categories={categories}
        />
        
        {/* Course Grid */}
        <CourseGrid 
          isLoading={isLoading}
          courses={filteredCourses}
          searchQuery={searchQuery}
          categoryFilter={categoryFilter}
          activeTab={activeTab}
          userProfileDomain={userProfile?.email_domain}
        />
      </main>
      
      <Footer />
    </div>
  );
};

export default Courses;
