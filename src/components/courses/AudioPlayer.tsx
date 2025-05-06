
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

  // Check if the URL is a Supabase Storage URL or a direct URL
  const isSupabaseUrl = url && url.includes('storage.googleapis.com') || url.includes('supabase');

  return (
    <div className="space-y-4">
      <div className="audio-player bg-muted p-4 rounded-lg">
        <audio 
          ref={audioRef}
          controls 
          className="w-full" 
          onEnded={handleAudioEnded}
        >
          <source src={url} type="audio/mp3" />
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
