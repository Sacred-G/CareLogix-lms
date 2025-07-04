-- Drop existing policy if it exists
DROP POLICY IF EXISTS "Allow admins to manage enrollments" ON public.enrollments;

-- Create a function to get the current user's domain
CREATE OR REPLACE FUNCTION public.get_user_domain()
RETURNS text
LANGUAGE sql
SECURITY DEFINER
AS $$
  SELECT email_domain 
  FROM public.profiles 
  WHERE id = auth.uid() 
  LIMIT 1;
$$;

-- Create a function to check if user is a super admin
CREATE OR REPLACE FUNCTION public.is_super_admin()
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() 
    AND role = 'super_admin'
  );
$$;

-- Create a function to check if user is a domain admin
CREATE OR REPLACE FUNCTION public.is_domain_admin()
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() 
    AND role = 'domain_admin'
  );
$$;

-- Create a function to check if user is an admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() 
    AND role IN ('super_admin', 'domain_admin', 'admin')
  );
$$;

-- Policy to allow service role full access (bypasses RLS)
CREATE POLICY "Allow all access to service role"
  ON public.enrollments
  FOR ALL
  USING (auth.role() = 'service_role');

-- Policy to allow users to view their own enrollments
CREATE POLICY "Users can view their own enrollments"
  ON public.enrollments
  FOR SELECT
  USING (auth.uid() = user_id);

-- Policy to allow super admins to manage all enrollments
CREATE POLICY "Super admins can manage all enrollments"
  ON public.enrollments
  FOR ALL
  USING (public.is_super_admin());

-- Policy to allow domain admins to manage enrollments in their domain
CREATE POLICY "Domain admins can manage enrollments in their domain"
  ON public.enrollments
  FOR ALL
  USING (
    public.is_domain_admin() AND
    user_id IN (
      SELECT id 
      FROM public.profiles 
      WHERE email_domain = public.get_user_domain()
      AND role NOT IN ('super_admin', 'domain_admin', 'admin')
    )
  );

-- Policy to allow regular admins to manage enrollments in their domain
CREATE POLICY "Admins can manage enrollments in their domain"
  ON public.enrollments
  FOR ALL
  USING (
    public.is_admin() AND
    user_id IN (
      SELECT id 
      FROM public.profiles 
      WHERE email_domain = public.get_user_domain()
      AND role = 'student'
    )
  );

-- Policy to allow users to manage their own enrollments
CREATE POLICY "Users can manage their own enrollments"
  ON public.enrollments
  FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);
