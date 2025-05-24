import React from 'react';
import Header from '@/components/navigation/Header';
import Footer from '@/components/navigation/Footer';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Video, 
  AudioLines, 
  MousePointerClick, 
  Laptop, 
  Lightbulb, 
  HelpCircle, 
  Bookmark,
  GraduationCap
} from 'lucide-react';

const HelpCenter = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 container py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-2 font-heading text-gradient-primary">Help Center</h1>
          <p className="text-muted-foreground mb-8">
            Learn how to get the most out of your learning experience with CareLogix LMS.
          </p>

          <Card className="mb-8">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-4">
                <GraduationCap className="h-6 w-6 text-primary" />
                <h2 className="text-xl font-semibold">Learning Content Types</h2>
              </div>
              <p className="mb-6">
                CareLogix LMS offers a variety of content types to support different learning styles. 
                Explore the information below to understand each type of content.
              </p>

              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="video-content">
                  <AccordionTrigger>
                    <div className="flex items-center gap-3">
                      <Video className="h-5 w-5 text-primary" />
                      <span>Video Content</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-4">
                    <div className="space-y-4">
                      <p>
                        Many of our courses include video content to provide visual demonstrations
                        and expert explanations of key concepts.
                      </p>
                      <h4 className="font-medium text-base">How to use video content:</h4>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>Click the play button to start the video</li>
                        <li>Use the progress bar to navigate to specific parts</li>
                        <li>Toggle closed captions using the CC button when available</li>
                        <li>Videos can be paused and resumed at any time</li>
                        <li>Your progress is automatically saved when you complete a video</li>
                      </ul>
                      <p className="text-sm text-muted-foreground">
                        Note: For the best experience, ensure your device has sufficient bandwidth 
                        for streaming video content.
                      </p>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="audio-content">
                  <AccordionTrigger>
                    <div className="flex items-center gap-3">
                      <AudioLines className="h-5 w-5 text-primary" />
                      <span>Audio Content</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-4">
                    <div className="space-y-4">
                      <p>
                        Audio content allows for flexible learning while on the go. Many modules 
                        include narrated explanations that can be listened to while reviewing written materials.
                      </p>
                      <h4 className="font-medium text-base">Benefits of audio content:</h4>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>Listen while reviewing other course materials</li>
                        <li>Learn at your own pace with the ability to pause and replay</li>
                        <li>Access transcripts for all audio content</li>
                        <li>Great for auditory learners who prefer spoken explanations</li>
                        <li>Ideal for reviewing concepts while commuting or multitasking</li>
                      </ul>
                      <p className="text-sm text-muted-foreground">
                        Tip: If you're in a noisy environment, use headphones for the best audio experience.
                      </p>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="interactive-content">
                  <AccordionTrigger>
                    <div className="flex items-center gap-3">
                      <MousePointerClick className="h-5 w-5 text-primary" />
                      <span>Interactive Content</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-4">
                    <div className="space-y-4">
                      <p>
                        Interactive content engages you directly in the learning process through
                        activities such as quizzes, drag-and-drop exercises, and knowledge checks.
                      </p>
                      <h4 className="font-medium text-base">Types of interactive content:</h4>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>Knowledge check quizzes to test your understanding</li>
                        <li>Scenario-based decision-making exercises</li>
                        <li>Interactive mind maps for exploring related concepts</li>
                        <li>Drag-and-drop activities to reinforce learning</li>
                        <li>Flashcards for key terminology and concepts</li>
                      </ul>
                      <p className="text-sm text-muted-foreground">
                        Interactive elements help reinforce learning and improve retention by 
                        engaging multiple senses in the learning process.
                      </p>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="scorm-modules">
                  <AccordionTrigger>
                    <div className="flex items-center gap-3">
                      <Laptop className="h-5 w-5 text-primary" />
                      <span>SCORM Modules</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-4">
                    <div className="space-y-4">
                      <p>
                        SCORM (Sharable Content Object Reference Model) modules are comprehensive 
                        interactive learning experiences that track your progress across sessions.
                      </p>
                      <h4 className="font-medium text-base">Features of SCORM modules:</h4>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>Engaging multimedia presentations with narration</li>
                        <li>Interactive activities that provide immediate feedback</li>
                        <li>Simulations of real-world scenarios</li>
                        <li>Progress tracking that saves your place between sessions</li>
                        <li>Comprehensive assessments to verify mastery of content</li>
                      </ul>
                      <p>
                        SCORM modules can be accessed either within specific courses or through 
                        the <a href="/extras" className="text-primary hover:underline">Extras</a> tab 
                        for standalone learning.
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Note: SCORM modules open in a new browser window or tab. Be sure to complete 
                        each activity before closing to ensure your progress is saved.
                      </p>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-4">
                <Lightbulb className="h-6 w-6 text-primary" />
                <h2 className="text-xl font-semibold">Tips for Successful Learning</h2>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-2 flex items-center gap-2">
                    <Bookmark className="h-4 w-4 text-primary" />
                    Use Course Bookmarking
                  </h3>
                  <p>
                    Our system automatically saves your progress. You can always return to where 
                    you left off by accessing your courses through the Dashboard.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2 flex items-center gap-2">
                    <HelpCircle className="h-4 w-4 text-primary" />
                    Get Support When Needed
                  </h3>
                  <p>
                    If you encounter any technical issues or have questions about course content, 
                    please contact your organization's administrator or email 
                    <a href="mailto:support@carelogix.com" className="text-primary hover:underline ml-1">
                      support@carelogix.com
                    </a>.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default HelpCenter;
