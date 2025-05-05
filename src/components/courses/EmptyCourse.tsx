
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Header from '@/components/navigation/Header';
import Footer from '@/components/navigation/Footer';
import { Badge } from '@/components/ui/badge';
import { Course } from '@/data/courseTypes';

interface EmptyCourseProps {
  course: Course;
}

const EmptyCourse: React.FC<EmptyCourseProps> = ({ course }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="bg-gradient-to-r from-lms-blue-500 to-lms-teal-500 text-white py-12">
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
        
        <section className="py-16 container">
          <div className="text-center p-8 border rounded-lg bg-muted/30">
            <h2 className="text-xl font-semibold mb-4">Course Content Coming Soon</h2>
            <p className="text-muted-foreground mb-6">
              This course is currently under development. Check back later for content updates.
            </p>
            <Button asChild>
              <Link to="/courses">Browse Other Courses</Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default EmptyCourse;
