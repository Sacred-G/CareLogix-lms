
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
import AIContentGenerator from './AIContentGenerator';
import CourseFormFields from './CourseFormFields';

type CourseFormValues = {
  title: string;
  description: string;
  thumbnail: string;
};

export default function CreateCourse() {
  const [useAI, setUseAI] = useState(false);
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
    form.setValue('description', content);
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
            <CourseFormFields control={form.control} />

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
