-- Add the email_domain column if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 
    FROM information_schema.columns 
    WHERE table_schema = 'public' 
    AND table_name = 'profiles' 
    AND column_name = 'email_domain'
  ) THEN
    ALTER TABLE public.profiles 
    ADD COLUMN email_domain TEXT;
    
    RAISE NOTICE 'Added email_domain column to profiles table';
  END IF;
END $$;

-- Create or replace a function to update email_domain
CREATE OR REPLACE FUNCTION public.update_email_domains()
RETURNS TRIGGER AS $_$
BEGIN
  -- For new or updated profiles, update the email_domain
  NEW.email_domain = split_part(NEW.email, '@', 2);
  RETURN NEW;
END;
$_$ LANGUAGE plpgsql;

-- Create a trigger to automatically update email_domain when email changes
DROP TRIGGER IF EXISTS update_email_domain_trigger ON public.profiles;
CREATE TRIGGER update_email_domain_trigger
BEFORE INSERT OR UPDATE OF email ON public.profiles
FOR EACH ROW
EXECUTE FUNCTION public.update_email_domains();

-- Update existing records with null email_domain
DO $$
DECLARE
  updated_count INTEGER;
BEGIN
  UPDATE public.profiles
  SET email_domain = split_part(email, '@', 2)
  WHERE email_domain IS NULL
  AND email LIKE '%@%';
  
  GET DIAGNOSTICS updated_count = ROW_COUNT;
  RAISE NOTICE 'Updated % records with email_domain', updated_count;
END $$;

-- Create an index on email_domain for better query performance
CREATE INDEX IF NOT EXISTS idx_profiles_email_domain 
ON public.profiles(email_domain);

-- Update RLS policies to use email_domain
CREATE OR REPLACE FUNCTION public.get_user_domain()
RETURNS text AS $_$
  SELECT email_domain 
  FROM public.profiles 
  WHERE id = auth.uid()
  LIMIT 1;
$_$ LANGUAGE sql SECURITY DEFINER;

-- Grant necessary permissions
GRANT EXECUTE ON FUNCTION public.update_email_domains() TO service_role;
GRANT EXECUTE ON FUNCTION public.get_user_domain() TO authenticated, service_role;
