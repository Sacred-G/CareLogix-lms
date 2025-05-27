import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
// Use hardcoded values for development or window.__env if available
const supabaseUrl = typeof window !== 'undefined' && window.__env?.VITE_SUPABASE_URL || 
                   import.meta.env?.VITE_SUPABASE_URL || 
                   'https://xaqzisvydglrczbzmbpw.supabase.co';

const supabaseAnonKey = typeof window !== 'undefined' && window.__env?.VITE_SUPABASE_KEY || 
                        import.meta.env?.VITE_SUPABASE_KEY || 
                        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhhcXppc3Z5ZGdscmN6YnptYnB3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUzODU0MjMsImV4cCI6MjA2MDk2MTQyM30.ueT4e7IjDC8WKKzFf7cSvmpQoBhBg2eCjnqKMBllp80';

// Add TypeScript interface for window.__env
declare global {
  interface Window {
    __env?: {
      VITE_SUPABASE_URL?: string;
      VITE_SUPABASE_KEY?: string;
    };
  }
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Form submissions helper functions
export async function saveFormSubmission(data: {
  userId: string;
  courseId: string;
  formType: string;
  formData: Record<string, any>;
}) {
  try {
    const { data: submission, error } = await supabase
      .from('form_submissions')
      .insert([
        {
          user_id: data.userId,
          course_id: data.courseId,
          form_type: data.formType,
          form_data: data.formData,
          submitted_at: new Date().toISOString(),
        },
      ])
      .select();

    if (error) {
      console.error('Error saving form submission:', error);
      return { success: false, error };
    }

    return { success: true, data: submission };
  } catch (error) {
    console.error('Exception saving form submission:', error);
    return { success: false, error };
  }
}

// Get user's form submissions
export async function getUserFormSubmissions(userId: string, courseId?: string) {
  try {
    let query = supabase
      .from('form_submissions')
      .select('*')
      .eq('user_id', userId)
      .order('submitted_at', { ascending: false });

    if (courseId) {
      query = query.eq('course_id', courseId);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching form submissions:', error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (error) {
    console.error('Exception fetching form submissions:', error);
    return { success: false, error };
  }
}
