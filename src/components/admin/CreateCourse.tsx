
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

type CourseFormValues = {
  title: string;
  description: string;
  thumbnail: string;
};

export default function CreateCourse() {
  const [useAI, setUseAI] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
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
          moduleType: 'description'
        }
      });

      if (error) {
        throw new Error(`Error calling OpenAI: ${error.message}`);
      }

      if (data?.content) {
        form.setValue('description', data.content);
        toast.success('Content generated successfully with OpenAI');
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
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center">
                    <Brain className="w-5 h-5 mr-2 text-blue-500" />
                    <span className="font-medium">AI Content Generation</span>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleGenerateWithAI}
                    disabled={isGenerating}
                  >
                    {isGenerating ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      'Generate Description'
                    )}
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground">
                  Enter a course title above, then click "Generate Description" to create course content using OpenAI
                </p>
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
