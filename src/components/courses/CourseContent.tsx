import React, { useState } from 'react';
import { Module, ScenarioOption } from '@/data/courseTypes';
import VideoPlayer from './VideoPlayer';
import AudioPlayer from './AudioPlayer';
import QuizSection from './QuizSection';
import FlashcardSection from './FlashcardSection';
import FAQSection from './FAQSection';
import InteractiveScenario from './InteractiveScenario';
import ScormViewer from './ScormViewer';
import MindmapSection from '../mindmap/MindmapSection';
import PdfViewer from './PdfViewer'; // Added PdfViewer import
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import ReactMarkdown from 'react-markdown';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertTriangle, CheckCircle, Lock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useScormModules } from '@/hooks/useScormModules';
import { scormModulesByCourse, DirectScormModule } from '@/data/scormConfig';

interface CourseContentProps {
  module: Module;
  onQuizComplete?: (score: number) => void;
  onContentComplete?: (type: 'video' | 'text' | 'audio') => void;
}

export default function CourseContent({ module, onQuizComplete, onContentComplete }: CourseContentProps) {
  const { toast } = useToast();
  const { scormModules, isLoading: loadingScormModules } = useScormModules(module.courseId);
  
  // Early return with a placeholder if module is undefined
  if (!module) {
    console.error('Module is undefined in CourseContent');
    return (
      <div className="p-8 text-center">
        <h3 className="text-lg font-medium">Module content unavailable</h3>
        <p className="text-muted-foreground">This module content could not be loaded.</p>
      </div>
    );
  }

  const [videoCompleted, setVideoCompleted] = useState(false);
  const [textCompleted, setTextCompleted] = useState(false);
  const [audioCompleted, setAudioCompleted] = useState(false);
  const [activeTab, setActiveTab] = useState('content');
  const [selectedScormModuleId, setSelectedScormModuleId] = useState<string | null>(null);
  const [selectedRoleIframeUrl, setSelectedRoleIframeUrl] = useState<string | null>(null);
  
  // Auto-switch to SCORM tab if SCORM content is available and this is the first render
  React.useEffect(() => {
    if (scormModules && scormModules.length > 0 && activeTab === 'content') {
      setActiveTab('scorm');
    }
  }, [scormModules, activeTab]);

  // Calculate if quiz is unlocked (both video and audio completed)
  const isVideoRequired = !!module.videoUrl;
  const isAudioRequired = !!module.audioUrl;
  
  const isQuizUnlocked = 
    (!isVideoRequired || videoCompleted) && 
    (!isAudioRequired || audioCompleted);

  const handleVideoEnd = () => {
    setVideoCompleted(true);
    toast({
      title: "Video Completed",
      description: "Great job! You've completed the video lesson."
    });
    if (onContentComplete) {
      onContentComplete('video');
    }
  };

  const handleTextComplete = () => {
    setTextCompleted(true);
    toast({
      title: "Reading Completed",
      description: "You've marked the reading material as complete."
    });
    if (onContentComplete) {
      onContentComplete('text');
    }
  };

  const handleAudioEnd = () => {
    setAudioCompleted(true);
    toast({
      title: "Audio Completed",
      description: "Great job! You've completed the audio lesson."
    });
    if (onContentComplete) {
      onContentComplete('audio');
    }
  };

  const handleQuizTabClick = () => {
    if (!isQuizUnlocked) {
      toast({
        title: "Quiz Locked",
        description: "You need to complete the video and audio lessons first.",
        variant: "destructive"
      });
    }
  };

  const handleScormModuleSelect = (moduleId: string) => {
    setSelectedScormModuleId(moduleId);
  };

  const handleScormComplete = (progress: number) => {
    toast({
      title: "SCORM Module Completed",
      description: `You've completed ${progress}% of this SCORM module.`
    });
  };

  // Helper functions to determine if tabs have content
  const hasScormContent = () => {
    const hasDirectScorm = ['intro-dev-disabilities', 'client-rights', 'infection-control', 'emergency-preparedness', 'trust-rapport', 'communication-empathy', 'documentation-visits', 'medication-admin', 'positive-behavior-support', 'boundaries-ethics'].includes(module.courseId || '');
    const hasScormInConfig = scormModulesByCourse[`${module.courseId || ''}_${module.id || ''}`]?.length > 0;
    const hasScormInDatabase = scormModules?.length > 0;
    
    return hasDirectScorm || hasScormInConfig || hasScormInDatabase;
  };

  const hasInteractiveContent = () => {
    return !!(module.interactiveScenario || 
             (module.flashcards && module.flashcards.length > 0) || 
             (module.faqs && module.faqs.length > 0));
  };

  // Calculate number of tabs to determine grid layout
  const getTabCount = () => {
    let count = 2; // Always have content and quiz tabs
    if (module.id === 'mod-1') {
      if (hasScormContent()) count++;
      if (hasInteractiveContent()) count++;
    }
    return count;
  };

  const getGridCols = () => {
    const tabCount = getTabCount();
    return `grid-cols-${tabCount}`;
  };

  // Handle interactive iframe module type
  if (module.customModuleType === 'interactiveIframe' && module.iframeUrl) {
    return (
      <div className="space-y-8">
        <h2 className="text-2xl font-bold text-gradient-primary">{module.title || 'Interactive Module'}</h2>
        <p className="text-muted-foreground text-lg">{module.description || 'Please complete the interactive content below.'}</p>
        <div className="w-full rounded-lg overflow-hidden shadow-lg border border-muted" style={{ height: module.iframeHeight || '70vh' }}>
          <iframe 
            src={module.iframeUrl}
            title={module.iframeTitle || 'Interactive Content'}
            className="w-full h-full border-0"
            allowFullScreen
            allow="autoplay; fullscreen; geolocation; microphone; camera; midi; encrypted-media"
            loading="eager"
            sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
          />
        </div>
        <div className="prose dark:prose-invert max-w-none mt-6">
          <ReactMarkdown>{module.content}</ReactMarkdown>
        </div>
      </div>
    );
  }

  // Handle role-based iframe selection module type
  if (module.customModuleType === 'roleBasedIframeSelection') {
    const [isTrainingCompleted, setIsTrainingCompleted] = React.useState(false);
    const [isMarkingComplete, setIsMarkingComplete] = React.useState(false);

    const handleMarkComplete = async () => {
      if (!onContentComplete) return;
      
      try {
        setIsMarkingComplete(true);
        // Mark the module as completed
        onContentComplete('video'); // Using 'video' as the content type since it's required for completion
        setIsTrainingCompleted(true);
        
        toast({
          title: "Training Marked as Completed",
          description: "Thank you for completing the training. Your progress has been saved.",
        });
      } catch (error) {
        console.error('Error marking training as complete:', error);
        toast({
          title: "Error",
          description: "Failed to mark training as complete. Please try again.",
          variant: "destructive"
        });
      } finally {
        setIsMarkingComplete(false);
      }
    };

    if (selectedRoleIframeUrl) {
      return (
        <div className="space-y-8">
          <h2 className="text-2xl font-bold text-gradient-primary">{module.title || 'Training Module'}</h2>
          <p className="text-muted-foreground text-lg">{module.description || 'Please complete the training below.'}</p>
          
          <div className="relative w-full h-[70vh] border-0 rounded-lg shadow-lg overflow-hidden">
            <iframe 
              src={selectedRoleIframeUrl}
              title={module.title || 'Sexual Harassment Prevention Training'}
              className="w-full h-full border-0"
              allowFullScreen
            />
          </div>
          
          <div className="space-y-4">
            {module.completionInstructions && (
              <div className="prose dark:prose-invert max-w-none p-4 bg-muted/30 rounded-lg">
                <ReactMarkdown>{module.completionInstructions}</ReactMarkdown>
              </div>
            )}
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                onClick={() => setSelectedRoleIframeUrl(null)} 
                variant="outline"
                className="flex-1"
              >
                Back to Role Selection
              </Button>
              
              <Button
                onClick={handleMarkComplete}
                disabled={isTrainingCompleted || isMarkingComplete}
                className={`flex-1 ${isTrainingCompleted ? 'bg-green-500 hover:bg-green-600' : ''}`}
              >
                {isMarkingComplete ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Saving...
                  </>
                ) : isTrainingCompleted ? (
                  <>
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Training Completed
                  </>
                ) : (
                  'Mark Training as Complete'
                )}
              </Button>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-8 p-6 bg-card rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gradient-primary">{module.title || 'Training Selection'}</h2>
        <div className="prose dark:prose-invert max-w-none">
          <ReactMarkdown>{module.content}</ReactMarkdown>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 mt-6">
          {module.supervisorIframeUrl && (
            <Button 
              onClick={() => {
  setSelectedRoleIframeUrl(module.supervisorIframeUrl!);
  if (onContentComplete) onContentComplete('video');
}}
              className="flex-1 py-3 text-lg bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              Supervisor Training
            </Button>
          )}
          {module.nonSupervisorIframeUrl && (
            <Button 
              onClick={() => {
  setSelectedRoleIframeUrl(module.nonSupervisorIframeUrl!);
  if (onContentComplete) onContentComplete('video');
}}
              className="flex-1 py-3 text-lg bg-secondary hover:bg-secondary/90 text-secondary-foreground"
            >
              Non-Supervisor Training
            </Button>
          )}
        </div>
      </div>
    );
  }

  // Default rendering for other module types
  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-gradient-primary">{module.title || 'Module'}</h2>
      <p className="text-muted-foreground text-lg">{module.description || 'No description available'}</p>
      
      {/* Progress indicators */}
      <div className="flex flex-wrap gap-4 p-4 bg-muted/30 rounded-lg">
        {module.videoUrl && (
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${videoCompleted ? 'bg-green-500' : 'bg-amber-500'}`}></div>
            <span className="text-sm">Video: {videoCompleted ? 'Completed' : 'Pending'}</span>
          </div>
        )}
        {module.audioUrl && (
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${audioCompleted ? 'bg-green-500' : 'bg-amber-500'}`}></div>
            <span className="text-sm">Audio: {audioCompleted ? 'Completed' : 'Pending'}</span>
          </div>
        )}
        <div className="flex items-center gap-2">
          <div className={`w-3 h-3 rounded-full ${textCompleted ? 'bg-green-500' : 'bg-amber-500'}`}></div>
          <span className="text-sm">Reading: {textCompleted ? 'Completed' : 'Pending'}</span>
        </div>
        <div className="flex items-center gap-2 ml-auto">
          <div className={`w-3 h-3 rounded-full ${isQuizUnlocked ? 'bg-green-500' : 'bg-red-500'}`}></div>
          <span className="text-sm">Quiz: {isQuizUnlocked ? 'Unlocked' : 'Locked'}</span>
        </div>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="relative mb-6">
          <div className="relative">
            <TabsList 
              className={`w-full flex flex-nowrap overflow-x-auto pb-2 gap-1 sm:gap-2 md:grid md:${getGridCols()} md:pb-0`}
              style={{
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
                WebkitOverflowScrolling: 'touch',
                scrollPadding: '0 1rem',
              }}
            >
              <TabsTrigger 
                value="content" 
                className="flex-shrink-0 text-xs sm:text-sm md:text-base py-2 px-2 sm:px-3 whitespace-nowrap
                  data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-indigo-600 
                  data-[state=active]:text-white transition-colors duration-200 rounded-md"
              >
                <span className="truncate">Content</span>
              </TabsTrigger>
              {module.id === 'mod-1' && hasScormContent() && (
                <TabsTrigger 
                  value="scorm" 
                  className="flex-shrink-0 text-xs sm:text-sm md:text-base py-2 px-2 sm:px-3 whitespace-nowrap
                    data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-indigo-600 
                    data-[state=active]:text-white transition-colors duration-200 rounded-md"
                >
                  <span className="truncate">SCORM</span>
                </TabsTrigger>
              )}
              {module.id === 'mod-1' && hasInteractiveContent() && (
                <TabsTrigger 
                  value="interactive" 
                  className="flex-shrink-0 text-xs sm:text-sm md:text-base py-2 px-2 sm:px-3 whitespace-nowrap
                    data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-indigo-600 
                    data-[state=active]:text-white transition-colors duration-200 rounded-md"
                >
                  <span className="truncate">Interactive</span>
                </TabsTrigger>
              )}
              <TabsTrigger 
                value="quiz" 
                className="flex-shrink-0 text-xs sm:text-sm md:text-base py-2 px-2 sm:px-3 whitespace-nowrap
                  data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-indigo-600 
                  data-[state=active]:text-white transition-colors duration-200 rounded-md"
                onClick={handleQuizTabClick}
              >
                <span className="flex items-center justify-center gap-1">
                  {!isQuizUnlocked && <Lock className="h-3 w-3 flex-shrink-0" />}
                  <span className="truncate">Quiz</span>
                </span>
              </TabsTrigger>
            </TabsList>
            {/* Fade effect on the right side for mobile */}
            <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-background to-transparent pointer-events-none md:hidden"></div>
          </div>
        </div>
        
        <TabsContent value="content" className="space-y-8 pt-4 animate-fade-in">
          {module.videoUrl && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium flex items-center gap-2 border-l-4 border-primary pl-3 py-1">
                Video Lesson
                {videoCompleted && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 ml-auto">
                    <CheckCircle size={14} className="mr-1" /> Completed
                  </span>
                )}
              </h3>
              <VideoPlayer 
                url={module.videoUrl} 
                title={module.title || 'Video Lesson'}
                onVideoEnded={handleVideoEnd}
              />
            </div>
          )}
          
          <Card className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-shadow duration-300 bg-gradient-to-br from-card to-muted">
            <CardHeader className="border-b bg-muted/30 pb-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Reading Material</h3>
                {!textCompleted && (
                  <Button size="sm" variant="outline" onClick={handleTextComplete}>
                    Mark as Read
                  </Button>
                )}
                {textCompleted && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    <CheckCircle size={14} className="mr-1" /> Completed
                  </span>
                )}
              </div>
            </CardHeader>
            <CardContent className="pt-6 pb-2 px-6">
              <div className="prose dark:prose-invert prose-headings:scroll-mt-8 max-w-none">
                <ReactMarkdown>{module.content}</ReactMarkdown>
              </div>
            </CardContent>
          </Card>

          {module.pdfPath && (
            <div className="mt-8 pt-6 border-t border-border">
              <h3 className="text-xl font-semibold mb-4 text-gradient-secondary">Supporting Document: {module.title}</h3>
              <PdfViewer filePath={module.pdfPath} title={`PDF: ${module.title}`} />
            </div>
          )}
          
          {module.audioUrl && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium flex items-center gap-2 border-l-4 border-primary pl-3 py-1">
                Audio Lesson
                {audioCompleted && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 ml-auto">
                    <CheckCircle size={14} className="mr-1" /> Completed
                  </span>
                )}
              </h3>
              <AudioPlayer 
                url={module.audioUrl} 
                transcript={module.transcript}
                onAudioEnded={handleAudioEnd}
              />
            </div>
          )}
        </TabsContent>
        
        {module.id === 'mod-1' && hasScormContent() && (
          <TabsContent value="scorm" className="pt-4 animate-fade-in">
            <div className="space-y-8">
              {/* Special cases for courses that should always render iframe directly */}
              {['intro-dev-disabilities', 'client-rights', 'infection-control', 'emergency-preparedness', 'trust-rapport', 'communication-empathy', 'documentation-visits', 'medication-admin', 'positive-behavior-support', 'boundaries-ethics'].includes(module.courseId || '') ? (
                <div className="space-y-4">
                  <h3 className="text-lg font-medium border-l-4 border-primary pl-3 py-1">
                    Interactive SCORM Module
                  </h3>
                  <div className="w-full rounded-lg overflow-hidden shadow-lg border border-muted">
                    <iframe 
                      src={
                        module.courseId === 'intro-dev-disabilities' 
                          ? "https://scorm-neon.vercel.app/Understanding%20Developmental%20Disabilities%20copy/training.htm"
                          : module.courseId === 'client-rights'
                          ? "https://scorm-neon.vercel.app/Client%20Rights%20%26%20Dignity%20of%20Risk/training.htm"
                          : module.courseId === 'infection-control'
                          ? "https://scorm-neon.vercel.app/Infection%20Control/training.htm"
                          : module.courseId === 'emergency-preparedness'
                          ? "https://scorm-neon.vercel.app/Emergency%20Preparedness/training.htm"
                          : module.courseId === 'trust-rapport'
                          ? "https://scorm-neon.vercel.app/Core%20Support%20Skills/training.htm"
                          : module.courseId === 'documentation-visits'
                          ? "https://scorm-neon.vercel.app/Documentation%20%26%20Administrative%20Tasks%202/training.htm"
                          : module.courseId === 'medication-admin'
                          ? "https://scorm-neon.vercel.app/Medication_Administration/training.htm"
                          : module.courseId === 'positive-behavior-support'
                          ? "https://scorm-neon.vercel.app/Positive%20Behavior%20Support%20(1)/training.htm"
                          : module.courseId === 'boundaries-ethics'
                          ? "https://scorm-neon.vercel.app/Core%20Support%20Skills/training.htm"
                          : "https://scorm-neon.vercel.app/Foundations%20of%20Empathetic%20Communication/training.htm"
                      }
                      title="Interactive SCORM Module"
                      className="w-full h-[75vh] border-0"
                      allowFullScreen
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      loading="eager"
                      sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
                    ></iframe>
                  </div>
                </div>
              ) : scormModulesByCourse[`${module.courseId || ''}_${module.id || ''}`] && scormModulesByCourse[`${module.courseId || ''}_${module.id || ''}`].length > 0 ? (
                <div className="space-y-4">
                  <h3 className="text-lg font-medium border-l-4 border-primary pl-3 py-1">
                    Direct SCORM Modules
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {scormModulesByCourse[`${module.courseId || ''}_${module.id || ''}`].map(directModule => (
                      <Card key={directModule.id} className="cursor-pointer hover:shadow-md transition-shadow">
                        <CardHeader>
                          <h4 className="text-md font-medium">{directModule.title}</h4>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground">
                            {directModule.description}
                          </p>
                        </CardContent>
                        <CardFooter>
                          <Button 
                            onClick={() => window.open(directModule.path, '_blank')}
                            className="w-full"
                          >
                            Launch Module
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </div>
              ) : null}
              
              {/* Legacy SCORM modules from Supabase */}
              {scormModules && scormModules.length > 0 ? (
                <div className="space-y-4">
                  <h3 className="text-lg font-medium border-l-4 border-primary pl-3 py-1">
                    Interactive SCORM Modules
                  </h3>
                  
                  {selectedScormModuleId ? (
                    <div className="space-y-4">
                      <Button 
                        variant="outline" 
                        onClick={() => setSelectedScormModuleId(null)}
                        className="mb-4"
                      >
                        Back to Module List
                      </Button>
                      <ScormViewer 
                        moduleId={selectedScormModuleId} 
                        onComplete={handleScormComplete}
                      />
                    </div>
                  ) : (
                    <>
                      {scormModules.some(m => m.status === 'local_mode') && (
                        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
                          <p className="text-amber-800 text-sm font-medium">
                            Some SCORM modules are in Local Mode due to storage configuration issues. When clicking "Launch Local Module", 
                            you'll be given instructions to download and view the content locally.
                          </p>
                        </div>
                      )}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {scormModules.map(scormModule => (
                        <Card key={scormModule.id} className="cursor-pointer hover:shadow-md transition-shadow">
                          <CardHeader>
                            <h4 className="text-md font-medium">{scormModule.title}</h4>
                          </CardHeader>
                          <CardContent>
                            <p className="text-sm text-muted-foreground">
                              {scormModule.description || "Interactive SCORM module"}
                            </p>
                          </CardContent>
                          <CardFooter>
                            <Button 
                              onClick={() => handleScormModuleSelect(scormModule.id)}
                              disabled={!scormModule.public_url}
                              className="w-full"
                              variant={scormModule.status === 'local_mode' ? "secondary" : "default"}
                            >
                              {!scormModule.public_url ? "Module Processing..." : 
                               scormModule.status === 'local_mode' ? "Launch Local Module" : "Launch Module"}
                            </Button>
                          </CardFooter>
                        </Card>
                      ))}
                      </div>
                    </>
                  )}
                </div>
              ) : null}

              {/* No SCORM content message */}
              {!['intro-dev-disabilities', 'client-rights', 'infection-control', 'emergency-preparedness', 'trust-rapport', 'communication-empathy', 'documentation-visits', 'medication-admin', 'positive-behavior-support', 'boundaries-ethics'].includes(module.courseId || '') && 
               (!scormModulesByCourse[`${module.courseId || ''}_${module.id || ''}`] || scormModulesByCourse[`${module.courseId || ''}_${module.id || ''}`].length === 0) && 
               (!scormModules || scormModules.length === 0) && (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No SCORM modules available for this module.</p>
                </div>
              )}
            </div>
          </TabsContent>
        )}

        {module.id === 'mod-1' && hasInteractiveContent() && (
          <TabsContent value="interactive" className="pt-4 animate-fade-in">
            <div className="space-y-8">
              {/* Interactive Scenario or Mindmap */}
              {module.interactiveScenario && (
                <div className="space-y-4">
                  <h3 className="text-lg font-medium border-l-4 border-primary pl-3 py-1">
                    {module.interactiveScenario.type === 'mindmap' ? 'Interactive Mind Map' : 'Interactive Scenario'}
                  </h3>
                  
                  {module.interactiveScenario.type === 'mindmap' ? (
                    <MindmapSection 
                      type={module.interactiveScenario.mindmapType || 'dsp-role'}
                      title={module.interactiveScenario.title}
                      description={module.interactiveScenario.description}
                    />
                  ) : module.interactiveScenario.content ? (
                    <InteractiveScenario 
                      branchingScenario={module.interactiveScenario}
                    />
                  ) : (
                    <InteractiveScenario 
                      scenario={{
                        title: module.interactiveScenario.title,
                        description: module.interactiveScenario.description,
                        type: module.interactiveScenario.type as 'multiple-choice' | 'dialogue',
                        options: module.interactiveScenario.options || []
                      }}
                    />
                  )}
                </div>
              )}
              
              {/* Flashcards Section */}
              {module.flashcards && module.flashcards.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-medium border-l-4 border-primary pl-3 py-1">
                    Flashcards
                  </h3>
                  <FlashcardSection 
                    flashcards={module.flashcards} 
                    title="Course Flashcards"
                  />
                </div>
              )}
              
              {/* FAQs Section */}
              {module.faqs && module.faqs.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-medium border-l-4 border-primary pl-3 py-1">
                    Frequently Asked Questions
                  </h3>
                  <FAQSection faqs={module.faqs} />
                </div>
              )}
              
              {/* Only show this message if there's no interactive content */}
              {!module.interactiveScenario && 
               (!module.flashcards || module.flashcards.length === 0) && 
               (!module.faqs || module.faqs.length === 0) && (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No interactive content available for this module.</p>
                </div>
              )}
            </div>
          </TabsContent>
        )}

        <TabsContent value="quiz" className="pt-4 animate-fade-in">
          {!isQuizUnlocked ? (
            <div className="py-16 text-center">
              <div className="inline-flex items-center justify-center p-4 bg-muted rounded-full mb-4">
                <Lock className="h-10 w-10 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium mb-2">Quiz Locked</h3>
              <p className="text-muted-foreground max-w-md mx-auto mb-6">
                You need to complete the video and audio lessons before you can take the quiz.
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setVideoCompleted(true);
                  setAudioCompleted(true);
                  toast({
                    title: "Quiz Unlocked",
                    description: "You can now access the quiz."
                  });
                }}
                className="mt-2"
              >
                <CheckCircle className="mr-2 h-4 w-4" />
                Override: Unlock Quiz
              </Button>
            </div>
          ) : (
            <div className="space-y-8">
              <h3 className="text-lg font-medium border-l-4 border-primary pl-3 py-1">
                Module Quiz
              </h3>
              {module.questions && module.questions.length > 0 ? (
                <QuizSection questions={module.questions} onComplete={onQuizComplete} />
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No quiz available for this module.</p>
                </div>
              )}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
