-- Check if RLS is enabled on the courses table
SELECT 
    relname AS table_name, 
    relrowsecurity AS rls_enabled,
    relforcerowsecurity AS rls_forced
FROM 
    pg_class 
WHERE 
    relname = 'courses';

-- Check current policies on the courses table
SELECT 
    tablename,
    policyname,
    permissive,
    roles,
    cmd,
    qual,
    with_check
FROM 
    pg_policies 
WHERE 
    tablename = 'courses';

-- Check the current user and roles
SELECT 
    current_user,
    current_role,
    current_schemas(true) AS search_path,
    session_user,
    current_setting('role') AS current_role_setting;

-- Check if the current user has insert permission
SELECT 
    has_table_privilege(current_user, 'courses', 'INSERT') AS can_insert,
    has_table_privilege(current_user, 'courses', 'SELECT') AS can_select,
    has_table_privilege(current_user, 'courses', 'UPDATE') AS can_update,
    has_table_privilege(current_user, 'courses', 'DELETE') AS can_delete;

-- Check the current authentication status
SELECT 
    auth.uid(),
    auth.jwt(),
    auth.role(),
    current_setting('request.jwt.claim.role', true) AS jwt_role,
    current_setting('request.jwt.claim.email', true) AS jwt_email;
