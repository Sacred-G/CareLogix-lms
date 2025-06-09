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

async function checkRLSPolicies() {
  try {
    // Check if RLS is enabled on the courses table
    const { data: rlsEnabled, error: rlsError } = await supabase
      .rpc('query', {
        query: `
          SELECT relname, relrowsecurity 
          FROM pg_class 
          WHERE relname = 'courses';
        `
      });
    
    if (rlsError) throw rlsError;
    console.log('RLS status for courses table:', rlsEnabled);
    
    // Get all policies on the courses table
    const { data: policies, error: policiesError } = await supabase
      .rpc('query', {
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
    
    if (policiesError) throw policiesError;
    
    console.log('\nCurrent RLS policies on courses table:');
    console.log(JSON.stringify(policies, null, 2));
    
    // Check if the current user has insert permission
    const { data: hasInsertPermission, error: permError } = await supabase
      .rpc('query', {
        query: `
          SELECT has_table_privilege(
            current_user, 
            'courses', 
            'INSERT'
          ) as can_insert;
        `
      });
    
    if (permError) throw permError;
    console.log('\nCurrent user has INSERT permission on courses table:', hasInsertPermission);
    
  } catch (error) {
    console.error('Error checking RLS policies:', error);
  }
}

// Run the check
checkRLSPolicies();
