-- Function to generate a certificate number
CREATE OR REPLACE FUNCTION public.generate_certificate_number()
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  cert_number text;
  cert_exists boolean;
BEGIN
  -- Generate a random 10-character alphanumeric string
  cert_number := upper(
    substr(md5(random()::text), 1, 10)
  );
  
  -- Check if the certificate number already exists
  SELECT EXISTS (SELECT 1 FROM certificates WHERE certificate_number = cert_number) INTO cert_exists;
  
  -- If it exists, generate a new one (should be very rare with 10 chars)
  WHILE cert_exists LOOP
    cert_number := upper(substr(md5(random()::text), 1, 10));
    SELECT EXISTS (SELECT 1 FROM certificates WHERE certificate_number = cert_number) INTO cert_exists;
  END LOOP;
  
  RETURN cert_number;
END;
$$;

-- Function to manually generate a certificate (for admins)
CREATE OR REPLACE FUNCTION public.manually_generate_certificate(
  p_user_id uuid,
  p_course_title text
)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_course_id text;
  v_user_name text;
  v_org_name text;
  v_cert_number text;
  v_cert_id uuid;
  v_expiry_days integer := 365; -- Certificates valid for 1 year by default
  v_course_record record;
  v_user_record record;
BEGIN
  -- Verify the course exists
  SELECT * INTO v_course_record 
  FROM courses 
  WHERE title = p_course_title 
  LIMIT 1;
  
  IF v_course_record IS NULL THEN
    RAISE EXCEPTION 'Course not found: %', p_course_title;
  END IF;
  
  -- Get user details
  SELECT * INTO v_user_record 
  FROM profiles 
  WHERE id = p_user_id;
  
  IF v_user_record IS NULL THEN
    RAISE EXCEPTION 'User not found with ID: %', p_user_id;
  END IF;
  
  -- Generate certificate number
  v_cert_number := public.generate_certificate_number();
  
  -- Insert the certificate
  INSERT INTO certificates (
    user_id,
    user_name,
    course_id,
    course_title,
    issue_date,
    completion_date,
    valid_until,
    certificate_number,
    organization_name,
    organization_logo
  ) VALUES (
    p_user_id,
    COALESCE(v_user_record.full_name, v_user_record.email),
    v_course_record.id,
    v_course_record.title,
    NOW(), -- issue_date
    NOW(), -- completion_date
    NOW() + (v_expiry_days * INTERVAL '1 day'), -- valid_until
    v_cert_number,
    'DSP Training Program', -- Default organization name
    '/images/logo.png' -- Default logo path
  )
  RETURNING id INTO v_cert_id;
  
  RETURN v_cert_id;
EXCEPTION WHEN OTHERS THEN
  RAISE EXCEPTION 'Error generating certificate: %', SQLERRM;
END;
$$;

-- RPC function for admin UI to generate certificates
CREATE OR REPLACE FUNCTION public.admin_generate_certificate(
  user_email text,
  course_title text
)
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_user_id uuid;
  v_cert_id uuid;
  v_result json;
BEGIN
  -- Get user ID from email
  SELECT id INTO v_user_id 
  FROM auth.users 
  WHERE email = user_email
  LIMIT 1;
  
  IF v_user_id IS NULL THEN
    RAISE EXCEPTION 'User not found with email: %', user_email;
  END IF;
  
  -- Generate the certificate
  SELECT public.manually_generate_certificate(v_user_id, course_title) INTO v_cert_id;
  
  -- Return the certificate details
  SELECT json_build_object(
    'id', id,
    'certificate_number', certificate_number,
    'user_name', user_name,
    'course_title', course_title,
    'issue_date', issue_date,
    'valid_until', valid_until
  ) INTO v_result
  FROM certificates
  WHERE id = v_cert_id;
  
  RETURN v_result;
EXCEPTION WHEN OTHERS THEN
  RAISE EXCEPTION 'Error in admin_generate_certificate: %', SQLERRM;
END;
$$;

-- Function to list available courses for certificate generation
CREATE OR REPLACE FUNCTION public.list_available_courses()
RETURNS TABLE (
  id text,
  title text,
  description text
)
LANGUAGE sql
SECURITY DEFINER
AS $$
  SELECT id, title, description 
  FROM courses 
  WHERE is_published = true
  ORDER BY title;
$$;

-- Function to list users who can receive certificates
CREATE OR REPLACE FUNCTION public.list_users_for_certificates()
RETURNS TABLE (
  user_id uuid,
  email text,
  full_name text,
  enrolled_courses text[]
)
LANGUAGE sql
SECURITY DEFINER
AS $$
  SELECT 
    u.id as user_id,
    u.email,
    p.full_name,
    ARRAY(
      SELECT DISTINCT c.title 
      FROM user_courses uc
      JOIN courses c ON uc.course_id = c.id
      WHERE uc.user_id = u.id
      AND uc.completed_at IS NOT NULL
    ) as enrolled_courses
  FROM auth.users u
  LEFT JOIN profiles p ON u.id = p.id
  WHERE u.email_confirmed_at IS NOT NULL
  ORDER BY p.full_name, u.email;
$$;

-- Grant execute permissions to authenticated users
GRANTANT EXECUTE ON FUNCTION public.generate_certificate_number() TO authenticated;
GRANT EXECUTE ON FUNCTION public.manually_generate_certificate(uuid, text) TO authenticated;
GRANT EXECUTE ON FUNCTION public.admin_generate_certificate(text, text) TO authenticated;
GRANT EXECUTE ON FUNCTION public.list_available_courses() TO authenticated;
GRANT EXECUTE ON FUNCTION public.list_users_for_certificates() TO authenticated;
