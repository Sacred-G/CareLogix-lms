-- Create signatures table
CREATE TABLE IF NOT EXISTS public.signatures (
  id UUID PRIMARY KEY,
  name TEXT NOT NULL,
  title TEXT NOT NULL,
  image_url TEXT NOT NULL,
  organization_id UUID,
  is_default BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create policy to allow authenticated users to read signatures
CREATE POLICY "Allow authenticated users to read signatures"
  ON public.signatures
  FOR SELECT
  TO authenticated
  USING (true);

-- Create policy to allow only admin users to insert signatures
CREATE POLICY "Allow admin users to insert signatures"
  ON public.signatures
  FOR INSERT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid() AND profiles.is_admin = true
    )
  );

-- Create policy to allow only admin users to update signatures
CREATE POLICY "Allow admin users to update signatures"
  ON public.signatures
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid() AND profiles.is_admin = true
    )
  );

-- Create policy to allow only admin users to delete signatures
CREATE POLICY "Allow admin users to delete signatures"
  ON public.signatures
  FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid() AND profiles.is_admin = true
    )
  );

-- Enable RLS on signatures table
ALTER TABLE public.signatures ENABLE ROW LEVEL SECURITY;

-- Create function to set other signatures to non-default
CREATE OR REPLACE FUNCTION public.set_other_signatures_non_default()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE public.signatures
  SET is_default = false
  WHERE is_default = true;
END;
$$;
