-- Migration: Fix certificates.id to UUID and add certificate_number

-- 1. Enable uuid-ossp extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Add certificate_number column if it doesn't exist
ALTER TABLE certificates
ADD COLUMN IF NOT EXISTS certificate_number TEXT;

-- 3. Change id column to UUID and default to uuid_generate_v4()
-- (Skip if already UUID)
ALTER TABLE certificates
ALTER COLUMN id SET DATA TYPE uuid USING (uuid_generate_v4()),
ALTER COLUMN id SET DEFAULT uuid_generate_v4();

-- 4. (Optional) If you want to backfill certificate_number for existing records, do it here
-- UPDATE certificates SET certificate_number = id WHERE certificate_number IS NULL;
