import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client with service role key
const supabaseUrl = process.env.VITE_SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase URL or Service Role Key in environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

async function checkRls() {
  try {
    console.log('=== Checking RLS and Database State ===');
    
    // 1. Check if profiles table exists and RLS is enabled
    console.log('\n=== Table Info ===');
    const { data: tableInfo, error: tableError } = await supabase
      .rpc('get_table_info', { table_name: 'profiles' });
    
    if (tableError) {
      console.error('Error checking table info:', tableError);
    } else {
      console.log(tableInfo);
    }
    
    // 2. Check current user (should be service role)
    console.log('\n=== Current User ===');
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    console.log(user || 'No user (expected for service role)');
    
    // 3. Try to fetch profiles (should bypass RLS with service role)
    console.log('\n=== Sample Profiles (first 5) ===');
    const { data: profiles, error: profilesError } = await supabase
      .from('profiles')
      .select('*')
      .limit(5);
    
    if (profilesError) {
      console.error('Error fetching profiles:', profilesError);
    } else {
      console.log(profiles);
    }
    
    // 4. Check if is_admin function exists
    console.log('\n=== is_admin Function Check ===');
    const { data: funcCheck, error: funcError } = await supabase
      .rpc('is_admin');
    
    if (funcError) {
      console.error('Error checking is_admin function:', funcError);
    } else {
      console.log('is_admin function exists and returned:', funcCheck);
    }
    
  } catch (error) {
    console.error('Error in checkRls:', error);
  }
}

checkRls();
