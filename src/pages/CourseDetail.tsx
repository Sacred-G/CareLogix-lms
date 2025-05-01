
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '@/components/navigation/Header';
import Footer from '@/components/navigation/Footer';
import CourseContent from '@/components/courses/CourseContent';
import { courses } from '@/data/courseData';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';

const CourseDetail = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const [activeModuleIndex, setActiveModuleIndex] = useState(0);
  
  const course = courses.find(c => c.id === courseId);
  
  if (!course) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Course Not Found</h1>
            <p className="text-muted-foreground mb-6">The course you're looking for doesn't exist or has been removed.</p>
            <Button asChild>
              <Link to="/courses">Back to Courses</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  const activeModule = course.modules[activeModuleIndex];
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Course Header */}
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
                <div className="flex items-center gap-4">
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
              </div>
            </div>
          </div>
        </section>
        
        {/* Course Content */}
        <section className="py-8">
          <div className="container px-4">
            <Tabs defaultValue="content" className="space-y-8">
              <TabsList>
                <TabsTrigger value="content">Course Content</TabsTrigger>
                <TabsTrigger value="modules">Modules</TabsTrigger>
              </TabsList>
              
              <TabsContent value="content" className="space-y-8">
                <CourseContent 
                  module={activeModule} 
                  onQuizComplete={(score) => {
                    console.log(`Quiz completed with score: ${score}%`);
                    // Here we could save progress to a database in a real app
                  }} 
                />
              </TabsContent>
              
              <TabsContent value="modules">
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold mb-4">Course Modules</h2>
                  
                  {course.modules.map((module, index) => (
                    <div 
                      key={module.id}
                      className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                        index === activeModuleIndex ? 'bg-muted border-primary' : 'hover:bg-muted/50'
                      }`}
                      onClick={() => {
                        setActiveModuleIndex(index);
                        // Switch back to content tab
                        document.querySelector('[data-value="content"]')?.click();
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">{module.title}</h3>
                          <p className="text-sm text-muted-foreground">{module.description}</p>
                        </div>
                        {index === activeModuleIndex && (
                          <Badge variant="outline" className="ml-2">Current</Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default CourseDetail;
