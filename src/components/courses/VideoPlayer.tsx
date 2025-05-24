
import React, { useRef, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';

interface VideoPlayerProps {
  url: string;
  title: string;
  onVideoEnded?: () => void;
}

export default function VideoPlayer({ url, title, onVideoEnded }: VideoPlayerProps) {
  // Handle YouTube, Google Drive, Supabase Storage URLs, and direct video files
  const isYouTube = url.includes('youtube.com') || url.includes('youtu.be');
  const isGoogleDrive = url.includes('drive.google.com');
  const isSupabaseUrl = url.includes('storage.googleapis.com') || url.includes('supabase');
  const videoRef = useRef<HTMLVideoElement>(null);
  
  // For YouTube iframe message handling
  const iframeRef = useRef<HTMLIFrameElement>(null);
  
  // Extract video ID for YouTube
  const getYouTubeEmbedUrl = (url: string) => {
    let videoId = '';
    
    if (url.includes('youtube.com/watch')) {
      videoId = new URL(url).searchParams.get('v') || '';
    } else if (url.includes('youtu.be/')) {
      videoId = url.split('youtu.be/')[1].split('?')[0];
    } else if (url.includes('youtube.com/embed/')) {
      // Already in embed format, extract ID
      videoId = url.split('youtube.com/embed/')[1].split('?')[0];
    } else {
      // Direct YouTube video ID
      videoId = url;
    }
    
    return `https://www.youtube.com/embed/${videoId}?enablejsapi=1&origin=${window.location.origin}`;
  };

  // Format Google Drive URL for embedding
  const getGoogleDriveEmbedUrl = (url: string) => {
    // If already in the preview format, return as is
    if (url.includes('/preview')) {
      return url;
    }
    
    // Extract the file ID from the Google Drive URL
    let fileId = '';
    if (url.includes('/file/d/')) {
      fileId = url.split('/file/d/')[1].split('/')[0];
    } else if (url.includes('id=')) {
      fileId = new URL(url).searchParams.get('id') || '';
    }
    
    // Return properly formatted embed URL
    return `https://drive.google.com/file/d/${fileId}/preview`;
  };

  useEffect(() => {
    // Setup for regular video files
    const videoElement = videoRef.current;
    if (videoElement) {
      // Add event listener for when video ends
      videoElement.addEventListener('ended', handleVideoEnded);
      
      // Cleanup event listener when component unmounts
      return () => {
        videoElement.removeEventListener('ended', handleVideoEnded);
      };
    }
    
    // Setup YouTube message listener
    if (isYouTube) {
      const handleYouTubeMessage = (event: MessageEvent) => {
        // Only handle messages from YouTube
        if (event.origin !== 'https://www.youtube.com') return;
        
        try {
          const data = JSON.parse(event.data);
          // Check for video ended event
          if (data.event === 'onStateChange' && data.info === 0) {
            handleVideoEnded();
          }
        } catch (e) {
          // Not a JSON message, ignore
        }
      };
      
      window.addEventListener('message', handleYouTubeMessage);
      return () => {
        window.removeEventListener('message', handleYouTubeMessage);
      };
    }
  }, []);

  const handleVideoEnded = () => {
    if (onVideoEnded) {
      onVideoEnded();
    }
  };

  const [manualCompletionAvailable, setManualCompletionAvailable] = useState(false);
  
  // Show manual completion option after 30 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setManualCompletionAvailable(true);
    }, 30000); // 30 seconds
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative">
      <div className="video-container aspect-video rounded-lg overflow-hidden bg-black shadow-lg">
        {isYouTube ? (
          <iframe
            ref={iframeRef}
            src={getYouTubeEmbedUrl(url)}
            title={title}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
      ) : isGoogleDrive ? (
        <iframe
          src={getGoogleDriveEmbedUrl(url)}
          title={title}
          className="w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      ) : (
        <video 
          ref={videoRef}
          controls 
          className="w-full h-full"
          onEnded={handleVideoEnded}
        >
          <source src={url} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}
      </div>
      
      {/* Manual completion button - shown after 30 seconds */}
      {manualCompletionAvailable && (
        <div className="mt-2 flex justify-end">
          <Button 
            variant="outline" 
            size="sm"
            className="text-xs flex items-center gap-1"
            onClick={handleVideoEnded}
          >
            <CheckCircle className="h-4 w-4" />
            Mark as completed
          </Button>
        </div>
      )}
    </div>
  );
}
