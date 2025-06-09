-- Migration to add the get_my_profile_data function for RLS policy use

-- First, drop the function if it exists to avoid conflicts
DROP FUNCTION IF EXISTS public.get_my_profile_data();

-- Create the function with SECURITY DEFINER
CREATE OR REPLACE FUNCTION public.get_my_profile_data()
RETURNS TABLE(user_id uuid, user_role text, user_email_domain text, user_managed_domains text[])
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $func$
BEGIN
  RETURN QUERY
  SELECT 
    p.id as user_id, 
    p.role as user_role, 
    p.email_domain as user_email_domain, 
    COALESCE(p.managed_domains, '{}'::text[]) as user_managed_domains
  FROM public.profiles p
  WHERE p.id = auth.uid();
END;
$func$;

-- Grant execute permission to authenticated users
GRANT EXECUTE ON FUNCTION public.get_my_profile_data() TO authenticated;

-- Instead of changing the owner, we'll use the current owner (postgres)
-- and ensure the function has the right permissions
COMMENT ON FUNCTION public.get_my_profile_data() IS 
  'Returns profile data for the current user. Used in RLS policies.';