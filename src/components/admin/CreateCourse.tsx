
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Switch } from '@/components/ui/switch';
import { Loader2 } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AIContentGenerator from './AIContentGenerator';
import CourseFormFields from './CourseFormFields';

type CourseFormValues = {
  title: string;
  description: string;
  thumbnail: string;
};

export default function CreateCourse() {
  const [useAI, setUseAI] = useState(false);
  const [activeTab, setActiveTab] = useState<string>('basic');
  const queryClient = useQueryClient();
  
  const form = useForm<CourseFormValues>({
    defaultValues: {
      title: '',
      description: '',
      thumbnail: 'https://placehold.co/600x400/png',
    },
  });

  const createCourseMutation = useMutation({
    mutationFn: async (values: CourseFormValues) => {
      const { data, error } = await supabase
        .from('courses')
        .insert({
          title: values.title,
          description: values.description,
          thumbnail: values.thumbnail,
          created_by: (await supabase.auth.getUser()).data.user?.id
        })
        .select();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      toast.success('Course created successfully');
      form.reset();
      queryClient.invalidateQueries({ queryKey: ['admin-course-stats'] });
    },
    onError: (error) => {
      console.error('Error creating course:', error);
      toast.error('Failed to create course');
    },
  });

  const handleContentGenerated = (content: string) => {
    // Try to detect if content is JSON
    try {
      // Check if content starts and ends with curly braces or square brackets
      if ((content.trim().startsWith('{') && content.trim().endsWith('}')) || 
          (content.trim().startsWith('[') && content.trim().endsWith(']'))) {
        // Try to parse as JSON in case it's structured content
        const parsedContent = JSON.parse(content);
        // Handle different content types
        if (Array.isArray(parsedContent) && parsedContent[0]?.question) {
          // It's quiz questions
          const formattedQuizContent = parsedContent.map((q, i) => 
            `Question ${i+1}: ${q.question}\n` +
            `Options: ${q.options.join(', ')}\n` +
            `Correct Answer: ${q.correctAnswer}\n`
          ).join('\n\n');
          form.setValue('description', formattedQuizContent);
        } else if (parsedContent.title && parsedContent.description && parsedContent.options) {
          // It's a scenario
          const formattedScenario = 
            `# ${parsedContent.title}\n\n` +
            `## Scenario Description\n${parsedContent.description}\n\n` +
            `## Response Options\n` +
            parsedContent.options.map((o, i) => 
              `${i+1}. ${o.text}\n   ${o.isCorrect ? '✓ BEST PRACTICE: ' : ''}${o.feedback}`
            ).join('\n\n');
          form.setValue('description', formattedScenario);
        } else {
          // Default handling for other JSON structures
          form.setValue('description', JSON.stringify(parsedContent, null, 2));
        }
      } else {
        // Plain text content
        form.setValue('description', content);
      }
    } catch (e) {
      // If JSON parsing fails, just use the content as-is
      form.setValue('description', content);
    }
    
    // Switch to basic tab to show content
    setActiveTab('basic');
  };

  const onSubmit = (values: CourseFormValues) => {
    createCourseMutation.mutate(values);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create New Course</CardTitle>
        <CardDescription>Add a new course to your learning platform</CardDescription>
      </CardHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-6">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-2 mb-6">
                <TabsTrigger value="basic">Basic Info</TabsTrigger>
                <TabsTrigger value="ai">AI Content</TabsTrigger>
              </TabsList>
              
              <TabsContent value="basic">
                <CourseFormFields control={form.control} />
              </TabsContent>
              
              <TabsContent value="ai">
                <div className="space-y-4">
                  <div className="flex items-center justify-between space-x-2">
                    <div className="font-medium">Use AI to generate content</div>
                    <Switch
                      checked={useAI}
                      onCheckedChange={setUseAI}
                      id="ai-mode"
                    />
                  </div>

                  {useAI && (
                    <AIContentGenerator 
                      courseTitle={form.watch('title')} 
                      onContentGenerated={handleContentGenerated} 
                    />
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter>
            <Button 
              type="submit" 
              className="w-full"
              disabled={createCourseMutation.isPending}
            >
              {createCourseMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating Course...
                </>
              ) : (
                'Create Course'
              )}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
