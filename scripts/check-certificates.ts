import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkCertificates() {
  try {
    // First, check if we can connect to the database
    console.log('Testing database connection...');
    
    // Try to get the current user's certificates directly
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      console.log('No authenticated user found. Please sign in first.');
      return;
    }
    
    console.log(`Authenticated as: ${user.email} (${user.id})`);
    
    // Check certificates for the current user
    console.log('Fetching certificates...');
    const { data: certificates, error: certsError } = await supabase
      .from('certificates')
      .select('*')
      .eq('user_id', user.id);

    if (certsError) {
      console.error('Error fetching certificates:', certsError);
      
      // If table doesn't exist, show how to create it
      if (certsError.code === '42P01') {
        console.log('\nCertificates table does not exist. You need to run the following SQL in your Supabase SQL editor:');
        console.log(`
        CREATE TABLE public.certificates (
          id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
          user_id UUID REFERENCES auth.users(id) NOT NULL,
          user_name TEXT NOT NULL,
          course_id TEXT NOT NULL,
          course_title TEXT NOT NULL,
          issue_date TIMESTAMPTZ DEFAULT NOW() NOT NULL,
          completion_date TIMESTAMPTZ NOT NULL,
          certificate_number TEXT NOT NULL UNIQUE,
          organization_name TEXT,
          organization_logo TEXT,
          valid_until TIMESTAMPTZ,
          created_at TIMESTAMPTZ DEFAULT NOW()
        );
        
        -- Enable RLS for security
        ALTER TABLE public.certificates ENABLE ROW LEVEL SECURITY;
        
        -- Create policies
        CREATE POLICY "Users can view their own certificates" 
        ON public.certificates
        FOR SELECT 
        USING (auth.uid() = user_id);
        
        CREATE POLICY "Users can insert their own certificates"
        ON public.certificates
        FOR INSERT
        WITH CHECK (auth.uid() = user_id);
        `);
      }
      return;
    }

    console.log(`\nFound ${certificates?.length || 0} certificates:`);
    
    if (certificates && certificates.length > 0) {
      certificates.forEach((cert, index) => {
        console.log(`\nCertificate #${index + 1}:`);
        console.log(`- ID: ${cert.id}`);
        console.log(`- Course: ${cert.course_title} (${cert.course_id})`);
        console.log(`- Issued: ${new Date(cert.issue_date).toLocaleDateString()}`);
        console.log(`- Certificate Number: ${cert.certificate_number}`);
      });
    } else {
      console.log('No certificates found for this user.');
      console.log('\nTo test certificate generation:');
      console.log('1. Complete a course to 100%');
      console.log('2. The system should automatically generate a certificate');
      console.log('3. Refresh this page to see the new certificate');
    }
    
  } catch (error) {
    console.error('Error checking certificates:', error);
  }
}

// Run the check
checkCertificates();

