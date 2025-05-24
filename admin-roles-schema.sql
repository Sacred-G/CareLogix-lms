-- Create roles enum type
CREATE TYPE admin_role_type AS ENUM ('super_admin', 'domain_admin', 'admin', 'student');

-- Update profiles table with new role column if it doesn't exist
ALTER TABLE profiles 
  ALTER COLUMN role TYPE admin_role_type USING (role::admin_role_type),
  ADD COLUMN IF NOT EXISTS email_domain TEXT,
  ADD COLUMN IF NOT EXISTS managed_domains TEXT[] DEFAULT '{}';

-- Make sure the super admin exists
INSERT INTO profiles (id, full_name, email, role, email_domain)
VALUES 
  ('00000000-0000-0000-0000-000000000000', 'Super Admin', 'admin@example.com', 'super_admin', 'example.com')
ON CONFLICT (id) DO UPDATE 
SET role = 'super_admin', email = 'admin@example.com';

-- Function to extract domain from email
CREATE OR REPLACE FUNCTION extract_email_domain(email TEXT) 
RETURNS TEXT AS $$
BEGIN
  RETURN SPLIT_PART(email, '@', 2);
END;
$$ LANGUAGE plpgsql;

-- Updated is_admin function
CREATE OR REPLACE FUNCTION is_admin() 
RETURNS BOOLEAN AS $$
DECLARE
  user_role admin_role_type;
BEGIN
  SELECT role INTO user_role FROM profiles WHERE id = auth.uid();
  RETURN user_role IN ('super_admin', 'domain_admin', 'admin');
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to check if user is a super admin
CREATE OR REPLACE FUNCTION is_super_admin() 
RETURNS BOOLEAN AS $$
DECLARE
  user_role admin_role_type;
BEGIN
  SELECT role INTO user_role FROM profiles WHERE id = auth.uid();
  RETURN user_role = 'super_admin';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to check if user is a domain admin
CREATE OR REPLACE FUNCTION is_domain_admin() 
RETURNS BOOLEAN AS $$
DECLARE
  user_role admin_role_type;
BEGIN
  SELECT role INTO user_role FROM profiles WHERE id = auth.uid();
  RETURN user_role = 'domain_admin';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get user's managed domains
CREATE OR REPLACE FUNCTION get_managed_domains() 
RETURNS TEXT[] AS $$
DECLARE
  domains TEXT[];
  user_role admin_role_type;
BEGIN
  SELECT role, managed_domains INTO user_role, domains FROM profiles WHERE id = auth.uid();
  
  IF user_role = 'super_admin' THEN
    -- Super admin manages all domains
    SELECT ARRAY_AGG(DISTINCT email_domain) INTO domains FROM profiles WHERE email_domain IS NOT NULL;
  END IF;
  
  RETURN domains;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to check if current user can manage a specific user
CREATE OR REPLACE FUNCTION can_manage_user(target_user_id UUID) 
RETURNS BOOLEAN AS $$
DECLARE
  current_user_role admin_role_type;
  current_user_domains TEXT[];
  target_user_domain TEXT;
BEGIN
  -- Get current user info
  SELECT role, managed_domains INTO current_user_role, current_user_domains FROM profiles WHERE id = auth.uid();
  
  -- Super admin can manage everyone
  IF current_user_role = 'super_admin' THEN
    RETURN TRUE;
  END IF;
  
  -- Get target user domain
  SELECT email_domain INTO target_user_domain FROM profiles WHERE id = target_user_id;
  
  -- Domain admin can only manage users in their domains
  IF current_user_role = 'domain_admin' THEN
    RETURN target_user_domain = ANY(current_user_domains);
  END IF;
  
  -- Regular admins can't manage other users
  RETURN FALSE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
