
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2, Plus, Brain } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

type CourseFormValues = {
  title: string;
  description: string;
  thumbnail: string;
};

export default function CreateCourse() {
  const [useAI, setUseAI] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiContentType, setAiContentType] = useState<'description' | 'module' | 'quiz'>('description');
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

  const handleGenerateWithAI = async () => {
    const title = form.getValues('title');
    if (!title || title.length < 3) {
      toast.error('Please enter a valid course title for AI generation');
      return;
    }

    setIsGenerating(true);
    try {
      // Make a request to our Supabase Edge Function
      const { data, error } = await supabase.functions.invoke('generate-course-content', {
        body: {
          title,
          moduleType: aiContentType
        }
      });

      if (error) {
        throw new Error(`Error calling OpenAI: ${error.message}`);
      }

      if (data?.content) {
        if (aiContentType === 'description') {
          form.setValue('description', data.content);
          toast.success('Course description generated successfully with OpenAI');
        } else if (aiContentType === 'module') {
          // For now just show module content in description field
          form.setValue('description', data.content);
          toast.success('Module outline generated successfully with OpenAI');
        } else if (aiContentType === 'quiz') {
          // For now just show quiz content in description field
          form.setValue('description', data.content);
          toast.success('Quiz questions generated successfully with OpenAI');
        }
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
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Course Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter course title" {...field} />
                  </FormControl>
                  <FormDescription>
                    Be specific and clear about what the course teaches
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex items-center justify-between space-x-2">
              <div className="font-medium">Use AI to generate content</div>
              <Switch
                checked={useAI}
                onCheckedChange={setUseAI}
                id="ai-mode"
              />
            </div>

            {useAI && (
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
                      value={aiContentType}
                      onValueChange={(value) => setAiContentType(value as any)}
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
                        <RadioGroupItem value="quiz" id="quiz" />
                        <label htmlFor="quiz" className="text-sm font-medium">Quiz Questions</label>
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
                        `Generate ${aiContentType === 'description' ? 'Description' : 
                                  aiContentType === 'module' ? 'Module Outline' : 
                                  'Quiz Questions'}`
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            )}

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Course Description</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Enter course description" 
                      className="min-h-32" 
                      {...field} 
                    />
                  </FormControl>
                  <FormDescription>
                    Describe what students will learn in this course
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="thumbnail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Thumbnail URL</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter image URL" {...field} />
                  </FormControl>
                  <FormDescription>
                    Provide a URL to an image that represents this course
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
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
