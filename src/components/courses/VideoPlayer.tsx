
import React from 'react';

interface VideoPlayerProps {
  url: string;
  title: string;
}

export default function VideoPlayer({ url, title }: VideoPlayerProps) {
  // Handle both YouTube embedded URLs and direct video files
  const isYouTube = url.includes('youtube.com') || url.includes('youtu.be');
  
  return (
    <div className="video-container">
      {isYouTube ? (
        <iframe
          src={url}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      ) : (
        <video controls>
          <source src={url} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}
    </div>
  );
}
