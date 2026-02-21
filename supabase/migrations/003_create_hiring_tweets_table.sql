-- Create hiring_tweets table for the disposable job board
CREATE TABLE IF NOT EXISTS hiring_tweets (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  tweet_url TEXT NOT NULL UNIQUE,
  company TEXT NOT NULL,
  roles TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('tech', 'product', 'design', 'marketing', 'operations', 'vc', 'other')),
  why_included TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  expires_at TIMESTAMP WITH TIME ZONE DEFAULT (NOW() + INTERVAL '7 days'),
  is_active BOOLEAN DEFAULT true
);

-- Index for faster filtering
CREATE INDEX idx_hiring_tweets_category ON hiring_tweets(category);
CREATE INDEX idx_hiring_tweets_is_active ON hiring_tweets(is_active);
CREATE INDEX idx_hiring_tweets_created_at ON hiring_tweets(created_at DESC);

-- Enable RLS
ALTER TABLE hiring_tweets ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Allow public read access" ON hiring_tweets
  FOR SELECT USING (is_active = true);

-- Allow authenticated users with admin role to insert/update/delete
CREATE POLICY "Allow admin full access" ON hiring_tweets
  FOR ALL USING (true);
