
import React from 'react';
import { Module } from '@/data/courseData';
import VideoPlayer from './VideoPlayer';
import AudioPlayer from './AudioPlayer';
import QuizSection from './QuizSection';
import { Card, CardContent } from '@/components/ui/card';
import ReactMarkdown from 'react-markdown';

interface CourseContentProps {
  module: Module;
  onQuizComplete?: (score: number) => void;
}

export default function CourseContent({ module, onQuizComplete }: CourseContentProps) {
  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold">{module.title}</h2>
      <p className="text-muted-foreground">{module.description}</p>
      
      {module.videoUrl && (
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Video Lesson</h3>
          <VideoPlayer url={module.videoUrl} title={module.title} />
        </div>
      )}
      
      <Card>
        <CardContent className="pt-6">
          <ReactMarkdown className="prose max-w-none">
            {module.content}
          </ReactMarkdown>
        </CardContent>
      </Card>
      
      {module.audioUrl && (
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Audio Lesson</h3>
          <AudioPlayer url={module.audioUrl} transcript={module.transcript} />
        </div>
      )}
      
      {module.questions && module.questions.length > 0 && (
        <QuizSection 
          questions={module.questions}
          onComplete={onQuizComplete}
        />
      )}
      
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
