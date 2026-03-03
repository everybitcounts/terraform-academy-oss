-- ==============================================
-- Terraform Academy OSS — Supabase Schema Template
-- ==============================================
-- A generic learning platform schema you can run in
-- your own Supabase project. All tables use RLS.
--
-- Usage:
--   1. Create a Supabase project at supabase.com
--   2. Open the SQL editor
--   3. Paste and run this file
-- ==============================================

-- ─── User Profiles ───
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT NOT NULL DEFAULT 'Learner',
  email TEXT,
  avatar_url TEXT,
  tier TEXT DEFAULT 'free' CHECK (tier IN ('free', 'pro', 'max')),
  xp INTEGER DEFAULT 0,
  level INTEGER DEFAULT 1,
  streak_days INTEGER DEFAULT 0,
  last_active TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- ─── Quiz Results ───
CREATE TABLE IF NOT EXISTS quiz_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  module_id TEXT NOT NULL,
  score INTEGER NOT NULL DEFAULT 0,
  total_questions INTEGER NOT NULL DEFAULT 0,
  percentage DECIMAL(5,2) GENERATED ALWAYS AS (
    CASE WHEN total_questions > 0 THEN (score::decimal / total_questions) * 100 ELSE 0 END
  ) STORED,
  time_spent_seconds INTEGER DEFAULT 0,
  completed_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE quiz_results ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own quiz results"
  ON quiz_results FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own quiz results"
  ON quiz_results FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- ─── Lab Completions ───
CREATE TABLE IF NOT EXISTS lab_completions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  lab_id TEXT NOT NULL,
  lab_name TEXT NOT NULL,
  completed_at TIMESTAMPTZ DEFAULT NOW(),
  time_spent_seconds INTEGER DEFAULT 0,
  attempts INTEGER DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (user_id, lab_id)
);

ALTER TABLE lab_completions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own lab completions"
  ON lab_completions FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own lab completions"
  ON lab_completions FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own lab completions"
  ON lab_completions FOR UPDATE
  USING (auth.uid() = user_id);

-- ─── Leaderboard View ───
CREATE OR REPLACE VIEW leaderboard AS
SELECT
  p.display_name,
  p.avatar_url,
  p.xp,
  p.level,
  p.streak_days,
  COUNT(DISTINCT qr.module_id) AS modules_completed,
  COUNT(DISTINCT lc.lab_id) AS labs_completed,
  COALESCE(AVG(qr.percentage), 0) AS avg_quiz_score
FROM profiles p
LEFT JOIN quiz_results qr ON qr.user_id = p.user_id
LEFT JOIN lab_completions lc ON lc.user_id = p.user_id
GROUP BY p.id, p.display_name, p.avatar_url, p.xp, p.level, p.streak_days
ORDER BY p.xp DESC
LIMIT 100;

-- ─── Feature Requests (Community) ───
CREATE TABLE IF NOT EXISTS feature_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT DEFAULT 'feature' CHECK (category IN ('feature', 'bug', 'lab', 'quiz', 'other')),
  status TEXT DEFAULT 'submitted' CHECK (status IN ('submitted', 'under_review', 'planned', 'in_progress', 'completed', 'declined')),
  vote_count INTEGER DEFAULT 0,
  user_email TEXT,
  user_display_name TEXT DEFAULT 'Anonymous',
  admin_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE feature_requests ENABLE ROW LEVEL SECURITY;

-- Public read for approved requests
CREATE POLICY "Anyone can view approved requests"
  ON feature_requests FOR SELECT
  USING (status != 'declined');

-- Anyone can submit
CREATE POLICY "Anyone can submit requests"
  ON feature_requests FOR INSERT
  WITH CHECK (true);

-- ─── Indexes ───
CREATE INDEX IF NOT EXISTS idx_profiles_user_id ON profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_quiz_results_user_id ON quiz_results(user_id);
CREATE INDEX IF NOT EXISTS idx_quiz_results_module ON quiz_results(module_id);
CREATE INDEX IF NOT EXISTS idx_lab_completions_user_id ON lab_completions(user_id);
CREATE INDEX IF NOT EXISTS idx_feature_requests_status ON feature_requests(status);

-- ─── Updated_at Trigger ───
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER feature_requests_updated_at
  BEFORE UPDATE ON feature_requests
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
