-- Disable RLS on all tables
ALTER TABLE public.profiles DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.enrollments DISABLE ROW LEVEL SECURITY;

-- Drop all policies from profiles
DO $$
DECLARE
    policy_record RECORD;
BEGIN
    FOR policy_record IN 
        SELECT policyname, tablename 
        FROM pg_policies 
        WHERE schemaname = 'public' 
        AND (tablename = 'profiles' OR tablename = 'enrollments')
    LOOP
        EXECUTE format('DROP POLICY IF EXISTS %I ON public.%I', 
                      policy_record.policyname, 
                      policy_record.tablename);
    END LOOP;
END $$;

-- Re-enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enrollments ENABLE ROW LEVEL SECURITY;

-- Create basic profiles policies
CREATE POLICY "Users can view own profile" 
ON public.profiles
FOR SELECT
USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
ON public.profiles
FOR UPDATE
USING (auth.uid() = id);

-- Create super admin policy with proper guards
CREATE POLICY "super_admin_full_access" 
ON public.profiles
FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM auth.users
    WHERE id = auth.uid()
    AND raw_user_meta_data->>'role' = 'super_admin'
  )
);

-- Create basic enrollments policies
CREATE POLICY "Users can view own enrollments"
ON public.enrollments
FOR SELECT
USING (user_id = auth.uid());

-- Verify the policies
SELECT * FROM pg_policies 
WHERE schemaname = 'public' 
AND (tablename = 'profiles' OR tablename = 'enrollments');
