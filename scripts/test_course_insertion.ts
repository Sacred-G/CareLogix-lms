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

async function testCourseInsertion() {
  try {
    // Generate a unique ID for the test course
    const testCourseId = 'test-course-' + Math.random().toString(36).substring(2, 8);
    
    console.log('Testing course insertion with ID:', testCourseId);
    
    // Test data
    const testCourse = {
      id: testCourseId,
      title: 'Test Course',
      description: 'This is a test course',
      domain: 'test.com',
      created_at: new Date().toISOString()
    };
    
    // Try to insert the test course
    console.log('Attempting to insert test course...');
    const { data: inserted, error: insertError } = await supabase
      .from('courses')
      .insert(testCourse)
      .select();
    
    if (insertError) {
      console.error('Error inserting test course:', insertError);
      
      // Try to get more details about the error
      if (insertError.message.includes('permission denied')) {
        console.error('\nPERMISSION DENIED: The current user does not have permission to insert into the courses table.');
        console.error('This is likely due to Row Level Security (RLS) policies.');
        console.error('Please check the RLS policies on the courses table in your Supabase dashboard.');
      }
    } else {
      console.log('✅ Successfully inserted test course:', inserted);
      
      // Clean up
      console.log('\nCleaning up test course...');
      const { error: deleteError } = await supabase
        .from('courses')
        .delete()
        .eq('id', testCourseId);
      
      if (deleteError) {
        console.error('Error cleaning up test course:', deleteError);
      } else {
        console.log('✅ Successfully cleaned up test course');
      }
    }
    
  } catch (error) {
    console.error('Unexpected error:', error);
  }
}

// Run the test
testCourseInsertion();
