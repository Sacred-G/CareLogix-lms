
import React, { useState } from 'react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from '@/components/ui/button';
import { Loader2, Brain } from 'lucide-react';

interface AIContentGeneratorProps {
  courseTitle: string;
  onContentGenerated: (content: string) => void;
}

export default function AIContentGenerator({ courseTitle, onContentGenerated }: AIContentGeneratorProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [contentType, setContentType] = useState<'description' | 'module' | 'quiz' | 'objectives' | 'assessment' | 'scenario' | 'transcript' | 'lesson_plan'>('description');

  const handleGenerateWithAI = async () => {
    if (!courseTitle || courseTitle.length < 3) {
      toast.error('Please enter a valid course title for AI generation');
      return;
    }

    setIsGenerating(true);
    try {
      // Make a request to our Supabase Edge Function
      const { data, error } = await supabase.functions.invoke('generate-course-content', {
        body: {
          title: courseTitle,
          moduleType: contentType
        }
      });

      if (error) {
        throw new Error(`Error calling OpenAI: ${error.message}`);
      }

      if (data?.content) {
        onContentGenerated(data.content);
        toast.success(`${getContentTypeLabel(contentType)} generated successfully with OpenAI`);
      } else {
        throw new Error('No content was generated');
      }
    } catch (error: any) {
      console.error('Error generating content:', error);
      toast.error(`Failed to generate content: ${error.message}`);
    } finally {
      setIsGenerating(false);
    }
  };

  const getContentTypeLabel = (type: string): string => {
    switch (type) {
      case 'description': return 'Course description';
      case 'module': return 'Module outline';
      case 'quiz': return 'Quiz questions';
      case 'objectives': return 'Learning objectives';
      case 'assessment': return 'Assessment criteria';
      case 'scenario': return 'Interactive scenario';
      case 'transcript': return 'Audio transcript';
      case 'lesson_plan': return 'Lesson plan';
      default: return 'Content';
    }
  };

  return (
    <div className="bg-muted/50 p-4 rounded-lg border border-muted">
      <div className="flex items-start mb-4">
        <div className="flex-shrink-0 mt-1">
          <Brain className="w-5 h-5 text-blue-500" />
        </div>
        <div className="ml-3 flex-grow">
          <h3 className="font-medium mb-2">AI Content Generation</h3>
          <p className="text-sm text-muted-foreground mb-3">
            Select the type of content you want to generate using OpenAI
          </p>
          
          <RadioGroup 
            defaultValue="description" 
            value={contentType}
            onValueChange={(value) => setContentType(value as any)}
            className="flex flex-col space-y-1 mb-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="description" id="description" />
              <label htmlFor="description" className="text-sm font-medium">Course Description</label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="module" id="module" />
              <label htmlFor="module" className="text-sm font-medium">Module Outline</label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="objectives" id="objectives" />
              <label htmlFor="objectives" className="text-sm font-medium">Learning Objectives</label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="quiz" id="quiz" />
              <label htmlFor="quiz" className="text-sm font-medium">Quiz Questions</label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="assessment" id="assessment" />
              <label htmlFor="assessment" className="text-sm font-medium">Assessment Criteria</label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="scenario" id="scenario" />
              <label htmlFor="scenario" className="text-sm font-medium">Interactive Scenario</label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="transcript" id="transcript" />
              <label htmlFor="transcript" className="text-sm font-medium">Audio Transcript</label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="lesson_plan" id="lesson_plan" />
              <label htmlFor="lesson_plan" className="text-sm font-medium">Detailed Lesson Plan</label>
            </div>
          </RadioGroup>
          
          <Button
            variant="outline"
            size="sm"
            onClick={handleGenerateWithAI}
            disabled={isGenerating}
            className="w-full"
          >
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              `Generate ${getContentTypeLabel(contentType)}`
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
