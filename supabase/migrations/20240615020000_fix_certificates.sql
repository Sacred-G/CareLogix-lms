-- Add organization_domain column to certificates table if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM information_schema.columns
    WHERE table_name = 'certificates' AND column_name = 'organization_domain'
  ) THEN
    ALTER TABLE certificates ADD COLUMN organization_domain TEXT;
  END IF;
END $$;

-- Create or update the admin check function
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM profiles p
    WHERE p.id = auth.uid() AND (
      p.role = 'super_admin' OR
      p.role = 'domain_admin' OR
      p.role = 'admin'
    )
  );
$$;

-- Add a more permissive policy for manual certificate issuance
CREATE POLICY IF NOT EXISTS "Allow manual certificate issuance"
  ON certificates FOR INSERT
  WITH CHECK (user_id = 'manual-issuance' AND public.is_admin());

-- Grant usage on sequences for certificates table
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO authenticated;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO anon;

-- Refresh the existing policies
DROP POLICY IF EXISTS "Admins can insert certificates" ON certificates;
CREATE POLICY "Admins can insert certificates"
  ON certificates FOR INSERT
  WITH CHECK (public.is_admin());
