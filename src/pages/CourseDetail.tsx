import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { allCourses } from '@/data/courses/completeDataIndex';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';
import { ScormModule } from '@/data/scormTypes';

// Define a type for the enrollment record including new time fields
interface EnrollmentRecord {
  id: string;
  user_id: string;
  course_id: string;
  completed: boolean;
  progress: number;
  created_at: string; 
  started_at?: string | null;
  last_accessed_at?: string | null;
  total_time_spent_ms?: number | null;
}

// Import the new components
import Footer from '@/components/navigation/Footer';
import CourseHeader from '@/components/courses/CourseHeader';
import CourseDetailTabs from '@/components/courses/CourseDetailTabs';
import CourseNotFound from '@/components/courses/CourseNotFound';
import EmptyCourse from '@/components/courses/EmptyCourse';

const CourseDetail: React.FC = () => {
  const queryClient = useQueryClient();
  const { courseId = '' } = useParams<{ courseId: string }>();
  const [activeModuleIndex, setActiveModuleIndex] = useState(0);
  const [activeTab, setActiveTab] = useState("content");
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
  const { session } = useAuth();
  
  // Find the course by ID
  const course = allCourses.find(c => c.id === courseId);
  
  // Fetch SCORM modules for this course
  const { data: scormModules, isLoading: isLoadingScorm } = useQuery({
    queryKey: ['scorm-modules', courseId],
    queryFn: async () => {
      if (!courseId) return [];
      
      try {
        const { data, error } = await supabase
          .from('scorm_modules')
          .select('*')
          .eq('course_id', courseId)
          .order('position', { ascending: true });
          
        if (error) {
          console.error('Error fetching SCORM modules:', error);
          throw error;
        }
        
        return data as unknown as ScormModule[];
      } catch (error) {
        console.error('Error in SCORM modules query:', error);
        return [];
      }
    },
    enabled: !!courseId
  });
  
  // Fetch user's current enrollment status for this course
  const { data: enrollmentData, isLoading: isLoadingEnrollment, refetch: refetchEnrollmentStatus } = useQuery<EnrollmentRecord | null>({
    queryKey: ['enrollment-status', courseId, session?.user?.id],
    queryFn: async () => {
      if (!session?.user?.id || !courseId) return null;
      
      console.log(`Fetching enrollment for course ${courseId}`);
      
      const { data: dbEnrollment, error: dbError } = await supabase
        .from('enrollments')
        .select('*') 
        .eq('user_id', session.user.id)
        .eq('course_id', courseId)
        .maybeSingle();
        
      if (dbError) {
        console.error('Error fetching enrollment status:', dbError);
        throw dbError;
      }
      
      console.log('Fetched enrollment data:', dbEnrollment);
      return dbEnrollment;
    },
    enabled: !!courseId && !!session?.user?.id,
  });

  // Effect to track course access times (started_at, last_accessed_at)
  React.useEffect(() => {
    const trackCourseAccessTime = async () => {
      // Ensure we have a valid session, course, and enrollment record with its own primary key (id)
      if (session?.user?.id && courseId && enrollmentData && enrollmentData.id) {
        const updates: Partial<EnrollmentRecord> = {
          last_accessed_at: new Date().toISOString(),
        };

        // If started_at is not set, this is the first access, so set it.
        if (!enrollmentData.started_at) {
          updates.started_at = new Date().toISOString();
        }

        const { error } = await supabase
          .from('enrollments')
          .update(updates)
          .eq('id', enrollmentData.id); // Match using the enrollment record's primary key

        if (error) {
          console.error('Error updating course access times:', error);
        } else {
          console.log('Course access times updated successfully:', updates);
          // Optionally, refetch enrollment data if needed immediately, though not strictly necessary here
          // refetchEnrollmentStatus(); 
        }
      }
    };

    // Only attempt to track time if enrollment data has been successfully fetched.
    if (enrollmentData) {
      trackCourseAccessTime();
    }
  // Dependencies: This effect runs when the user session, courseId, or enrollmentData changes.
  // This ensures it runs on page load for an enrolled course, or if enrollment status changes.
  }, [session, courseId, enrollmentData]);

  // Create enrollment mutation
  const enrollMutation = useMutation<EnrollmentRecord | null, Error, void, unknown>({
    mutationFn: async () => {
      if (!session?.user?.id || !courseId) throw new Error('User not logged in or course ID missing');

      // 1. Check if course exists in 'courses' table, create if not
      const { data: existingCourseInDb } = await supabase
        .from('courses')
        .select('id')
        .eq('id', courseId)
        .maybeSingle();

      if (!existingCourseInDb) {
        const currentCourseData = course || allCourses.find(c => c.id === courseId);
        if (!currentCourseData) throw new Error('Course definition not found');
        
        const { error: insertCourseError } = await supabase.from('courses').insert({
          id: courseId,
          title: currentCourseData.title,
          description: currentCourseData.description,
          thumbnail: 'thumbnail' in currentCourseData ? currentCourseData.thumbnail : '/Images/placeholder-course.jpg',
          domain: 'domain' in currentCourseData ? currentCourseData.domain : 'general',
        });
        if (insertCourseError) throw insertCourseError;
      }

      // 2. Check if enrollment already exists for this user and course
      const { data: existingEnrollment, error: checkError } = await supabase
        .from('enrollments')
        .select('id')
        .eq('user_id', session.user.id)
        .eq('course_id', courseId)
        .maybeSingle();

      if (checkError) throw checkError;
      if (existingEnrollment) {
        toast.info('You are already enrolled in this course.');
        return null; // Or return existingEnrollment if needed by caller
      }

      // 3. Create new enrollment
      const { data: newEnrollment, error: insertEnrollError } = await supabase
        .from('enrollments')
        .insert({
          user_id: session.user.id,
          course_id: courseId,
          progress: 0,
          completed: false,
        })
        .select()
        .single();

      if (insertEnrollError) throw insertEnrollError;
      return newEnrollment;
    },
    onSuccess: (data) => {
      if (data) { // Only show success if a new enrollment was actually created
        toast.success("Successfully enrolled!");
      }
      queryClient.invalidateQueries({ queryKey: ['user-enrollments'] });
      queryClient.invalidateQueries({ queryKey: ['enrollment-status', courseId, session?.user?.id] });
      refetchEnrollmentStatus(); // To trigger useEffect for time tracking if it's the very first enrollment
    },
    onError: (error: Error) => {
      toast.error(`Enrollment failed: ${error.message}`);
    }
  });

  // Update progress mutation
  const updateProgressMutation = useMutation({
    mutationFn: async ({ courseId, lessonId, quizId, completed, score }: { 
      courseId: string,
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
      if (!enrollmentData) return;
      
      // Calculate new progress percentage
      const moduleCount = course?.modules?.length || 1;
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
        .eq('id', enrollmentData.id);
        
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
  
  // Helper functions for quiz functionality
  const checkAnswer = (questionId: string, selectedOptionIndex: number): boolean => {
    if (!course) return false;
    
    // Find the current module
    const currentModule = course.modules[activeModuleIndex];
    if (!currentModule || !currentModule.questions) return false;
    
    // Find the question
    const question = currentModule.questions.find(q => q.id === questionId);
    if (!question) return false;
    
    // Update the user's answer
    setQuizAnswers(prev => ({ ...prev, [questionId]: selectedOptionIndex }));
    
    // Check if the answer is correct
    return selectedOptionIndex === question.correctAnswer;
  };

  const calculateModuleScore = (moduleId: string): number => {
    if (!course) return 0;
    
    // Find the current module
    const currentModule = course.modules[activeModuleIndex];
    if (!currentModule || !currentModule.questions || currentModule.questions.length === 0) return 0;
    
    // Calculate score
    let correctAnswers = 0;
    currentModule.questions.forEach(question => {
      if (quizAnswers[question.id] === question.correctAnswer) {
        correctAnswers++;
      }
    });
    
    return Math.round((correctAnswers / currentModule.questions.length) * 100);
  };

  const updateProgress = (increment: number) => {
    // Calculate progress
    if (!enrollmentData || !course || !course.modules.length) return;
    
    // Update progress in database
    updateProgressMutation.mutate({
      courseId: courseId,
      lessonId: course.modules[activeModuleIndex].id,
      completed: true
    });
  };
  
  // Handle enrolling in course
  const handleEnroll = () => {
    enrollMutation.mutate();
  };

  if (!course) {
    return <CourseNotFound />;
  }
  
  // Check if course has modules
  if (!course.modules || course.modules.length === 0) {
    return <EmptyCourse course={course} />;
  }
  
  const activeModule = course.modules[activeModuleIndex];
  const isEnrolled = !!enrollmentData;
  const isCompleted = enrollmentData?.completed || false;
  const courseProgress = enrollmentData?.progress || 0;
  
  return (
    <div className="min-h-screen flex flex-col bg-include-glow text-foreground">
      <div className="min-h-screen flex flex-col">
      
      <main className="flex-1">
        <CourseHeader 
          course={course}
          isEnrolled={isEnrolled}
          courseProgress={courseProgress}
          isLoadingEnrollment={isLoadingEnrollment}
          enrollMutation={enrollMutation}
          handleEnroll={handleEnroll}
          session={session}
        />
        
        <section className="py-8">
          <CourseDetailTabs
            course={course}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            activeModuleIndex={activeModuleIndex}
            setActiveModuleIndex={setActiveModuleIndex}
            scormModules={scormModules}
            isLoadingScorm={isLoadingScorm}
            isEnrolled={isEnrolled}
            isCompleted={isCompleted}
            activeModule={activeModule}
            session={session}
            updateProgressMutation={updateProgressMutation}
            quizAnswers={quizAnswers}
            setQuizAnswers={setQuizAnswers}
            checkAnswer={checkAnswer}
            updateProgress={updateProgress}
            calculateModuleScore={calculateModuleScore}
          />
        </section>
      </main>
      
      <Footer />
    </div>
    </div>
  );
};

export default CourseDetail;
