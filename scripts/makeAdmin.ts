import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { createAdminBypassClient } from '../src/utils/supabaseAdmin';

// Load environment variables from .env file
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

// Set environment variables for Vite
process.env.VITE_SUPABASE_URL = process.env.VITE_SUPABASE_URL;
process.env.VITE_SUPABASE_ANON_KEY = process.env.VITE_SUPABASE_ANON_KEY;
process.env.VITE_SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

async function makeUserAdmin(email: string, role: 'admin' | 'domain_admin' | 'super_admin' = 'admin') {
  try {
    console.log(`Attempting to make ${email} an ${role}...`);
    
    // Initialize admin client
    const supabaseAdmin = createAdminBypassClient();
    
    // Find the user by email
    const { data: user, error: userError } = await supabaseAdmin
      .from('profiles')
      .select('*')
      .eq('email', email)
      .single();

    if (userError) {
      throw new Error(`Error finding user: ${userError.message}`);
    }

    if (!user) {
      throw new Error(`User with email ${email} not found`);
    }

    // Update the user's role
    const { data: updatedUser, error: updateError } = await supabaseAdmin
      .from('profiles')
      .update({ 
        role,
        // If making a domain admin, ensure they have their email domain in managed_domains
        ...(role === 'domain_admin' && !user.managed_domains?.length ? 
          { managed_domains: [user.email_domain || ''] } : {})
      })
      .eq('id', user.id)
      .select()
      .single();

    if (updateError) {
      throw new Error(`Error updating user role: ${updateError.message}`);
    }

    console.log(`✅ Success! User ${email} is now an ${role}`);
    console.log('Updated user:', updatedUser);
    return updatedUser;
  } catch (error) {
    console.error('Error making user admin:', error);
    process.exit(1);
  }
}

// Get email from command line arguments or use the provided email
const email = process.argv[2] || 'woodyw@includemetooplease.com';
const role = process.argv[3] as 'admin' | 'domain_admin' | 'super_admin' || 'admin';

// Run the function
makeUserAdmin(email, role);
