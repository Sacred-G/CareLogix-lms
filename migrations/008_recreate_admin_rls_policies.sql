-- Migration to recreate RLS policies for admin access using get_my_profile_data function

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

-- Create policies if they don't exist, using get_my_profile_data
DO $$
DECLARE
    my_profile record;
BEGIN
    -- Super Admin: Full access to all profiles
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'super_admin_full_access' AND tablename = 'profiles') THEN
        EXECUTE '
        CREATE POLICY "super_admin_full_access" ON public.profiles
            FOR ALL
            TO authenticated
            USING (
                (SELECT user_role FROM public.get_my_profile_data()) = ''super_admin''
            )$_$';
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
                    FROM public.get_my_profile_data() AS my_profile
                    WHERE my_profile.user_role = ''domain_admin''
                    AND (
                        public.profiles.email_domain = ANY(my_profile.user_managed_domains)
                        OR (CARDINALITY(my_profile.user_managed_domains) = 0 AND public.profiles.email_domain = my_profile.user_email_domain)
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
                    FROM public.get_my_profile_data() AS my_profile
                    WHERE my_profile.user_role = ''admin''
                    AND public.profiles.email_domain = my_profile.user_email_domain
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
