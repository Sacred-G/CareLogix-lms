
import React, { useState } from 'react';
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

interface CourseContentProps {
  module: Module;
  onQuizComplete?: (score: number) => void;
  onContentComplete?: (type: 'video' | 'text' | 'audio') => void;
}

// Define a specific scenario type that matches what InteractiveScenario expects
interface Scenario {
  title: string;
  description: string;
  type: 'multiple-choice' | 'drag-drop' | 'dialogue';
  options: ScenarioOption[];
  content?: any;
}

export default function CourseContent({ module, onQuizComplete, onContentComplete }: CourseContentProps) {
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

  // Example flashcards for demonstration
  const flashcards = [
    { 
      id: "1", 
      term: "Client Rights", 
      definition: "Legal and ethical guarantees that ensure dignity, choice, and independence for individuals receiving support services."
    },
    { 
      id: "2", 
      term: "Self-Advocacy", 
      definition: "The ability to speak-up for oneself and make decisions about one's own life."
    },
    { 
      id: "3", 
      term: "Informed Consent", 
      definition: "Permission granted with full knowledge of the possible consequences, typically for medical treatment or release of personal information."
    },
    { 
      id: "4", 
      term: "Confidentiality", 
      definition: "The ethical principle and legal right that a professional will hold client information in confidence."
    },
    {
      id: "5",
      term: "Person-Centered Support",
      definition: "An approach that places the person at the center of the planning process and recognizes their right to make choices about their life."
    }
  ];

  // Example FAQs for demonstration
  const faqs = [
    {
      question: "What should I do if a client's rights are violated?",
      answer: "Document the incident thoroughly, report it immediately to your supervisor, and follow your organization's formal reporting procedures. In cases of abuse or neglect, you may also be required to report to external authorities as a mandated reporter."
    },
    {
      question: "How do I support a client who has difficulty communicating their preferences?",
      answer: "Utilize alternative communication methods (visual aids, communication boards), observe non-verbal cues, involve people who know them well, offer clear choices, and be patient while confirming understanding."
    },
    {
      question: "Can clients refuse care even if it seems necessary?",
      answer: "Yes, competent adults have the right to refuse care even when medically advised. DSPs should document the refusal, ensure the client understands the consequences, notify appropriate team members, and continue offering support in acceptable ways."
    },
    {
      question: "What information about clients can I share with their family members?",
      answer: "You may only share information with family members that the client has explicitly authorized you to share. Always verify what information can be disclosed and to whom by checking the client's consent forms and privacy preferences."
    }
  ];

  // Example interactive scenario
  const scenario: Scenario = {
    title: "Client Privacy Scenario",
    description: "A family member calls and asks for detailed information about their adult relative's medical appointments and daily activities. What should you do?",
    type: "multiple-choice",
    options: [
      {
        id: "1",
        text: "Share all the information since they are family",
        isCorrect: false,
        feedback: "Family relationship doesn't automatically grant access to confidential information. You must respect the client's privacy and follow proper consent protocols."
      },
      {
        id: "2",
        text: "Tell them you can't share any information and hang up",
        isCorrect: false,
        feedback: "While protecting privacy is important, abruptly ending the conversation isn't professional. It's better to explain the confidentiality policy respectfully."
      },
      {
        id: "3",
        text: "Explain confidentiality policies and check if the client has authorized information sharing with this person",
        isCorrect: true,
        feedback: "Correct! You should explain privacy policies politely and verify if the client has given consent to share information with this specific family member."
      },
      {
        id: "4",
        text: "Share only general information but no specific details",
        isCorrect: false,
        feedback: "Even sharing general information without consent may violate privacy regulations. Always check for authorization before sharing any information."
      }
    ]
  };

  const handleVideoEnd = () => {
    setVideoCompleted(true);
    if (onContentComplete) {
      onContentComplete('video');
    }
  };

  const handleTextComplete = () => {
    setTextCompleted(true);
    if (onContentComplete) {
      onContentComplete('text');
    }
  };

  const handleAudioEnd = () => {
    setAudioCompleted(true);
    if (onContentComplete) {
      onContentComplete('audio');
    }
  };

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-gradient-primary">{module.title || 'Module'}</h2>
      <p className="text-muted-foreground text-lg">{module.description || 'No description available'}</p>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="content" className="text-base py-3">Lesson Content</TabsTrigger>
          <TabsTrigger value="interactive" className="text-base py-3">Interactive</TabsTrigger>
          <TabsTrigger value="resources" className="text-base py-3">Resources</TabsTrigger>
        </TabsList>
        
        <TabsContent value="content" className="space-y-8 pt-4 animate-fade-in">
          {module.videoUrl && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium flex items-center gap-2 border-l-4 border-primary pl-3 py-1">
                Video Lesson
                {videoCompleted && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 ml-auto">
                    Completed
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
                    Completed
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
                    Completed
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
          
          {module.questions && module.questions.length > 0 && (
            <div className="pt-6">
              <QuizSection 
                questions={module.questions}
                onComplete={onQuizComplete}
              />
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="interactive" className="space-y-8 pt-4 animate-fade-in">
          <FlashcardSection 
            title="Key Terms" 
            flashcards={module.flashcards || flashcards} 
          />
          
          <InteractiveScenario 
            scenario={module.interactiveScenario ? 
              {
                title: module.interactiveScenario.title,
                description: module.interactiveScenario.description,
                type: module.interactiveScenario.type,
                options: module.interactiveScenario.options || [],
                content: module.interactiveScenario.content
              } : scenario
            }
          />
        </TabsContent>
        
        <TabsContent value="resources" className="space-y-8 pt-4 animate-fade-in">
          <FAQSection 
            faqs={module.faqs || faqs} 
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
      </Tabs>
    </div>
  );
}
