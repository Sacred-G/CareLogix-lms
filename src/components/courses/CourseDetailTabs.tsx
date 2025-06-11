
import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Course, Module } from '@/data/courseTypes';
import { useToast } from '@/hooks/use-toast';
import { ScormModule } from '@/data/scormTypes';
import { UseMutationResult } from '@tanstack/react-query';
import CourseContent from './CourseContent';
import { ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react';

// Add 'as const' to ensure type safety
const progressIncrements = {
  content: 25,
  quiz: 75,
} as const;

interface CourseDetailTabsProps {
  course: Course;
  scormModules?: ScormModule[] | null;
  isLoadingScorm?: boolean;
  isEnrolled: boolean;
  activeModuleIndex: number;
  setActiveModuleIndex: React.Dispatch<React.SetStateAction<number>>;
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
  quizAnswers?: Record<string, number>;
  setQuizAnswers?: React.Dispatch<React.SetStateAction<Record<string, number>>>;
  checkAnswer?: (questionId: string, selectedOptionIndex: number) => boolean;
  updateProgress?: (increment: number) => void;
  calculateModuleScore?: (moduleId: string) => number;
  handleCertificateDownload?: () => void;
  updateEnrollment?: any;
  certificateUrl?: string;
  handleScormLaunch?: (scormModule: ScormModule) => void;
  isCompleted: boolean;
  activeModule: Module;
  session: any;
  updateProgressMutation: UseMutationResult<any, any, any, any>;
}

const CourseDetailTabs = ({
  course,
  scormModules = null,
  isLoadingScorm = false,
  isEnrolled,
  activeModuleIndex,
  setActiveModuleIndex,
  activeTab,
  setActiveTab,
  quizAnswers = {},
  setQuizAnswers = () => {},
  checkAnswer = () => false,
  updateProgress = () => {},
  calculateModuleScore = () => 0,
  handleCertificateDownload = () => {},
  updateEnrollment = () => {},
  certificateUrl,
  handleScormLaunch = () => {},
  isCompleted,
  activeModule,
  session,
  updateProgressMutation
}: CourseDetailTabsProps) => {
  const { toast } = useToast();
  const [contentCompletionState, setContentCompletionState] = useState<{
    video: boolean;
    audio: boolean;
    text: boolean;
  }>({
    video: false,
    audio: false,
    text: false
  });
  
  const currentModule = course.modules[activeModuleIndex];
  const hasNextModule = activeModuleIndex < course.modules.length - 1;
  const hasPrevModule = activeModuleIndex > 0;

  // Early return if there are no modules
  if (!course.modules || course.modules.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">This course has no content available yet.</p>
      </div>
    );
  }

  // Handle module navigation
  const goToNextModule = () => {
    if (hasNextModule) {
      const nextModuleIndex = activeModuleIndex + 1;
      setActiveModuleIndex(nextModuleIndex);
      
      // Auto-display video when going from first to second module
      if (activeModuleIndex === 0 && nextModuleIndex === 1 && course.modules[nextModuleIndex]?.videoUrl) {
        setActiveTab('content');
        
        // Use a small timeout to ensure the module content is loaded first
        setTimeout(() => {
          // Scroll to the video element
          const videoElement = document.querySelector('.video-container');
          if (videoElement) {
            videoElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 300);
      } else {
        setActiveTab('content');
      }
      
      updateProgress(progressIncrements.content);
      window.scrollTo(0, 0);
    }
  };

  const goToPrevModule = () => {
    if (hasPrevModule) {
      setActiveModuleIndex(activeModuleIndex - 1);
      setActiveTab('content');
      window.scrollTo(0, 0);
    }
  };

  // Handle content completion
  const handleContentComplete = (type: 'video' | 'text' | 'audio') => {
    setContentCompletionState(prev => ({
      ...prev,
      [type]: true
    }));
    
    // Check if all content types for this module are completed
    const allContentCompleted = () => {
      // Define which content types are available in this module
      const hasVideo = !!currentModule.videoUrl;
      const hasAudio = !!currentModule.audioUrl;
      const hasText = !!currentModule.content;
      
      // Get current completion state including the new completion
      const updatedState = {
        ...contentCompletionState,
        [type]: true
      };
      
      // Check if all available content types are completed
      return (!hasVideo || updatedState.video) && 
             (!hasAudio || updatedState.audio) && 
             (!hasText || updatedState.text);
    };
    
    // Save the specific content completion to the database
    updateProgressMutation.mutate({
      courseId: course.id,
      lessonId: `${course.id}:module:${activeModuleIndex}:${type}`,
      completed: true
    });
    
    // Use our simplified progress tracking
    updateProgress(progressIncrements.content);
    
    // If all content for this module is completed, update the module completion status
    if (allContentCompleted()) {
      console.log(`All content for module ${activeModuleIndex + 1} completed`);
      
      // Update the module completion status in the database
      updateProgressMutation.mutate({
        courseId: course.id,
        lessonId: `${course.id}:module:${activeModuleIndex}`,
        completed: true
      });
      
      // Show a success message
      toast({
        title: "Module Content Completed",
        description: "You've completed all the content for this module!",
      });
    }
  };

  // Handle quiz completion
  const handleQuizComplete = (score: number) => {
    const passThreshold = 70;

    // Always save the quiz attempt to the database regardless of pass/fail
    // Use the course ID and module index as a unique identifier instead of module ID
    updateProgressMutation.mutate({
      courseId: course.id,
      // Store module information in a different way to avoid UUID conversion issues
      quizId: `${course.id}:module:${activeModuleIndex}`,
      completed: score >= passThreshold,
      score: score
    });

    if (score >= passThreshold) {
      // If passed, update the module progress in the database
      updateProgressMutation.mutate({
        courseId: course.id,
        // Store module information in a different way to avoid UUID conversion issues
        lessonId: `${course.id}:module:${activeModuleIndex}`,
        completed: true
      });
      
      // Use our simplified progress tracking for quizzes
      updateProgress(progressIncrements.quiz);
      
      toast({
        title: "Quiz Completed!",
        description: `You scored ${score}%. Great job!`,
      });

      // If this is the last module, update the course completion status
      if (!hasNextModule) {
        // Update enrollment with completed status
        updateProgressMutation.mutate({
          courseId: course.id,
          completed: true
        });
        
        toast({
          title: "Course Completed!",
          description: "Congratulations on completing this course!",
        });
      } else {
        // Automatically move to the next module after passing a quiz
        setTimeout(() => {
          goToNextModule();
        }, 2000);
      }
    } else {
      toast({
        title: "Quiz Result",
        description: `You scored ${score}%. You need 70% to pass. Try again!`,
        variant: "destructive"
      });
    }
  };

  // Add courseId to the module for SCORM modules
  const enhancedModule = {
    ...currentModule,
    courseId: course.id
  };

  return (
    <div className="container px-4 py-8">
      <div className="bg-card border rounded-lg overflow-hidden shadow-lg">
        {/* Module Navigation */}
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between bg-muted p-4 border-b">
          <Button 
            variant="outline" 
            onClick={goToPrevModule} 
            disabled={!hasPrevModule}
            className="flex items-center gap-2"
          >
            <ArrowLeft size={16} />
            Previous Module
          </Button>
          
          <h2 className="text-base font-semibold text-center break-words max-w-xs w-full mx-auto sm:text-lg hidden md:block">
            Module {activeModuleIndex + 1}: {currentModule.title}
          </h2>
          
          <Button 
            variant="outline" 
            onClick={goToNextModule} 
            disabled={!hasNextModule}
            className="flex items-center gap-2"
          >
            Next Module
            <ArrowRight size={16} />
          </Button>
        </div>

        {/* Mobile Module Title */}
        <h2 className="text-base font-semibold p-4 md:hidden text-center break-words max-w-xs w-full mx-auto">
          Module {activeModuleIndex + 1}: {currentModule.title}
        </h2>
        
        {/* Module Content using CourseContent component */}
        <div className="p-6">
          <CourseContent 
            module={enhancedModule}
            onQuizComplete={handleQuizComplete}
            onContentComplete={handleContentComplete}
          />
        </div>
        
        {/* Module Navigation Footer */}
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between p-4 border-t bg-muted/30">
          <Button 
            variant="outline" 
            onClick={goToPrevModule} 
            disabled={!hasPrevModule}
            size="sm"
            className="flex items-center gap-1"
          >
            <ArrowLeft size={14} />
            Previous
          </Button>
          
          <div className="flex flex-col items-center gap-1 sm:flex-row sm:gap-2">
            <span className="text-sm text-muted-foreground">
              Module {activeModuleIndex + 1} of {course.modules.length}
            </span>
            {isCompleted && (
              <span className="ml-2 inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-800">
                <CheckCircle size={12} className="mr-1" /> Completed
              </span>
            )}
          </div>
          
          <Button 
            variant="outline" 
            onClick={goToNextModule} 
            disabled={!hasNextModule}
            size="sm"
            className="flex items-center gap-1"
          >
            Next
            <ArrowRight size={14} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailTabs;
