-- Drop all existing policies on courses table to avoid conflicts
DROP POLICY IF EXISTS "Allow all authenticated users to view courses" ON public.courses;
DROP POLICY IF EXISTS "Allow all authenticated users to insert courses" ON public.courses;
DROP POLICY IF EXISTS "Allow all authenticated users to update courses" ON public.courses;
DROP POLICY IF EXISTS "Allow all authenticated users to delete courses" ON public.courses;

-- First, ensure RLS is enabled on the courses table
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;

-- Create a single, permissive policy that allows all operations for authenticated users
CREATE POLICY "Allow all operations on courses for authenticated users" 
ON public.courses
FOR ALL
USING (auth.role() = 'authenticated')
WITH CHECK (true);

-- Add a comment to document this change
COMMENT ON TABLE public.courses 
IS 'Courses table with permissive RLS policies for all authenticated users';

-- Verify the policies were applied
SELECT 
    tablename,
    policyname,
    permissive,
    roles,
    cmd,
    qual,
    with_check
FROM 
    pg_policies 
WHERE 
    tablename = 'courses';
