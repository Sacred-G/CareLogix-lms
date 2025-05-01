
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '@/components/navigation/Header';
import Footer from '@/components/navigation/Footer';
import CourseContent from '@/components/courses/CourseContent';
import { courses } from '@/data/courseData';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { useQuery, useMutation } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Progress } from '@/components/ui/progress';
import CompletedCourseActions from '@/components/courses/CompletedCourseActions';

const CourseDetail = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const [activeModuleIndex, setActiveModuleIndex] = useState(0);
  const [activeTab, setActiveTab] = useState("content");
  const { session } = useAuth();
  
  const course = courses.find(c => c.id === courseId);
  
  // Fetch enrollment data if user is logged in
  const { data: enrollment, isLoading: isLoadingEnrollment } = useQuery({
    queryKey: ['enrollment', courseId, session?.user?.id],
    queryFn: async () => {
      if (!session?.user?.id || !courseId) return null;
      
      const { data, error } = await supabase
        .from('enrollments')
        .select('*')
        .eq('user_id', session.user.id)
        .eq('course_id', courseId)
        .single();
        
      if (error) {
        if (error.code !== 'PGRST116') { // Not found error
          console.error('Error fetching enrollment:', error);
        }
        return null;
      }
      
      return data;
    },
    enabled: !!session?.user?.id && !!courseId
  });

  // Create enrollment mutation
  const enrollMutation = useMutation({
    mutationFn: async () => {
      if (!session?.user?.id || !courseId) throw new Error('User not logged in or course not found');
      
      const { data, error } = await supabase
        .from('enrollments')
        .insert({
          user_id: session.user.id,
          course_id: courseId,
          progress: 0,
          completed: false
        })
        .select('*')
        .single();
        
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      toast.success('Successfully enrolled in course');
    },
    onError: (error) => {
      console.error('Error enrolling in course:', error);
      toast.error('Failed to enroll in course');
    }
  });

  // Update progress mutation
  const updateProgressMutation = useMutation({
    mutationFn: async ({ lessonId, quizId, completed, score }: { 
      lessonId?: string, 
      quizId?: string, 
      completed: boolean, 
      score?: number 
    }) => {
      if (!session?.user?.id) throw new Error('User not logged in');
      
      // First, record the specific progress item
      const progressData = {
        user_id: session.user.id,
        completed,
        ...(lessonId && { lesson_id: lessonId }),
        ...(quizId && { quiz_id: quizId }),
        ...(score !== undefined && { score })
      };
      
      const { error: progressError } = await supabase
        .from('user_progress')
        .upsert(progressData, { 
          onConflict: lessonId ? 'user_id,lesson_id' : 'user_id,quiz_id'
        });
        
      if (progressError) throw progressError;
      
      // Then, update the enrollment progress
      if (!enrollment) return;
      
      // Calculate new progress percentage
      // This is simplified - in a real app, you'd count completed items vs total items
      const moduleCount = course?.modules.length || 1;
      const newProgress = Math.min(
        Math.round(((activeModuleIndex + (completed ? 1 : 0)) / moduleCount) * 100),
        100
      );
      
      const { error: enrollmentError } = await supabase
        .from('enrollments')
        .update({ 
          progress: newProgress,
          completed: newProgress === 100
        })
        .eq('id', enrollment.id);
        
      if (enrollmentError) throw enrollmentError;
      
      return { progress: newProgress };
    },
    onSuccess: () => {
      toast.success('Progress saved');
    },
    onError: (error) => {
      console.error('Error saving progress:', error);
      toast.error('Failed to save progress');
    }
  });
  
  // Handle enrolling in course
  const handleEnroll = () => {
    enrollMutation.mutate();
  };

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
  const isEnrolled = !!enrollment;
  const isCompleted = enrollment?.completed || false;
  const courseProgress = enrollment?.progress || 0;
  
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
            </div>
          </div>
        </section>
        
        {/* Course Content */}
        <section className="py-8">
          <div className="container px-4">
            {/* Certificate Action for Completed Courses */}
            {isEnrolled && isCompleted && (
              <div className="mb-6">
                <CompletedCourseActions 
                  course={course} 
                  isCompleted={isCompleted} 
                />
              </div>
            )}
          
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
              <TabsList>
                <TabsTrigger value="content">Course Content</TabsTrigger>
                <TabsTrigger value="modules">Modules</TabsTrigger>
              </TabsList>
              
              <TabsContent value="content" className="space-y-8">
                <CourseContent 
                  module={activeModule} 
                  onQuizComplete={(score) => {
                    if (!session) {
                      toast('Sign in to save your progress', {
                        action: {
                          label: 'Sign In',
                          onClick: () => window.location.href = '/auth'
                        }
                      });
                      return;
                    }
                    
                    // Save progress to database
                    const quizId = `${course.id}-quiz-${activeModuleIndex}`; // This would be a real ID in production
                    updateProgressMutation.mutate({
                      quizId,
                      completed: true,
                      score
                    });
                  }}
                  onContentComplete={(type) => {
                    if (!session) {
                      toast('Sign in to save your progress', {
                        action: {
                          label: 'Sign In',
                          onClick: () => window.location.href = '/auth'
                        }
                      });
                      return;
                    }
                    
                    // Save progress to database
                    const lessonId = `${course.id}-${type}-${activeModuleIndex}`; // This would be a real ID in production
                    updateProgressMutation.mutate({
                      lessonId,
                      completed: true
                    });
                  }}
                />
                
                <div className="flex justify-between">
                  <Button 
                    variant="outline" 
                    onClick={() => setActiveModuleIndex(prev => Math.max(0, prev - 1))}
                    disabled={activeModuleIndex === 0}
                  >
                    Previous Module
                  </Button>
                  
                  <Button 
                    onClick={() => setActiveModuleIndex(prev => Math.min(course.modules.length - 1, prev + 1))}
                    disabled={activeModuleIndex === course.modules.length - 1}
                  >
                    Next Module
                  </Button>
                </div>
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
                        setActiveTab("content");
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
