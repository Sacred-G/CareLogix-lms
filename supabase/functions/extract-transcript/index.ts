
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { mediaUrl, mediaType } = await req.json();

    if (!openAIApiKey) {
      throw new Error('OpenAI API key is not configured');
    }

    if (!mediaUrl) {
      throw new Error('Media URL is required');
    }

    console.log(`Processing ${mediaType} file for transcript: ${mediaUrl}`);

    // Download the media file
    console.log('Downloading media file...');
    const mediaResponse = await fetch(mediaUrl);
    
    if (!mediaResponse.ok) {
      throw new Error(`Failed to download media file: ${mediaResponse.status} ${mediaResponse.statusText}`);
    }

    const mediaBlob = await mediaResponse.blob();
    const formData = new FormData();

    // Add the file to form data
    formData.append('file', mediaBlob, 'media.mp3');
    formData.append('model', 'whisper-1');
    formData.append('response_format', 'text');

    console.log('Sending to OpenAI Whisper API...');
    // Send to OpenAI Whisper API
    const whisperResponse = await fetch('https://api.openai.com/v1/audio/transcriptions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
      },
      body: formData,
    });

    if (!whisperResponse.ok) {
      const errorData = await whisperResponse.text();
      console.error('OpenAI API error:', errorData);
      throw new Error(`OpenAI API error: ${whisperResponse.status} ${whisperResponse.statusText}`);
    }

    const transcript = await whisperResponse.text();
    console.log('Transcript generated successfully');

    return new Response(JSON.stringify({ 
      transcript 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in extract-transcript function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
