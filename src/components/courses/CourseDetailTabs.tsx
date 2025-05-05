
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
      setActiveModuleIndex(activeModuleIndex + 1);
      setActiveTab('content');
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
    
    // Update progress in database
    updateProgressMutation.mutate({
      lessonId: currentModule.id,
      completed: true
    });
  };

  // Handle quiz completion
  const handleQuizComplete = (score: number) => {
    const passThreshold = 70;

    if (score >= passThreshold) {
      updateProgress(progressIncrements.quiz);
      toast({
        title: "Quiz Completed!",
        description: `You scored ${score}%. Great job!`,
      });

      // If this is the last module, update the course completion status
      if (!hasNextModule) {
        updateEnrollment({ status: 'completed' });
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
        <div className="flex items-center justify-between bg-muted p-4 border-b">
          <Button 
            variant="outline" 
            onClick={goToPrevModule} 
            disabled={!hasPrevModule}
            className="flex items-center gap-2"
          >
            <ArrowLeft size={16} />
            Previous Module
          </Button>
          
          <h2 className="text-lg font-semibold hidden md:block">
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
        <h2 className="text-lg font-semibold p-4 md:hidden">
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
        <div className="flex items-center justify-between p-4 border-t bg-muted/30">
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
          
          <div className="flex items-center">
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
