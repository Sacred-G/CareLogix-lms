
import React from 'react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Course } from '@/data/courseTypes';

interface CourseHeaderProps {
  course: Course;
  isEnrolled: boolean;
  courseProgress: number;
  isLoadingEnrollment: boolean;
  enrollMutation: {
    isPending: boolean;
    mutate: () => void;
  };
  handleEnroll: () => void;
  session: any;
}

const CourseHeader: React.FC<CourseHeaderProps> = ({
  course,
  isEnrolled,
  courseProgress,
  isLoadingEnrollment,
  enrollMutation,
  handleEnroll,
  session
}) => {
  return (
    <section className="bg-include-glow text-foreground py-12">
      <div className="container px-4">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-1">
            <Link to="/courses" className="inline-flex items-center text-white/80 hover:text-white mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                <path d="m15 18-6-6 6-6"/>
              </svg>
              Back to Courses
            </Link>
            <Badge className="mb-4">{course.category}</Badge>
            <h1 className="text-3xl font-bold mb-2">{course.title}</h1>
            <p className="text-white/80 mb-4">{course.description}</p>
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                  <circle cx="12" cy="12" r="10"/>
                  <polyline points="12 6 12 12 16 14"/>
                </svg>
                <span>{course.duration}</span>
              </div>
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
                <span>{course.instructor}</span>
              </div>
            </div>
            
            {session ? (
              isEnrolled ? (
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Progress</span>
                    <span>{courseProgress}%</span>
                  </div>
                  <Progress value={courseProgress} className="h-2 bg-white/20" />
                </div>
              ) : (
                <Button variant="secondary" onClick={handleEnroll} disabled={enrollMutation.isPending}>
                  {enrollMutation.isPending ? 'Enrolling...' : 'Enroll in Course'}
                </Button>
              )
            ) : (
              <Button variant="secondary" asChild>
                <Link to="/auth">Sign in to Enroll</Link>
              </Button>
            )}
          </div>
          
          {/* Course Thumbnail Image */}
          <div className="hidden md:block md:w-1/3 lg:w-1/4">
            <div className="rounded-lg overflow-hidden shadow-lg">
              <img 
                src={course.thumbnail || 'https://placehold.co/600x400/png'} 
                alt={course.title} 
                className="w-full h-full object-cover aspect-video"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CourseHeader;
