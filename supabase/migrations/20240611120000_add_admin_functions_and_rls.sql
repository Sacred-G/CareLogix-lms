-- Create or replace the is_admin function
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
AS $$
  SELECT EXISTS (
    SELECT 1 FROM profiles 
    WHERE id = auth.uid() 
    AND (role = 'super_admin' OR role = 'domain_admin' OR role = 'admin')
  );
$$;

-- Enable RLS on profiles table if not already enabled
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

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

-- Add index on role for faster lookups
CREATE INDEX IF NOT EXISTS profiles_role_idx ON public.profiles (role);

-- Add index on email_domain for faster lookups
CREATE INDEX IF NOT EXISTS profiles_email_domain_idx ON public.profiles (email_domain);
