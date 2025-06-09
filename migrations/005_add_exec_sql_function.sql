-- Migration to add the exec_sql function for administrative purposes

CREATE OR REPLACE FUNCTION public.exec_sql(query text)
 RETURNS text
 LANGUAGE plpgsql
AS $_$
BEGIN
  EXECUTE query;
  RETURN 'Query executed successfully';
END;
$_$;

-- Grant usage and execute permissions to authenticated users (or specific roles if preferred)
GRANT EXECUTE ON FUNCTION public.exec_sql(text) TO authenticated;
GRANT EXECUTE ON FUNCTION public.exec_sql(text) TO service_role;
