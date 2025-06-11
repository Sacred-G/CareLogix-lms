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

async function verifyCertificates() {
  try {
    console.log('1. Verifying database connection...');
    
    // Check if we can query the auth.users table
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      console.log('Please sign in to continue');
      return;
    }
    
    console.log(`2. Connected as user: ${user.email} (${user.id})`);
    
    // Check if certificates table exists and get its structure
    console.log('3. Checking certificates table structure...');
    const { data: tableInfo } = await supabase
      .rpc('get_table_info', { table_name: 'certificates' });
    
    if (!tableInfo) {
      console.log('Could not retrieve table info. Checking with direct query...');
      // Try a direct query as fallback
      const { data, error } = await supabase
        .from('certificates')
        .select('*')
        .limit(1);
        
      if (error) {
        console.error('Error querying certificates table:', error);
        console.log('\nThe certificates table might not exist or you may not have permissions.');
        return;
      }
      
      console.log('Certificates table exists with columns:', Object.keys(data[0] || {}));
    } else {
      console.log('Certificates table structure:', tableInfo);
    }
    
    // Check for any certificates
    console.log('4. Checking for existing certificates...');
    const { data: certificates, error: certsError } = await supabase
      .from('certificates')
      .select('*')
      .eq('user_id', user.id);
      
    if (certsError) {
      console.error('Error fetching certificates:', certsError);
      return;
    }
    
    console.log(`\nFound ${certificates?.length || 0} certificates:`);
    
    if (certificates && certificates.length > 0) {
      certificates.forEach((cert, index) => {
        console.log(`\nCertificate #${index + 1}:`);
        console.log(`- ID: ${cert.id}`);
        console.log(`- Course: ${cert.course_title} (${cert.course_id})`);
        console.log(`- User: ${cert.user_name} (${cert.user_id})`);
        console.log(`- Issued: ${new Date(cert.issue_date).toLocaleString()}`);
        console.log(`- Certificate Number: ${cert.certificate_number}`);
      });
    } else {
      console.log('No certificates found for this user.');
    }
    
    // Check enrollments to see if any courses are marked as completed
    console.log('\n5. Checking course enrollments...');
    const { data: enrollments, error: enrollError } = await supabase
      .from('enrollments')
      .select('*')
      .eq('user_id', user.id)
      .eq('completed', true);
      
    if (enrollError) {
      console.error('Error fetching enrollments:', enrollError);
      return;
    }
    
    console.log(`\nFound ${enrollments?.length || 0} completed courses:`);
    
    if (enrollments && enrollments.length > 0) {
      enrollments.forEach((enroll, index) => {
        console.log(`\nCourse #${index + 1}:`);
        console.log(`- Course ID: ${enroll.course_id}`);
        console.log(`- Progress: ${enroll.progress}%`);
        console.log(`- Completed: ${enroll.completed ? 'Yes' : 'No'}`);
        console.log(`- Started: ${new Date(enroll.started_at || enroll.created_at).toLocaleString()}`);
        console.log(`- Last Accessed: ${new Date(enroll.last_accessed_at || enroll.updated_at || enroll.created_at).toLocaleString()}`);
      });
    } else {
      console.log('No completed courses found for this user.');
    }
    
  } catch (error) {
    console.error('Error during verification:', error);
  }
}

// Run the verification
verifyCertificates();
