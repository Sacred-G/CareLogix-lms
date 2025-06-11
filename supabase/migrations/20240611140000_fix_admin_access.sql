-- Create or replace the is_admin function with proper error handling
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
AS $$
  SELECT EXISTS (
    SELECT 1 FROM profiles 
    WHERE id = auth.uid() 
    AND role IN ('super_admin', 'domain_admin', 'admin')
  );
$$;

-- Enable RLS on profiles table if not already enabled
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Drop existing policies to avoid conflicts
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'profiles' AND policyname = 'Allow all access to service role') THEN
    DROP POLICY "Allow all access to service role" ON public.profiles;
  END IF;
  
  IF EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'profiles' AND policyname = 'Users can view their own profile') THEN
    DROP POLICY "Users can view their own profile" ON public.profiles;
  END IF;
  
  IF EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'profiles' AND policyname = 'Users can update their own profile') THEN
    DROP POLICY "Users can update their own profile" ON public.profiles;
  END IF;
  
  IF EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'profiles' AND policyname = 'Admins can view all profiles') THEN
    DROP POLICY "Admins can view all profiles" ON public.profiles;
  END IF;
  
  IF EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'profiles' AND policyname = 'Admins can update all profiles') THEN
    DROP POLICY "Admins can update all profiles" ON public.profiles;
  END IF;
  
  IF EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'profiles' AND policyname = 'Admins can insert profiles') THEN
    DROP POLICY "Admins can insert profiles" ON public.profiles;
  END IF;
  
  IF EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'profiles' AND policyname = 'Admins can delete profiles') THEN
    DROP POLICY "Admins can delete profiles" ON public.profiles;
  END IF;
END
$$;

-- Policy to allow service role full access (bypasses RLS)
CREATE POLICY "Allow all access to service role"
  ON public.profiles
  FOR ALL
  USING (auth.role() = 'service_role');

-- Policy to allow users to view their own profile
CREATE POLICY "Users can view their own profile"
  ON public.profiles
  FOR SELECT
  USING (auth.uid() = id);

-- Policy to allow users to update their own profile
CREATE POLICY "Users can update their own profile"
  ON public.profiles
  FOR UPDATE
  USING (auth.uid() = id);

-- Policy to allow admins to view all profiles
CREATE POLICY "Admins can view all profiles"
  ON public.profiles
  FOR SELECT
  USING (public.is_admin());

-- Policy to allow admins to update all profiles
CREATE POLICY "Admins can update all profiles"
  ON public.profiles
  FOR UPDATE
  USING (public.is_admin());

-- Policy to allow admins to insert profiles
CREATE POLICY "Admins can insert profiles"
  ON public.profiles
  FOR INSERT
  WITH CHECK (public.is_admin());

-- Policy to allow admins to delete profiles
CREATE POLICY "Admins can delete profiles"
  ON public.profiles
  FOR DELETE
  USING (public.is_admin());

-- Create a function to check if a user is a domain admin
CREATE OR REPLACE FUNCTION public.is_domain_admin()
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
AS $$
  SELECT EXISTS (
    SELECT 1 FROM profiles 
    WHERE id = auth.uid() 
    AND role = 'domain_admin'
  );
$$;

-- Create a function to get the current user's domain
CREATE OR REPLACE FUNCTION public.get_user_domain()
RETURNS text
LANGUAGE sql
SECURITY DEFINER
AS $$
  SELECT email_domain FROM profiles WHERE id = auth.uid();
$$;
