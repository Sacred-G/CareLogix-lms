
import React from 'react';
import { Course } from '@/data/courseTypes';
import CourseCard from '@/components/courses/CourseCard';
import { Skeleton } from '@/components/ui/skeleton';

interface CourseGridProps {
  isLoading: boolean;
  courses: Course[];
  searchQuery: string;
  categoryFilter: string;
  activeTab: string;
  userProfileDomain?: string;
}

const CourseGrid: React.FC<CourseGridProps> = ({ 
  isLoading, 
  courses, 
  searchQuery,
  categoryFilter,
  activeTab,
  userProfileDomain
}) => {
  return (
    <section className="py-12">
      <div className="container px-4">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <Skeleton key={i} className="h-72 w-full rounded-lg" />
            ))}
          </div>
        ) : courses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-xl font-medium mb-2">No courses found</h3>
            <p className="text-muted-foreground">
              {searchQuery || categoryFilter !== 'all' 
                ? 'Try adjusting your search or filter criteria'
                : activeTab === 'micro' 
                  ? 'No micro learning courses available yet'
                  : userProfileDomain
                    ? `No courses are available for ${userProfileDomain} yet`
                    : 'No courses available yet'}
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default CourseGrid;
