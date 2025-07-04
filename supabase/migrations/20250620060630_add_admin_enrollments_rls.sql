-- Update RLS policy to allow admins to manage enrollments
CREATE POLICY "Allow admins to manage enrollments"
  ON public.enrollments
  FOR ALL
  USING (
    auth.uid() IN (
      SELECT id FROM profiles 
      WHERE role IN ('super_admin', 'domain_admin')
    )
  );
