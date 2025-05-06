
import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';
import { Edit, Trash2, Eye, Filter } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogClose } from '@/components/ui/dialog';
import { ScormModule, ScormProcessingStatus } from '@/data/scormTypes';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/hooks/useAuth';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function ScormManager() {
  const [selectedModule, setSelectedModule] = useState<ScormModule | null>(null);
  const [previewDialogOpen, setPreviewDialogOpen] = useState(false);
  const [domainFilter, setDomainFilter] = useState<string>('all'); // Changed from empty string to 'all'
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

  // Fetch domains for filter - fixing the type issue here
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
      const uniqueDomains: string[] = [...new Set(data.map(item => item.email_domain))].filter(Boolean) as string[];
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
      if (domainFilter !== 'all') {  // Changed comparison from empty string to 'all'
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
          .from('scorm-packages')
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
  
  const getStatusBadge = (status?: ScormProcessingStatus | string) => {
    switch(status) {
      case 'pending':
        return <Badge variant="outline">Pending</Badge>;
      case 'processing':
        return <Badge variant="secondary">Processing</Badge>;
      case 'processed':
        return <Badge variant="outline" className="bg-green-100 text-green-800">Ready</Badge>;
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
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
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
