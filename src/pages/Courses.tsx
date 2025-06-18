
import React from 'react';
import Header from '@/components/navigation/Header';
import Footer from '@/components/navigation/Footer';
import { useCourseData } from '@/hooks/useCourseData';
import CourseTabs from '@/components/courses/CourseTabs';
import CourseFilters from '@/components/courses/CourseFilters';
import CourseGrid from '@/components/courses/CourseGrid';
import NewHireVideoPopup from '@/components/courses/NewHireVideoPopup';

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
    <div className="min-h-screen flex flex-col bg-background text-foreground"> {/* Use new background variable */}
      {/* New Hire Video Popup */}
      <NewHireVideoPopup delay={1500} />

      <Header />

      <main className="flex-1">
        <section className="bg-card py-12"> {/* Use card background */}
          <div className="container px-4">
            <h1 className="text-3xl font-bold mb-2 text-gradient-primary">All Courses</h1> {/* Apply text gradient */}
            <p className="text-muted-foreground">
              Browse our collection of courses designed for Direct Support Professionals
              {userProfile?.email_domain && (
                <span className="font-medium"> for {userProfile.email_domain}</span>
              )}
            </p>
          </div>
        </section>

        {/* Course Type Tabs */}
        {/* Assuming CourseTabs component uses Tailwind classes that will pick up new theme */}
        <CourseTabs activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Filters */}
        {/* Assuming CourseFilters component uses Tailwind classes that will pick up new theme */}
        <CourseFilters
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          categoryFilter={categoryFilter}
          setCategoryFilter={setCategoryFilter}
          categories={categories}
        />

        {/* Course Grid */}
        {/* Assuming CourseGrid component uses CourseCard which has been updated */}
        <CourseGrid
          isLoading={isLoading}
          courses={filteredCourses}
          searchQuery={searchQuery}
          categoryFilter={categoryFilter}
          activeTab={activeTab}
          userProfile={userProfile}
          userProfileDomain={userProfile?.email_domain}
        />
      </main>

      <Footer />
    </div>
  );
};

export default Courses;
