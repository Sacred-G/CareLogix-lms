-- Fix the list_users_for_certificates function to use correct table and column names
CREATE OR REPLACE FUNCTION public.list_users_for_certificates()
RETURNS TABLE (
  user_id uuid,
  email text,
  full_name text,
  enrolled_courses text[]
)
LANGUAGE sql
SECURITY DEFINER
AS $$
  SELECT 
    u.id as user_id,
    u.email,
    p.full_name,
    ARRAY(
      SELECT DISTINCT c.title 
      FROM enrollments e
      JOIN courses c ON e.course_id = c.id
      WHERE e.user_id = u.id
      AND e.completed = true
    ) as enrolled_courses
  FROM auth.users u
  LEFT JOIN profiles p ON u.id = p.id
  WHERE u.email_confirmed_at IS NOT NULL
  ORDER BY p.full_name, u.email;
$$;

-- Also ensure the courses table has the is_published column for list_available_courses
-- Add is_published column if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'courses' AND column_name = 'is_published') THEN
        ALTER TABLE courses ADD COLUMN is_published BOOLEAN DEFAULT true;
    END IF;
END $$;

-- Update existing courses to be published by default
UPDATE courses SET is_published = true WHERE is_published IS NULL;
