
import React, { useRef, useEffect } from 'react';

interface VideoPlayerProps {
  url: string;
  title: string;
  onVideoEnded?: () => void;
}

export default function VideoPlayer({ url, title, onVideoEnded }: VideoPlayerProps) {
  // Handle both YouTube embedded URLs, Supabase Storage URLs, and direct video files
  const isYouTube = url.includes('youtube.com') || url.includes('youtu.be');
  const isSupabaseUrl = url.includes('storage.googleapis.com') || url.includes('supabase');
  const videoRef = useRef<HTMLVideoElement>(null);
  
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
    
    return `https://www.youtube.com/embed/${videoId}?enablejsapi=1`;
  };

  useEffect(() => {
    const videoElement = videoRef.current;
    if (videoElement) {
      // Add event listener for when video ends
      videoElement.addEventListener('ended', handleVideoEnded);
      
      // Cleanup event listener when component unmounts
      return () => {
        videoElement.removeEventListener('ended', handleVideoEnded);
      };
    }
  }, []);

  const handleVideoEnded = () => {
    if (onVideoEnded) {
      onVideoEnded();
    }
  };

  return (
    <div className="video-container aspect-video rounded-lg overflow-hidden bg-black shadow-lg">
      {isYouTube ? (
        <iframe
          src={getYouTubeEmbedUrl(url)}
          title={title}
          className="w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          onEnded={handleVideoEnded}
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
  );
}
