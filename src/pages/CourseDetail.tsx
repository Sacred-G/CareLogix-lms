import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { allCourses } from '@/data/courses/completeDataIndex';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';
import { getCourseUUID } from '@/data/courseIdMapping';
import { ScormModule } from '@/data/scormTypes';

// Import the new components
import Footer from '@/components/navigation/Footer';
import CourseHeader from '@/components/courses/CourseHeader';
import CourseDetailTabs from '@/components/courses/CourseDetailTabs';
import CourseNotFound from '@/components/courses/CourseNotFound';
import EmptyCourse from '@/components/courses/EmptyCourse';

const CourseDetail: React.FC = () => {
  const queryClient = useQueryClient();
  const { courseId } = useParams<{ courseId: string }>();
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
  
  // Fetch enrollment data if user is logged in
  const { data: enrollment, isLoading: isLoadingEnrollment } = useQuery({
    queryKey: ['enrollment', courseId, session?.user?.id],
    queryFn: async () => {
      if (!session?.user?.id) return null;
      
      try {
        // Convert the string course ID to the UUID used in the database
        const courseUUID = getCourseUUID(courseId);
        console.log(`Fetching enrollment for course ${courseId} with UUID: ${courseUUID}`);
        
        // Query using the UUID
        const { data: dbEnrollment, error: dbError } = await supabase
          .from('enrollments')
          .select('*')
          .eq('user_id', session.user.id)
          .eq('course_id', courseUUID)
          .maybeSingle();
          
        if (dbError) {
          console.error('Error fetching enrollment:', dbError);
          return null;
        }
        
        return dbEnrollment || null;
      } catch (error) {
        console.error('Error fetching enrollment:', error);
        return null;
      }
    },
    enabled: !!session?.user?.id && !!courseId
  });

  // Create enrollment mutation
  const enrollMutation = useMutation({
    mutationFn: async () => {
      if (!session?.user?.id || !courseId) throw new Error('User not logged in or course not found');
      
      try {
        // Get the UUID for this course ID
        const courseUUID = getCourseUUID(courseId);
        console.log(`Converting course ID ${courseId} to UUID: ${courseUUID}`);
        
        // First check if the course exists in the courses table
        const { data: existingCourse, error: courseCheckError } = await supabase
          .from('courses')
          .select('id')
          .eq('id', courseUUID)
          .maybeSingle();
          
        // If course doesn't exist in database, create it first
        if (!existingCourse) {
          console.log('Course UUID not found in database, creating course record first...');
          
          // Get the current course metadata
          const currentCourse = course || allCourses.find(c => c.id === courseId) || { 
            id: courseId, 
            title: courseId.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '), 
            description: 'Course description' 
          };
          
          // Create the course record first
          const { error: insertCourseError } = await supabase
            .from('courses')
            .insert({
              id: courseUUID,
              title: currentCourse.title,
              description: currentCourse.description,
              thumbnail: 'thumbnail' in currentCourse ? currentCourse.thumbnail : '/Images/placeholder-course.jpg',
              domain: 'domain' in currentCourse ? currentCourse.domain : 'general'
            });
            
          if (insertCourseError) {
            console.error('Error creating course record:', insertCourseError);
            throw insertCourseError;
          }
          
          console.log('Successfully created course record with UUID:', courseUUID);
        }
        
        // Check if user is already enrolled (using the UUID)
        const { data: existingEnrollment, error: checkEnrollError } = await supabase
          .from('enrollments')
          .select('id')
          .eq('user_id', session.user.id)
          .eq('course_id', courseUUID) 
          .maybeSingle();
          
        if (existingEnrollment) {
          console.log('User already enrolled in course:', courseId);
          return existingEnrollment;
        }
        
        // Now attempt to create the enrollment with the UUID
        console.log('Creating new enrollment with course UUID:', courseUUID);
        const { data, error } = await supabase
          .from('enrollments')
          .insert({
            user_id: session.user.id,
            course_id: courseUUID, // Use the UUID instead of string ID
            progress: 0,
            completed: false
          })
          .select('*')
          .single();
          
        if (error) throw error;
        return data;
      } catch (error) {
        console.error('Detailed enrollment error:', error);
        throw error;
      }
    },
    onSuccess: () => {
      toast.success('Successfully enrolled in course');
      // Invalidate the enrollment query to refetch data
      queryClient.invalidateQueries({ queryKey: ['enrollment', courseId, session?.user?.id] });
    },
    onError: (error) => {
      console.error('Error enrolling in course:', error);
      toast.error('Failed to enroll in course');
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
      if (!enrollment) return;
      
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
    if (!enrollment || !course || !course.modules.length) return;
    
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
  const isEnrolled = !!enrollment;
  const isCompleted = enrollment?.completed || false;
  const courseProgress = enrollment?.progress || 0;
  
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
