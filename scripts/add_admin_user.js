const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env' });

async function addAdminUser() {
  const email = 'woodyw@includemetooplease.com';
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    console.error('❌ Error: Missing required environment variables');
    console.log('\nPlease check your .env file contains:');
    console.log('NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here');
    console.log('SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here\n');
    process.exit(1);
  }

  const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: { autoRefreshToken: false, persistSession: false }
  });

  try {
    console.log(`🔍 Looking up user ${email}...`);
    
    // Check profiles table
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('id, email, role')
      .eq('email', email)
      .single();

    if (profileError || !profile) {
      console.error(`❌ Error: User ${email} not found in profiles table`);
      console.log('\nPlease make sure the user has logged in at least once.');
      process.exit(1);
    }

    console.log(`👤 Found user: ${profile.email} (ID: ${profile.id})`);
    console.log(`🔄 Current role: ${profile.role || 'not set'}`);
    
    if (profile.role === 'super_admin') {
      console.log('ℹ️ User is already a super_admin');
      process.exit(0);
    }

    // Update to super_admin
    const { error: updateError } = await supabase
      .from('profiles')
      .update({ role: 'super_admin' })
      .eq('id', profile.id);

    if (updateError) throw updateError;
    
    console.log('\n✅ Success! User has been made a super_admin.');
    console.log('\nYou can now log in as this user and access the admin panel.');

  } catch (error) {
    console.error('\n❌ Error updating user role:', error.message);
    console.log('\nIf you see an RLS error, you may need to:');
    console.log('1. Temporarily disable RLS on the profiles table');
    console.log('2. Or run this in the Supabase SQL editor with service role access');
    process.exit(1);
  }
}

addAdminUser();
