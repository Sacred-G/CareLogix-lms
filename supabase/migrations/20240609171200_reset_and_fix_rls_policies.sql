-- Step 1: Drop all existing policies on lessons, sections, and courses
-- This ensures we start with a clean slate

-- Drop policies on lessons
DROP POLICY IF EXISTS "View lessons in accessible sections" ON public.lessons;
DROP POLICY IF EXISTS "Lessons are viewable by everyone" ON public.lessons;
DROP POLICY IF EXISTS "Anyone can insert lessons" ON public.lessons;
DROP POLICY IF EXISTS "Anyone can update lessons" ON public.lessons;
DROP POLICY IF EXISTS "Insert lessons for authenticated users" ON public.lessons;
DROP POLICY IF EXISTS "Update lessons for authenticated users" ON public.lessons;
DROP POLICY IF EXISTS "View lessons" ON public.lessons;
DROP POLICY IF EXISTS "Insert lessons" ON public.lessons;
DROP POLICY IF EXISTS "Update lessons" ON public.lessons;
DROP POLICY IF EXISTS "Delete lessons" ON public.lessons;


-- Drop policies on sections
DROP POLICY IF EXISTS "View sections in accessible courses" ON public.sections;
DROP POLICY IF EXISTS "Sections are viewable by everyone" ON public.sections;
DROP POLICY IF EXISTS "Authenticated users can insert sections" ON public.sections;
DROP POLICY IF EXISTS "Authenticated users can update sections" ON public.sections;
DROP POLICY IF EXISTS "Insert sections for authenticated users" ON public.sections;
DROP POLICY IF EXISTS "Update sections for authenticated users" ON public.sections;
DROP POLICY IF EXISTS "View sections" ON public.sections;
DROP POLICY IF EXISTS "Insert sections" ON public.sections;
DROP POLICY IF EXISTS "Update sections" ON public.sections;
DROP POLICY IF EXISTS "Delete sections" ON public.sections;

-- Drop policies on courses
DROP POLICY IF EXISTS "Allow authenticated users to delete courses" ON public.courses;
DROP POLICY IF EXISTS "Delete courses" ON public.courses;
DROP POLICY IF EXISTS "View courses" ON public.courses;
DROP POLICY IF EXISTS "Insert courses" ON public.courses;
DROP POLICY IF EXISTS "Update courses" ON public.courses;


-- Step 2: Add created_by and domain columns to courses, sections, and lessons if they don't exist
ALTER TABLE public.courses 
ADD COLUMN IF NOT EXISTS created_by UUID REFERENCES auth.users(id);
ALTER TABLE public.courses
ADD COLUMN IF NOT EXISTS domain TEXT;

ALTER TABLE public.sections
ADD COLUMN IF NOT EXISTS domain TEXT;

ALTER TABLE public.lessons
ADD COLUMN IF NOT EXISTS domain TEXT;

-- Step 3: Recreate lessons policies with domain checks
-- Allow viewing lessons if the section exists and the domain matches or is null
CREATE POLICY "View lessons" 
ON public.lessons 
FOR SELECT 
USING (
  public.get_user_domain() = lessons.domain OR lessons.domain IS NULL
);

-- Allow inserting lessons for authenticated users within their domain
CREATE POLICY "Insert lessons" 
ON public.lessons 
FOR INSERT 
WITH CHECK (
  auth.role() = 'authenticated' AND public.get_user_domain() = lessons.domain
);

-- Allow updating lessons for authenticated users within their domain
CREATE POLICY "Update lessons" 
ON public.lessons 
FOR UPDATE 
USING (
  auth.role() = 'authenticated' AND public.get_user_domain() = lessons.domain
);

-- Allow deleting lessons for authenticated users within their domain
CREATE POLICY "Delete lessons"
ON public.lessons
FOR DELETE
USING (
  auth.role() = 'authenticated' AND public.get_user_domain() = lessons.domain
);

-- Step 4: Recreate sections policies with domain checks
-- Allow viewing sections if the course is accessible and the domain matches or is null
CREATE POLICY "View sections" 
ON public.sections 
FOR SELECT 
USING (
  public.get_user_domain() = sections.domain OR sections.domain IS NULL
);

-- Allow inserting sections for authenticated users within their domain
CREATE POLICY "Insert sections" 
ON public.sections 
FOR INSERT 
WITH CHECK (
  auth.role() = 'authenticated' AND public.get_user_domain() = sections.domain
);

-- Allow updating sections for authenticated users within their domain
CREATE POLICY "Update sections" 
ON public.sections 
FOR UPDATE 
USING (
  auth.role() = 'authenticated' AND public.get_user_domain() = sections.domain
);

-- Allow deleting sections for authenticated users within their domain
CREATE POLICY "Delete sections"
ON public.sections
FOR DELETE
USING (
  auth.role() = 'authenticated' AND public.get_user_domain() = sections.domain
);

-- Step 5: Recreate courses policies with domain checks
-- Allow viewing courses if the domain matches or is null
CREATE POLICY "View courses"
ON public.courses
FOR SELECT
USING (
  public.get_user_domain() = courses.domain OR courses.domain IS NULL
);

-- Allow inserting courses for authenticated users within their domain
CREATE POLICY "Insert courses"
ON public.courses
FOR INSERT
WITH CHECK (
  auth.role() = 'authenticated' AND public.get_user_domain() = courses.domain
);

-- Allow updating courses for authenticated users within their domain
CREATE POLICY "Update courses"
ON public.courses
FOR UPDATE
USING (
  auth.role() = 'authenticated' AND public.get_user_domain() = courses.domain
);

-- Allow deleting courses for authenticated users within their domain
CREATE POLICY "Delete courses"
ON public.courses
FOR DELETE
USING (
  auth.role() = 'authenticated' AND public.get_user_domain() = courses.domain
);

-- Step 6: Add comments to document the policies
COMMENT ON POLICY "View lessons" ON public.lessons IS 'Allow viewing all lessons within the user''s domain or public lessons';
COMMENT ON POLICY "Insert lessons" ON public.lessons IS 'Allow inserting lessons for authenticated users within their domain';
COMMENT ON POLICY "Update lessons" ON public.lessons IS 'Allow updating lessons for authenticated users within their domain';
COMMENT ON POLICY "Delete lessons" ON public.lessons IS 'Allow deleting lessons for authenticated users within their domain';

COMMENT ON POLICY "View sections" ON public.sections IS 'Allow viewing all sections within the user''s domain or public sections';
COMMENT ON POLICY "Insert sections" ON public.sections IS 'Allow inserting sections for authenticated users within their domain';
COMMENT ON POLICY "Update sections" ON public.sections IS 'Allow updating sections for authenticated users within their domain';
COMMENT ON POLICY "Delete sections" ON public.sections IS 'Allow deleting sections for authenticated users within their domain';

COMMENT ON POLICY "View courses" ON public.courses IS 'Allow viewing courses within the user''s domain or public courses';
COMMENT ON POLICY "Insert courses" ON public.courses IS 'Allow inserting courses for authenticated users within their domain';
COMMENT ON POLICY "Update courses" ON public.courses IS 'Allow updating courses for authenticated users within their domain';
COMMENT ON POLICY "Delete courses" ON public.courses IS 'Allow deleting courses for authenticated users within their domain';

-- Add a comment to document this migration
COMMENT ON TABLE public.courses IS 'RLS policies reset and fixed to allow course creation and management with domain restrictions';
