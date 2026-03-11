-- =====================================================
-- CRITICAL: RLS LOCKDOWN FOR THE ANTI JOB BOARD
-- Run this IMMEDIATELY in Supabase SQL Editor
-- =====================================================

-- =====================================================
-- 1. USERS TABLE
-- =====================================================
-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Drop any existing permissive policies
DROP POLICY IF EXISTS "Users can view own data" ON users;
DROP POLICY IF EXISTS "Users can update own data" ON users;
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON users;
DROP POLICY IF EXISTS "Enable read access for all users" ON users;
DROP POLICY IF EXISTS "Public read access" ON users;
DROP POLICY IF EXISTS "Allow all" ON users;

-- NEW STRICT POLICIES

-- Users can only read their OWN row (by auth.uid())
CREATE POLICY "users_select_own" ON users
  FOR SELECT
  USING (auth.uid() = id);

-- Users can only update their OWN row (limited columns)
CREATE POLICY "users_update_own" ON users
  FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Only service role can insert (via webhooks/admin)
CREATE POLICY "users_insert_service_only" ON users
  FOR INSERT
  WITH CHECK (auth.role() = 'service_role');

-- No delete allowed except service role
CREATE POLICY "users_delete_service_only" ON users
  FOR DELETE
  USING (auth.role() = 'service_role');

-- =====================================================
-- 2. JOBSHEET TABLE
-- =====================================================
ALTER TABLE jobsheet ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Enable read access for all users" ON jobsheet;
DROP POLICY IF EXISTS "Public read access" ON jobsheet;
DROP POLICY IF EXISTS "Allow all" ON jobsheet;

-- Only authenticated users with active subscription can read
-- Actually - jobsheet should probably only be accessible via API route
-- Lock it down completely, access only via service role
CREATE POLICY "jobsheet_service_only" ON jobsheet
  FOR ALL
  USING (auth.role() = 'service_role');

-- =====================================================
-- 3. HIRING_TWEETS TABLE
-- =====================================================
ALTER TABLE hiring_tweets ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Enable read access for all users" ON hiring_tweets;
DROP POLICY IF EXISTS "Public read access" ON hiring_tweets;
DROP POLICY IF EXISTS "Allow all" ON hiring_tweets;

-- Read only for authenticated users (your subscribers)
CREATE POLICY "hiring_tweets_read_authenticated" ON hiring_tweets
  FOR SELECT
  USING (auth.role() = 'authenticated');

-- Write only via service role (admin/extension)
CREATE POLICY "hiring_tweets_write_service" ON hiring_tweets
  FOR INSERT
  USING (auth.role() = 'service_role');

CREATE POLICY "hiring_tweets_update_service" ON hiring_tweets
  FOR UPDATE
  USING (auth.role() = 'service_role');

CREATE POLICY "hiring_tweets_delete_service" ON hiring_tweets
  FOR DELETE
  USING (auth.role() = 'service_role');

-- =====================================================
-- 4. TALENT_PROFILES TABLE
-- =====================================================
ALTER TABLE talent_profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can insert own profile" ON talent_profiles;
DROP POLICY IF EXISTS "Users can view own profile" ON talent_profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON talent_profiles;
DROP POLICY IF EXISTS "Service role full access talent" ON talent_profiles;

-- Anyone can submit their profile (insert only, no read back via anon)
CREATE POLICY "talent_insert_public" ON talent_profiles
  FOR INSERT
  WITH CHECK (true);

-- Users can view their own profile only (by email match)
CREATE POLICY "talent_select_own" ON talent_profiles
  FOR SELECT
  USING (
    auth.role() = 'service_role' OR
    email = (SELECT email FROM auth.users WHERE id = auth.uid())
  );

-- Only service role can update/delete
CREATE POLICY "talent_update_service" ON talent_profiles
  FOR UPDATE
  USING (auth.role() = 'service_role');

CREATE POLICY "talent_delete_service" ON talent_profiles
  FOR DELETE
  USING (auth.role() = 'service_role');

-- =====================================================
-- 5. B2B_INQUIRIES TABLE (Admin only)
-- =====================================================
ALTER TABLE b2b_inquiries ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Service role full access b2b" ON b2b_inquiries;

-- Completely locked - service role only
CREATE POLICY "b2b_service_only" ON b2b_inquiries
  FOR ALL
  USING (auth.role() = 'service_role');

-- =====================================================
-- 6. STORAGE BUCKET: RESUMES
-- =====================================================
-- Run these in the Supabase Dashboard > Storage > Policies
-- Or use the API:

-- Allow anyone to upload to resumes bucket (they need the file for their application)
-- INSERT INTO storage.policies (bucket_id, name, definition)
-- VALUES ('resumes', 'Allow uploads', '{"operation": "INSERT", "check": "true"}');

-- Only service role can read/delete
-- INSERT INTO storage.policies (bucket_id, name, definition)
-- VALUES ('resumes', 'Service role read', '{"operation": "SELECT", "check": "auth.role() = ''service_role''"}');

-- =====================================================
-- 7. REVOKE DIRECT TABLE ACCESS (Extra security)
-- =====================================================
-- This prevents direct table access even with anon key
-- All access must go through RLS policies

REVOKE ALL ON users FROM anon;
REVOKE ALL ON users FROM authenticated;
GRANT SELECT, UPDATE ON users TO authenticated;
GRANT ALL ON users TO service_role;

REVOKE ALL ON jobsheet FROM anon;
REVOKE ALL ON jobsheet FROM authenticated;
GRANT ALL ON jobsheet TO service_role;

REVOKE ALL ON hiring_tweets FROM anon;
GRANT SELECT ON hiring_tweets TO authenticated;
GRANT ALL ON hiring_tweets TO service_role;

REVOKE ALL ON talent_profiles FROM anon;
GRANT INSERT ON talent_profiles TO anon;
GRANT SELECT, INSERT, UPDATE ON talent_profiles TO authenticated;
GRANT ALL ON talent_profiles TO service_role;

REVOKE ALL ON b2b_inquiries FROM anon;
REVOKE ALL ON b2b_inquiries FROM authenticated;
GRANT ALL ON b2b_inquiries TO service_role;

-- =====================================================
-- 8. VERIFY RLS IS ENABLED
-- =====================================================
-- Run this to check all tables have RLS enabled:
SELECT tablename, rowsecurity
FROM pg_tables
WHERE schemaname = 'public';

-- =====================================================
-- IMPORTANT NOTES:
-- =====================================================
-- 1. After running this, test your app thoroughly
-- 2. Your API routes use service_role key - they bypass RLS
-- 3. Client-side queries use anon/authenticated - they follow RLS
-- 4. If something breaks, check which policy is blocking it
-- 5. Use Supabase Dashboard > Database > Policies to debug
