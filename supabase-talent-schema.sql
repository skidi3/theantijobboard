-- Talent Pool Schema for The Anti Job Board
-- Run this in Supabase SQL Editor

-- Create talent_profiles table
CREATE TABLE IF NOT EXISTS talent_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  -- Basic info
  email TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  phone TEXT,
  location TEXT,

  -- Links
  linkedin_url TEXT,
  github_url TEXT,
  portfolio_url TEXT,
  twitter_url TEXT,

  -- Professional info
  current_title TEXT,
  current_company TEXT,
  years_experience TEXT,
  skills TEXT[], -- Array of skills

  -- Resume/CV
  resume_url TEXT, -- URL to file in Supabase Storage
  resume_text TEXT, -- Extracted text from PDF for search

  -- AI-generated summary
  ai_summary TEXT,
  ai_tags TEXT[], -- AI-extracted tags for matching

  -- Preferences
  looking_for TEXT[], -- e.g., ['Senior Engineer', 'Staff Engineer', 'Engineering Manager']
  remote_preference TEXT, -- 'remote_only', 'hybrid', 'onsite', 'flexible'
  salary_range TEXT,
  preferred_locations TEXT, -- e.g., 'NYC, Austin, or Remote'
  work_authorization TEXT, -- 'authorized', 'need_visa', 'have_visa'
  notice_period TEXT, -- 'immediate', '2_weeks', '1_month', '2_months', 'exploring'
  why_looking TEXT, -- Free text context
  ideal_role TEXT, -- Free text about ideal role

  -- Status
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'placed', 'paused', 'archived')),

  -- Tracking
  source TEXT DEFAULT 'organic', -- 'organic', 'referral', 'subscriber'
  user_id UUID REFERENCES auth.users(id), -- Link to user if they're a subscriber

  -- Internal notes (for admin)
  admin_notes TEXT,
  quality_score INTEGER, -- 1-10 rating by admin
  last_contacted_at TIMESTAMPTZ
);

-- Create index for search
CREATE INDEX IF NOT EXISTS idx_talent_profiles_skills ON talent_profiles USING GIN (skills);
CREATE INDEX IF NOT EXISTS idx_talent_profiles_ai_tags ON talent_profiles USING GIN (ai_tags);
CREATE INDEX IF NOT EXISTS idx_talent_profiles_status ON talent_profiles (status);
CREATE INDEX IF NOT EXISTS idx_talent_profiles_email ON talent_profiles (email);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for updated_at
DROP TRIGGER IF EXISTS update_talent_profiles_updated_at ON talent_profiles;
CREATE TRIGGER update_talent_profiles_updated_at
  BEFORE UPDATE ON talent_profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- B2B inquiries table (for tracking company requests)
CREATE TABLE IF NOT EXISTS b2b_inquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT NOW(),

  -- Company info
  company_name TEXT NOT NULL,
  contact_email TEXT NOT NULL,
  contact_name TEXT,

  -- Role details
  role_title TEXT NOT NULL,
  role_description TEXT,
  required_skills TEXT[],
  experience_level TEXT, -- 'junior', 'mid', 'senior', 'staff', 'principal'
  salary_range TEXT,
  location_requirement TEXT,
  remote_ok BOOLEAN DEFAULT true,

  -- Status
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'in_progress', 'sent', 'closed', 'hired')),

  -- Matching results
  matched_profiles UUID[], -- Array of talent_profile IDs
  sent_profiles UUID[], -- Profiles actually sent to company

  -- Tracking
  admin_notes TEXT,
  closed_at TIMESTAMPTZ,
  hired_profile_id UUID REFERENCES talent_profiles(id)
);

CREATE INDEX IF NOT EXISTS idx_b2b_inquiries_status ON b2b_inquiries (status);

-- Enable RLS
ALTER TABLE talent_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE b2b_inquiries ENABLE ROW LEVEL SECURITY;

-- RLS Policies for talent_profiles
-- Users can insert their own profile
CREATE POLICY "Users can insert own profile" ON talent_profiles
  FOR INSERT WITH CHECK (true);

-- Users can view their own profile
CREATE POLICY "Users can view own profile" ON talent_profiles
  FOR SELECT USING (email = current_setting('request.jwt.claims', true)::json->>'email');

-- Users can update their own profile
CREATE POLICY "Users can update own profile" ON talent_profiles
  FOR UPDATE USING (email = current_setting('request.jwt.claims', true)::json->>'email');

-- Service role can do everything (for API routes)
CREATE POLICY "Service role full access talent" ON talent_profiles
  FOR ALL USING (auth.role() = 'service_role');

-- RLS for b2b_inquiries (admin only via service role)
CREATE POLICY "Service role full access b2b" ON b2b_inquiries
  FOR ALL USING (auth.role() = 'service_role');

-- Storage bucket for resumes (run in Supabase dashboard or via API)
-- INSERT INTO storage.buckets (id, name, public) VALUES ('resumes', 'resumes', false);
