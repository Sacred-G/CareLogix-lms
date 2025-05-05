
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { ScormModule, ScormProgress, ScormModuleWithProgress, ScormProgressUpdate, ScormModuleStatus } from '@/data/scormTypes';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

export const useScormModules = (courseId?: string) => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [isUploading, setIsUploading] = useState(false);

  // Get user profile to determine domain
  const { data: userProfile } = useQuery({
    queryKey: ['user-profile-for-hook', user?.id],
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

  // Fetch SCORM modules for a course with domain filter
  const { 
    data: scormModules, 
    isLoading: isLoadingModules,
    error: modulesError
  } = useQuery({
    queryKey: ['scorm-modules', courseId, userProfile?.email_domain, userProfile?.role],
    queryFn: async () => {
      if (!courseId) return [];
      
      let query = supabase
        .from('scorm_modules')
        .select('*')
        .eq('course_id', courseId);
        
      // Filter by domain unless user is admin
      if (userProfile?.role !== 'admin') {
        query = query.or(`domain.eq.${userProfile?.email_domain},domain.is.null`);
      }
      
      query = query.order('position');
      
      const { data, error } = await query;
        
      if (error) throw error;
      return data as unknown as ScormModule[];
    },
    enabled: !!courseId && !!userProfile
  });

  // Fetch user progress for SCORM modules
  const { 
    data: moduleProgress, 
    isLoading: isLoadingProgress
  } = useQuery({
    queryKey: ['scorm-progress', courseId, user?.id],
    queryFn: async () => {
      if (!courseId || !user) return [];
      
      const { data, error } = await supabase
        .from('scorm_progress')
        .select('*')
        .eq('user_id', user.id)
        .filter('scorm_module_id', 'in', 
          `(${scormModules?.map(m => `'${m.id}'`).join(',') || ''})`
        );
        
      if (error) throw error;
      return data as ScormProgress[];
    },
    enabled: !!courseId && !!user && !!scormModules?.length
  });

  // Combine modules with their progress
  const modulesWithProgress: ScormModuleWithProgress[] = scormModules?.map(module => {
    const progress = moduleProgress?.find(p => p.scorm_module_id === module.id);
    return {
      ...module,
      progress
    };
  }) || [];

  // Upload a SCORM package
  const uploadPackage = async (file: File, title: string, description: string, position: number, domain?: string) => {
    if (!courseId) throw new Error('Course ID is required');
    setIsUploading(true);
    
    try {
      // Upload file to storage
      const fileName = `${courseId}/${Date.now()}_${file.name.replace(/\s+/g, '_')}`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('scorm-packages')
        .upload(fileName, file);
        
      if (uploadError) throw uploadError;
      
      const filePath = uploadData.path;
      
      // Create SCORM module record
      const { data: moduleData, error: moduleError } = await supabase
        .from('scorm_modules')
        .insert({
          title,
          description,
          course_id: courseId,
          file_path: filePath,
          launch_path: 'index.html',
          position,
          created_by: user?.id,
          domain: domain || null
        })
        .select()
        .single();
        
      if (moduleError) throw moduleError;
      
      // Process SCORM package via edge function
      const { data: publicUrl } = supabase.storage
        .from('scorm-packages')
        .getPublicUrl(filePath);
        
      const response = await fetch('/api/process-scorm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${(await supabase.auth.getSession()).data.session?.access_token}`
        },
        body: JSON.stringify({
          scormPackageUrl: publicUrl.publicUrl,
          moduleId: moduleData.id
        })
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to process SCORM package');
      }
      
      queryClient.invalidateQueries({ queryKey: ['scorm-modules', courseId] });
      toast.success('SCORM package uploaded successfully');
      return moduleData;
    } catch (error) {
      console.error('Error uploading SCORM package:', error);
      toast.error('Failed to upload SCORM package');
      throw error;
    } finally {
      setIsUploading(false);
    }
  };

  // Update SCORM progress
  const updateProgress = useMutation({
    mutationFn: async (
      progress: { 
        moduleId: string, 
        status?: ScormModuleStatus, 
        percentage?: number,
        score?: number,
        suspendData?: string
      }
    ) => {
      if (!user) throw new Error('User not authenticated');
      
      // Check if progress entry exists
      const { data: existingProgress } = await supabase
        .from('scorm_progress')
        .select('id')
        .eq('user_id', user.id)
        .eq('scorm_module_id', progress.moduleId)
        .single();
        
      if (existingProgress) {
        // Update existing progress
        const updateData: Partial<ScormProgress> = {};
        if (progress.status) updateData.status = progress.status;
        if (progress.percentage !== undefined) updateData.completion_percentage = progress.percentage;
        if (progress.score !== undefined) updateData.score = progress.score;
        if (progress.suspendData) updateData.suspend_data = progress.suspendData;
        
        const { error } = await supabase
          .from('scorm_progress')
          .update(updateData)
          .eq('id', existingProgress.id);
          
        if (error) throw error;
      } else {
        // Create new progress entry
        const { error } = await supabase
          .from('scorm_progress')
          .insert({
            user_id: user.id,
            scorm_module_id: progress.moduleId,
            status: progress.status || 'in_progress',
            completion_percentage: progress.percentage || 0,
            score: progress.score,
            suspend_data: progress.suspendData
          });
          
        if (error) throw error;
      }
      
      return true;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['scorm-progress'] });
    }
  });

  return {
    scormModules: modulesWithProgress,
    isLoading: isLoadingModules || isLoadingProgress,
    isUploading,
    error: modulesError,
    uploadPackage,
    updateProgress,
    userProfile
  };
};
