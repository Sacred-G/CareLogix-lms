import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

// Get environment variables from Vite
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_PUBLISHABLE_KEY = import.meta.env.VITE_SUPABASE_KEY;

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

// Throw error if environment variables are not set
if (!SUPABASE_URL || !SUPABASE_PUBLISHABLE_KEY) {
  throw new Error('Missing Supabase environment variables. Check .env file.');
}

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
