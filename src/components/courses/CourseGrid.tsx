
import React from 'react';
import { Course } from '@/data/courseTypes';
import CourseCard from '@/components/courses/CourseCard';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';

interface UserProfile {
  email?: string;
  // Add other user profile properties as needed
}

interface CourseGridProps {
  isLoading: boolean;
  courses: Course[];
  searchQuery: string;
  categoryFilter: string;
  activeTab: string;
  userProfile?: UserProfile;
  userProfileDomain?: string;
}

const CourseGrid: React.FC<CourseGridProps> = ({ 
  isLoading, 
  courses, 
  searchQuery,
  categoryFilter,
  activeTab,
  userProfile,
  userProfileDomain
}) => {
  // H5P Microlearning Content
  const h5pContent = (
    <div className="w-full max-w-6xl mx-auto rounded-lg shadow-lg overflow-hidden">
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Interactive Microlearning Content</h2>
        <p className="text-muted-foreground mb-6">
          Explore our interactive microlearning modules below. These short, focused learning experiences are designed to help you build specific skills and knowledge.
        </p>
        
        <div className="aspect-video w-full rounded-lg overflow-hidden">
          <iframe 
            src="https://h5p-silk.vercel.app/index.html" 
            className="w-full h-full border-0"
            allowFullScreen
            allow="geolocation *; microphone *; camera *; midi *; encrypted-media *"
            title="H5P Interactive Content"
          />
        </div>
        
        <div className="mt-6 flex flex-col sm:flex-row gap-4">
          <Button variant="outline" asChild>
            <a 
              href="https://h5p-silk.vercel.app/index.html" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <ExternalLink className="h-4 w-4" />
              Open in Full Screen
            </a>
          </Button>
          <p className="text-sm text-muted-foreground mt-2 sm:mt-0 sm:ml-auto">
            For best experience, use the full screen option above.
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <section className="py-12">
      <div className="container px-4">
        {activeTab === 'micro' ? (
          <div className="mb-12">
            {h5pContent}
            
            {courses.length > 0 && (
              <div className="mt-12">
                <h3 className="text-xl font-medium mb-6">Additional Microlearning Courses</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {courses.map((course) => (
                    <CourseCard key={course.id} course={course} />
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : isLoading ? (
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
