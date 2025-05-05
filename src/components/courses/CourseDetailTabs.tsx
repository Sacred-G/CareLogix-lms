
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Course, Module } from '@/data/courseTypes';
import { ScormModule } from '@/data/scormTypes';
import CourseContent from '@/components/courses/CourseContent';
import ScormViewer from '@/components/courses/ScormViewer';
import CompletedCourseActions from '@/components/courses/CompletedCourseActions';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

interface CourseDetailTabsProps {
  course: Course;
  activeTab: string;
  setActiveTab: (value: string) => void;
  activeModuleIndex: number;
  setActiveModuleIndex: (index: number) => void;
  scormModules: ScormModule[] | null;
  isLoadingScorm: boolean;
  isEnrolled: boolean;
  isCompleted: boolean;
  activeModule: Module;
  session: any;
  updateProgressMutation: {
    mutate: (data: any) => void;
  };
}

const CourseDetailTabs: React.FC<CourseDetailTabsProps> = ({
  course,
  activeTab,
  setActiveTab,
  activeModuleIndex,
  setActiveModuleIndex,
  scormModules,
  isLoadingScorm,
  isEnrolled,
  isCompleted,
  activeModule,
  session,
  updateProgressMutation
}) => {
  const navigate = useNavigate();

  return (
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
          {scormModules && scormModules.length > 0 && (
            <TabsTrigger value="scorm">SCORM Content</TabsTrigger>
          )}
        </TabsList>
        
        <TabsContent value="content" className="space-y-8">
          {activeModule ? (
            <CourseContent 
              module={activeModule} 
              onQuizComplete={(score) => {
                if (!session) {
                  toast('Sign in to save your progress', {
                    action: {
                      label: 'Sign In',
                      onClick: () => navigate('/auth')
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
                      onClick: () => navigate('/auth')
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
          ) : (
            <div className="p-8 text-center border rounded-lg bg-muted/30">
              <h3 className="font-medium mb-2">Module not found</h3>
              <p className="text-muted-foreground">The selected module could not be loaded.</p>
            </div>
          )}
          
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
                    <h3 className="font-medium">{module.title || `Module ${index + 1}`}</h3>
                    <p className="text-sm text-muted-foreground">{module.description || 'No description available'}</p>
                  </div>
                  {index === activeModuleIndex && (
                    <Badge variant="outline" className="ml-2">Current</Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
        
        {scormModules && scormModules.length > 0 && (
          <TabsContent value="scorm">
            <div className="space-y-6">
              <h2 className="text-xl font-semibold mb-4">Interactive SCORM Content</h2>
              
              {isLoadingScorm ? (
                <div className="space-y-4">
                  <Skeleton className="h-[300px] w-full" />
                  <Skeleton className="h-8 w-32" />
                </div>
              ) : scormModules.length === 0 ? (
                <div className="p-8 text-center border rounded-lg bg-muted/30">
                  <h3 className="font-medium mb-2">No SCORM Content Available</h3>
                  <p className="text-muted-foreground">This course does not have any interactive SCORM content yet.</p>
                </div>
              ) : (
                scormModules.map((scormModule) => (
                  <ScormViewer 
                    key={scormModule.id}
                    module={scormModule}
                    onComplete={(progress) => {
                      // Update overall course progress when a SCORM module is completed
                      if (isEnrolled && progress === 100) {
                        toast.success('SCORM module completed!');
                      }
                    }}
                  />
                ))
              )}
            </div>
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
};

export default CourseDetailTabs;
