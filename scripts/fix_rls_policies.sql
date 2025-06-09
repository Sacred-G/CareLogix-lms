-- First, let's disable RLS temporarily to fix the policies
ALTER TABLE public.profiles DISABLE ROW LEVEL SECURITY;

-- Now let's drop all existing policies to prevent recursion
DROP POLICY IF EXISTS "super_admin_full_access" ON public.profiles;
DROP POLICY IF EXISTS "domain_admin_access" ON public.profiles;
DROP POLICY IF EXISTS "admin_access" ON public.profiles;
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;

-- Create a simple policy for super admins first
CREATE POLICY "super_admin_full_access" 
ON public.profiles
FOR ALL
TO authenticated
USING (auth.uid() IN (
  SELECT id FROM auth.users 
  WHERE raw_user_meta_data->>'role' = 'super_admin'
));

-- Enable RLS again
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create a simple policy to allow users to see their own profile
CREATE POLICY "Users can view own profile" 
ON public.profiles
FOR SELECT
TO authenticated
USING (auth.uid() = id);

-- Create a simple policy to allow users to update their own profile
CREATE POLICY "Users can update own profile" 
ON public.profiles
FOR UPDATE
TO authenticated
USING (auth.uid() = id);

-- Verify the policies
SELECT * FROM pg_policies 
WHERE tablename = 'profiles';
