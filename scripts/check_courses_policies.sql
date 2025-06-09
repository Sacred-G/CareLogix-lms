-- Check current RLS policies on courses table
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

-- Check if RLS is enabled on the courses table
SELECT 
    tablename, 
    rowsecurity 
FROM 
    pg_tables 
WHERE 
    schemaname = 'public' 
    AND tablename = 'courses';
