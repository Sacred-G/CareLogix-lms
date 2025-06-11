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

async function checkFunctionDependencies() {
  try {
    console.log('=== Checking Dependencies for is_admin Function ===');
    
    // Query to find dependencies of the is_admin function
    const { data: dependencies, error } = await supabase.rpc('pg_depend', {
      objid: 'public.is_admin'::regproc
    });
    
    if (error) {
      console.error('Error checking function dependencies:', error);
      return;
    }
    
    console.log('Dependencies:', dependencies);
    
    // Alternative query to check for RLS policies using the function
    const { data: policies, error: policiesError } = await supabase
      .from('pg_policies')
      .select('*')
      .ilike('qual', '%is_admin%');
    
    if (policiesError) {
      console.error('Error checking policies:', policiesError);
      return;
    }
    
    console.log('\nRLS Policies using is_admin function:');
    console.log(policies);
    
  } catch (error) {
    console.error('Error in checkFunctionDependencies:', error);
  }
}

checkFunctionDependencies();
