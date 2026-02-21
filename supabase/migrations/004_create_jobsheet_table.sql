-- Create jobsheet table for curated startup jobs
CREATE TABLE IF NOT EXISTS jobsheet (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  rank INTEGER,
  company TEXT NOT NULL,
  roles TEXT NOT NULL,
  funding TEXT,
  location TEXT,
  source TEXT,
  careers_link TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  is_active BOOLEAN DEFAULT true
);

-- Index for faster queries
CREATE INDEX idx_jobsheet_rank ON jobsheet(rank);
CREATE INDEX idx_jobsheet_is_active ON jobsheet(is_active);
CREATE INDEX idx_jobsheet_source ON jobsheet(source);

-- Enable RLS
ALTER TABLE jobsheet ENABLE ROW LEVEL SECURITY;

-- Allow public read access for active jobs
CREATE POLICY "Allow public read access" ON jobsheet
  FOR SELECT USING (is_active = true);

-- Allow admin full access
CREATE POLICY "Allow admin full access" ON jobsheet
  FOR ALL USING (true);
