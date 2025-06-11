-- Check if RLS is enabled on profiles table
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public' 
AND tablename = 'profiles';

-- Check existing RLS policies on profiles table
SELECT * FROM pg_policies 
WHERE tablename = 'profiles' 
AND schemaname = 'public';

-- Check if is_admin function exists and its definition
SELECT proname, pg_get_functiondef(oid) 
FROM pg_proc 
WHERE proname = 'is_admin';

-- Check the current user's role and permissions
SELECT 
  auth.uid() as user_id,
  current_user as db_user,
  current_setting('role', true) as current_role,
  current_setting('request.jwt.claim.role', true) as jwt_role,
  current_setting('request.jwt.claim.email', true) as jwt_email;

-- Check the current user's profile
SELECT * FROM profiles 
WHERE id = auth.uid();

-- Check if service_role key is being used (should be NULL for service_role)
SELECT current_setting('role', true) as current_role;
