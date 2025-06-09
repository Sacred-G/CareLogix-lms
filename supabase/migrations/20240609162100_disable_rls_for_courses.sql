-- Temporarily disable RLS on the courses table for testing
ALTER TABLE public.courses DISABLE ROW LEVEL SECURITY;

-- Add a comment to document this change
COMMENT ON TABLE public.courses 
IS 'RLS temporarily disabled for testing. Re-enable with: ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;';

-- Verify RLS is disabled
SELECT 
    relname AS table_name, 
    relrowsecurity AS rls_enabled
FROM 
    pg_class 
WHERE 
    relname = 'courses';
