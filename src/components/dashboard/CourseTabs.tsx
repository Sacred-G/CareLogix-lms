
import React from 'react';
import { Link } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';
import CourseCard from '@/components/courses/CourseCard';
import { Course } from '@/data/courseTypes';

interface CourseTabsProps {
  inProgressCourses: (Course & { progress: number })[];
  completedCourses: (Course & { progress: number })[];
  recommendedCourses: Course[];
  isLoadingEnrollments: boolean;
}

const CourseTabs = ({
  inProgressCourses,
  completedCourses,
  recommendedCourses,
  isLoadingEnrollments
}: CourseTabsProps) => {
  return (
    <Tabs defaultValue="in-progress" className="space-y-8">
      <TabsList className="bg-muted text-muted-foreground">
        <TabsTrigger value="in-progress" className="data-[state=active]:bg-primary/20 data-[state=active]:text-white">In Progress</TabsTrigger>
        <TabsTrigger value="completed" className="data-[state=active]:bg-primary/20 data-[state=active]:text-white">Completed</TabsTrigger>
        <TabsTrigger value="recommended" className="data-[state=active]:bg-primary/20 data-[state=active]:text-white">Recommended</TabsTrigger>
      </TabsList>
      
      <TabsContent value="in-progress" className="space-y-8">
        {isLoadingEnrollments ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-64 w-full rounded-lg" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {inProgressCourses.length > 0 ? (
              inProgressCourses.map((course) => (
                <CourseCard 
                  key={course.id} 
                  course={course} 
                  progress={course.progress} 
                />
              ))
            ) : (
              <div className="col-span-3 text-center py-12 bg-card/30 rounded-lg border border-border">
                <h3 className="text-xl font-medium mb-2 text-foreground">No courses in progress</h3>
                <p className="text-muted-foreground mb-6">Start learning by enrolling in a course!</p>
                <Link to="/courses" className="text-primary font-medium hover:underline">
                  Browse courses
                </Link>
              </div>
            )}
          </div>
        )}
      </TabsContent>
      
      <TabsContent value="completed" className="space-y-8">
        {isLoadingEnrollments ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-64 w-full rounded-lg" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {completedCourses.length > 0 ? (
              completedCourses.map((course) => (
                <CourseCard 
                  key={course.id} 
                  course={course} 
                  progress={100} 
                />
              ))
            ) : (
              <div className="col-span-3 text-center py-12 bg-card/30 rounded-lg border border-border">
                <h3 className="text-xl font-medium mb-2 text-foreground">No completed courses yet</h3>
                <p className="text-muted-foreground mb-6">Keep learning to complete your first course!</p>
                <Link to="/courses" className="text-primary font-medium hover:underline">
                  Continue learning
                </Link>
              </div>
            )}
          </div>
        )}
      </TabsContent>
      
      <TabsContent value="recommended" className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recommendedCourses.map((course) => (
            <CourseCard 
              key={course.id} 
              course={course} 
              progress={0} 
            />
          ))}
          {recommendedCourses.length === 0 && (
            <div className="col-span-3 text-center py-12 bg-card/30 rounded-lg border border-border">
              <h3 className="text-xl font-medium mb-2 text-foreground">You've enrolled in all available courses!</h3>
              <p className="text-muted-foreground mb-6">Check back later for new course offerings.</p>
            </div>
          )}
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default CourseTabs;
