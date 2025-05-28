// Utility to help admins bypass Supabase RLS policies
import { createClient } from '@supabase/supabase-js';

// This function creates a special admin client for operations that need to bypass RLS
// It should only be used in secure admin-only functions
export const createAdminBypassClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
  
  // Create a client with the same credentials but with admin headers
  return createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: false,
    },
    global: {
      headers: {
        'X-Admin-Access': 'true',
      },
    },
  });
};
