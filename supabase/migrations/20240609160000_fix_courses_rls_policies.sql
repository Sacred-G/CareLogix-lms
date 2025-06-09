-- Drop existing policies to avoid conflicts
DROP POLICY IF EXISTS "Courses are viewable by everyone" ON public.courses;
DROP POLICY IF EXISTS "Anyone can insert courses" ON public.courses;
DROP POLICY IF EXISTS "Anyone can update courses" ON public.courses;

-- Create new, more permissive policies
-- Allow all authenticated users to view courses
CREATE POLICY "Allow all authenticated users to view courses" 
ON public.courses
FOR SELECT 
TO authenticated
USING (true);

-- Allow all authenticated users to insert courses
CREATE POLICY "Allow all authenticated users to insert courses"
ON public.courses
FOR INSERT
TO authenticated
WITH CHECK (true);

-- Allow all authenticated users to update courses
CREATE POLICY "Allow all authenticated users to update courses"
ON public.courses
FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

-- Allow all authenticated users to delete courses
CREATE POLICY "Allow all authenticated users to delete courses"
ON public.courses
FOR DELETE
TO authenticated
USING (true);

-- Add a comment explaining the purpose of these policies
COMMENT ON TABLE public.courses IS 'Courses table with permissive RLS policies for authenticated users';

-- Optional: Add a function to verify the policies were applied correctly
CREATE OR REPLACE FUNCTION public.verify_courses_policies()
RETURNS TABLE(policy_name text, cmd text, permissive text, roles text[], qual text, with_check text)
LANGUAGE sql
SECURITY DEFINER
AS $$
  SELECT 
    policyname AS policy_name,
    cmd,
    permissive,
    roles,
    qual,
    with_check
  FROM pg_policies 
  WHERE tablename = 'courses';
$$;
