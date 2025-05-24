
import React, { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';

interface AudioPlayerProps {
  url: string;
  transcript?: string;
  onAudioEnded?: () => void;
  title?: string; // Added title prop
}

export default function AudioPlayer({ url, transcript, onAudioEnded, title }: AudioPlayerProps) {
  const [showTranscript, setShowTranscript] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const handleAudioEnded = () => {
    if (onAudioEnded) {
      onAudioEnded();
    }
  };

  // Check if the URL is a Google Drive URL
  const isGoogleDrive = url && url.includes('drive.google.com');
  
  // Check if the URL is a Supabase Storage URL or a direct URL
  const isSupabaseUrl = url && (url.includes('storage.googleapis.com') || url.includes('supabase'));
  
  // Format Google Drive URL for direct streaming
  const getGoogleDriveAudioUrl = (url: string) => {
    // If already in the direct format, return as is
    if (url.includes('/uc?export=view')) {
      return url;
    }
    
    // Extract the file ID from various Google Drive URL formats
    let fileId = '';
    if (url.includes('/file/d/')) {
      fileId = url.split('/file/d/')[1].split('/')[0];
    } else if (url.includes('id=')) {
      fileId = new URL(url).searchParams.get('id') || '';
    }
    
    // Return properly formatted direct streaming URL
    return `https://drive.google.com/uc?export=view&id=${fileId}`;
  };
  
  // Get the correct audio source URL
  const audioSrc = isGoogleDrive ? getGoogleDriveAudioUrl(url) : url;

  // Using useEffect to handle URL changes and reset the audio element
  React.useEffect(() => {
    // Reset the audio element when URL changes
    if (audioRef.current) {
      audioRef.current.load();
      audioRef.current.pause();
    }
  }, [url]); // Dependency on url ensures this runs when url changes

  return (
    <div className="space-y-4">
      <div className="audio-player bg-muted p-4 rounded-lg">
        <audio 
          ref={audioRef}
          controls 
          className="w-full" 
          onEnded={handleAudioEnded}
          // Add key prop based on URL to force complete remount when URL changes
          key={url}
        >
          <source src={audioSrc} type="audio/mp3" />
          Your browser does not support the audio element.
        </audio>
      </div>
      
      {transcript && (
        <div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setShowTranscript(!showTranscript)}
          >
            {showTranscript ? 'Hide' : 'Show'} Transcript
          </Button>
          
          {showTranscript && (
            <div className="mt-4 p-4 bg-muted rounded-lg text-muted-foreground">
              <h4 className="font-medium mb-2">Transcript</h4>
              <p>{transcript}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
