import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { allCourses } from '@/data/courses/completeDataIndex';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';
import { ScormModule } from '@/data/scormTypes';
import { getCourseUUID } from '@/data/courseIdMapping';

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

// Add progress increments constant
const progressIncrements = {
  content: 25,
  quiz: 75,
} as const;

// Import the new components
import Footer from '@/components/navigation/Footer';
import CourseHeader from '@/components/courses/CourseHeader';
import CourseDetailTabs from '@/components/courses/CourseDetailTabs';
import AIContentTabs from '@/components/courses/AIContentTabs';
import CourseNotFound from '@/components/courses/CourseNotFound';
import EmptyCourse from '@/components/courses/EmptyCourse';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CertificateModal from '@/components/certificate/CertificateModal'; // Import CertificateModal
import { Certificate as CertificateType } from '@/data/courseTypes'; // Import CertificateType

const CourseDetail: React.FC = () => {
  const queryClient = useQueryClient();
  const { courseId = '' } = useParams<{ courseId: string }>();
  const [activeModuleIndex, setActiveModuleIndex] = useState(0);
  const [activeTab, setActiveTab] = useState("content");
  const [activeAITab, setActiveAITab] = useState("content");
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
  const [isMarkingComplete, setIsMarkingComplete] = useState(false);
  const [isSubmittingQuiz, setIsSubmittingQuiz] = useState(false);
  const [showCertificateModal, setShowCertificateModal] = useState(false); // New state for modal visibility
  const [generatedCertificate, setGeneratedCertificate] = useState<CertificateType | null>(null); // New state for certificate data
  const { session } = useAuth();
  
  // Find the course by ID
  const course = allCourses.find(c => c.id === courseId);

  // If course not found, show not found message
  if (!course) {
    return <CourseNotFound />;
  }
  
  // Handler for when a quiz answer is selected
  const handleQuizAnswer = (questionId: string, answerIndex: number) => {
    setQuizAnswers(prev => ({
      ...prev,
      [questionId]: answerIndex
    }));
  };
  
  // Handler for marking a module as complete
  const handleModuleComplete = async () => {
    if (!enrollmentData) return;
    
    try {
      setIsMarkingComplete(true);
      await updateProgressMutation.mutateAsync({
        courseId: enrollmentData.course_id,
        progress: 100,
        completed: true
      });
      toast.success('Module marked as completed!');
    } catch (error) {
      console.error('Error marking module as complete:', error);
      toast.error('Failed to mark module as complete');
    } finally {
      setIsMarkingComplete(false);
    }
  };
  
  // Handler for submitting a quiz
  const handleQuizSubmit = async () => {
    if (!enrollmentData) return;
    
    try {
      setIsSubmittingQuiz(true);
      // Add quiz submission logic here
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      toast.success('Quiz submitted successfully!');
    } catch (error) {
      console.error('Error submitting quiz:', error);
      toast.error('Failed to submit quiz');
    } finally {
      setIsSubmittingQuiz(false);
    }
  };
  
  // Function to update user progress with the more complete implementation
  const updateUserProgress = (increment: number) => {
    if (!enrollmentData || !course || !course.modules.length) return;
    
    const newProgress = Math.min(100, (enrollmentData.progress || 0) + increment);
    updateProgressMutation.mutate({
      courseId: enrollmentData.course_id,
      progress: newProgress,
      completed: newProgress === 100
    });
  };
  
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
      
      // Enrollments table uses string IDs, not UUIDs
      const { data: dbEnrollment, error: dbError } = await supabase
        .from('enrollments')
        .select('*') 
        .eq('user_id', session.user.id)
        .eq('course_id', courseId) // Use string ID for enrollments table
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
      
      // Convert string courseId to UUID for database compatibility
      const courseUUID = getCourseUUID(courseId);

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
        .eq('course_id', courseId) // Use string ID for enrollments table
        .maybeSingle();

      if (checkError) throw checkError;
      if (existingEnrollment) {
        toast.info('You are already enrolled in this course.');
        return null; // Or return existingEnrollment if needed by caller
      }

      // 3. Create new enrollment (enrollments table uses string IDs)
      const { data: newEnrollment, error: insertEnrollError } = await supabase
        .from('enrollments')
        .insert({
          user_id: session.user.id,
          course_id: courseId, // Use string ID for enrollments table
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
    mutationFn: async ({ courseId, lessonId, quizId, completed, score, progress }: { 
      courseId: string,
      lessonId?: string, 
      quizId?: string, 
      completed: boolean, 
      score?: number,
      progress?: number
    }) => {
      if (!session?.user?.id) throw new Error('User not logged in');
      
      // First, create or find a section for this course to link lessons/quizzes to
      let sectionId;
      
      // Check if a section already exists for this course
      const { data: existingSection } = await supabase
        .from('sections')
        .select('id')
        .eq('course_id', courseId) // Use string ID for sections table
        .maybeSingle();
        
      if (existingSection) {
        sectionId = existingSection.id;
      } else {
        // Create a new section for this course
        const { data: newSection, error: sectionError } = await supabase
          .from('sections')
          .insert({
            course_id: courseId, // Use string ID for sections table
            title: 'Main Section',
            position: 0
          })
          .select()
          .single();
          
        if (sectionError) {
          console.error('Error creating section:', sectionError);
          // Continue without a section if there's an error
        } else {
          sectionId = newSection.id;
        }
      }
      
      // Track progress based on the type (lesson or quiz)
      if (lessonId && sectionId) {
        // Try to find an existing lesson record
        const { data: existingLesson } = await supabase
          .from('lessons')
          .select('id')
          .eq('section_id', sectionId)
          .eq('title', `Module ${activeModuleIndex + 1}`)
          .maybeSingle();
          
        let lessonDbId;
        
        if (existingLesson) {
          lessonDbId = existingLesson.id;
        } else {
          // Create a new lesson record
          try {
            const { data: newLesson, error: lessonError } = await supabase
              .from('lessons')
              .insert({
                section_id: sectionId,
                title: course?.modules[activeModuleIndex]?.title || `Module ${activeModuleIndex + 1}`,
                content: course?.modules[activeModuleIndex]?.content || '',
                position: activeModuleIndex
              })
              .select()
              .single();
              
            if (lessonError) {
              console.error('Error creating lesson:', lessonError);
            } else {
              lessonDbId = newLesson.id;
            }
          } catch (err) {
            console.error('Exception creating lesson:', err);
          }
        }
        
        // If we have a valid lesson ID, save progress
        if (lessonDbId) {
          try {
            const { error: progressError } = await supabase
              .from('user_progress')
              .upsert({
                user_id: session.user.id,
                lesson_id: lessonDbId,
                completed: completed,
                updated_at: new Date().toISOString()
              }, {
                onConflict: 'user_id,lesson_id'
              });
              
            if (progressError) {
              console.error('Error saving lesson progress:', progressError);
            } else {
              console.log('Lesson progress saved successfully');
            }
          } catch (err) {
            console.error('Exception saving lesson progress:', err);
          }
        }
      }
      
      // Handle quiz progress
      if (quizId && sectionId && score !== undefined) {
        // Try to find an existing quiz record
        const { data: existingQuiz } = await supabase
          .from('quizzes')
          .select('id')
          .eq('section_id', sectionId)
          .maybeSingle();
          
        let quizDbId;
        
        if (existingQuiz) {
          quizDbId = existingQuiz.id;
        } else {
          // Create a new quiz record
          try {
            const { data: newQuiz, error: quizError } = await supabase
              .from('quizzes')
              .insert({
                section_id: sectionId
              })
              .select()
              .single();
              
            if (quizError) {
              console.error('Error creating quiz:', quizError);
            } else {
              quizDbId = newQuiz.id;
            }
          } catch (err) {
            console.error('Exception creating quiz:', err);
          }
        }
        
        // If we have a valid quiz ID, save progress
        if (quizDbId) {
          try {
            const { error: progressError } = await supabase
              .from('user_progress')
              .upsert({
                user_id: session.user.id,
                quiz_id: quizDbId,
                completed: completed,
                score: score,
                updated_at: new Date().toISOString()
              }, {
                onConflict: 'user_id,quiz_id'
              });
              
            if (progressError) {
              console.error('Error saving quiz progress:', progressError);
            } else {
              console.log('Quiz progress saved successfully');
            }
          } catch (err) {
            console.error('Exception saving quiz progress:', err);
          }
        }
      }
      
      // Update the enrollment progress regardless of lesson/quiz progress
      if (!enrollmentData) return;
      
      // Use provided progress or calculate new progress percentage based on content completion
      let newProgress;
      if (progress !== undefined) {
        newProgress = progress;
      } else {
        // Get all possible content types in the course
        const contentTypes = ['video', 'audio', 'text', 'quiz'];
        let totalContentItems = 0;
        let completedContentItems = 0;
        
        // Count total content items across all modules
        course?.modules?.forEach((module, moduleIndex) => {
          // Count each content type that exists in this module
          if (module.videoUrl) totalContentItems++;
          if (module.audioUrl) totalContentItems++;
          if (module.content) totalContentItems++;
          if (module.questions && module.questions.length > 0) totalContentItems++;
        });
        
        // If there are no content items, default to module-based calculation
        if (totalContentItems === 0) {
          const moduleCount = course?.modules?.length || 1;
          newProgress = Math.min(
            Math.round(((activeModuleIndex + (completed ? 1 : 0)) / moduleCount) * 100),
            100
          );
        } else {
          // Fetch user progress to count completed items
          const { data: userProgress } = await supabase
            .from('user_progress')
            .select('*')
            .eq('user_id', session.user.id)
            .eq('completed', true);
          
          // Count completed items based on the user_progress records
          if (userProgress && userProgress.length > 0) {
            completedContentItems = userProgress.length;
          }
          
          // Calculate progress as percentage of completed content items
          newProgress = Math.min(
            Math.round((completedContentItems / totalContentItems) * 100),
            100
          );
        }
      }
      
      // Update last_accessed_at timestamp
      const now = new Date().toISOString();
      
      // Update the enrollment record with the new progress
      if (!enrollmentData?.id) {
        console.error('Cannot update progress: No enrollment data found');
        throw new Error('No enrollment data found');
      }
      
      console.log(`Updating enrollment ${enrollmentData.id} for course ${courseId} to ${newProgress}%`);
      
      // Check if course is being completed (progress reached 100%)
      const isCourseCompleted = newProgress === 100 && enrollmentData.progress < 100;
      console.log('Course completion check:', { 
        newProgress, 
        currentProgress: enrollmentData.progress, 
        isCourseCompleted 
      });
      
      // Use multiple conditions to ensure we're updating the correct record
      const { data: updatedEnrollment, error: enrollmentError } = await supabase
        .from('enrollments')
        .update({ 
          progress: newProgress,
          completed: isCourseCompleted || enrollmentData.completed,
          last_accessed_at: now
        })
        .eq('id', enrollmentData.id)
        .eq('user_id', session.user.id)
        .eq('course_id', courseId)
        .select()
        .single();
        
      if (enrollmentError) {
        console.error('Error updating enrollment progress:', enrollmentError);
        throw enrollmentError;
      }
      
      console.log('Enrollment updated successfully:', updatedEnrollment);
      
      // Generate certificate if course is completed
      if (isCourseCompleted && course) {
        console.log('Attempting to generate certificate for course:', course.id);
        try {
          console.log('1. Fetching user profile...');
          // Get user profile for name and email
          const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('full_name, email')
            .eq('id', session.user.id)
            .single();
            
          if (profileError) {
            console.error('Error fetching profile:', profileError);
            throw profileError;
          }
          
          if (!profile) {
            const error = new Error('User profile not found');
            console.error(error.message);
            throw error;
          }
          
          console.log('2. Profile found, creating certificate object...');
          // Create certificate
          const certificateNumber = `CERT-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
          const certificate: CertificateType = {
            id: certificateNumber, // Add the missing 'id' property
            userId: session.user.id,
            userName: profile.full_name || 'Learner',
            courseId: course.id,
            courseTitle: course.title,
            issueDate: new Date().toISOString(),
            completionDate: new Date().toISOString(),
            certificateNumber: certificateNumber,
            organizationName: 'Learn with Compassion',
            organizationLogo: '/logo.png',
            validUntil: null // Use validUntil as per CertificateType
          };
          
          console.log('3. Certificate object created:', certificate);
          
          // Save certificate to database
          console.log('4. Saving certificate to database...');
          const { data: certData, error: certError } = await supabase
            .from('certificates')
            .insert({
              id: certificate.id, // Use certificate.id
              user_id: certificate.userId,
              user_name: certificate.userName,
              course_id: certificate.courseId,
              course_title: certificate.courseTitle,
              issue_date: certificate.issueDate,
              completion_date: certificate.completionDate,
              certificate_number: certificate.certificateNumber,
              organization_name: certificate.organizationName,
              organization_logo: certificate.organizationLogo,
              valid_until: certificate.validUntil // Use valid_until for DB
            })
            .select();
            
          if (certError) {
            console.error('Error saving certificate:', certError);
            throw certError;
          }
          
          console.log('5. Certificate saved successfully:', certData);
          
          // Set the generated certificate and show the modal
          setGeneratedCertificate(certificate);
          setShowCertificateModal(true);
          
          console.log('Certificate generated and modal set to show.');
          
          // Send notification to user
          const { error: notifError } = await supabase
            .from('notifications')
            .insert({
              user_id: session.user.id,
              title: 'Course Completed!',
              message: `Congratulations! You've completed the course "${course.title}". Your certificate is now available in your profile.`,
              type: 'success',
              action: `/profile/certificates/${certificate.certificateNumber}`
            });
            
          if (notifError) {
            console.error('Error sending notification:', notifError);
          }
        } catch (certErr) {
          console.error('Error in certificate generation:', certErr);
        }
      }
      
      // Log the progress update
      console.log(`Updated progress for course ${courseId} to ${newProgress}%`);
      
      // If this is a quiz completion with a score, log it separately
      if (quizId && score !== undefined) {
        console.log(`Quiz completed with score: ${score}%`);
      }
      
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
  
  // Function to check if an answer is correct (helper for quiz functionality)
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

  // Function to calculate score for a module
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

  // Progress update function (using the more complete implementation above)
  const updateProgress = (increment: number) => {
    if (!enrollmentData || !course || !course.modules.length) return;
    
    const currentModule = course.modules[activeModuleIndex];
    const moduleCount = course.modules.length;
    const moduleIndex = activeModuleIndex;
    let newProgress;
    
    // Simple milestone-based progress tracking
    // Module 0 video = 25%
    // Module 0 quiz = 50%
    // Module 1 video = 75%
    // Module 1 quiz = 100%
    
    // Check if we're in module 0 or module 1
    if (moduleIndex === 0) {
      if (increment === progressIncrements.quiz) {
        // Module 0 quiz completion = 50%
        newProgress = 50;
        console.log('Module 0 quiz completed - progress set to 50%');
      } else {
        // Module 0 video or content completion = 25%
        newProgress = 25;
        console.log('Module 0 content completed - progress set to 25%');
      }
    } else if (moduleIndex === 1) {
      if (increment === progressIncrements.quiz) {
        // Module 1 quiz completion = 100%
        newProgress = 100;
        console.log('Module 1 quiz completed - progress set to 100%');
      } else {
        // Module 1 video or content completion = 75%
        newProgress = 75;
        console.log('Module 1 content completed - progress set to 75%');
      }
    } else {
      // For any additional modules, we'll do simple progression
      // Each module beyond the first two is worth (100 - 75) / (moduleCount - 2) percent
      const additionalModuleValue = moduleCount > 2 ? Math.round((100 - 75) / (moduleCount - 2)) : 0;
      newProgress = Math.min(75 + ((moduleIndex - 1) * additionalModuleValue), 100);
      console.log(`Additional module ${moduleIndex} completed - progress set to ${newProgress}%`);
    }
    
    // Update progress in database
    updateProgressMutation.mutate({
      courseId: courseId,
      lessonId: course.modules[activeModuleIndex].id,
      completed: true,
      // Pass the calculated progress to ensure it's saved correctly
      progress: newProgress
    });
    
    // Invalidate queries to refresh the UI
    queryClient.invalidateQueries({ queryKey: ['enrollment-status', courseId, session?.user?.id] });
    queryClient.invalidateQueries({ queryKey: ['user-enrollments'] });
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
          
          <Tabs value={activeAITab} onValueChange={setActiveAITab} className="container py-6">
            <TabsList className="grid w-full grid-cols-2 max-w-md mb-6">
              <TabsTrigger value="content">Course Content</TabsTrigger>
              <TabsTrigger value="ai">AI-Generated Content</TabsTrigger>
            </TabsList>
            
            <TabsContent value="content">
              <CourseDetailTabs
                course={course}
                activeModuleIndex={activeModuleIndex}
                setActiveModuleIndex={setActiveModuleIndex}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                quizAnswers={quizAnswers}
                setQuizAnswers={setQuizAnswers}
                checkAnswer={checkAnswer}
                updateProgress={updateUserProgress}
                calculateModuleScore={calculateModuleScore}
                scormModules={scormModules || []}
                isEnrolled={isEnrolled}
                isCompleted={isCompleted}
                activeModule={course.modules[activeModuleIndex]}
                session={session}
                updateProgressMutation={updateProgressMutation}
              />
            </TabsContent>
            
            <TabsContent value="ai">
              <AIContentTabs 
                course={{
                  quizContent: course.quizContent,
                  moduleContent: course.moduleContent,
                  objectives: course.objectives,
                  assessmentCriteria: course.assessmentCriteria,
                  scenarioContent: course.scenarioContent,
                  lessonPlan: course.lessonPlan
                }} 
              />
            </TabsContent>
          </Tabs>
        </main>
        
        <Footer />
      </div>
      {generatedCertificate && (
        <CertificateModal
          open={showCertificateModal}
          onOpenChange={setShowCertificateModal}
          certificate={generatedCertificate}
        />
      )}
    </div>
  );
};

export default CourseDetail;
