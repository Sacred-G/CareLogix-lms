-- Drop the existing foreign key constraint
ALTER TABLE enrollments
DROP CONSTRAINT IF EXISTS enrollments_course_id_fkey;

-- Recreate the foreign key with CASCADE DELETE
ALTER TABLE enrollments
ADD CONSTRAINT enrollments_course_id_fkey
FOREIGN KEY (course_id)
REFERENCES courses(id)
ON DELETE CASCADE;
