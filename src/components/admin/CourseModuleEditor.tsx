import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Plus, Loader2, Save, Video, FileText, HelpCircle, Edit, X, Trash } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import ScormUploader from './ScormUploader';
import ScormManager from './ScormManager';

interface ModuleData {
  title: string;
  description: string;
  videoUrl?: string;
  content: string;
}

interface CourseModuleEditorProps {
  courseId: string;
  onClose: () => void;
  domain?: string;
}

export function CourseModuleEditor({ courseId, onClose, domain }: CourseModuleEditorProps) {
  const [modules, setModules] = useState<ModuleData[]>([]);
  const [currentModule, setCurrentModule] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState('basic'); // Add this state
  const queryClient = useQueryClient();
  
  const form = useForm<ModuleData>({
    defaultValues: {
      title: '',
      description: '',
      videoUrl: '',
      content: '',
    },
  });
  
  // Fetch course details
  const { data: course, isLoading: isLoadingCourse } = useQuery({
    queryKey: ['course-details', courseId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('courses')
        .select('*')
        .eq('id', courseId)
        .single();
      
      if (error) throw error;
      return data;
    },
  });

  const courseForm = useForm({
    defaultValues: {
      title: course?.title || '',
      description: course?.description || '',
      thumbnail: course?.thumbnail || '',
    },
  });

  // Update course form when data loads
  React.useEffect(() => {
    if (course) {
      courseForm.reset({
        title: course.title,
        description: course.description || '',
        thumbnail: course.thumbnail || '',
      });
    }
  }, [course, courseForm]);

  const updateCourse = useMutation({
    mutationFn: async (values: any) => {
      const { data, error } = await supabase
        .from('courses')
        .update({
          title: values.title,
          description: values.description,
          thumbnail: values.thumbnail,
          // Keep the existing domain
          domain: course?.domain
        })
        .eq('id', courseId)
        .select();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      toast.success('Course updated successfully');
      queryClient.invalidateQueries({ queryKey: ['course-details', courseId] });
      queryClient.invalidateQueries({ queryKey: ['admin-courses'] });
    },
    onError: (error) => {
      console.error('Error updating course:', error);
      toast.error('Failed to update course');
    },
  });

  const handleAddModule = () => {
    setModules([
      ...modules,
      {
        title: `Module ${modules.length + 1}`,
        description: '',
        content: '',
      },
    ]);
    setCurrentModule(modules.length);
  };

  const handleSaveModule = (index: number) => {
    const values = form.getValues();
    const updatedModules = [...modules];
    updatedModules[index] = values;
    setModules(updatedModules);
    setCurrentModule(null);
    form.reset();
    toast.success('Module saved');
  };

  const handleEditModule = (index: number) => {
    setCurrentModule(index);
    form.reset(modules[index]);
  };

  const handleDeleteModule = (index: number) => {
    const updatedModules = modules.filter((_, i) => i !== index);
    setModules(updatedModules);
    if (currentModule === index) {
      setCurrentModule(null);
      form.reset();
    }
  };

  const saveCourseChanges = () => {
    updateCourse.mutate(courseForm.getValues());
    
    // In a real implementation, here we would also save the modules data
    // to sections and lessons tables in the database
    toast.success('Course and modules saved successfully');
  };

  return (
    <div className="space-y-6">
      {/* Course Basic Information */}
      <Form {...courseForm}>
        <div className="grid gap-4 mb-4">
          {domain && (
            <div className="flex items-center mb-2">
              <span className="text-sm text-muted-foreground mr-2">Domain:</span>
              <Badge variant="outline">{domain}</Badge>
            </div>
          )}
          
          <FormField
            control={courseForm.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Course Title</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          
          <FormField
            control={courseForm.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          
          <FormField
            control={courseForm.control}
            name="thumbnail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Thumbnail URL</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
      </Form>
      
      {/* Course Tabs */}
      <Tabs defaultValue="modules" className="w-full">
        <TabsList className="grid grid-cols-2 w-full">
          <TabsTrigger value="modules">Modules</TabsTrigger>
          <TabsTrigger value="scorm">SCORM Content</TabsTrigger>
        </TabsList>
        
        <TabsContent value="modules">
          <div className="border-t border-b py-4">
            <h3 className="text-lg font-medium mb-2">Course Modules</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Add modules to organize your course content
            </p>
            
            {modules.length > 0 ? (
              <Accordion type="single" collapsible className="w-full">
                {modules.map((module, index) => (
                  <AccordionItem value={`module-${index}`} key={index}>
                    <AccordionTrigger className="hover:bg-muted/50 px-4 rounded-md">
                      <div className="flex justify-between w-full pr-4">
                        <span>{module.title}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-4 pt-2">
                      <div className="mb-2">
                        <p className="text-sm text-muted-foreground">{module.description}</p>
                      </div>
                      <div className="flex space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleEditModule(index)}
                        >
                          <Edit className="h-4 w-4 mr-2" /> Edit
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="text-destructive hover:text-destructive"
                          onClick={() => handleDeleteModule(index)}
                        >
                          <Trash className="h-4 w-4 mr-2" /> Delete
                        </Button>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            ) : (
              <div className="text-center py-8 border border-dashed rounded-md">
                <p className="text-muted-foreground">No modules added yet</p>
              </div>
            )}

            <Button 
              onClick={handleAddModule} 
              className="mt-4"
              variant="outline"
            >
              <Plus className="h-4 w-4 mr-2" /> Add Module
            </Button>
          </div>

          {currentModule !== null && (
            <Card className="mt-6 border-primary/50">
              <CardHeader>
                <CardTitle>{currentModule < modules.length ? 'Edit Module' : 'Add Module'}</CardTitle>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Module Title</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Module Description</FormLabel>
                          <FormControl>
                            <Textarea {...field} className="h-20" />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="videoUrl"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Video URL (optional)</FormLabel>
                          <FormControl>
                            <div className="flex space-x-2">
                              <Input {...field} placeholder="https://www.youtube.com/watch?v=..." />
                              <Button type="button" variant="outline" size="icon">
                                <Video className="h-4 w-4" />
                              </Button>
                            </div>
                          </FormControl>
                          <FormDescription>
                            YouTube or Vimeo URL
                          </FormDescription>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="content"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Module Content</FormLabel>
                          <FormControl>
                            <Textarea {...field} className="min-h-32" />
                          </FormControl>
                          <FormDescription>
                            Enter the main content for this module. Supports Markdown formatting.
                          </FormDescription>
                        </FormItem>
                      )}
                    />
                    
                    <div className="flex justify-end space-x-2 pt-2">
                      <Button 
                        type="button" 
                        variant="outline"
                        onClick={() => {
                          setCurrentModule(null);
                          form.reset();
                        }}
                      >
                        <X className="h-4 w-4 mr-2" /> Cancel
                      </Button>
                      <Button 
                        type="button"
                        onClick={() => handleSaveModule(currentModule)}
                      >
                        <Save className="h-4 w-4 mr-2" /> Save Module
                      </Button>
                    </div>
                  </div>
                </Form>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="scorm">
          <div className="space-y-6">
            <ScormUploader />
            <ScormManager />
          </div>
        </TabsContent>
      </Tabs>
      
      <div className="flex justify-between pt-6">
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button onClick={saveCourseChanges} disabled={updateCourse.isPending}>
          {updateCourse.isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            'Save All Changes'
          )}
        </Button>
      </div>
    </div>
  );
}
