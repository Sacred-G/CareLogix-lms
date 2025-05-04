
import { supabase } from '@/integrations/supabase/client';

export default async function handler(req: Request, res: Response) {
  if (req.method !== 'POST') {
    return new Response(
      JSON.stringify({ error: 'Method not allowed, use POST' }), 
      { status: 405, headers: { 'Content-Type': 'application/json' } }
    );
  }

  try {
    const { scormPackageUrl, moduleId } = await req.json();

    if (!scormPackageUrl || !moduleId) {
      return new Response(
        JSON.stringify({ error: 'Missing required parameters' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Update the module status to processing
    await supabase
      .from('scorm_modules')
      .update({ status: 'processing' })
      .eq('id', moduleId);

    // Call the Supabase Edge Function to process the SCORM package
    const { data, error } = await supabase.functions.invoke('process-scorm', {
      body: { scormPackageUrl, moduleId }
    });

    if (error) {
      console.error('Error processing SCORM package:', error);
      
      // Update the module status to error
      await supabase
        .from('scorm_modules')
        .update({ 
          status: 'error',
          processed_at: new Date().toISOString()
        })
        .eq('id', moduleId);
        
      return new Response(
        JSON.stringify({ error: 'Failed to process SCORM package', details: error }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify(data),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in process-scorm API:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
