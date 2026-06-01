-- Users table (extends Supabase Auth)
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  plan TEXT DEFAULT 'free' CHECK (plan IN ('free', 'starter', 'pro')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Ideas table
CREATE TABLE IF NOT EXISTS ideas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  target_user TEXT,
  product_type TEXT CHECK (product_type IN ('website', 'saas', 'ai_tool', 'directory', 'content_site', 'chrome_extension', 'mobile_app', 'other')),
  monetization_plan TEXT CHECK (monetization_plan IN ('ads', 'affiliate', 'subscription', 'one_time', 'sponsorship', 'not_sure')),
  distribution_plan TEXT CHECK (distribution_plan IN ('seo', 'reddit', 'x', 'product_hunt', 'paid_ads', 'not_sure')),
  mvp_timeline TEXT CHECK (mvp_timeline IN ('1_day', '3_days', '7_days', '14_days', '30_days')),
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'validating', 'building', 'launched', 'killed')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Reports table
CREATE TABLE IF NOT EXISTS reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  idea_id UUID REFERENCES ideas(id) ON DELETE CASCADE,
  report_type TEXT NOT NULL CHECK (report_type IN ('basic_roast', 'deep_validation', 'launch_kit', 'post_launch_review')),
  verdict TEXT,
  overall_score INTEGER,
  scores JSONB,
  content_json JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Usage quotas table
CREATE TABLE IF NOT EXISTS usage_quotas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  month TEXT NOT NULL,
  basic_roast_limit INTEGER DEFAULT 5,
  basic_roast_used INTEGER DEFAULT 0,
  deep_validation_limit INTEGER DEFAULT 0,
  deep_validation_used INTEGER DEFAULT 0,
  launch_kit_limit INTEGER DEFAULT 0,
  launch_kit_used INTEGER DEFAULT 0,
  UNIQUE(user_id, month)
);

-- Payments table
CREATE TABLE IF NOT EXISTS payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  creem_order_id TEXT UNIQUE,
  amount INTEGER NOT NULL,
  currency TEXT DEFAULT 'usd',
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'paid', 'failed', 'refunded')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_ideas_user_id ON ideas(user_id);
CREATE INDEX IF NOT EXISTS idx_reports_idea_id ON reports(idea_id);
CREATE INDEX IF NOT EXISTS idx_usage_quotas_user_month ON usage_quotas(user_id, month);
CREATE INDEX IF NOT EXISTS idx_payments_user_id ON payments(user_id);

-- RLS (Row Level Security)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE ideas ENABLE ROW LEVEL SECURITY;
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE usage_quotas ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

-- Users policies
CREATE POLICY "Users can view own profile" ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON users
  FOR UPDATE USING (auth.uid() = id);

-- Ideas policies
CREATE POLICY "Users can view own ideas" ON ideas
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create own ideas" ON ideas
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own ideas" ON ideas
  FOR UPDATE USING (auth.uid() = user_id);

-- Reports policies
CREATE POLICY "Users can view reports for own ideas" ON reports
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM ideas
      WHERE ideas.id = reports.idea_id
      AND ideas.user_id = auth.uid()
    )
  );

CREATE POLICY "Service role can create reports" ON reports
  FOR INSERT WITH CHECK (true);

-- Usage quotas policies
CREATE POLICY "Users can view own quotas" ON usage_quotas
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Service role can manage quotas" ON usage_quotas
  FOR ALL USING (true);

-- Payments policies
CREATE POLICY "Users can view own payments" ON payments
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Service role can manage payments" ON payments
  FOR ALL USING (true);

-- Viral products knowledge base
CREATE TABLE IF NOT EXISTS viral_products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  url TEXT NOT NULL,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  product_type TEXT,
  category TEXT,
  tags TEXT[] DEFAULT '{}',
  analysis_json JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_viral_products_product_type ON viral_products(product_type);
CREATE INDEX idx_viral_products_tags ON viral_products USING GIN (tags);

ALTER TABLE viral_products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read viral products" ON viral_products
  FOR SELECT USING (true);

CREATE POLICY "Service role can manage viral products" ON viral_products
  FOR ALL USING (true);

-- Internalized viral knowledge (one row per product_type)
CREATE TABLE IF NOT EXISTS viral_knowledge (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_type TEXT UNIQUE NOT NULL,
  knowledge_json JSONB NOT NULL DEFAULT '{}',
  source_count INT NOT NULL DEFAULT 0,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE viral_knowledge ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read viral knowledge" ON viral_knowledge
  FOR SELECT USING (true);

CREATE POLICY "Service role can manage viral knowledge" ON viral_knowledge
  FOR ALL USING (true);

-- Function to increment quota
CREATE OR REPLACE FUNCTION increment_quota(p_user_id UUID, p_month TEXT, p_field TEXT)
RETURNS VOID AS $$
BEGIN
  EXECUTE format('UPDATE usage_quotas SET %I = %I + 1 WHERE user_id = $1 AND month = $2', p_field, p_field)
  USING p_user_id, p_month;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to handle new user creation
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO users (id, email)
  VALUES (NEW.id, NEW.email);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for new user creation
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();
