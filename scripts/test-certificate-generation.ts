import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

// Load environment variables from .env file
const envPath = path.resolve(process.cwd(), '.env');
if (fs.existsSync(envPath)) {
  dotenv.config({ path: envPath });
}

// Initialize Supabase client with service role key for admin access
const supabaseUrl = process.env.VITE_SUPABASE_URL || '';
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

if (!supabaseUrl || !serviceRoleKey) {
  console.error('Error: Missing Supabase URL or Service Role Key in environment variables');
  process.exit(1);
}

// Use the service role key to bypass RLS
const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

// Generate a unique certificate ID
function generateCertificateId(): string {
  const timestamp = new Date().getTime().toString().slice(-8);
  const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  return `CERT-${timestamp}-${random}`;
}

// Create a certificate object that matches the database schema
function createCertificate(userId: string, userName: string, course: any, userEmail: string) {
  const currentDate = new Date().toISOString();
  const certNumber = generateCertificateId();
  const userDomain = userEmail.split('@')[1] || '';

  return {
    id: uuidv4(), // UUID for PK
    userId,
    userName,
    courseId: course.id,
    courseTitle: course.title,
    issueDate: currentDate,
    completionDate: currentDate,
    certificateNumber: certNumber, // Custom certificate number
    organizationName: 'DSP Training Program',
    organizationLogo: null,
    organizationDomain: userDomain
  };
}

async function saveCertificate(certificate: any) {
  try {
    const certificateData = {
      id: certificate.id,
      user_id: certificate.userId,
      user_name: certificate.userName,
      course_id: certificate.courseId,
      course_title: certificate.courseTitle,
      issue_date: certificate.issueDate,
      completion_date: certificate.completionDate,
      certificate_number: certificate.certificateNumber,
      organization_name: certificate.organizationName || null,
      organization_logo: certificate.organizationLogo || null
    };

    console.log('Saving certificate with data:', certificateData);
    
    const { data, error } = await supabase
      .from('certificates')
      .insert([certificateData])
      .select()
      .single();
    
    if (error) {
      console.error('Supabase error:', error);
      throw error;
    }
    
    console.log('Successfully saved certificate:', data);
    return { 
      success: true, 
      certificateId: data?.id || certificate.id 
    };
  } catch (error) {
    console.error('Error saving certificate:', error);
    return { success: false, error };
  }
}

// Mock courses data
const mockCourse = {
  id: 'test-course-1',
  title: 'Test Course',
  description: 'This is a test course',
  duration: '2 hours',
  modules: []
};

// Define the user type from the profiles table
interface ProfileUser {
  id: string;
  email: string;
  full_name?: string;
  first_name?: string;
  last_name?: string;
  created_at: string;
  updated_at: string;
}

// Function to get a test user using the provided ID
async function getTestUser(): Promise<{ id: string; email: string; name: string }> {
  const TEST_USER_ID = '98ed4f22-193f-4530-8c0c-a2c6ad49da51';
  
  try {
    console.log('Fetching user with ID:', TEST_USER_ID);
    
    // Try to get the user's profile
    const { data: profile, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', TEST_USER_ID)
      .single();

    if (error) {
      console.error('Supabase error:', error);
      throw error;
    }

    if (!profile) {
      throw new Error(`No user found with ID: ${TEST_USER_ID}`);
    }

    console.log('Found profile:', {
      id: profile.id,
      email: profile.email,
      name: profile.full_name || 'No name'
    });

    // Extract name from profile
    const name = profile.full_name || 
                (profile.first_name && profile.last_name 
                  ? `${profile.first_name} ${profile.last_name}` 
                  : 'Test User');

    if (!profile.email) {
      throw new Error('Profile is missing email');
    }

    return {
      id: profile.id,
      email: profile.email,
      name: name
    };
  } catch (error) {
    console.error('Error fetching test user:', error);
    throw new Error(`Failed to fetch user with ID: ${TEST_USER_ID}`);
  }
}

// Will be populated after fetching from DB
let TEST_USER: { id: string; email: string; name: string } | null = null;

// Use mock course for testing
const TEST_COURSE = mockCourse;

async function testCertificateGeneration() {
  try {
    console.log('Starting certificate generation test...\n');

    // 0. Get a valid test user
    console.log('0. Finding a test user...');
    const testUser = await getTestUser();
    TEST_USER = {
      id: testUser.id,
      email: testUser.email || 'test@example.com',
      name: testUser.name || 'Test User'
    };
    console.log('Using test user:', TEST_USER);
    console.log();

    // 1. Create certificate
    console.log('1. Creating certificate...');
    const certificate = createCertificate(TEST_USER.id, TEST_USER.name, TEST_COURSE, TEST_USER.email);
    console.log('Certificate created:', {
      id: certificate.id,
      course: certificate.courseTitle,
      user: certificate.userName,
      certificateNumber: certificate.certificateNumber
    });
    console.log();
    // 2. Save the certificate to the database
    console.log('\n2. Saving certificate to database...');
    const saveResult = await saveCertificate(certificate);
    
    if (saveResult.success) {
      console.log('✅ Certificate saved successfully!');
      console.log(`Certificate ID: ${saveResult.certificateId}`);
      console.log(`\nYou can view this certificate at: http://localhost:3000/profile/certificates/${certificate.certificateNumber}`);
    } else {
      console.error('❌ Failed to save certificate');
    }
    
  } catch (error) {
    console.error('Error during certificate generation test:', error);
  }
}

// Run the test
testCertificateGeneration();
