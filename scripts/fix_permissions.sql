-- Grant necessary permissions on auth.users to authenticated users
GRANTANT USAGE ON SCHEMA auth TO authenticated;
GRANT SELECT ON TABLE auth.users TO authenticated;

-- Update profiles table policies
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
DROP POLICY IF EXISTS "super_admin_full_access" ON public.profiles;

-- Create profiles policies
CREATE POLICY "Users can view own profile" 
ON public.profiles
FOR SELECT
USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
ON public.profiles
FOR UPDATE
USING (auth.uid() = id);

-- Create super admin policy using auth.jwt() for better performance
CREATE POLICY "super_admin_full_access" 
ON public.profiles
FOR ALL
USING (
  EXISTS (
    SELECT 1 
    FROM auth.users
    WHERE id = auth.uid()
    AND raw_user_meta_data->>'role' = 'super_admin'
  )
) WITH CHECK (
  EXISTS (
    SELECT 1 
    FROM auth.users
    WHERE id = auth.uid()
    AND raw_user_meta_data->>'role' = 'super_admin'
  )
);

-- Update enrollments table policies
ALTER TABLE public.enrollments ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can view own enrollments" ON public.enrollments;

-- Create enrollments policies
CREATE POLICY "Users can view own enrollments"
ON public.enrollments
FOR SELECT
USING (user_id = auth.uid());

-- Allow super admins full access to enrollments
CREATE POLICY "super_admin_enrollments_access"
ON public.enrollments
FOR ALL
USING (
  EXISTS (
    SELECT 1 
    FROM auth.users
    WHERE id = auth.uid()
    AND raw_user_meta_data->>'role' = 'super_admin'
  )
) WITH CHECK (
  EXISTS (
    SELECT 1 
    FROM auth.users
    WHERE id = auth.uid()
    AND raw_user_meta_data->>'role' = 'super_admin'
  )
);

-- Verify the policies
SELECT * FROM pg_policies 
WHERE schemaname = 'public' 
AND (tablename = 'profiles' OR tablename = 'enrollments');
