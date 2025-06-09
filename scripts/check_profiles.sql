-- Check profiles table structure
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_schema = 'public' 
AND table_name = 'profiles';

-- Check RLS policies on profiles table
SELECT * FROM pg_policies 
WHERE tablename = 'profiles';

-- Check if RLS is enabled
SELECT relname, relrowsecurity 
FROM pg_class 
WHERE relname = 'profiles';

-- Check for any existing data in profiles
SELECT id, email, role, email_domain 
FROM public.profiles 
LIMIT 5;
