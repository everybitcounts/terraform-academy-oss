# Supabase Schema Template

A ready-to-use PostgreSQL schema for a learning platform, designed for Supabase.

## Tables

| Table | Description |
|-------|-------------|
| `profiles` | User profiles with XP, level, streak tracking |
| `quiz_results` | Per-module quiz scores with auto-calculated percentages |
| `lab_completions` | Lab completion records with time and attempts |
| `feature_requests` | Community feature request portal with status tracking |

## Views

| View | Description |
|------|-------------|
| `leaderboard` | Top 100 users by XP with aggregated stats |

## Setup

1. Create a project at [supabase.com](https://supabase.com)
2. Open the SQL Editor
3. Paste the contents of `schema.sql`
4. Click **Run**

## Security

All tables use Row Level Security (RLS):
- Users can only read/write their own data
- Feature requests are publicly readable (except declined)
- Admin operations require service_role key (never expose in client code)

## Connecting from JavaScript

```javascript
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

// Save quiz result
const { data, error } = await supabase
  .from('quiz_results')
  .insert({
    user_id: user.id,
    module_id: 'cloud-basics',
    score: 4,
    total_questions: 5,
    time_spent_seconds: 300
  });
```
