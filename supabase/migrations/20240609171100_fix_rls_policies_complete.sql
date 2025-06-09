-- This migration has been commented out to prevent conflicts with
-- 20240609171200_reset_and_fix_rls_policies.sql, which provides a more
-- comprehensive reset and fix for RLS policies.

-- Step 1: Add created_by column to courses table if it doesn't exist
-- ALTER TABLE public.courses 
-- ADD COLUMN IF NOT EXISTS created_by UUID REFERENCES auth.users(id);

-- Step 2: Update existing courses to have a default created_by user (optional)
-- Uncomment and modify the following if you want to set a default user for existing courses
-- UPDATE public.courses
-- SET created_by = (SELECT id FROM auth.users WHERE email = 'admin@example.com' LIMIT 1)
-- WHERE created_by IS NULL;

-- Step 3: Drop all existing policies on lessons table
-- DROP POLICY IF EXISTS "Lessons are viewable by everyone" ON public.lessons;
-- DROP POLICY IF EXISTS "Anyone can insert lessons" ON public.lessons;
-- DROP POLICY IF EXISTS "Anyone can update lessons" ON public.lessons;
-- DROP POLICY IF EXISTS "View lessons in accessible sections" ON public.lessons;
-- DROP POLICY IF EXISTS "Insert lessons for authenticated users" ON public.lessons;
-- DROP POLICY IF EXISTS "Update lessons for authenticated users" ON public.lessons;

-- Step 4: Recreate lessons policies with proper access control
-- Allow viewing lessons if the user can view the section
-- CREATE POLICY "View lessons in accessible sections" 
-- ON public.lessons 
-- FOR SELECT 
-- USING (
--   EXISTS (
--     SELECT 1 FROM public.sections 
--     WHERE sections.id = lessons.section_id
--   )
-- );

-- Allow inserting lessons if the user is authenticated
-- CREATE POLICY "Insert lessons for authenticated users" 
-- ON public.lessons 
-- FOR INSERT 
-- WITH CHECK (auth.role() = 'authenticated');

-- Allow updating lessons if the user is authenticated
-- CREATE POLICY "Update lessons for authenticated users" 
-- ON public.lessons 
-- FOR UPDATE 
-- USING (auth.role() = 'authenticated');

-- Step 5: Drop all existing policies on sections table
-- DROP POLICY IF EXISTS "Sections are viewable by everyone" ON public.sections;
-- DROP POLICY IF EXISTS "Authenticated users can insert sections" ON public.sections;
-- DROP POLICY IF EXISTS "Authenticated users can update sections" ON public.sections;
-- DROP POLICY IF EXISTS "View sections in accessible courses" ON public.sections;
-- DROP POLICY IF EXISTS "Insert sections for authenticated users" ON public.sections;
-- DROP POLICY IF EXISTS "Update sections for authenticated users" ON public.sections;

-- Step 6: Recreate sections policies with proper access control
-- Allow viewing sections if the course is accessible
-- CREATE POLICY "View sections in accessible courses" 
-- ON public.sections 
-- FOR SELECT 
-- USING (true);

-- Allow inserting sections if the user is authenticated and the course exists
-- CREATE POLICY "Insert sections for authenticated users" 
-- ON public.sections 
-- FOR INSERT 
-- WITH CHECK (auth.role() = 'authenticated');

-- Allow updating sections if the user is authenticated
-- CREATE POLICY "Update sections for authenticated users" 
-- ON public.sections 
-- FOR UPDATE 
-- USING (auth.role() = 'authenticated');

-- Step 7: Add a simple delete policy for courses (without created_by check for now)
-- CREATE OR REPLACE POLICY "Allow authenticated users to delete courses"
-- ON public.courses
-- FOR DELETE
-- TO authenticated
-- USING (true);

-- Add comments to document the changes
-- COMMENT ON POLICY "View lessons in accessible sections" ON public.lessons IS 'Allow viewing lessons in sections that the user can access';
-- COMMENT ON POLICY "Insert lessons for authenticated users" ON public.lessons IS 'Allow inserting lessons for any authenticated user';
-- COMMENT ON POLICY "Update lessons for authenticated users" ON public.lessons IS 'Allow updating lessons for any authenticated user';
-- COMMENT ON POLICY "View sections in accessible courses" ON public.sections IS 'Allow viewing sections in courses';
-- COMMENT ON POLICY "Insert sections for authenticated users" ON public.sections IS 'Allow inserting sections for any authenticated user';
-- COMMENT ON POLICY "Update sections for authenticated users" ON public.sections IS 'Allow updating sections for any authenticated user';
-- COMMENT ON POLICY "Allow authenticated users to delete courses" ON public.courses IS 'Allow any authenticated user to delete courses (temporary policy)';

-- Add a comment to document this migration
-- COMMENT ON TABLE public.courses IS 'RLS policies updated to fix course creation and management';

-- Disable the problematic migration to prevent it from running again
-- This is a workaround since we can't delete migrations once they're in the history
-- In a production environment, you might want to use a more robust migration management system
-- or manually mark the migration as applied in the schema_migrations table
-- UPDATE supabase_migrations.schema_migrations 
-- SET version = '20240609162300' 
-- WHERE version = '20240609162300' AND version != '20240609162300';
