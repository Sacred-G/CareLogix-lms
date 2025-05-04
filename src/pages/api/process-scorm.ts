
import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/integrations/supabase/client';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed, use POST' });
  }

  try {
    const { scormPackageUrl, moduleId } = req.body;

    if (!scormPackageUrl || !moduleId) {
      return res.status(400).json({ error: 'Missing required parameters' });
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
        
      return res.status(500).json({ error: 'Failed to process SCORM package', details: error });
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error('Error in process-scorm API:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
