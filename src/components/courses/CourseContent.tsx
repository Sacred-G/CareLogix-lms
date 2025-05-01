
import React, { useState } from 'react';
import { Module } from '@/data/courseData';
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

export default function CourseContent({ module, onQuizComplete, onContentComplete }: CourseContentProps) {
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
  const scenario = {
    title: "Client Privacy Scenario",
    description: "A family member calls and asks for detailed information about their adult relative's medical appointments and daily activities. What should you do?",
    type: "multiple-choice" as const,
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
      <h2 className="text-2xl font-bold">{module.title}</h2>
      <p className="text-muted-foreground">{module.description}</p>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="content">Lesson Content</TabsTrigger>
          <TabsTrigger value="interactive">Interactive</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
        </TabsList>
        
        <TabsContent value="content" className="space-y-8 pt-4">
          {module.videoUrl && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium flex items-center gap-2">
                Video Lesson
                {videoCompleted && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Completed
                  </span>
                )}
              </h3>
              <VideoPlayer 
                url={module.videoUrl} 
                title={module.title}
                onVideoEnded={handleVideoEnd}
              />
            </div>
          )}
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-medium">Reading Material</h3>
                {!textCompleted && (
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={handleTextComplete}
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
              <ReactMarkdown className="prose max-w-none">
                {module.content}
              </ReactMarkdown>
            </CardContent>
          </Card>
          
          {module.audioUrl && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium flex items-center gap-2">
                Audio Lesson
                {audioCompleted && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
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
            <QuizSection 
              questions={module.questions}
              onComplete={onQuizComplete}
            />
          )}
        </TabsContent>
        
        <TabsContent value="interactive" className="space-y-8 pt-4">
          <FlashcardSection 
            title="Key Terms" 
            flashcards={flashcards} 
          />
          
          <InteractiveScenario 
            scenario={scenario}
          />
        </TabsContent>
        
        <TabsContent value="resources" className="space-y-8 pt-4">
          <FAQSection 
            faqs={faqs} 
          />
          
          <Card>
            <CardHeader>
              <h3 className="text-lg font-medium">Additional Resources</h3>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 border rounded-lg flex items-center justify-between">
                <div>
                  <div className="font-medium">Client Rights Guide</div>
                  <div className="text-sm text-muted-foreground">PDF handbook with detailed rights information</div>
                </div>
                <Button variant="outline" size="sm">Download</Button>
              </div>
              
              <div className="p-4 border rounded-lg flex items-center justify-between">
                <div>
                  <div className="font-medium">Decision-Making Support Tools</div>
                  <div className="text-sm text-muted-foreground">Visual aids for helping clients make choices</div>
                </div>
                <Button variant="outline" size="sm">Download</Button>
              </div>
              
              <div className="p-4 border rounded-lg flex items-center justify-between">
                <div>
                  <div className="font-medium">Advocacy Organizations</div>
                  <div className="text-sm text-muted-foreground">List of local and national advocacy resources</div>
                </div>
                <Button variant="outline" size="sm">View</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {module.interactiveScenario && (
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Interactive Scenario: {module.interactiveScenario.title}</h3>
          <Card>
            <CardContent className="pt-6">
              <p>{module.interactiveScenario.description}</p>
              {/* Interactive scenario component would be implemented here based on type */}
              <div className="p-8 text-center text-muted-foreground">
                <p>Interactive scenario placeholder</p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
