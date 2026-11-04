-- ============================================================================
-- ADN Developer: Startups Lusófonas (Product Hunt Style Directory & Community)
-- Migração Supabase / PostgreSQL
-- ============================================================================

CREATE TABLE IF NOT EXISTS startup_sectors (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT NOT NULL DEFAULT '',
  icon TEXT NOT NULL DEFAULT 'Rocket',
  sort_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now())
);

CREATE TABLE IF NOT EXISTS startups (
  id TEXT PRIMARY KEY,
  sector_id TEXT NOT NULL REFERENCES startup_sectors(id) ON DELETE RESTRICT,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  tagline TEXT NOT NULL,
  description TEXT NOT NULL,
  logo_url TEXT NOT NULL DEFAULT '',
  cover_url TEXT NOT NULL DEFAULT '',
  country_code VARCHAR(5) NOT NULL DEFAULT 'AO',
  stage TEXT NOT NULL DEFAULT 'Seed' CHECK (stage IN ('Ideação', 'Pre-seed', 'Seed', 'Série A', 'Growth', 'Consolidada')),
  website_url TEXT NOT NULL DEFAULT '',
  social_links JSONB NOT NULL DEFAULT '{}'::jsonb,
  founded_year INTEGER NOT NULL DEFAULT 2020,
  founders JSONB NOT NULL DEFAULT '[]'::jsonb,
  status TEXT NOT NULL DEFAULT 'published' CHECK (status IN ('published', 'pending', 'archived')),
  is_featured BOOLEAN NOT NULL DEFAULT false,
  featured_date DATE NULL,
  display_order INTEGER NOT NULL DEFAULT 0,
  followers_count INTEGER NOT NULL DEFAULT 0,
  comments_count INTEGER NOT NULL DEFAULT 0,
  views_count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now())
);

CREATE TABLE IF NOT EXISTS startup_followers (
  id TEXT PRIMARY KEY,
  startup_id TEXT NOT NULL REFERENCES startups(id) ON DELETE CASCADE,
  user_id TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now()),
  CONSTRAINT unique_startup_follower UNIQUE (startup_id, user_id)
);

CREATE TABLE IF NOT EXISTS startup_comments (
  id TEXT PRIMARY KEY,
  startup_id TEXT NOT NULL REFERENCES startups(id) ON DELETE CASCADE,
  user_id TEXT NOT NULL,
  user_name TEXT NOT NULL,
  user_avatar TEXT NOT NULL DEFAULT '',
  parent_id TEXT NULL REFERENCES startup_comments(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  likes_count INTEGER NOT NULL DEFAULT 0,
  is_hidden BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now())
);

CREATE TABLE IF NOT EXISTS startup_comment_likes (
  id TEXT PRIMARY KEY,
  comment_id TEXT NOT NULL REFERENCES startup_comments(id) ON DELETE CASCADE,
  user_id TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now()),
  CONSTRAINT unique_comment_like UNIQUE (comment_id, user_id)
);

-- Índices de alta performance
CREATE INDEX IF NOT EXISTS idx_startups_status_featured ON startups (status, is_featured, featured_date DESC);
CREATE INDEX IF NOT EXISTS idx_startups_order ON startups (display_order ASC, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_startups_country ON startups (country_code);
CREATE INDEX IF NOT EXISTS idx_startups_sector ON startups (sector_id);
CREATE INDEX IF NOT EXISTS idx_startups_slug ON startups (slug);
CREATE INDEX IF NOT EXISTS idx_startup_comments_startup ON startup_comments (startup_id, created_at ASC);
CREATE INDEX IF NOT EXISTS idx_startup_comments_parent ON startup_comments (parent_id);
CREATE INDEX IF NOT EXISTS idx_startup_followers_user ON startup_followers (user_id);
CREATE INDEX IF NOT EXISTS idx_startup_comment_likes_user ON startup_comment_likes (user_id);

-- RLS (Row Level Security)
ALTER TABLE startup_sectors ENABLE ROW LEVEL SECURITY;
ALTER TABLE startups ENABLE ROW LEVEL SECURITY;
ALTER TABLE startup_followers ENABLE ROW LEVEL SECURITY;
ALTER TABLE startup_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE startup_comment_likes ENABLE ROW LEVEL SECURITY;

-- Leitura pública para todos os visitantes
CREATE POLICY "Leitura pública de setores ativos" ON startup_sectors
  FOR SELECT USING (is_active = true);

CREATE POLICY "Leitura pública de startups publicadas" ON startups
  FOR SELECT USING (status = 'published');

CREATE POLICY "Leitura pública de seguidores" ON startup_followers
  FOR SELECT USING (true);

CREATE POLICY "Leitura pública de comentários não ocultos" ON startup_comments
  FOR SELECT USING (is_hidden = false);

CREATE POLICY "Leitura pública de likes em comentários" ON startup_comment_likes
  FOR SELECT USING (true);
