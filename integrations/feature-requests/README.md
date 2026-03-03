# Feature Requests Portal

A self-contained community feature request portal with browse, submit, vote, and roadmap functionality. Powered by Supabase.

## Features

- **Browse** — View all community requests, sorted by votes
- **Submit** — Submit feature requests, bugs, lab/quiz suggestions
- **Vote** — Upvote requests (deduplicated via localStorage)
- **Roadmap** — Visual planned / in-progress / completed columns
- **Categories** — Feature, Bug, Lab, Quiz, Other
- **Dark theme** — Matches the Terraform Academy design system

## Setup

1. Run the Supabase schema from `../supabase/schema.sql` (includes `feature_requests` table)
2. Edit `index.html` — replace `YOUR_SUPABASE_URL` and `YOUR_SUPABASE_ANON_KEY`
3. Optionally add a Supabase RPC for voting:

```sql
CREATE OR REPLACE FUNCTION increment_vote(request_id UUID)
RETURNS void AS $$
BEGIN
  UPDATE feature_requests
  SET vote_count = vote_count + 1
  WHERE id = request_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

4. Open `index.html` in a browser or deploy to any static host

## Customization

- Modify CSS variables in the `<style>` block to match your brand
- Add/remove categories in the `<select>` element
- Extend with email notifications via Supabase Edge Functions or webhooks
