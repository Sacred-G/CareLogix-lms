
import React, { useEffect, useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';
import { ScormModule } from '@/data/scormTypes';

interface ScormViewerProps {
  module: ScormModule;
  onComplete?: (progress: number, score?: number) => void;
}

export default function ScormViewer({ module, onComplete }: ScormViewerProps) {
  const { session } = useAuth();
  const [trackingActive, setTrackingActive] = useState(false);
  const [scormApi, setScormApi] = useState<any>(null);
  const [completionStatus, setCompletionStatus] = useState('');
  
  // Fetch the user's progress for this SCORM module
  const { data: progressData, isLoading: isLoadingProgress } = useQuery({
    queryKey: ['scorm-progress', module.id, session?.user?.id],
    queryFn: async () => {
      if (!session?.user?.id) return null;
      
      const { data, error } = await supabase
        .from('scorm_progress')
        .select('*')
        .eq('user_id', session.user.id)
        .eq('scorm_module_id', module.id)
        .maybeSingle();
        
      if (error) {
        console.error('Error fetching SCORM progress:', error);
        throw error;
      }
      
      return data;
    },
    enabled: !!session?.user?.id && !!module.id
  });
  
  // Mutation to update progress
  const updateProgressMutation = useMutation({
    mutationFn: async (progressData: {
      status: string;
      completion_percentage: number;
      score?: number;
      suspend_data?: string;
    }) => {
      if (!session?.user?.id) throw new Error('User not logged in');
      
      const record = {
        user_id: session.user.id,
        scorm_module_id: module.id,
        ...progressData
      };
      
      const { data, error } = await supabase
        .from('scorm_progress')
        .upsert(record, { onConflict: 'user_id,scorm_module_id' })
        .select()
        .single();
        
      if (error) throw error;
      return data;
    }
  });
  
  // Setup the communication with the SCORM iframe
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (!event.data || typeof event.data !== 'object') return;
      
      // This handles messages from the SCORM content
      if (event.data.scormTracking) {
        const { type, data } = event.data;
        
        switch (type) {
          case 'init':
            setTrackingActive(true);
            setScormApi(data.api);
            break;
          case 'progress':
            handleProgressUpdate(data);
            break;
          case 'complete':
            handleCompletion(data);
            break;
        }
      }
    };
    
    window.addEventListener('message', handleMessage);
    
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, [module.id, session?.user?.id]);
  
  const handleProgressUpdate = (data: any) => {
    const { completion, status, suspendData } = data;
    
    setCompletionStatus(status);
    
    // Update progress in the database
    updateProgressMutation.mutate({
      status: status || 'in_progress',
      completion_percentage: Math.round(completion * 100),
      suspend_data: suspendData
    });
  };
  
  const handleCompletion = (data: any) => {
    const { completion, score } = data;
    const completionPercentage = Math.round(completion * 100);
    
    // Update progress in the database
    updateProgressMutation.mutate({
      status: 'completed',
      completion_percentage: completionPercentage,
      score: score
    });
    
    if (onComplete) {
      onComplete(completionPercentage, score);
    }
    
    toast.success(`Module completed with ${completionPercentage}% progress${score ? ` and a score of ${score}%` : ''}`);
  };
  
  // Get the public URL for the SCORM package
  const scormUrl = supabase.storage
    .from('scorm_packages')
    .getPublicUrl(module.file_path).data.publicUrl;
  
  const launchUrl = `${scormUrl}#${module.launch_path}`;
  
  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>{module.title}</span>
          {isLoadingProgress ? (
            <Skeleton className="h-6 w-24" />
          ) : progressData ? (
            <div className="flex items-center gap-2">
              <Progress value={progressData.completion_percentage} className="w-24 h-2" />
              <span className="text-sm text-muted-foreground">{progressData.completion_percentage}%</span>
            </div>
          ) : null}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {module.description && (
          <p className="text-muted-foreground mb-4">{module.description}</p>
        )}
        
        <div className="aspect-video rounded-md overflow-hidden border bg-card">
          <iframe 
            src={launchUrl}
            className="w-full h-full"
            title={module.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
        
        {!trackingActive && (
          <div className="mt-2 text-xs text-muted-foreground">
            Loading SCORM content... If the content doesn't appear, please check your browser settings.
          </div>
        )}
      </CardContent>
    </Card>
  );
}
