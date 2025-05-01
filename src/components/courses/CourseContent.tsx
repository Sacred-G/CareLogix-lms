
import React, { useState } from 'react';
import { Module } from '@/data/courseData';
import VideoPlayer from './VideoPlayer';
import AudioPlayer from './AudioPlayer';
import QuizSection from './QuizSection';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import ReactMarkdown from 'react-markdown';

interface CourseContentProps {
  module: Module;
  onQuizComplete?: (score: number) => void;
  onContentComplete?: (type: 'video' | 'text' | 'audio') => void;
}

export default function CourseContent({ module, onQuizComplete, onContentComplete }: CourseContentProps) {
  const [videoCompleted, setVideoCompleted] = useState(false);
  const [textCompleted, setTextCompleted] = useState(false);
  const [audioCompleted, setAudioCompleted] = useState(false);

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
