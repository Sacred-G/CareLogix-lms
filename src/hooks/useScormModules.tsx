
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { ScormModule, ScormProgress, ScormModuleWithProgress, ScormProgressUpdate, ScormProcessingStatus } from '@/data/scormTypes';
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
      if (!courseId || !user || !scormModules?.length) return [];
      
      // For safety, limit to batches of 10 modules per query
      const results: ScormProgress[] = [];
      
      // Process in smaller batches to avoid query string length issues
      for (let i = 0; i < scormModules.length; i += 10) {
        const batchModules = scormModules.slice(i, i + 10);
        
        try {
          // Use separate queries for each module instead of the 'in' filter
          const { data, error } = await supabase
            .from('scorm_progress')
            .select('*')
            .eq('user_id', user.id)
            .in('scorm_module_id', batchModules.map(m => m.id));
          
          if (error) {
            console.error('Error fetching progress batch:', error);
            continue; // Continue with other batches even if one fails
          }
          
          if (data) {
            // Ensure the status field is properly typed
            const typedData = data.map(item => ({
              ...item,
              status: item.status as 'not_started' | 'in_progress' | 'completed'
            }));
            results.push(...typedData);
          }
        } catch (err) {
          console.error('Exception in progress batch query:', err);
          // Continue with other batches
        }
      }
      
      return results as ScormProgress[];
    },
    enabled: !!courseId && !!user && !!scormModules?.length,
    // Add retry and error handling to be more resilient
    retry: 2,
    retryDelay: 1000
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
        status?: 'not_started' | 'in_progress' | 'completed', 
        percentage?: number,
        score?: number,
        suspendData?: string
      }
    ) => {
      if (!user) throw new Error('User not authenticated');
      
      try {
        // First check if we're in local mode - in which case we just store progress locally
        // and don't try to hit the database
        const moduleInfo = scormModules?.find(m => m.id === progress.moduleId);
        if (moduleInfo?.status === 'local_mode') {
          // For local mode, we just return success without hitting the database
          console.log('Local mode SCORM module - skipping database progress update');
          
          // Save in localStorage for potential future use
          try {
            const localProgressKey = `scorm_progress_${user.id}_${progress.moduleId}`;
            localStorage.setItem(localProgressKey, JSON.stringify({
              moduleId: progress.moduleId,
              status: progress.status || 'in_progress',
              percentage: progress.percentage || 0,
              timestamp: new Date().toISOString()
            }));
          } catch (e) {
            console.warn('Could not save progress to localStorage:', e);
          }
          
          return true;
        }
        
        // Otherwise, proceed with database update with error handling
        try {
          // Check if progress entry exists
          const { data: existingProgress, error: checkError } = await supabase
            .from('scorm_progress')
            .select('id')
            .eq('user_id', user.id)
            .eq('scorm_module_id', progress.moduleId)
            .single();
            
          if (checkError) {
            // If we can't check, we'll just try to create a new entry
            console.warn('Error checking for existing progress:', checkError);
            throw checkError; // Forward to the catch block
          }
          
          if (existingProgress) {
            // Update existing progress
            const updateData: Partial<ScormProgress> = {};
            if (progress.status) updateData.status = progress.status;
            if (progress.percentage !== undefined) updateData.completion_percentage = progress.percentage;
            if (progress.score !== undefined) updateData.score = progress.score;
            if (progress.suspendData) updateData.suspend_data = progress.suspendData;
            
            const { error: updateError } = await supabase
              .from('scorm_progress')
              .update(updateData)
              .eq('id', existingProgress.id);
              
            if (updateError) throw updateError;
          } else {
            // Create new progress entry
            const { error: insertError } = await supabase
              .from('scorm_progress')
              .insert({
                user_id: user.id,
                scorm_module_id: progress.moduleId,
                status: progress.status || 'in_progress',
                completion_percentage: progress.percentage || 0,
                score: progress.score,
                suspend_data: progress.suspendData
              });
              
            if (insertError) throw insertError;
          }
          
          return true;
        } catch (dbError) {
          console.error('Database error during progress update:', dbError);
          
          // Still save locally as a fallback
          try {
            const localProgressKey = `scorm_progress_${user.id}_${progress.moduleId}`;
            localStorage.setItem(localProgressKey, JSON.stringify({
              moduleId: progress.moduleId,
              status: progress.status || 'in_progress',
              percentage: progress.percentage || 0,
              timestamp: new Date().toISOString(),
              error: true
            }));
          } catch (e) {
            // Silent fail
          }
          
          // Don't fail the user experience just because progress couldn't be saved
          return true;
        }
      } catch (error) {
        console.error('Error in updateProgress:', error);
        // Don't fail the user experience, just log the error
        return true;
      }
    },
    onSuccess: () => {
      // Only invalidate if we didn't encounter errors
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
