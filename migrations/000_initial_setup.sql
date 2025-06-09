-- 1. Create the exec_sql function if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_proc WHERE proname = 'exec_sql') THEN
    EXECUTE '
    CREATE OR REPLACE FUNCTION public.exec_sql(query text)
    RETURNS text
    LANGUAGE plpgsql
    SECURITY DEFINER
    AS $func$
    BEGIN
      EXECUTE query;
      RETURN ''Query executed successfully'';
    END;
    $func$';

    -- Grant necessary permissions
    EXECUTE 'GRANT EXECUTE ON FUNCTION public.exec_sql(text) TO authenticated';
    EXECUTE 'GRANT EXECUTE ON FUNCTION public.exec_sql(text) TO service_role';
    
    -- Fixed RAISE NOTICE with proper string escaping
    RAISE NOTICE 'exec_sql function created';
  END IF;
END $$;

-- 2. Ensure we have the necessary permissions
GRANT USAGE ON SCHEMA public TO authenticated, service_role;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO service_role;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO service_role;
GRANT ALL PRIVILEGES ON ALL FUNCTIONS IN SCHEMA public TO service_role;