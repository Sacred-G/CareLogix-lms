import React from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Course, CourseModule } from '@/data/courseTypes';
import { useToast } from '@/hooks/use-toast';
import { ScormModule } from '@/data/scormTypes';

// Add 'as const' to ensure type safety
const progressIncrements = {
  content: 25,
  quiz: 75,
} as const;

interface CourseDetailTabsProps {
  course: Course;
  scormModules?: ScormModule[];
  isEnrolled: boolean;
  activeModuleIndex: number;
  setActiveModuleIndex: React.Dispatch<React.SetStateAction<number>>;
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
  quizAnswers: Record<string, number>;
  setQuizAnswers: React.Dispatch<React.SetStateAction<Record<string, number>>>;
  checkAnswer: (questionId: string, selectedOptionIndex: number) => boolean;
  updateProgress: (increment: number) => void;
  calculateModuleScore: (moduleId: string) => number;
  handleCertificateDownload: () => void;
  updateEnrollment: any;
  certificateUrl?: string;
  handleScormLaunch: (scormModule: ScormModule) => void;
}

const CourseDetailTabs: React.FC<CourseDetailTabsProps> = ({
  course,
  scormModules = [],
  isEnrolled,
  activeModuleIndex,
  setActiveModuleIndex,
  activeTab,
  setActiveTab,
  quizAnswers,
  setQuizAnswers,
  checkAnswer,
  updateProgress,
  calculateModuleScore,
  handleCertificateDownload,
  updateEnrollment,
  certificateUrl,
  handleScormLaunch
}) => {
  const { toast } = useToast();
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
      // Fixed here - use a number directly instead of a function that returns a number
      setActiveModuleIndex(activeModuleIndex + 1);
      setActiveTab('content');
      updateProgress(progressIncrements.content);
      window.scrollTo(0, 0);
    }
  };

  const goToPrevModule = () => {
    if (hasPrevModule) {
      // Fixed here - use a number directly instead of a function that returns a number
      setActiveModuleIndex(activeModuleIndex - 1);
      setActiveTab('content');
      window.scrollTo(0, 0);
    }
  };

  // Handle quiz submission
  const handleQuizSubmit = () => {
    if (!currentModule.questions || currentModule.questions.length === 0) return;

    const moduleScore = calculateModuleScore(currentModule.id);
    const passThreshold = 70;

    if (moduleScore >= passThreshold) {
      updateProgress(progressIncrements.quiz);
      toast({
        title: "Quiz Completed!",
        description: `You scored ${moduleScore}%. Great job!`,
      });

      // If this is the last module, update the course completion status
      if (!hasNextModule) {
        updateEnrollment({ status: 'completed' });
        toast({
          title: "Course Completed!",
          description: "Congratulations on completing this course!",
        });
      }
    } else {
      toast({
        title: "Quiz Result",
        description: `You scored ${moduleScore}%. You need 70% to pass. Try again!`,
        variant: "destructive"
      });
    }
  };

  return (
    <div className="container px-4 py-8">
      <div className="bg-card border rounded-lg overflow-hidden">
        {/* Module Navigation */}
        <div className="flex items-center justify-between bg-muted p-4 border-b">
          <Button 
            variant="outline" 
            onClick={goToPrevModule} 
            disabled={!hasPrevModule}
          >
            Previous Module
          </Button>
          
          <h2 className="text-lg font-semibold hidden md:block">
            Module {activeModuleIndex + 1}: {currentModule.title}
          </h2>
          
          <Button 
            variant="outline" 
            onClick={goToNextModule} 
            disabled={!hasNextModule}
          >
            Next Module
          </Button>
        </div>

        {/* Mobile Module Title */}
        <h2 className="text-lg font-semibold p-4 md:hidden">
          Module {activeModuleIndex + 1}: {currentModule.title}
        </h2>
        
        {/* Module Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="bg-background border-b border-border p-0">
            <TabsTrigger 
              value="content" 
              className="rounded-none data-[state=active]:bg-background data-[state=active]:border-b-2 data-[state=active]:border-primary py-3 px-6"
            >
              Content
            </TabsTrigger>
            
            {currentModule.videoUrl && (
              <TabsTrigger 
                value="video"
                className="rounded-none data-[state=active]:bg-background data-[state=active]:border-b-2 data-[state=active]:border-primary py-3 px-6"
              >
                Video
              </TabsTrigger>
            )}
            
            {currentModule.audioUrl && (
              <TabsTrigger 
                value="audio"
                className="rounded-none data-[state=active]:bg-background data-[state=active]:border-b-2 data-[state=active]:border-primary py-3 px-6"
              >
                Audio
              </TabsTrigger>
            )}
            
            {currentModule.questions && currentModule.questions.length > 0 && (
              <TabsTrigger 
                value="quiz"
                className="rounded-none data-[state=active]:bg-background data-[state=active]:border-b-2 data-[state=active]:border-primary py-3 px-6"
                disabled={!isEnrolled}
              >
                Quiz
              </TabsTrigger>
            )}
            
            {scormModules && scormModules.length > 0 && (
              <TabsTrigger 
                value="scorm"
                className="rounded-none data-[state=active]:bg-background data-[state=active]:border-b-2 data-[state=active]:border-primary py-3 px-6"
                disabled={!isEnrolled}
              >
                Interactive
              </TabsTrigger>
            )}
          </TabsList>
          
          {/* Content Sections */}
          <TabsContent value="content" className="p-6 space-y-4">
            <h3 className="text-xl font-semibold">{currentModule.title}</h3>
            <p className="text-muted-foreground">{currentModule.description}</p>
            <div dangerouslySetInnerHTML={{ __html: currentModule.content || '' }} />
          </TabsContent>

          {currentModule.videoUrl && (
            <TabsContent value="video" className="p-6">
              <div className="aspect-w-16 aspect-h-9">
                <iframe 
                  src={currentModule.videoUrl} 
                  title="Module Video" 
                  allowFullScreen
                  className="rounded-lg"
                />
              </div>
            </TabsContent>
          )}

          {currentModule.audioUrl && (
            <TabsContent value="audio" className="p-6">
              <audio controls className="w-full">
                <source src={currentModule.audioUrl} type="audio/mp3" />
                Your browser does not support the audio element.
              </audio>
              {currentModule.transcript && (
                <details>
                  <summary className="text-sm font-medium cursor-pointer">Transcript</summary>
                  <p className="text-sm text-muted-foreground mt-2">{currentModule.transcript}</p>
                </details>
              )}
            </TabsContent>
          )}

          {currentModule.questions && currentModule.questions.length > 0 && (
            <TabsContent value="quiz" className="p-6 space-y-4">
              <h3 className="text-xl font-semibold">Module Quiz</h3>
              {currentModule.questions.map((question, index) => (
                <div key={question.id} className="space-y-2">
                  <p className="font-medium">{index + 1}. {question.question}</p>
                  {question.options.map((option, optionIndex) => (
                    <label key={optionIndex} className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name={`question-${question.id}`}
                        value={optionIndex}
                        checked={quizAnswers[question.id] === optionIndex}
                        onChange={() => checkAnswer(question.id, optionIndex)}
                        className="cursor-pointer"
                      />
                      <span>{option}</span>
                    </label>
                  ))}
                  {quizAnswers[question.id] !== undefined && (
                    <p className="text-sm mt-1">
                      {checkAnswer(question.id, quizAnswers[question.id])
                        ? <span className="text-green-500">Correct!</span>
                        : <span className="text-red-500">Incorrect.</span>}
                      {question.explanation && (
                        <>
                          <br />
                          <span className="text-muted-foreground">{question.explanation}</span>
                        </>
                      )}
                    </p>
                  )}
                </div>
              ))}
              <Button onClick={handleQuizSubmit}>Submit Quiz</Button>
            </TabsContent>
          )}

          {scormModules && scormModules.length > 0 && (
            <TabsContent value="scorm" className="p-6">
              {scormModules.map((scormModule) => (
                <div key={scormModule.id} className="space-y-4">
                  <h3 className="text-xl font-semibold">{scormModule.title}</h3>
                  <p className="text-muted-foreground">{scormModule.description}</p>
                  <Button onClick={() => handleScormLaunch(scormModule)}>
                    Launch Interactive Module
                  </Button>
                </div>
              ))}
            </TabsContent>
          )}
        </Tabs>
      </div>
    </div>
  );
};

export default CourseDetailTabs;
