import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';

config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const urlsToDelete = [
  "https://x.com/a16z/status/2046789012345678901",
  "https://x.com/Perplexity_AI/status/2046123456789012345",
  "https://x.com/coinbase/status/2045890123456789012",
  "https://x.com/scale_AI/status/2045657890123456789",
  "https://x.com/OpenAI/status/2045432109876543210",
  "https://x.com/anthropic_ai/status/2045210987654321098",
  "https://x.com/stripe/status/2044987654321098765",
  "https://x.com/WorldLabsAI/status/2044765432109876543",
  "https://x.com/Replicate/status/2044543210987654321",
  "https://x.com/verdant_ai/status/2044321098765432109",
  "https://x.com/zkx_finance/status/2044109876543210987",
  "https://x.com/magicdevs/status/2043898765432109876",
  "https://x.com/fair_ai/status/2043676543210987654",
  "https://x.com/tenstorrent/status/2043454321098765432"
];

async function deleteTweets() {
  const { data, error } = await supabase
    .from('hiring_tweets')
    .delete()
    .in('tweet_url', urlsToDelete)
    .select();

  if (error) {
    console.error('Error:', error);
  } else {
    console.log(`Deleted ${data?.length || 0} records`);
  }
}

deleteTweets();
