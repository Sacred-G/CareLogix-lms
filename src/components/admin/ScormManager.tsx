
import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';
import { Edit, Trash2, Eye } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogClose } from '@/components/ui/dialog';
import { ScormModule } from '@/data/scormTypes';

export default function ScormManager() {
  const [selectedModule, setSelectedModule] = useState<ScormModule | null>(null);
  const [previewDialogOpen, setPreviewDialogOpen] = useState(false);
  const queryClient = useQueryClient();
  
  const { data: scormModules, isLoading } = useQuery({
    queryKey: ['scorm-modules'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('scorm_modules')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching SCORM modules:', error);
        throw error;
      }
      
      return data || [];
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
          <CardTitle>SCORM Modules</CardTitle>
          <CardDescription>
            Manage your uploaded SCORM modules
          </CardDescription>
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
                  <TableHead className="w-24 text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {scormModules && scormModules.length > 0 ? (
                  scormModules.map((module) => (
                    <TableRow key={module.id}>
                      <TableCell className="font-medium">{module.title}</TableCell>
                      <TableCell>{module.course_id}</TableCell>
                      <TableCell>{new Date(module.created_at!).toLocaleDateString()}</TableCell>
                      <TableCell className="text-right space-x-1">
                        <Button variant="ghost" size="icon" onClick={() => handlePreviewScorm(module)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" 
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
                    <TableCell colSpan={4} className="text-center py-4">
                      No SCORM modules found. Upload your first SCORM package to get started.
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
          
          {selectedModule && (
            <div className="flex-1 h-full">
              <iframe 
                src={`${supabase.storage.from('scorm_packages').getPublicUrl(selectedModule.file_path).data.publicUrl}#${selectedModule.launch_path}`}
                className="w-full h-[60vh] border rounded"
                title={selectedModule.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
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
