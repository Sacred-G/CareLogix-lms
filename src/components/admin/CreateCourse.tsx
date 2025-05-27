import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
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
import MediaUploader from './MediaUploader';
import { useAuth } from '@/hooks/useAuth';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';

type CourseFormValues = {
  title: string;
  description: string;
  thumbnail: string;
  videoUrl?: string;
  audioUrl?: string;
  transcript?: string;
};

export default function CreateCourse() {
  const [useAI, setUseAI] = useState(false);
  const [activeTab, setActiveTab] = useState<string>('basic');
  const queryClient = useQueryClient();
  const { user } = useAuth();
  
  const form = useForm<CourseFormValues>({
    defaultValues: {
      title: '',
      description: '',
      thumbnail: 'https://placehold.co/600x400/png',
      videoUrl: '',
      audioUrl: '',
      transcript: '',
    },
  });

  const { data: userProfile, isLoading: isLoadingProfile } = useQuery({
    queryKey: ['user-profile', user?.id],
    queryFn: async () => {
      if (!user) return null;
      
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
      
      if (error) {
        console.error('Error fetching user profile:', error);
        throw error;
      }
      
      return data;
    },
    enabled: !!user
  });

  const createCourseMutation = useMutation({
    mutationFn: async (values: CourseFormValues) => {
      if (!userProfile) {
        throw new Error('User profile not found');
      }

      const { data, error } = await supabase
        .from('courses')
        .insert({
          title: values.title,
          description: values.description,
          thumbnail: values.thumbnail,
          created_by: user?.id,
          domain: userProfile.email_domain,
          transcript: values.transcript || null
        })
        .select();

      if (error) throw error;
      
      // If we have course media URLs, create media entries
      if (data && data[0] && (values.videoUrl || values.audioUrl)) {
        const courseId = data[0].id;
        
        // Create a default section for the course
        const { data: sectionData, error: sectionError } = await supabase
          .from('sections')
          .insert({
            course_id: courseId,
            title: 'Introduction',
            position: 0
          })
          .select();
          
        if (sectionError) {
          console.error('Error creating section:', sectionError);
          throw sectionError;
        }
        
        if (sectionData && sectionData[0]) {
          const sectionId = sectionData[0].id;
          
          // Create lesson for the section
          const { data: lessonData, error: lessonError } = await supabase
            .from('lessons')
            .insert({
              section_id: sectionId,
              title: 'Welcome to the course',
              content: values.description,
              position: 0
            })
            .select();
            
          if (lessonError) {
            console.error('Error creating lesson:', lessonError);
            throw lessonError;
          }
          
          // Add media entries
          if (lessonData && lessonData[0]) {
            const lessonId = lessonData[0].id;
            const mediaEntries = [];
            
            if (values.videoUrl) {
              mediaEntries.push({
                lesson_id: lessonId,
                title: 'Course Introduction Video',
                type: 'video',
                url: values.videoUrl,
                transcript: values.transcript
              });
            }
            
            if (values.audioUrl) {
              mediaEntries.push({
                lesson_id: lessonId,
                title: 'Audio Introduction',
                type: 'audio',
                url: values.audioUrl,
                transcript: values.transcript
              });
            }
            
            if (mediaEntries.length > 0) {
              const { error: mediaError } = await supabase
                .from('media')
                .insert(mediaEntries);
                
              if (mediaError) {
                console.error('Error creating media entries:', mediaError);
                throw mediaError;
              }
            }
          }
        }
      }
      
      return data;
    },
    onSuccess: () => {
      toast.success('Course created successfully');
      form.reset();
      queryClient.invalidateQueries({ queryKey: ['admin-course-stats'] });
      queryClient.invalidateQueries({ queryKey: ['admin-courses'] });
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

  const handleTranscriptGenerated = (transcript: string) => {
    // Update form with the transcript
    form.setValue('transcript', transcript);
    
    // If AI is enabled, let's also use this transcript to generate course content
    if (useAI) {
      toast.info('Using transcript to generate course content...');
      
      // Call the Supabase Edge Function to generate content from transcript
      supabase.functions.invoke('generate-course-content', {
        body: {
          title: form.getValues('title') || 'New Course',
          moduleType: 'description',
          transcript: transcript
        }
      }).then(({ data, error }) => {
        if (error) {
          toast.error(`Failed to generate content from transcript: ${error.message}`);
          return;
        }
        
        if (data?.content) {
          handleContentGenerated(data.content);
          toast.success('Generated course content from transcript');
        }
      });
    }
  };

  const onSubmit = (values: CourseFormValues) => {
    if (!userProfile) {
      toast.error('User profile not loaded. Please refresh and try again.');
      return;
    }
    createCourseMutation.mutate(values);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create New Course</CardTitle>
        <div className="flex items-center">
          <CardDescription>
            Add a new course to your learning platform
          </CardDescription>
          {userProfile?.email_domain && (
            <Badge variant="outline" className="ml-2">
              Domain: {userProfile.email_domain}
            </Badge>
          )}
        </div>
      </CardHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-6">
            {isLoadingProfile ? (
              <div className="space-y-2">
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-8 w-full" />
              </div>
            ) : userProfile ? (
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid grid-cols-3 mb-6">
                  <TabsTrigger value="basic">Basic Info</TabsTrigger>
                  <TabsTrigger value="media">Media</TabsTrigger>
                  <TabsTrigger value="ai">AI Content</TabsTrigger>
                </TabsList>
                
                <TabsContent value="basic">
                  <CourseFormFields control={form.control} />
                </TabsContent>
                
                <TabsContent value="media">
                  <div className="space-y-6">
                    <MediaUploader 
                      fileType="video" 
                      onUploadComplete={(url) => form.setValue('videoUrl', url)} 
                      currentUrl={form.watch('videoUrl')}
                      onTranscriptGenerated={handleTranscriptGenerated}
                    />
                    
                    <MediaUploader 
                      fileType="audio" 
                      onUploadComplete={(url) => form.setValue('audioUrl', url)}
                      currentUrl={form.watch('audioUrl')}
                      onTranscriptGenerated={handleTranscriptGenerated}
                    />
                  </div>
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
                        transcript={form.watch('transcript')}
                      />
                    )}

                    {form.watch('transcript') && (
                      <div className="mt-4 p-4 bg-muted rounded-lg">
                        <h4 className="font-medium mb-2">Extracted Transcript</h4>
                        <div className="max-h-60 overflow-y-auto text-sm">
                          <p className="whitespace-pre-wrap">{form.watch('transcript')}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </TabsContent>
              </Tabs>
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground">
                  Unable to load profile. Make sure you have logged in with an email address.
                </p>
              </div>
            )}
          </CardContent>
          <CardFooter>
            <Button 
              type="submit" 
              className="w-full"
              disabled={createCourseMutation.isPending || isLoadingProfile || !userProfile}
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
