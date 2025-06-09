-- Re-enable RLS on the courses table
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;

-- Add a comment to document this change
COMMENT ON TABLE public.courses 
IS 'RLS re-enabled for the courses table.';

-- Verify RLS is enabled
SELECT 
    relname AS table_name, 
    relrowsecurity AS rls_enabled
FROM 
    pg_class 
WHERE 
    relname = 'courses';
