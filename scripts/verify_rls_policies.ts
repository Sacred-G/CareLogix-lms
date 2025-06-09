import { createClient } from '@supabase/supabase-js';
import 'dotenv/config';

// Initialize the Supabase client
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing required environment variables. Make sure to set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function checkCoursesPolicies() {
  try {
    // Check if RLS is enabled on the courses table
    const { data: rlsEnabled, error: rlsError } = await supabase.rpc('table_has_row_level_security', { 
      table_name: 'courses' 
    });
    
    if (rlsError) throw rlsError;
    
    console.log('Row Level Security enabled on courses table:', rlsEnabled);
    
    // Try to get the current policies
    const { data: policies, error: policiesError } = await supabase
      .rpc('get_policies', { schema_name: 'public', table_name: 'courses' });
    
    if (policiesError) {
      console.error('Error fetching policies:', policiesError);
      console.log('Trying alternative method to check policies...');
      
      // Alternative method using direct SQL query
      const { data, error } = await supabase.rpc('query', { 
        query: `
          SELECT 
            tablename,
            policyname,
            permissive,
            roles,
            cmd,
            qual,
            with_check
          FROM pg_policies 
          WHERE tablename = 'courses';
        `
      });
      
      if (error) throw error;
      console.log('Current policies on courses table:');
      console.log(JSON.stringify(data, null, 2));
    } else {
      console.log('Current policies on courses table:');
      console.log(JSON.stringify(policies, null, 2));
    }
    
    // Test if we can insert a course
    console.log('\nTesting course insertion...');
    const testCourse = {
      id: 'test-course-' + Math.random().toString(36).substring(2, 8),
      title: 'Test Course',
      description: 'This is a test course',
      domain: 'test.com',
      created_at: new Date().toISOString()
    };
    
    const { data: inserted, error: insertError } = await supabase
      .from('courses')
      .insert(testCourse)
      .select();
    
    if (insertError) {
      console.error('Error inserting test course:', insertError);
    } else {
      console.log('Successfully inserted test course:', inserted);
      
      // Clean up
      const { error: deleteError } = await supabase
        .from('courses')
        .delete()
        .eq('id', testCourse.id);
      
      if (deleteError) {
        console.error('Error cleaning up test course:', deleteError);
      } else {
        console.log('Successfully cleaned up test course');
      }
    }
    
  } catch (error) {
    console.error('Error checking RLS policies:', error);
  }
}

// Run the check
checkCoursesPolicies();
