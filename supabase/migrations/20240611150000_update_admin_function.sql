-- Update the is_admin function without dropping it first
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

-- Add a comment to explain the function
COMMENT ON FUNCTION public.is_admin() IS 'Returns true if the current user is an admin (super_admin, domain_admin, or admin)';

-- Create a function to check if the current user is a service role
CREATE OR REPLACE FUNCTION public.is_service_role()
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
AS $$
  SELECT current_setting('role', true) = 'service_role';
$$;

-- Update the RLS policies to include service role check
DO $$
BEGIN
  -- Drop existing policies if they exist
  IF EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'profiles' AND policyname = 'Allow all access to service role') THEN
    DROP POLICY "Allow all access to service role" ON public.profiles;
  END IF;
  
  -- Create a policy that allows service role to bypass RLS
  EXECUTE 'CREATE POLICY "Allow all access to service role"
    ON public.profiles
    FOR ALL
    USING (public.is_service_role());';
  
  -- Drop and recreate other policies to ensure they're correct
  IF EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'profiles' AND policyname = 'Users can view their own profile') THEN
    DROP POLICY "Users can view their own profile" ON public.profiles;
  END IF;
  
  EXECUTE 'CREATE POLICY "Users can view their own profile"
    ON public.profiles
    FOR SELECT
    USING (auth.uid() = id);';
    
  -- Add other policies as needed...
  
  RAISE NOTICE 'Updated RLS policies for profiles table';
EXCEPTION WHEN OTHERS THEN
  RAISE EXCEPTION 'Error updating RLS policies: %', SQLERRM;
END
$$;
