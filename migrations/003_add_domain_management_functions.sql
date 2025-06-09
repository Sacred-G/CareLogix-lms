-- Migration to add domain management functions and policies

-- Add 'domain' column to profiles table if it doesn't exist
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='profiles' AND column_name='domain') THEN
        ALTER TABLE public.profiles
        ADD COLUMN domain TEXT;
    END IF;
END
$$;

-- Create or replace get_managed_domains function
CREATE OR REPLACE FUNCTION public.get_managed_domains()
RETURNS SETOF TEXT
LANGUAGE plpgsql
SECURITY DEFINER
AS $_$
DECLARE
  user_role TEXT;
  user_domain TEXT;
BEGIN
  SELECT raw_user_meta_data->>'role' INTO user_role FROM auth.users WHERE id = auth.uid();
  SELECT domain INTO user_domain FROM public.profiles WHERE id = auth.uid();

  IF user_role = 'super_admin' OR user_role = 'admin' THEN
    -- Super admins and general admins can see all unique domains from profiles
    RETURN QUERY SELECT DISTINCT domain FROM public.profiles WHERE domain IS NOT NULL;
  ELSIF user_role = 'domain_admin' THEN
    -- Domain admins can only see their assigned domain
    RETURN QUERY SELECT user_domain WHERE user_domain IS NOT NULL;
  ELSE
    -- Other roles see no domains
    RETURN;
  END IF;
END;
$_$;

-- Create or replace RLS policy for domain_admin to only see users from their domain
DO $$
BEGIN
  -- Drop existing policy if it exists
  IF EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'profiles' AND policyname = 'Allow domain admin to view users in their domain') THEN
    DROP POLICY "Allow domain admin to view users in their domain" ON public.profiles;
  END IF;
  
  -- Create domain admin policy
  CREATE POLICY "Allow domain admin to view users in their domain"
  ON public.profiles
  FOR SELECT
  USING (
    (SELECT raw_user_meta_data->>'role' FROM auth.users WHERE id = auth.uid()) = 'domain_admin'
    AND
    domain = (SELECT domain FROM public.profiles WHERE id = auth.uid())
  );
END
$$;

-- Ensure existing "Allow admin access" policy is updated to include domain_admin for full access
DO $$
BEGIN
  -- Drop existing policy if it exists
  IF EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'profiles' AND policyname = 'Allow admin access') THEN
    DROP POLICY "Allow admin access" ON public.profiles;
  END IF;
  
  -- Create admin policy, now including domain_admin for full access (this might need refinement based on exact requirements)
  -- Re-evaluating: The previous policy "Allow admin access" was for 'admin' and 'super_admin'.
  -- For 'domain_admin', a separate policy for SELECT is needed to restrict to their domain.
  -- The existing "Allow admin access" should remain for 'admin' and 'super_admin' to see all.
  -- The new policy "Allow domain admin to view users in their domain" handles the domain_admin's SELECT.
  -- No change needed to "Allow admin access" for this specific requirement.
  -- However, if domain_admins should also be able to INSERT/UPDATE/DELETE within their domain,
  -- additional policies would be needed. For now, focusing on the SELECT issue.
  
  -- Re-creating the original "Allow admin access" to ensure it's present and correct
  CREATE POLICY "Allow admin access"
  ON public.profiles
  FOR ALL
  USING (
    auth.uid() IN (
      SELECT id FROM auth.users 
      WHERE raw_user_meta_data->>'role' IN ('admin', 'super_admin')
    )
  );
END
$$;
