-- Migration: Add Admin Roles
-- This migration adds the necessary database structure for multi-level admin roles

-- 1. Create admin_role_type enum if it doesn't exist
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'admin_role_type') THEN
        CREATE TYPE admin_role_type AS ENUM ('super_admin', 'domain_admin', 'admin', 'student');
    END IF;
END$$;

-- 2. Alter profiles table to add the necessary columns
ALTER TABLE profiles
ADD COLUMN IF NOT EXISTS email_domain TEXT,
ADD COLUMN IF NOT EXISTS managed_domains TEXT[] DEFAULT '{}';

-- 3. Set the email domain for existing users
UPDATE profiles
SET email_domain = SPLIT_PART(email, '@', 2)
WHERE email_domain IS NULL AND email IS NOT NULL;

-- 4. Create function to check if a user is a super admin
CREATE OR REPLACE FUNCTION is_super_admin() 
RETURNS BOOLEAN AS $$
DECLARE
  user_role TEXT;
BEGIN
  SELECT role INTO user_role FROM profiles WHERE id = auth.uid();
  RETURN user_role = 'super_admin';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 5. Create function to check if a user is a domain admin
CREATE OR REPLACE FUNCTION is_domain_admin() 
RETURNS BOOLEAN AS $$
DECLARE
  user_role TEXT;
BEGIN
  SELECT role INTO user_role FROM profiles WHERE id = auth.uid();
  RETURN user_role = 'domain_admin';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 6. Create function to get a user's managed domains
CREATE OR REPLACE FUNCTION get_managed_domains() 
RETURNS TEXT[] AS $$
DECLARE
  domains TEXT[];
  user_role TEXT;
  user_email_domain TEXT;
BEGIN
  -- Get user info
  SELECT role, email_domain, managed_domains 
  INTO user_role, user_email_domain, domains 
  FROM profiles 
  WHERE id = auth.uid();
  
  -- Super admin manages all domains
  IF user_role = 'super_admin' THEN
    SELECT ARRAY_AGG(DISTINCT email_domain) 
    INTO domains 
    FROM profiles 
    WHERE email_domain IS NOT NULL;
    RETURN domains;
  END IF;
  
  -- Domain admin manages specified domains
  IF user_role = 'domain_admin' AND domains IS NOT NULL AND array_length(domains, 1) > 0 THEN
    RETURN domains;
  END IF;
  
  -- Regular admin and domain admin with no specified domains just manage their own domain
  IF (user_role = 'admin' OR user_role = 'domain_admin') AND user_email_domain IS NOT NULL THEN
    RETURN ARRAY[user_email_domain];
  END IF;
  
  -- Default
  RETURN '{}';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 7. Create function to check if user can manage another user
CREATE OR REPLACE FUNCTION can_manage_user(target_user_id UUID) 
RETURNS BOOLEAN AS $$
DECLARE
  current_user_role TEXT;
  current_user_domains TEXT[];
  target_user_domain TEXT;
  target_user_role TEXT;
BEGIN
  -- Get current user info
  SELECT role, managed_domains INTO current_user_role, current_user_domains 
  FROM profiles 
  WHERE id = auth.uid();
  
  -- Get target user info
  SELECT email_domain, role INTO target_user_domain, target_user_role 
  FROM profiles 
  WHERE id = target_user_id;
  
  -- Super admin can manage everyone
  IF current_user_role = 'super_admin' THEN
    RETURN TRUE;
  END IF;
  
  -- Domain admin can manage users in their domains except super_admin and other domain_admin
  IF current_user_role = 'domain_admin' THEN
    RETURN target_user_domain = ANY(current_user_domains) 
      AND target_user_role != 'super_admin' 
      AND target_user_role != 'domain_admin';
  END IF;
  
  -- Regular admin can only manage students in their domain
  IF current_user_role = 'admin' THEN
    RETURN target_user_domain = ANY(current_user_domains) 
      AND target_user_role = 'student';
  END IF;
  
  -- Default: no management rights
  RETURN FALSE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 8. Update existing is_admin function
CREATE OR REPLACE FUNCTION is_admin() 
RETURNS BOOLEAN AS $$
DECLARE
  user_role TEXT;
BEGIN
  SELECT role INTO user_role FROM profiles WHERE id = auth.uid();
  RETURN user_role IN ('super_admin', 'domain_admin', 'admin');
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 9. Set admin@example.com as super_admin if it exists
UPDATE profiles
SET role = 'super_admin'
WHERE email = 'admin@example.com';

-- 10. Insert admin@example.com as super_admin if it doesn't exist (this will be handled by the application)
-- For safety, we're not inserting a user directly in the migration
