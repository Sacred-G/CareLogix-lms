-- Migration to refine RLS policies for admin access

-- Drop existing policies if they exist (with error handling)
DO $$
BEGIN
    -- Super Admin policy
    IF EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'super_admin_full_access' AND tablename = 'profiles') THEN
        DROP POLICY "super_admin_full_access" ON public.profiles;
    END IF;
    
    -- Domain Admin policy
    IF EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'domain_admin_access' AND tablename = 'profiles') THEN
        DROP POLICY "domain_admin_access" ON public.profiles;
    END IF;
    
    -- Regular Admin policy
    IF EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'admin_access' AND tablename = 'profiles') THEN
        DROP POLICY "admin_access" ON public.profiles;
    END IF;
EXCEPTION WHEN OTHERS THEN
    RAISE NOTICE 'Error dropping policies: %', SQLERRM;
END $$;

-- Create policies if they don't exist
DO $$
BEGIN
    -- Super Admin: Full access to all profiles
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'super_admin_full_access' AND tablename = 'profiles') THEN
        EXECUTE '
        CREATE POLICY "super_admin_full_access" ON public.profiles
            FOR ALL
            TO authenticated
            USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = ''super_admin''))$_$';
    END IF;

    -- Domain Admin: Can only see and manage profiles in their managed domains
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'domain_admin_access' AND tablename = 'profiles') THEN
        EXECUTE '
        CREATE POLICY "domain_admin_access" ON public.profiles
            FOR ALL
            TO authenticated
            USING (
                EXISTS (
                    SELECT 1 
                    FROM public.profiles p 
                    WHERE p.id = auth.uid() 
                    AND p.role = ''domain_admin''
                    AND (
                        public.profiles.email_domain = ANY(p.managed_domains)
                        OR (CARDINALITY(p.managed_domains) = 0 AND public.profiles.email_domain = p.email_domain)
                    )
                )
            )$_$';
    END IF;

    -- Regular Admin: Can only see and manage non-admin profiles in their domain
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'admin_access' AND tablename = 'profiles') THEN
        EXECUTE '
        CREATE POLICY "admin_access" ON public.profiles
            FOR ALL
            TO authenticated
            USING (
                EXISTS (
                    SELECT 1 
                    FROM public.profiles p 
                    WHERE p.id = auth.uid() 
                    AND p.role = ''admin''
                    AND public.profiles.email_domain = p.email_domain
                    AND public.profiles.role NOT IN (''super_admin'', ''domain_admin'', ''admin'')
                )
            )$_$';
    END IF;
EXCEPTION WHEN OTHERS THEN
    RAISE NOTICE 'Error creating policies: %', SQLERRM;
END $$;

-- Ensure 'Allow users to see own profile' and 'Allow users to update own profile' are still present
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'profiles' AND policyname = 'Allow users to see own profile') THEN
    CREATE POLICY "Allow users to see own profile"
    ON public.profiles
    FOR SELECT
    USING (auth.uid() = id);
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'profiles' AND policyname = 'Allow users to update own profile') THEN
    CREATE POLICY "Allow users to update own profile"
    ON public.profiles
    FOR UPDATE
    USING (auth.uid() = id);
  END IF;
END
$$;

-- The 'Allow domain admin to view users in their domain' policy from 003_add_domain_management_functions.sql
-- should remain active and handles SELECT for domain_admin.
-- If domain_admins also need INSERT/UPDATE/DELETE within their domain,
-- additional policies for those operations would be required here.
-- For now, assuming SELECT is the primary concern based on the error context.
