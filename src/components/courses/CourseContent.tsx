
import React, { useState, useEffect } from 'react';
import { Module, ScenarioOption } from '@/data/courseTypes';
import VideoPlayer from './VideoPlayer';
import AudioPlayer from './AudioPlayer';
import QuizSection from './QuizSection';
import FlashcardSection from './FlashcardSection';
import FAQSection from './FAQSection';
import InteractiveScenario from './InteractiveScenario';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import ReactMarkdown from 'react-markdown';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertTriangle, CheckCircle, Lock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface CourseContentProps {
  module: Module;
  onQuizComplete?: (score: number) => void;
  onContentComplete?: (type: 'video' | 'text' | 'audio') => void;
}

// Define a local scenario type that matches what InteractiveScenario expects
interface LocalScenario {
  title: string;
  description: string;
  type: 'multiple-choice' | 'dialogue';
  options: ScenarioOption[];
  content?: any;
}

export default function CourseContent({ module, onQuizComplete, onContentComplete }: CourseContentProps) {
  const { toast } = useToast();
  
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

  // Track completion status for different content types
  const [videoCompleted, setVideoCompleted] = useState(false);
  const [textCompleted, setTextCompleted] = useState(false);
  const [audioCompleted, setAudioCompleted] = useState(false);
  const [activeTab, setActiveTab] = useState('content');
  
  // Track attempted quiz access
  const [attemptedQuizAccess, setAttemptedQuizAccess] = useState(false);

  // Calculate if quiz is unlocked
  const isVideoRequired = !!module.videoUrl;
  const isAudioRequired = !!module.audioUrl;
  
  const isQuizUnlocked = 
    (!isVideoRequired || videoCompleted) && 
    (!isAudioRequired || audioCompleted) &&
    textCompleted;

  // Load completion status from localStorage on component mount
  useEffect(() => {
    if (!module.id) return;
    
    const storagePrefix = `course_content_${module.id}_`;
    const storedVideoStatus = localStorage.getItem(`${storagePrefix}video`);
    const storedTextStatus = localStorage.getItem(`${storagePrefix}text`);
    const storedAudioStatus = localStorage.getItem(`${storagePrefix}audio`);
    
    if (storedVideoStatus === 'completed') setVideoCompleted(true);
    if (storedTextStatus === 'completed') setTextCompleted(true);
    if (storedAudioStatus === 'completed') setAudioCompleted(true);
  }, [module.id]);

  // Save completion status to localStorage when it changes
  useEffect(() => {
    if (!module.id) return;
    
    const storagePrefix = `course_content_${module.id}_`;
    
    if (videoCompleted) {
      localStorage.setItem(`${storagePrefix}video`, 'completed');
    }
    
    if (textCompleted) {
      localStorage.setItem(`${storagePrefix}text`, 'completed');
    }
    
    if (audioCompleted) {
      localStorage.setItem(`${storagePrefix}audio`, 'completed');
    }
  }, [module.id, videoCompleted, textCompleted, audioCompleted]);

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

  const handleTabChange = (value: string) => {
    // If trying to access quiz tab but content not completed
    if (value === 'quiz' && !isQuizUnlocked) {
      setAttemptedQuizAccess(true);
      toast({
        title: "Quiz Locked",
        description: `Complete ${!videoCompleted && isVideoRequired ? 'video, ' : ''}${!audioCompleted && isAudioRequired ? 'audio, ' : ''}${!textCompleted ? 'reading ' : ''}first.`,
        variant: "destructive"
      });
      return;
    }
    
    setActiveTab(value);
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
          <span className="text-sm flex items-center">
            Quiz: {isQuizUnlocked ? 'Unlocked' : (
              <span className="flex items-center">
                <Lock size={14} className="mr-1" /> Locked
              </span>
            )}
          </span>
        </div>
      </div>
      
      <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-6">
          <TabsTrigger value="content" className="text-base py-3">Lesson</TabsTrigger>
          <TabsTrigger value="interactive" className="text-base py-3">Interactive</TabsTrigger>
          <TabsTrigger value="resources" className="text-base py-3">Resources</TabsTrigger>
          <TabsTrigger 
            value="quiz" 
            className={`text-base py-3 ${!isQuizUnlocked ? 'relative' : ''}`}
            disabled={!isQuizUnlocked}
          >
            Quiz
            {!isQuizUnlocked && (
              <Lock size={14} className="ml-1 inline-block" />
            )}
          </TabsTrigger>
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
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={handleTextComplete}
                    className="bg-primary/10 hover:bg-primary/20"
                  >
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
            <CardContent className="pt-6 px-6">
              <article className="prose max-w-none dark:prose-invert prose-headings:text-primary prose-a:text-secondary hover:prose-a:text-secondary/80 prose-img:rounded-lg prose-img:shadow-md prose-strong:text-foreground/90">
                <ReactMarkdown>{module.content || '# No Content Available\n\nThis module does not have any reading content available.'}</ReactMarkdown>
              </article>
            </CardContent>
          </Card>
          
          {module.audioUrl && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium flex items-center gap-2 border-l-4 border-secondary pl-3 py-1">
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
        
        <TabsContent value="interactive" className="space-y-8 pt-4 animate-fade-in">
          <FlashcardSection 
            title="Key Terms" 
            flashcards={module.flashcards || []} 
          />
          
          {module.interactiveScenario && (
            <InteractiveScenario 
              scenario={{
                title: module.interactiveScenario.title,
                description: module.interactiveScenario.description,
                type: module.interactiveScenario.type as 'multiple-choice' | 'dialogue',
                options: module.interactiveScenario.options || [],
                content: module.interactiveScenario.content
              }}
            />
          )}
        </TabsContent>
        
        <TabsContent value="resources" className="space-y-8 pt-4 animate-fade-in">
          <FAQSection 
            faqs={module.faqs || []} 
          />
          
          <Card className="bg-card/50 backdrop-blur border-none shadow-md">
            <CardHeader>
              <h3 className="text-lg font-medium">Additional Resources</h3>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 border border-border/50 rounded-lg bg-muted/30 flex items-center justify-between hover:bg-muted/50 transition-colors">
                <div>
                  <div className="font-medium">Client Rights Guide</div>
                  <div className="text-sm text-muted-foreground">PDF handbook with detailed rights information</div>
                </div>
                <Button variant="outline" size="sm" className="bg-primary/10 hover:bg-primary/20">Download</Button>
              </div>
              
              <div className="p-4 border border-border/50 rounded-lg bg-muted/30 flex items-center justify-between hover:bg-muted/50 transition-colors">
                <div>
                  <div className="font-medium">Decision-Making Support Tools</div>
                  <div className="text-sm text-muted-foreground">Visual aids for helping clients make choices</div>
                </div>
                <Button variant="outline" size="sm" className="bg-primary/10 hover:bg-primary/20">Download</Button>
              </div>
              
              <div className="p-4 border border-border/50 rounded-lg bg-muted/30 flex items-center justify-between hover:bg-muted/50 transition-colors">
                <div>
                  <div className="font-medium">Advocacy Organizations</div>
                  <div className="text-sm text-muted-foreground">List of local and national advocacy resources</div>
                </div>
                <Button variant="outline" size="sm" className="bg-primary/10 hover:bg-primary/20">View</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="quiz" className="space-y-8 pt-4 animate-fade-in">
          {isQuizUnlocked ? (
            module.questions && module.questions.length > 0 ? (
              <QuizSection 
                questions={module.questions}
                onComplete={onQuizComplete}
                isMicroLearning={true}
              />
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No quiz available for this module.</p>
              </div>
            )
          ) : (
            <div className="text-center py-12 space-y-4">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto">
                <Lock size={32} className="text-muted-foreground" />
              </div>
              <h3 className="text-xl font-medium">Quiz Locked</h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                You need to complete the following before accessing the quiz:
                <ul className="mt-4 space-y-2 list-disc text-left pl-8">
                  {isVideoRequired && !videoCompleted && <li>Watch the video lesson</li>}
                  {isAudioRequired && !audioCompleted && <li>Listen to the audio lesson</li>}
                  {!textCompleted && <li>Complete the reading material</li>}
                </ul>
              </p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
