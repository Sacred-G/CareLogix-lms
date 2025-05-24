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
      launch_path: 'training.htm',
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
  
  // Function to check if an error is a row-level security policy error
  const isRLSError = (error: any): boolean => {
    return error?.message?.includes('row-level security policy') || 
           error?.message?.includes('bucket not found');
  };
  
  // Function to ensure required buckets exist
  const ensureBucketExists = async (bucketName: string): Promise<boolean> => {
    try {
      // Check if bucket exists
      const { data: buckets, error: listError } = await supabase.storage.listBuckets();
      
      if (listError) {
        console.error(`Error listing buckets:`, listError);
        if (isRLSError(listError)) {
          return false; // Return false to indicate RLS issues
        }
        throw listError;
      }
      
      const bucketExists = buckets?.some(bucket => bucket.name === bucketName);
      
      if (!bucketExists) {
        console.log(`Creating bucket: ${bucketName}`);
        // Create bucket if it doesn't exist
        const { error } = await supabase.storage.createBucket(bucketName, {
          public: true,
          allowedMimeTypes: ['application/zip', 'text/html', 'text/javascript', 'text/css', 'image/png', 'image/jpeg', 'application/json'],
          fileSizeLimit: 50000000 // 50MB
        });
        
        if (error) {
          console.error(`Error creating bucket ${bucketName}:`, error);
          if (isRLSError(error)) {
            return false; // Return false to indicate RLS issues
          }
          throw error;
        }
        console.log(`Bucket ${bucketName} created successfully`);
      } else {
        console.log(`Bucket ${bucketName} already exists`);
      }
      
      return true; // Return true if bucket exists or was created successfully
    } catch (error) {
      console.error(`Error ensuring bucket ${bucketName} exists:`, error);
      if (isRLSError(error)) {
        return false; // Return false to indicate RLS issues
      }
      throw error;
    }
  };

  const uploadScormMutation = useMutation({
    mutationFn: async (values: any) => {
      if (!file) {
        throw new Error('No file selected');
      }
      
      setUploading(true);
      
      // Create a local URL for the file in case we need to use local mode
      const localFileUrl = URL.createObjectURL(file);
      let useLocalMode = false;
      let filePath = '';
      
      try {
        // Try to ensure buckets exist, but check for RLS errors
        const scormPackageBucketOk = await ensureBucketExists('scorm_packages');
        const scormContentBucketOk = await ensureBucketExists('scorm-content');
        
        // If either bucket check failed due to RLS, use local mode
        if (!scormPackageBucketOk || !scormContentBucketOk) {
          console.log('Using local mode due to storage permission issues');
          useLocalMode = true;
        }
        
        let filePublicUrl = '';
        
        // Only try to upload to storage if we're not in local mode
        if (!useLocalMode) {
          try {
            // 1. Upload the file to storage
            const fileName = `${Date.now()}-${file.name}`;
            filePath = `scorm/${fileName}`;
            
            console.log('Uploading file to scorm_packages bucket:', filePath);
            const { error: uploadError } = await supabase.storage
              .from('scorm_packages')
              .upload(filePath, file);
              
            if (uploadError) {
              console.error('Error uploading file:', uploadError);
              if (isRLSError(uploadError)) {
                useLocalMode = true;
              } else {
                throw uploadError;
              }
            } else {
              // Only get the public URL if upload was successful
              const { data: fileData } = supabase.storage
                .from('scorm_packages')
                .getPublicUrl(filePath);
                
              filePublicUrl = fileData.publicUrl;
            }
          } catch (storageError) {
            console.error('Storage error:', storageError);
            if (isRLSError(storageError)) {
              useLocalMode = true;
            } else {
              throw storageError;
            }
          }
        }
        
        if (useLocalMode) {
          // For local mode, use a placeholder path
          filePath = `local/${file.name.replace(/\s+/g, '_')}`;
        }
        
        // 3. Create the SCORM module record
        const { data: moduleData, error: moduleError } = await supabase
          .from('scorm_modules')
          .insert({
            title: values.title,
            description: values.description,
            course_id: values.course_id,
            file_path: filePath,
            launch_path: values.launch_path || 'training.htm',
            status: useLocalMode ? 'local_mode' : 'pending',
            created_by: user?.id,
            domain: values.domain === 'all' ? null : values.domain,
            public_url: useLocalMode ? localFileUrl : null,
            processed_at: useLocalMode ? new Date().toISOString() : null
          })
          .select();
          
        if (moduleError) throw moduleError;
        
        // If in local mode, we're done - module is ready for use
        if (useLocalMode) {
          toast.success(
            <div className="space-y-2">
              <p>SCORM package uploaded in local mode</p>
              <p className="text-sm">Due to storage permission issues, this module will need to be viewed locally.</p>
            </div>,
            { duration: 6000 }
          );
          return moduleData;
        }
        
        // 4. Process the SCORM package directly with Supabase Edge Function
        console.log('Calling process-scorm Edge Function with:', {
          scormPackageUrl: filePublicUrl,
          moduleId: moduleData[0].id
        });
        
        try {
          const { data: processingData, error: processingError } = await supabase.functions.invoke('process-scorm', {
            body: { 
              scormPackageUrl: filePublicUrl,
              moduleId: moduleData[0].id
            }
          });
          
          if (processingError) {
            console.error('SCORM processing failed:', processingError);
            
            // Update the module status to error
            await supabase
              .from('scorm_modules')
              .update({ 
                status: 'error',
                processed_at: new Date().toISOString()
              })
              .eq('id', moduleData[0].id);
              
            // We don't throw here because we want to show the upload as complete
            toast.error(
              <div className="space-y-2">
                <p>SCORM package uploaded but processing failed: {processingError.message || 'Unknown error'}</p>
                <p className="text-sm">Go to SCORM Manager and use the "Mark as Processed Manually" option (chain icon).</p>
              </div>,
              { duration: 6000 }
            );
            return moduleData;
          }
          
          console.log('Edge Function Response:', processingData);
        } catch (error) {
          console.error('Exception during SCORM processing:', error);
          
          // Update the module status to error
          await supabase
            .from('scorm_modules')
            .update({ 
              status: 'error',
              processed_at: new Date().toISOString()
            })
            .eq('id', moduleData[0].id);
           
          // Check if it's a server error (500) or Edge Function issue
          const isServerError = error instanceof Error && 
            (error.message.includes('500') || 
             error.message.includes('non-2xx') ||
             error.message.includes('Failed to fetch'));
          
          // Provide a direct link to the SCORM package and clear instructions
          const manualUrl = `https://xaqzisvydglrczbzmbpw.supabase.co/storage/v1/object/public/scorm_packages/${filePath}`;
          
          if (isServerError) {
            toast.error(
              <div className="space-y-2">
                <p>Edge Function Error: The SCORM processing function is not properly deployed or returned an error.</p>
                <p className="text-sm">Your SCORM package was uploaded successfully, but could not be automatically processed.</p>
                <p className="text-sm font-medium mt-2">Next steps:</p>
                <ol className="text-sm list-decimal pl-5">
                  <li>Go to SCORM Manager</li>
                  <li>Find this module (titled: "{values.title}")</li>
                  <li>Click the chain icon to manually mark it as processed</li>
                </ol>
                <p className="text-xs mt-2">See SCORM Guide above for more details on troubleshooting.</p>
              </div>,
              { duration: 8000 }
            );
          } else {
            toast.error(
              <div className="space-y-2">
                <p>SCORM package uploaded but processing failed: {error instanceof Error ? error.message : 'Unknown error'}</p>
                <p className="text-sm">You can 
                  {filePublicUrl ? (
                    <a href={manualUrl} target="_blank" className="underline ml-1">
                      download the package
                    </a>
                  ) : (
                    <span> use the manual "Mark as processed" option in SCORM Manager</span>
                  )} and use the manual "Mark as processed" option in SCORM Manager.
                </p>
              </div>,
              { duration: 6000 }
            );
          }
          return moduleData;
        }
        
        toast.success('SCORM package uploaded and processing started');
        return moduleData;
      } catch (error) {
        console.error('Error uploading SCORM package:', error);
        
        // Check if it's an RLS error that we didn't catch earlier
        if (isRLSError(error)) {
          toast.error(
            <div className="space-y-2">
              <p>Storage permissions error: {error.message}</p>
              <p className="text-sm">Try using the "Mark as Processed Manually" option in SCORM Manager.</p>
            </div>,
            { duration: 6000 }
          );
        } else {
          throw error;
        }
      } finally {
        setUploading(false);
      }
    },
    onSuccess: () => {
      form.reset({
        title: '',
        description: '',
        course_id: '',
        launch_path: 'training.htm',
        domain: 'all'
      });
      setFile(null);
      queryClient.invalidateQueries({ queryKey: ['scorm-modules'] });
    },
    onError: (error: any) => {
      console.error('Error uploading SCORM package:', error);
      const errorMessage = error.message || 'Unknown error';
      toast.error(`Failed to upload SCORM package: ${errorMessage}`);
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
