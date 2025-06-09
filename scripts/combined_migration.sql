-- Combined Migration Script for Supabase SQL Editor
-- Run this in the Supabase SQL Editor with service role privileges

-- 1. Create exec_sql function if it doesn't exist
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 
        FROM pg_proc 
        WHERE proname = 'exec_sql' 
        AND pronamespace = (SELECT oid FROM pg_namespace WHERE nspname = 'public')
    ) THEN
        CREATE OR REPLACE FUNCTION public.exec_sql(query text)
        RETURNS text
        LANGUAGE plpgsql
        SECURITY DEFINER
        AS $$
        BEGIN
            EXECUTE query;
            RETURN 'Query executed successfully';
        END;
        $$;

        -- Grant necessary permissions
        GRANT EXECUTE ON FUNCTION public.exec_sql(text) TO authenticated;
        GRANT EXECUTE ON FUNCTION public.exec_sql(text) TO service_role;
        
        RAISE NOTICE 'Created exec_sql function';
    ELSE
        RAISE NOTICE 'exec_sql function already exists';
    END IF;
END $$;

-- 2. Create admin_role_type enum if it doesn't exist
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'admin_role_type') THEN
        CREATE TYPE public.admin_role_type AS ENUM ('super_admin', 'domain_admin', 'admin', 'student');
        RAISE NOTICE 'Created admin_role_type enum';
    ELSE
        RAISE NOTICE 'admin_role_type enum already exists';
    END IF;
EXCEPTION WHEN OTHERS THEN
    RAISE NOTICE 'Error creating admin_role_type: %', SQLERRM;
END $$;

-- 3. Add columns to profiles table if they don't exist
DO $$
BEGIN
    -- Add email_domain if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                  WHERE table_schema = 'public' 
                  AND table_name = 'profiles' 
                  AND column_name = 'email_domain') THEN
        ALTER TABLE public.profiles ADD COLUMN email_domain TEXT;
        RAISE NOTICE 'Added email_domain column to profiles';
    END IF;
    
    -- Add managed_domains if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                  WHERE table_schema = 'public' 
                  AND table_name = 'profiles' 
                  AND column_name = 'managed_domains') THEN
        ALTER TABLE public.profiles ADD COLUMN managed_domains TEXT[] DEFAULT '{}';
        RAISE NOTICE 'Added managed_domains column to profiles';
    END IF;
    
    -- Set email_domain from auth.users if not set
    UPDATE public.profiles p
    SET email_domain = SPLIT_PART(u.email, '@', 2)
    FROM auth.users u
    WHERE p.id = u.id 
    AND p.email_domain IS NULL 
    AND u.email IS NOT NULL;
    
    RAISE NOTICE 'Updated email_domain for existing users';
    
EXCEPTION WHEN OTHERS THEN
    RAISE NOTICE 'Error updating profiles table: %', SQLERRM;
END $$;

-- 4. Create or replace admin functions
-- is_super_admin function
CREATE OR REPLACE FUNCTION public.is_super_admin() 
RETURNS BOOLEAN 
LANGUAGE plpgsql 
SECURITY DEFINER
AS $$
DECLARE
    user_role TEXT;
BEGIN
    SELECT role INTO user_role FROM public.profiles WHERE id = auth.uid();
    RETURN user_role = 'super_admin';
END;
$$;
    
-- is_domain_admin function
CREATE OR REPLACE FUNCTION public.is_domain_admin() 
RETURNS BOOLEAN 
LANGUAGE plpgsql 
SECURITY DEFINER
AS $$
DECLARE
    user_role TEXT;
BEGIN
    SELECT role INTO user_role FROM public.profiles WHERE id = auth.uid();
    RETURN user_role = 'domain_admin';
END;
$$;

-- is_admin function
CREATE OR REPLACE FUNCTION public.is_admin() 
RETURNS BOOLEAN 
LANGUAGE plpgsql 
SECURITY DEFINER
AS $$
DECLARE
    user_role TEXT;
BEGIN
    SELECT role INTO user_role FROM public.profiles WHERE id = auth.uid();
    RETURN user_role IN ('admin', 'domain_admin', 'super_admin');
END;
$$;

-- get_managed_domains function
CREATE OR REPLACE FUNCTION public.get_managed_domains() 
RETURNS TEXT[] 
LANGUAGE plpgsql 
SECURITY DEFINER
AS $$
DECLARE
    domains TEXT[];
    user_role TEXT;
    user_email_domain TEXT;
BEGIN
    SELECT role, email_domain INTO user_role, user_email_domain 
    FROM public.profiles 
    WHERE id = auth.uid();
    
    IF user_role = 'super_admin' THEN
        -- Super admins manage all domains
        SELECT array_agg(DISTINCT email_domain) INTO domains 
        FROM public.profiles 
        WHERE email_domain IS NOT NULL;
    ELSIF user_role = 'domain_admin' THEN
        -- Get the user's managed domains
        SELECT managed_domains INTO domains 
        FROM public.profiles 
        WHERE id = auth.uid();
        
        -- If no specific domains are managed, use the user's own domain
        IF domains IS NULL OR array_length(domains, 1) IS NULL THEN
            domains := ARRAY[user_email_domain];
        END IF;
    ELSE
        -- Regular users don't manage any domains
        domains := '{}';
    END IF;
    
    RETURN COALESCE(domains, '{}');
