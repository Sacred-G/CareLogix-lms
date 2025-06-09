-- This migration creates the exec_sql function if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 
    FROM pg_proc 
    WHERE proname = 'exec_sql' 
    AND pronamespace = (SELECT oid FROM pg_namespace WHERE nspname = 'public')
  ) THEN
    -- Create the function with the correct return type
    EXECUTE '
    CREATE OR REPLACE FUNCTION public.exec_sql(query text)
    RETURNS text
    LANGUAGE plpgsql
    SECURITY DEFINER
    AS $_$
    BEGIN
      EXECUTE query;
      RETURN ''Query executed successfully'';
    END;
    $_$;';

    -- Grant necessary permissions
    EXECUTE 'GRANT EXECUTE ON FUNCTION public.exec_sql(text) TO authenticated';
    EXECUTE 'GRANT EXECUTE ON FUNCTION public.exec_sql(text) TO service_role';
  END IF;
END $$;
