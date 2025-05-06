
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, Upload, File } from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { allCourses } from '@/data/courses/completeDataIndex';
import { useAuth } from '@/hooks/useAuth';

export default function ScormUploader() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const queryClient = useQueryClient();
  const { user } = useAuth();
  
  const form = useForm({
    defaultValues: {
      title: '',
      description: '',
      course_id: '',
      launch_path: 'index.html',
      domain: 'all'
    }
  });
  
  // Fetch all courses to populate the dropdown
  const { data: dbCourses, isLoading: isLoadingDbCourses } = useQuery({
    queryKey: ['database-courses-for-scorm'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('courses')
        .select('id, title')
        .order('title', { ascending: true });
      
      if (error) throw error;
      return data || [];
    }
  });
  
  // Fetch domains for dropdown
  const { data: domains, isLoading: isLoadingDomains } = useQuery({
    queryKey: ['domains-for-scorm'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('email_domain')
        .not('email_domain', 'is', null)
        .order('email_domain');
      
      if (error) throw error;
      
      // Get unique domains
      const uniqueDomains = [...new Set(data
        .map(item => item.email_domain)
        .filter(Boolean))] as string[];
      
      return uniqueDomains;
    }
  });
  
  // Combine database courses with static courses
  const courses = React.useMemo(() => {
    const staticCoursesFormatted = allCourses.map(c => ({
      id: c.id,
      title: c.title
    }));
    
    return [
      ...(dbCourses || []),
      ...staticCoursesFormatted
    ];
  }, [dbCourses]);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      
      // Verify file is a zip
      if (selectedFile.type !== 'application/zip' && 
          !selectedFile.name.endsWith('.zip')) {
        toast.error('Please upload a ZIP file containing your SCORM package');
        return;
      }
      
      setFile(selectedFile);
    }
  };
  
  const uploadScormMutation = useMutation({
    mutationFn: async (values: any) => {
      if (!file) {
        throw new Error('No file selected');
      }
      
      setUploading(true);
      
      try {
        // 1. Upload the file to storage
        const fileName = `${Date.now()}-${file.name}`;
        const filePath = `scorm/${fileName}`;
        
        const { error: uploadError } = await supabase.storage
          .from('scorm_packages')
          .upload(filePath, file);
          
        if (uploadError) throw uploadError;
        
        // 2. Get the public URL for the file
        const { data: fileData } = supabase.storage
          .from('scorm_packages')
          .getPublicUrl(filePath);
          
        // 3. Create the SCORM module record
        const { data: moduleData, error: moduleError } = await supabase
          .from('scorm_modules')
          .insert({
            title: values.title,
            description: values.description,
            course_id: values.course_id,
            file_path: filePath,
            launch_path: values.launch_path || 'index.html',
            status: 'pending',
            created_by: user?.id,
            domain: values.domain === 'all' ? null : values.domain
          })
          .select();
          
        if (moduleError) throw moduleError;
        
        // 4. Process the SCORM package
        const response = await fetch('/api/process-scorm', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${(await supabase.auth.getSession()).data.session?.access_token}`
          },
          body: JSON.stringify({
            scormPackageUrl: fileData.publicUrl,
            moduleId: moduleData[0].id
          })
        });
        
        if (!response.ok) {
          // Parse error response if available
          let errorData;
          try {
            errorData = await response.json();
          } catch (e) {
            errorData = { message: `HTTP error ${response.status}` };
          }
          
          console.error('SCORM processing failed:', errorData);
          // We don't throw here because we want to show the upload as complete
          // The edge function will update the module status
          toast.error(`SCORM package uploaded but processing failed: ${errorData.error || 'Unknown error'}`);
          return moduleData;
        }
        
        toast.success('SCORM package uploaded and processing started');
        return moduleData;
      } catch (error) {
        console.error('Error uploading SCORM package:', error);
        throw error;
      } finally {
        setUploading(false);
      }
    },
    onSuccess: () => {
      form.reset({
        title: '',
        description: '',
        course_id: '',
        launch_path: 'index.html',
        domain: 'all'
      });
      setFile(null);
      queryClient.invalidateQueries({ queryKey: ['scorm-modules'] });
    },
    onError: (error) => {
      console.error('Error uploading SCORM package:', error);
      toast.error('Failed to upload SCORM package');
    }
  });
  
  const onSubmit = (values: any) => {
    uploadScormMutation.mutate(values);
  };
  
  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>Upload SCORM Package</CardTitle>
        <CardDescription>
          Upload a SCORM package (.zip) that will be integrated into the course
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              rules={{ required: 'Title is required' }}
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
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="domain"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Restrict to Domain (Optional)</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a domain (or all domains)" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="all">Available to all domains</SelectItem>
                      {domains?.map((domain) => (
                        <SelectItem key={domain} value={domain}>
                          {domain}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    If selected, this SCORM module will only be available to users from this domain
                  </FormDescription>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="course_id"
              rules={{ required: 'Course is required' }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Course</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a course" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {courses.map((course) => (
                        <SelectItem key={course.id} value={course.id}>
                          {course.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="launch_path"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Launch Path</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="index.html" />
                  </FormControl>
                  <FormDescription>
                    Path to the entry HTML file in the SCORM package
                  </FormDescription>
                </FormItem>
              )}
            />
            
            <div className="space-y-2">
              <FormLabel>SCORM Package (.zip)</FormLabel>
              <div className="flex items-center gap-4">
                <label className="border-2 border-dashed border-gray-300 hover:border-primary rounded-lg p-6 w-full flex flex-col items-center gap-2 cursor-pointer">
                  <Upload className="h-8 w-8 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    {file ? file.name : 'Click or drag and drop to upload'}
                  </span>
                  <Input
                    type="file"
                    accept=".zip"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </label>
              </div>
              {file && (
                <div className="flex items-center mt-2 p-2 bg-muted rounded">
                  <File className="h-4 w-4 mr-2" />
                  <span className="text-sm">{file.name}</span>
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              type="submit" 
              className="w-full"
              disabled={!file || uploading || uploadScormMutation.isPending}
            >
              {(uploading || uploadScormMutation.isPending) ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Uploading...
                </>
              ) : (
                'Upload SCORM Package'
              )}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