END;
$$;

-- Log completion of function creation
DO $$
BEGIN
    RAISE NOTICE 'Created/updated admin functions';
EXCEPTION WHEN OTHERS THEN
    RAISE NOTICE 'Error in completion notice: %', SQLERRM;
END $$;

-- 5. Drop existing policies if they exist
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'super_admin_full_access' AND tablename = 'profiles') THEN
        DROP POLICY "super_admin_full_access" ON public.profiles;
    END IF;
    
    IF EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'domain_admin_access' AND tablename = 'profiles') THEN
        DROP POLICY "domain_admin_access" ON public.profiles;
    END IF;
    
    IF EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'admin_access' AND tablename = 'profiles') THEN
        DROP POLICY "admin_access" ON public.profiles;
    END IF;
    
    RAISE NOTICE 'Dropped existing policies';
EXCEPTION WHEN OTHERS THEN
    RAISE NOTICE 'Error dropping policies: %', SQLERRM;
END $$;

-- 6. Create new policies
-- Super Admin: Full access to all profiles
DO $$
BEGIN
    CREATE POLICY "super_admin_full_access" ON public.profiles
        FOR ALL
        TO authenticated
        USING (public.is_super_admin());
    RAISE NOTICE 'Created super_admin_full_access policy';
EXCEPTION WHEN OTHERS THEN
    RAISE NOTICE 'Error creating super_admin_full_access policy: %', SQLERRM;
END $$;

-- Domain Admin: Can only see and manage profiles in their managed domains
DO $$
BEGIN
    CREATE POLICY "domain_admin_access" ON public.profiles
        FOR ALL
        TO authenticated
        USING (
            public.is_domain_admin()
            AND (
                email_domain = ANY(public.get_managed_domains())
                OR (SELECT array_length(public.get_managed_domains(), 1) IS NULL)
            )
        );
    RAISE NOTICE 'Created domain_admin_access policy';
EXCEPTION WHEN OTHERS THEN
    RAISE NOTICE 'Error creating domain_admin_access policy: %', SQLERRM;
END $$;

-- Regular Admin: Can only see and manage non-admin profiles in their domain
DO $$
BEGIN
    CREATE POLICY "admin_access" ON public.profiles
        FOR ALL
        TO authenticated
        USING (
            EXISTS (
                SELECT 1 
                FROM public.profiles p 
                WHERE p.id = auth.uid() 
                AND p.role = 'admin'
                AND public.profiles.email_domain = p.email_domain
                AND public.profiles.role NOT IN ('super_admin', 'domain_admin', 'admin')
            )
        );
    RAISE NOTICE 'Created admin_access policy';
EXCEPTION WHEN OTHERS THEN
    RAISE NOTICE 'Error creating admin_access policy: %', SQLERRM;
END $$;

-- Ensure users can see and update their own profile
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Users can view own profile' AND tablename = 'profiles') THEN
        CREATE POLICY "Users can view own profile" ON public.profiles
            FOR SELECT
            TO authenticated
            USING (auth.uid() = id);
        RAISE NOTICE 'Created Users can view own profile policy';
    END IF;
EXCEPTION WHEN OTHERS THEN
    RAISE NOTICE 'Error creating view own profile policy: %', SQLERRM;
END $$;

DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Users can update own profile' AND tablename = 'profiles') THEN
        CREATE POLICY "Users can update own profile" ON public.profiles
            FOR UPDATE
            TO authenticated
            USING (auth.uid() = id);
        RAISE NOTICE 'Created Users can update own profile policy';
    END IF;
EXCEPTION WHEN OTHERS THEN
    RAISE NOTICE 'Error creating update own profile policy: %', SQLERRM;
END $$;

-- 6. Grant necessary permissions
DO $$
BEGIN
    -- Grant all necessary permissions to service_role
    GRANT USAGE ON SCHEMA public TO service_role;
    GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO service_role;
    GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO service_role;
    GRANT ALL PRIVILEGES ON ALL FUNCTIONS IN SCHEMA public TO service_role;
    
    -- Grant necessary permissions to authenticated users
    GRANT USAGE ON SCHEMA public TO authenticated;
    
    RAISE NOTICE 'Granted necessary permissions';
    
EXCEPTION WHEN OTHERS THEN
    RAISE NOTICE 'Error granting permissions: %', SQLERRM;
END $$;

-- 7. Notify completion
DO $$
BEGIN
    RAISE NOTICE 'Migration completed successfully';
    
    -- Show current admin users for verification
    RAISE NOTICE 'Current admin users:';
    PERFORM raise_notice('ID: % | Email: % | Role: %', 
                        id, 
                        (SELECT email FROM auth.users WHERE id = p.id),
                        role)
    FROM public.profiles p 
    WHERE role IN ('super_admin', 'domain_admin', 'admin');
    
END $$;
