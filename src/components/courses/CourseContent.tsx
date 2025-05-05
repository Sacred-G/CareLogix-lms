
import React, { useState } from 'react';
import { Module, ScenarioOption } from '@/data/courseTypes';
import VideoPlayer from './VideoPlayer';
import AudioPlayer from './AudioPlayer';
import QuizSection from './QuizSection';
import FlashcardSection from './FlashcardSection';
import FAQSection from './FAQSection';
import InteractiveScenario from './InteractiveScenario';
import ScormViewer from './ScormViewer';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import ReactMarkdown from 'react-markdown';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertTriangle, CheckCircle, Lock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useScormModules } from '@/hooks/useScormModules';

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
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="content" className="text-base py-3">Lesson Content</TabsTrigger>
          <TabsTrigger 
            value="quiz" 
            className="text-base py-3"
            disabled={!isQuizUnlocked}
            onClick={handleQuizTabClick}
          >
            {!isQuizUnlocked && <Lock className="h-3 w-3 mr-2" />}
            Quiz
          </TabsTrigger>
          <TabsTrigger value="interactive" className="text-base py-3">Interactive</TabsTrigger>
        </TabsList>
        
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
                title={module.title || 'Audio Lesson'}
                transcript={module.transcript}
                onAudioEnded={handleAudioEnd}
              />
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="quiz" className="pt-4 animate-fade-in">
          {!isQuizUnlocked ? (
            <Card className="border-destructive">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center justify-center text-center p-6">
                  <AlertTriangle className="h-12 w-12 text-destructive mb-4" />
                  <h3 className="text-xl font-medium mb-2">Quiz Locked</h3>
                  <p className="text-muted-foreground mb-4">
                    You need to complete both the video and audio content before taking the quiz.
                  </p>
                  <Button onClick={() => setActiveTab('content')}>Return to Content</Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <QuizSection 
              questions={module.questions}
              onQuizComplete={onQuizComplete}
            />
          )}
        </TabsContent>
        
        <TabsContent value="interactive" className="pt-4 animate-fade-in">
          <div className="space-y-8">
            {/* SCORM modules section */}
            {scormModules && scormModules.length > 0 && (
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
                          >
                            {scormModule.public_url ? "Launch Module" : "Module Processing..."}
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Interactive Scenario */}
            {module.interactiveScenario && (
              <div className="space-y-4">
                <h3 className="text-lg font-medium border-l-4 border-primary pl-3 py-1">
                  Interactive Scenario
                </h3>
                <InteractiveScenario 
                  scenario={{
                    title: module.interactiveScenario.title,
                    description: module.interactiveScenario.description,
                    type: module.interactiveScenario.type as 'multiple-choice' | 'dialogue',
                    options: module.interactiveScenario.options || []
                  }}
                />
              </div>
            )}
            
            {/* Flashcards Section */}
            {module.flashcards && module.flashcards.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-lg font-medium border-l-4 border-primary pl-3 py-1">
                  Flashcards
                </h3>
                <FlashcardSection flashcards={module.flashcards} />
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
            
            {!module.interactiveScenario && 
             (!module.flashcards || module.flashcards.length === 0) && 
             (!module.faqs || module.faqs.length === 0) && 
             (!scormModules || scormModules.length === 0) && (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No interactive content available for this module.</p>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
