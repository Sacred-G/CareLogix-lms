
import React from 'react';

interface AudioPlayerProps {
  url: string;
  transcript?: string;
}

export default function AudioPlayer({ url, transcript }: AudioPlayerProps) {
  return (
    <div className="space-y-4">
      <div className="audio-player">
        <audio controls className="w-full">
          <source src={url} type="audio/mp3" />
          Your browser does not support the audio element.
        </audio>
      </div>
      
      {transcript && (
        <div className="mt-4">
          <h3 className="text-lg font-medium mb-2">Transcript</h3>
          <div className="bg-muted p-4 rounded-lg text-muted-foreground">
            <p>{transcript}</p>
          </div>
        </div>
      )}
    </div>
  );
}
