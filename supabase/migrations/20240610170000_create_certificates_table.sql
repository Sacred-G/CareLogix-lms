-- Create certificates table
CREATE TABLE certificates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  user_name TEXT NOT NULL,
  course_id TEXT NOT NULL,
  course_title TEXT NOT NULL,
  issue_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completion_date TIMESTAMP WITH TIME ZONE,
  valid_until TIMESTAMP WITH TIME ZONE,
  certificate_number TEXT,
  organization_name TEXT,
  organization_logo TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security for certificates
ALTER TABLE certificates ENABLE ROW LEVEL SECURITY;

-- Policy to allow users to view their own certificates
CREATE POLICY "Users can view their own certificates"
  ON certificates FOR SELECT
  USING (auth.uid() = user_id);

-- Policy to allow users to insert their own certificates (e.g., upon course completion)
CREATE POLICY "Users can insert their own certificates"
  ON certificates FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Policy to allow admins to view all certificates
CREATE POLICY "Admins can view all certificates"
  ON certificates FOR SELECT
  USING (public.is_admin());

-- Policy to allow admins to insert certificates
CREATE POLICY "Admins can insert certificates"
  ON certificates FOR INSERT
  WITH CHECK (public.is_admin());

-- Policy to allow admins to update certificates
CREATE POLICY "Admins can update certificates"
  ON certificates FOR UPDATE
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- Policy to allow admins to delete certificates
CREATE POLICY "Admins can delete certificates"
  ON certificates FOR DELETE
  USING (public.is_admin());

-- Add index for user_id for faster lookups
CREATE INDEX idx_certificates_user_id ON certificates(user_id);
