-- Migration to fix admin functions and ensure proper RLS policies
-- Note: We're updating the functions in place to avoid dropping them due to dependencies

-- Recreate with proper security settings
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
AS $_$
DECLARE
  user_role TEXT;
BEGIN
  SELECT role INTO user_role FROM profiles WHERE id = auth.uid();
  RETURN user_role IN ('admin', 'super_admin', 'domain_admin');
END;
$_$;

CREATE OR REPLACE FUNCTION public.is_super_admin()
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
AS $_$
DECLARE
  user_role TEXT;
BEGIN
  SELECT role INTO user_role FROM profiles WHERE id = auth.uid();
  RETURN user_role = 'super_admin';
END;
$_$;

CREATE OR REPLACE FUNCTION public.is_domain_admin()
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
AS $_$
DECLARE
  user_role TEXT;
BEGIN
  SELECT role INTO user_role FROM profiles WHERE id = auth.uid();
  RETURN user_role = 'domain_admin';
END;
$_$;

-- Ensure RLS is enabled on profiles table
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create or replace admin policies
DO $$
BEGIN
  -- Drop existing policies if they exist
  IF EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'profiles' AND policyname = 'Allow admin access') THEN
    DROP POLICY "Allow admin access" ON public.profiles;
  END IF;
  
  -- Create admin policy
  CREATE POLICY "Allow admin access"
  ON public.profiles
  FOR ALL
  USING (
    auth.uid() IN (
      SELECT id FROM auth.users 
      WHERE raw_user_meta_data->>'role' IN ('admin', 'super_admin')
    )
  );
  
  -- Allow users to see their own profile
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'profiles' AND policyname = 'Allow users to see own profile') THEN
    CREATE POLICY "Allow users to see own profile"
    ON public.profiles
    FOR SELECT
    USING (auth.uid() = id);
  END IF;
  
  -- Allow users to update their own profile
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'profiles' AND policyname = 'Allow users to update own profile') THEN
    CREATE POLICY "Allow users to update own profile"
    ON public.profiles
    FOR UPDATE
    USING (auth.uid() = id);
  END IF;
END
$$;
