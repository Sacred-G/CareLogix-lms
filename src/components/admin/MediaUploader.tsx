
import React, { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Loader2, Upload, X } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface MediaUploaderProps {
  fileType: 'video' | 'audio';
  onUploadComplete: (url: string) => void;
  currentUrl?: string;
}

export default function MediaUploader({ fileType, onUploadComplete, currentUrl }: MediaUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [previewUrl, setPreviewUrl] = useState<string | null>(currentUrl || null);
  
  const acceptedTypes = {
    video: 'video/mp4,video/webm,video/quicktime',
    audio: 'audio/mpeg,audio/wav,audio/ogg'
  };

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    
    if (!file) return;
    
    // Validate file type
    if (!file.type.startsWith(fileType)) {
      toast.error(`Please select a valid ${fileType} file`);
      return;
    }
    
    // Validate file size (max 50MB)
    if (file.size > 50 * 1024 * 1024) {
      toast.error('File size must be less than 50MB');
      return;
    }
    
    // Start upload
    setUploading(true);
    setProgress(0);
    
    try {
      // Generate a unique filename
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
      const filePath = `${fileType}/${fileName}`;
      
      // Upload file to Supabase Storage
      const { data, error } = await supabase.storage
        .from('course_media')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false,
          onUploadProgress: (progress) => {
            const percent = Math.round((progress.loaded / progress.total) * 100);
            setProgress(percent);
          }
        });
      
      if (error) {
        throw error;
      }
      
      // Get public URL for the uploaded file
      const { data: { publicUrl } } = supabase.storage
        .from('course_media')
        .getPublicUrl(data.path);
        
      setPreviewUrl(publicUrl);
      onUploadComplete(publicUrl);
      toast.success(`${fileType} uploaded successfully`);
    } catch (error: any) {
      console.error('Error uploading file:', error);
      toast.error(`Failed to upload ${fileType}: ${error.message}`);
    } finally {
      setUploading(false);
    }
  };
  
  const handleRemove = () => {
    if (previewUrl) {
      // Extract path from URL
      const url = new URL(previewUrl);
      const pathMatch = url.pathname.match(/\/storage\/v1\/object\/public\/course_media\/(.+)$/);
      
      if (pathMatch && pathMatch[1]) {
        const path = pathMatch[1];
        
        // Remove file from storage
        supabase.storage
          .from('course_media')
          .remove([path])
          .then(({ error }) => {
            if (error) {
              console.error('Error removing file:', error);
              toast.error('Failed to remove file');
            } else {
              setPreviewUrl(null);
              onUploadComplete('');
              toast.success(`${fileType} removed`);
            }
          });
      } else {
        setPreviewUrl(null);
        onUploadComplete('');
      }
    }
  };
  
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label htmlFor={`${fileType}-upload`} className="text-sm font-medium">
          {fileType === 'video' ? 'Course Video' : 'Audio Lesson'}
        </label>
      </div>
      
      {!previewUrl ? (
        <div className="border-2 border-dashed border-muted-foreground/20 rounded-lg p-8 text-center">
          <input
            id={`${fileType}-upload`}
            type="file"
            accept={acceptedTypes[fileType]}
            onChange={handleUpload}
            className="hidden"
            disabled={uploading}
          />
          
          {uploading ? (
            <div className="space-y-4">
              <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
              <Progress value={progress} className="w-full h-2" />
              <p className="text-sm text-muted-foreground">Uploading... {progress}%</p>
            </div>
          ) : (
            <label 
              htmlFor={`${fileType}-upload`}
              className="flex flex-col items-center justify-center cursor-pointer h-full"
            >
              <Upload className="h-8 w-8 mb-2 text-muted-foreground" />
              <p className="text-sm font-medium">Click to upload {fileType}</p>
              <p className="text-xs text-muted-foreground mt-1">
                {fileType === 'video' ? 'MP4, WebM or QuickTime' : 'MP3, WAV or OGG'} (max 50MB)
              </p>
            </label>
          )}
        </div>
      ) : (
        <div className="border rounded-lg p-4">
          {fileType === 'video' ? (
            <video 
              src={previewUrl} 
              controls 
              className="w-full aspect-video rounded-md bg-black"
            />
          ) : (
            <audio src={previewUrl} controls className="w-full" />
          )}
          
          <div className="flex justify-end mt-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleRemove}
              disabled={uploading}
              className="text-destructive"
            >
              <X className="h-4 w-4 mr-1" /> Remove
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
