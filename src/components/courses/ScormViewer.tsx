
import React, { useEffect, useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { useScormModules } from "@/hooks/useScormModules";
import { ScormModule, ScormProgressUpdate } from "@/data/scormTypes";
import { useAuth } from "@/hooks/useAuth";

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

  useEffect(() => {
    if (propModule) {
      // If module is directly provided as a prop
      setModuleData(propModule);
      setIsLoading(false);
    } else if (scormModules && moduleId) {
      // If we need to find the module by ID
      const module = scormModules.find((m) => m.id === moduleId);
      if (module) {
        setModuleData(module);
        // Reset error when module is found
        setErrorMessage(null);
      } else {
        setErrorMessage("SCORM module not found");
      }
      setIsLoading(false);
    }
  }, [scormModules, moduleId, propModule]);

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
