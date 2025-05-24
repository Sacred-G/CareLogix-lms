import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';
import { Edit, Trash2, Eye, Filter, RefreshCw, ExternalLink, Link } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogClose } from '@/components/ui/dialog';
import { ScormModule, ScormProcessingStatus } from '@/data/scormTypes';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/hooks/useAuth';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Function to ensure required buckets exist
const ensureBucketExists = async (bucketName: string) => {
  try {
    // Check if bucket exists
    const { data: buckets } = await supabase.storage.listBuckets();
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
        throw error;
      }
      console.log(`Bucket ${bucketName} created successfully`);
    } else {
      console.log(`Bucket ${bucketName} already exists`);
    }
  } catch (error) {
    console.error(`Error ensuring bucket ${bucketName} exists:`, error);
    throw error;
  }
};

export default function ScormManager() {
  const [selectedModule, setSelectedModule] = useState<ScormModule | null>(null);
  const [previewDialogOpen, setPreviewDialogOpen] = useState(false);
  const [domainFilter, setDomainFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const queryClient = useQueryClient();
  const { user } = useAuth();
  
  // Get user profile to determine domain
  const { data: userProfile } = useQuery({
    queryKey: ['user-profile-for-scorm', user?.id],
    queryFn: async () => {
      if (!user) return null;
      
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
      
      if (error) throw error;
      return data;
    },
    enabled: !!user
  });

  // Fetch domains for filter
  const { data: domains } = useQuery({
    queryKey: ['domains-for-scorm-filter'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('email_domain')
        .not('email_domain', 'is', null)
        .order('email_domain');
      
      if (error) throw error;
      
      // Get unique domains with explicit type casting
      const uniqueDomains = [...new Set(data.map(item => item.email_domain).filter(Boolean))] as string[];
      return uniqueDomains;
    }
  });
  
  const { data: scormModules, isLoading } = useQuery({
    queryKey: ['scorm-modules', domainFilter, userProfile?.role],
    queryFn: async () => {
      let query = supabase
        .from('scorm_modules')
        .select('*');
      
      // Apply domain filter if set
      if (domainFilter !== 'all') {
        query = query.eq('domain', domainFilter);
      } else if (userProfile?.role !== 'admin') {
        // If not admin, only show modules for user's domain or with no domain restriction
        query = query.or(`domain.eq.${userProfile?.email_domain},domain.is.null`);
      }
      
      const { data, error } = await query.order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching SCORM modules:', error);
        throw error;
      }
      
      return data as unknown as ScormModule[];
    },
    enabled: !!userProfile
  });
  
  // Filter modules by search query
  const filteredModules = scormModules?.filter(module => 
    module.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    module.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    module.course_id.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Mutation for retrying SCORM processing
  const retryProcessingMutation = useMutation({
    mutationFn: async (module: ScormModule) => {
      // First update the module status to processing
      const { error: updateError } = await supabase
        .from('scorm_modules')
        .update({ status: 'processing' })
        .eq('id', module.id);
        
      if (updateError) throw updateError;
      
      try {
        // Get the file URL
        const { data: fileData } = supabase.storage
          .from('scorm_packages')
          .getPublicUrl(module.file_path);
          
        console.log('SCORM file URL:', fileData.publicUrl);
        console.log('Module ID:', module.id);
        
        // Try to check if the Edge Function exists
        try {
          // Call the Supabase Edge Function directly
          const { data: processingData, error: processingError } = await supabase.functions.invoke('process-scorm', {
            body: { 
              scormPackageUrl: fileData.publicUrl,
              moduleId: module.id
            }
          });
          
          if (processingError) {
            console.error('Edge Function Error:', processingError);
            
            // Update the module status to error
            await supabase
              .from('scorm_modules')
              .update({ 
                status: 'error',
                processed_at: new Date().toISOString()
              })
              .eq('id', module.id);
              
            throw new Error(`Edge Function error: ${processingError.message || 'Unknown error'}. Use the manual processing option (chain icon) instead.`);
          }
          
          console.log('Edge Function Response:', processingData);
          return module.id;
        } catch (edgeFuncError) {
          console.error('Edge Function invocation failed:', edgeFuncError);
          
          // Check if it's a 500 error or a connection issue
          const isServerError = edgeFuncError.message && 
            (edgeFuncError.message.includes('500') || 
             edgeFuncError.message.includes('non-2xx') ||
             edgeFuncError.message.includes('Failed to fetch'));
          
          // Update the module status to error
          await supabase
            .from('scorm_modules')
            .update({ 
              status: 'error',
              processed_at: new Date().toISOString()
            })
            .eq('id', module.id);
          
          if (isServerError) {
            throw new Error(`The Edge Function is not properly deployed or is returning an error. Please see the DEPLOY_FUNCTIONS.md file for instructions, or use the manual option (chain icon) to proceed.`);
          } else {
            throw edgeFuncError;
          }
        }
      } catch (error) {
        // Update the module status to error in case of any exception
        await supabase
          .from('scorm_modules')
          .update({ 
            status: 'error',
            processed_at: new Date().toISOString()
          })
          .eq('id', module.id);
          
        throw error;
      }
    },
    onSuccess: () => {
      toast.success('SCORM processing restarted successfully');
      queryClient.invalidateQueries({ queryKey: ['scorm-modules'] });
    },
    onError: (error: any) => {
      console.error('Error retrying SCORM processing:', error);
      const errorMessage = error.message || 'Unknown error';
      
      // Show more helpful error message with toast
      toast.error(
        <div className="space-y-2">
          <p>{errorMessage}</p>
          <p className="text-sm font-medium">
            Recommendation: Use the "Mark as Processed Manually" option (chain icon) to continue.
          </p>
        </div>,
        { duration: 6000 }
      );
    }
  });
  
  const deleteModuleMutation = useMutation({
    mutationFn: async (moduleId: string) => {
      // First, get the module to get the file path
      const { data: module, error: getError } = await supabase
        .from('scorm_modules')
        .select('file_path')
        .eq('id', moduleId)
        .single();
        
      if (getError) throw getError;
      
      // Delete the record from the database
      const { error: deleteError } = await supabase
        .from('scorm_modules')
        .delete()
        .eq('id', moduleId);
        
      if (deleteError) throw deleteError;
      
      // Delete the file from storage
      if (module?.file_path) {
        const { error: storageError } = await supabase.storage
          .from('scorm_packages')
          .remove([module.file_path]);
          
        if (storageError) console.error('Error deleting storage file:', storageError);
      }
      
      return moduleId;
    },
    onSuccess: () => {
      toast.success('SCORM module deleted successfully');
      queryClient.invalidateQueries({ queryKey: ['scorm-modules'] });
    },
    onError: (error) => {
      console.error('Error deleting SCORM module:', error);
      toast.error('Failed to delete SCORM module');
    }
  });
  
  const getStatusBadge = (status: ScormProcessingStatus) => {
    switch(status) {
      case 'pending':
        return <Badge variant="outline">Pending</Badge>;
      case 'processing':
        return <Badge variant="secondary">Processing</Badge>;
      case 'processed':
        return <Badge variant="outline" className="bg-green-100 text-green-800">Ready</Badge>;
      case 'local_mode':
        return <Badge variant="outline" className="bg-amber-100 text-amber-800">Local Mode</Badge>;
      case 'error':
        return <Badge variant="destructive">Error</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };
  
  const handlePreviewScorm = (module: ScormModule) => {
    setSelectedModule(module);
    setPreviewDialogOpen(true);
  };
  
  const handleRetryProcessing = (module: ScormModule) => {
    if (confirm('Do you want to retry processing this SCORM module?')) {
      retryProcessingMutation.mutate(module);
    }
  };
  
  // Mutation for manually setting a module as processed
  const markAsProcessedMutation = useMutation({
    mutationFn: async (module: ScormModule) => {
      // Create a direct local reference to the SCORM content
      // This bypasses the Supabase storage bucket completely
      
      // Generate a standalone HTML wrapper that doesn't rely on external storage
      const localWrapperContent = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <!-- Properly configured CSP that allows inline styles and all sources -->
  <meta http-equiv="Content-Security-Policy" content="default-src 'self' 'unsafe-inline' 'unsafe-eval' *; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline' 'unsafe-eval' *; img-src 'self' data: blob: *; connect-src *; frame-src *;">
  <title>${module.title}</title>
  <style>
    html, body, iframe, .scorm-container {
      margin: 0;
      padding: 0;
      border: none;
      width: 100%;
      height: 100%;
      overflow: hidden;
    }
    .error-message {
      padding: 20px;
      color: #e11d48;
      text-align: center;
      font-family: sans-serif;
    }
    .instructions {
      background: #f9fafb;
      border-radius: 8px; 
      padding: 20px;
      margin: 20px;
      font-family: sans-serif;
    }
    .instructions h3 {
      margin-top: 0;
      color: #4b5563;
    }
    .instructions ol {
      margin-left: 20px;
    }
    .instructions li {
      margin-bottom: 10px;
    }
  </style>
</head>
<body>
  <div class="scorm-container">
    <div class="instructions">
      <h3>Local SCORM Content Setup</h3>
      <p>To view this SCORM content locally:</p>
      <ol>
        <li>Download the SCORM package using the "Download original package" button in the SCORM Manager</li>
        <li>Extract the ZIP file to a folder</li>
        <li>Open the "${module.launch_path || 'index.html'}" file directly in your browser</li>
      </ol>
      <p>If you've uploaded your SCORM content to a web server, you can replace this file with a wrapper that points to your hosted content.</p>
    </div>
  </div>
</body>
</html>`;

      // Create a blob URL for local viewing
      const blob = new Blob([localWrapperContent], { type: 'text/html' });
      const localBlobUrl = URL.createObjectURL(blob);
      
      console.log('Created local blob URL for SCORM:', localBlobUrl);
      
      // We'll try first to create a wrapper in Supabase, but if it fails,
      // we'll fall back to providing instructions for local extraction
      try {
        // Try to access supabase bucket first
        const { data: buckets, error: bucketError } = await supabase.storage.listBuckets();
        
        // If we can't even list buckets, skip to the local-only approach
        if (bucketError) {
          throw new Error('Cannot access Supabase Storage: ' + bucketError.message);
        }
        
        // If buckets exist, try creating a wrapper file
        const fileName = `${Date.now()}-wrapper.html`;
        const filePath = `wrappers/${fileName}`;
        
        try {
          // Try to ensure the bucket exists first
          await ensureBucketExists('scorm-wrappers');
          
          // Try uploading the wrapper HTML
          const { error: uploadError } = await supabase.storage
            .from('scorm-wrappers')
            .upload(filePath, new Blob([localWrapperContent], { type: 'text/html' }), {
              contentType: 'text/html',
              upsert: true
            });
          
          if (uploadError) {
            console.error('Error uploading wrapper HTML:', uploadError);
            throw uploadError;
          }
          
          // Get the public URL for the wrapper HTML
          const { data: fileData } = supabase.storage
            .from('scorm-wrappers')
            .getPublicUrl(filePath);
          
          // Update the module with the wrapper URL
          const { error } = await supabase
            .from('scorm_modules')
            .update({ 
              status: 'processed',
              processed_at: new Date().toISOString(),
              public_url: fileData.publicUrl
            })
            .eq('id', module.id);
            
          if (error) throw error;
          
          toast.success('SCORM module successfully processed. You can now view it with the eye icon.');
          return module.id;
        } catch (error) {
          throw error; // Re-throw to be caught by the outer try/catch
        }
      } catch (error) {
        console.error('Error creating wrapper file in Supabase:', error);
        
        // Fall back to a local mode approach
        // Update the module with local blob URL and special status
        try {
          const { error: updateError } = await supabase
            .from('scorm_modules')
            .update({ 
              status: 'local_mode',
              processed_at: new Date().toISOString(),
              public_url: localBlobUrl // Use the local blob URL
            })
            .eq('id', module.id);
            
          if (updateError) throw updateError;
          
          toast.success(
            <div className="space-y-2">
              <p>SCORM module marked as processed in local mode.</p>
              <p className="text-sm">You'll need to extract the SCORM package and view it directly in your browser.</p>
            </div>
          );
          return module.id;
        } catch (finalError) {
          console.error('Final error updating module:', finalError);
          throw finalError;
        }
      }
    },
    onSuccess: () => {
      toast.success('Module marked as processed successfully');
      queryClient.invalidateQueries({ queryKey: ['scorm-modules'] });
    },
    onError: (error: any) => {
      console.error('Error marking module as processed:', error);
      toast.error(`Failed to mark module as processed: ${error.message || 'Unknown error'}`);
    }
  });

  const handleMarkAsProcessed = (module: ScormModule) => {
    if (confirm('Do you want to manually mark this module as processed? This is useful when the automatic processing fails but you know the content is valid.')) {
      markAsProcessedMutation.mutate(module);
    }
  };
  
  const handleDeleteModule = async (moduleId: string) => {
    if (confirm('Are you sure you want to delete this SCORM module? This action cannot be undone.')) {
      deleteModuleMutation.mutate(moduleId);
    }
  };

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <CardTitle>SCORM Modules</CardTitle>
              <CardDescription>
                Manage your uploaded SCORM modules
              </CardDescription>
            </div>
            
            {userProfile?.role === 'admin' && (
              <div className="flex gap-2">
                <Select 
                  value={domainFilter} 
                  onValueChange={setDomainFilter}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by domain" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Domains</SelectItem>
                    {domains?.map(domain => (
                      <SelectItem key={domain} value={domain}>
                        {domain}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
          
          <div className="mt-4">
            <Input
              type="search"
              placeholder="Search modules..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="max-w-sm"
            />
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-2">
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-8 w-full" />
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Course</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Status</TableHead>
                  {userProfile?.role === 'admin' && <TableHead>Domain</TableHead>}
                  <TableHead className="w-24 text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredModules && filteredModules.length > 0 ? (
                  filteredModules.map((module) => (
                    <TableRow key={module.id}>
                      <TableCell className="font-medium">{module.title}</TableCell>
                      <TableCell>{module.course_id}</TableCell>
                      <TableCell>{module.created_at ? new Date(module.created_at).toLocaleDateString() : 'Unknown'}</TableCell>
                      <TableCell>{getStatusBadge(module.status)}</TableCell>
                      {userProfile?.role === 'admin' && (
                        <TableCell>
                          {module.domain ? 
                            <Badge variant="outline">{module.domain}</Badge> : 
                            <span className="text-muted-foreground text-sm">All domains</span>
                          }
                        </TableCell>
                      )}
                      <TableCell className="text-right space-x-1">
                        {module.public_url && (
                          <Button variant="ghost" size="icon" onClick={() => handlePreviewScorm(module)}>
                            <Eye className="h-4 w-4" />
                          </Button>
                        )}
                        {(module.status === 'pending' || module.status === 'error') && (
                          <>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              onClick={() => handleRetryProcessing(module)}
                              className="text-blue-600 hover:text-blue-800"
                              title="Retry processing"
                            >
                              <RefreshCw className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              onClick={() => handleMarkAsProcessed(module)}
                              className="text-green-600 hover:text-green-800"
                              title="Mark as processed manually"
                            >
                              <Link className="h-4 w-4" />
                            </Button>
                          </>
                        )}
                        
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => window.open(`https://xaqzisvydglrczbzmbpw.supabase.co/storage/v1/object/public/scorm_packages/${module.file_path}`, '_blank')}
                          className="text-purple-600 hover:text-purple-800"
                          title="Download original package"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => handleDeleteModule(module.id)}
                          className="text-destructive hover:text-destructive/90"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={userProfile?.role === 'admin' ? 6 : 5} className="text-center py-4">
                      {searchQuery ? 
                        'No SCORM modules found matching your search.' : 
                        'No SCORM modules found. Upload your first SCORM package to get started.'}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* SCORM Preview Dialog */}
      <Dialog open={previewDialogOpen} onOpenChange={setPreviewDialogOpen}>
        <DialogContent className="max-w-5xl h-[80vh]">
          <DialogHeader>
            <DialogTitle>{selectedModule?.title}</DialogTitle>
            <DialogDescription>{selectedModule?.description}</DialogDescription>
          </DialogHeader>
          
          {selectedModule && selectedModule.public_url ? (
            <div className="flex-1 h-full">
              <iframe 
                src={selectedModule.public_url}
                className="w-full h-[60vh] border rounded"
                title={selectedModule.title}
                sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-downloads"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
              <div className="mt-2 text-sm text-muted-foreground">
                <p>If content doesn't display correctly, you can <a 
                  href={selectedModule.public_url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >open in a new tab</a> or <a 
                  href={`https://xaqzisvydglrczbzmbpw.supabase.co/storage/v1/object/public/scorm_packages/${selectedModule.file_path}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >download the package</a>.</p>
              </div>
            </div>
          ) : (
            <div className="flex-1 h-[60vh] flex items-center justify-center">
              <p className="text-muted-foreground">Preview not available. The module may still be processing.</p>
            </div>
          )}
          
          <div className="flex justify-end">
            <DialogClose asChild>
              <Button variant="outline">Close</Button>
            </DialogClose>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
