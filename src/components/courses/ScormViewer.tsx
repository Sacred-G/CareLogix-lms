import React, { useEffect, useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Download, ExternalLink } from "lucide-react";
import { useScormModules } from "@/hooks/useScormModules";
import { ScormModule, ScormProgressUpdate } from "@/data/scormTypes";
import { useAuth } from "@/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";

interface ScormViewerProps {
  moduleId?: string;
  module?: ScormModule;
  onComplete?: (progress: number) => void;
}

export default function ScormViewer({ moduleId, module: propModule, onComplete }: ScormViewerProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { scormModules, updateProgress } = useScormModules();
  const { user } = useAuth();
  const [moduleData, setModuleData] = useState<ScormModule | null>(null);

  // Fetch user profile to check domain
  const { data: userProfile } = useQuery({
    queryKey: ['user-profile-for-scorm-viewer', user?.id],
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

  useEffect(() => {
    if (propModule) {
      // If module is directly provided as a prop, check domain access
      checkDomainAccess(propModule);
    } else if (scormModules && moduleId) {
      // If we need to find the module by ID
      const module = scormModules.find((m) => m.id === moduleId);
      if (module) {
        checkDomainAccess(module);
      } else {
        setErrorMessage("SCORM module not found");
        setIsLoading(false);
      }
    }
  }, [scormModules, moduleId, propModule, userProfile]);

  // Check if user has access to this module based on domain
  const checkDomainAccess = (module: ScormModule) => {
    // If no domain restriction on module or user is admin, allow access
    if (!module.domain || userProfile?.role === 'admin') {
      setModuleData(module);
      setErrorMessage(null);
      setIsLoading(false);
      return;
    }
    
    // If module has domain restriction, check user's domain
    if (module.domain === userProfile?.email_domain) {
      setModuleData(module);
      setErrorMessage(null);
    } else {
      setModuleData(null);
      setErrorMessage("You do not have access to this SCORM module");
    }
    
    setIsLoading(false);
  };

  // Handle SCORM API calls from the iframe
  useEffect(() => {
    if (!user || !(moduleId || propModule)) return;
    
    const currentModuleId = moduleId || propModule?.id;
    if (!currentModuleId) return;

    // Function to update SCORM progress data
    const handleScormUpdate = (data: ScormProgressUpdate) => {
      if (user) {
        updateProgress.mutate({
          moduleId: currentModuleId,
          ...data
        });
        
        // If the module is completed and onComplete callback is provided
        if (data.status === 'completed' && onComplete && data.percentage) {
          onComplete(data.percentage);
        }
      }
    };

    // Expose the function to the iframe
    window.updateScormProgress = handleScormUpdate;

    return () => {
      // Clean up the global function when component unmounts
      delete window.updateScormProgress;
    };
  }, [moduleId, propModule, user, updateProgress, onComplete]);

  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  const handleIframeError = () => {
    setIsLoading(false);
    setErrorMessage("Failed to load SCORM content");
  };

  const handleDownloadScorm = () => {
    if (moduleData?.file_path) {
      const downloadUrl = `https://xaqzisvydglrczbzmbpw.supabase.co/storage/v1/object/public/scorm_packages/${moduleData.file_path}`;
      window.open(downloadUrl, '_blank');
    }
  };

  if (isLoading) {
    return (
      <Card className="w-full h-[600px]">
        <CardContent className="p-0 h-full flex flex-col items-center justify-center">
          <Skeleton className="w-full h-full" />
        </CardContent>
      </Card>
    );
  }

  if (errorMessage || !moduleData?.public_url) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          {errorMessage || "SCORM content is not available. The module may still be processing."}
        </AlertDescription>
      </Alert>
    );
  }

  // Check if we're in local mode
  if (moduleData.status === 'local_mode') {
    // Check if the content exists in the public folder, accounting for both lowercase and uppercase paths
    const fileNameFromPath = moduleData.file_path.split('/').pop()?.replace('.zip', '') || '1';
    
    // Try both lowercase and uppercase Scorm folder paths
    const publicFolderPathLower = `/scorm/${fileNameFromPath}`;
    const publicFolderPathUpper = `/Scorm/${fileNameFromPath}`;  
    const publicFolderPath1 = `/Scorm/1`; // Direct hardcoded path to the folder we know exists
    
    const publicLaunchPathLower = `${publicFolderPathLower}/${moduleData.launch_path || 'training.htm'}`;
    const publicLaunchPathUpper = `${publicFolderPathUpper}/${moduleData.launch_path || 'training.htm'}`;
    const publicLaunchPath1 = `${publicFolderPath1}/${moduleData.launch_path || 'training.htm'}`;
    
    // Direct paths we know exist based on our inspection - trying both with and without /public/ prefix
    const directPath = `/Scorm/1/training.htm`;
    const directPathWithPublic = `/public/Scorm/1/training.htm`;
    
    // Also check for other common launch files if the specified one doesn't exist
    const alternativePaths = [
      directPathWithPublic, // Try with /public/ prefix first
      directPath, // Then without prefix
      `/public${publicLaunchPath1}`,
      publicLaunchPath1,
      `/public${publicLaunchPathUpper}`,
      publicLaunchPathUpper,
      `/public${publicLaunchPathLower}`,
      publicLaunchPathLower,
      `/public${publicFolderPath1}/training.htm`,
      `${publicFolderPath1}/training.htm`,
      `/public/Scorm/1/training.htm`,
      `/Scorm/1/training.htm`,
      `/public/scorm/1/training.htm`,
      `/scorm/1/training.htm`,
      `/public${publicFolderPathLower}/launch.html`,
      `${publicFolderPathLower}/launch.html`
    ];
    
    return (
      <Card className="w-full h-[600px] overflow-auto">
        <CardContent className="p-6 h-full">
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 mb-6">
            <AlertTitle className="text-amber-800 flex items-center gap-2 text-lg mb-2">
              <AlertCircle className="h-5 w-5" />
              Local SCORM Content
            </AlertTitle>
            <AlertDescription className="text-amber-700">
              <p className="mb-4">This SCORM module is set to use local content. You can:</p>
              
              <ol className="list-decimal pl-5 space-y-2 mb-4">
                <li>Click the "Try Local SCORM Paths" button below to check common paths</li>
                <li>Or download the SCORM package and extract it to your public/scorm folder</li>
                <li>Path should be: public/scorm/[module-name]/{moduleData.launch_path || 'training.htm'}</li>
              </ol>
              
              <div className="flex flex-wrap justify-center mt-6 gap-4">
                <div className="w-full space-y-2">
                  <p className="text-xs text-center mb-2">Try these local paths (click each to attempt):</p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {alternativePaths.map(path => (
                      <Button
                        key={path}
                        variant="outline"
                        size="sm"
                        className="text-xs"
                        onClick={() => window.open(path, '_blank')}
                      >
                        {path.split('/').pop() || path}
                      </Button>
                    ))}
                  </div>
                </div>
                <Button
                  variant="outline"
                  className="flex items-center gap-2 mt-4"
                  onClick={handleDownloadScorm}
                >
                  <Download className="h-4 w-4" />
                  Download SCORM Package
                </Button>
              </div>
            </AlertDescription>
          </div>
          
          <iframe
            src={directPathWithPublic} /* Direct path to the SCORM content with /public/ prefix */
            className="w-full h-full border rounded"
            title={moduleData.title}
            sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-downloads"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            onError={() => console.error("Failed to load iframe content")}
          />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full h-[600px] overflow-hidden">
      <CardContent className="p-0 h-full">
        <iframe
          ref={iframeRef}
          src={moduleData.public_url}
          className="w-full h-full border-0"
          onLoad={handleIframeLoad}
          onError={handleIframeError}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title={moduleData.title}
        />
      </CardContent>
    </Card>
  );
}

// Add window type definition for SCORM API communication
declare global {
  interface Window {
    updateScormProgress: (data: ScormProgressUpdate) => void;
  }
}
