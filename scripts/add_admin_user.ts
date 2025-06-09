import { createAdminBypassClient } from '../src/utils/supabaseAdmin.ts';

const addAdminUser = async (email) => {
  try {
    const supabaseAdmin = createAdminBypassClient();

    // 1. Find the user in auth.users table
    const { data: userData, error: userError } = await supabaseAdmin
      .from('users') // Assuming 'users' is the table for auth.users in the admin client context
      .select('id')
      .eq('email', email)
      .single();

    if (userError) {
      console.error('Error fetching user:', userError);
      throw userError;
    }

    if (!userData) {
      console.log(`User with email ${email} not found in auth.users. Attempting to find in profiles table.`);
      // If not found in auth.users, it might be a user who signed up but their profile wasn't fully synced or they are not yet confirmed.
      // We can try to find them in the profiles table directly.
      const { data: profileData, error: profileError } = await supabaseAdmin
        .from('profiles')
        .select('id')
        .eq('email', email)
        .single();

      if (profileError) {
        console.error('Error fetching profile:', profileError);
        throw profileError;
      }

      if (!profileData) {
        console.error(`User with email ${email} not found in profiles table either. Cannot add as admin.`);
        return;
      }
      userData = profileData; // Use profileData if found there
    }

    const userId = userData.id;

    // 2. Update the profiles table to set the role to 'super_admin'
    const { data: updateData, error: updateError } = await supabaseAdmin
      .from('profiles')
      .update({ role: 'super_admin' })
      .eq('id', userId);

    if (updateError) {
      console.error('Error updating user role:', updateError);
      throw updateError;
    }

    console.log(`Successfully set user ${email} (ID: ${userId}) as super_admin.`);
  } catch (error) {
    console.error('Failed to add admin user:', error.message);
  }
};

// Get email from command line arguments
const email = process.argv[2];

if (!email) {
  console.error('Usage: node scripts/add_admin_user.js <email>');
  process.exit(1);
}

addAdminUser(email);
