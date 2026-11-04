-- ============================================================================
-- ADN Developer - Migration: Sistema de Ranking Comunitário de Tecnologias
-- Tabelas: technology_categories, technologies, technology_votes
-- ============================================================================

-- 1. Categorias de Tecnologias
CREATE TABLE IF NOT EXISTS technology_categories (
  id VARCHAR(100) PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(100) UNIQUE NOT NULL,
  description TEXT,
  icon VARCHAR(50) DEFAULT 'Code',
  sort_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Tabela Principal de Tecnologias
CREATE TABLE IF NOT EXISTS technologies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id VARCHAR(100) NOT NULL REFERENCES technology_categories(id) ON DELETE CASCADE,
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(100) UNIQUE NOT NULL,
  description TEXT NOT NULL,
  website_url VARCHAR(500),
  logo_url VARCHAR(500),
  tags TEXT[] DEFAULT '{}',
  upvotes_count INT DEFAULT 0,
  downvotes_count INT DEFAULT 0,
  score INT DEFAULT 0, -- Calculado como (upvotes_count - downvotes_count)
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Votos de Tecnologias (1 voto ativo por utilizador por tecnologia)
CREATE TABLE IF NOT EXISTS technology_votes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  technology_id UUID NOT NULL REFERENCES technologies(id) ON DELETE CASCADE,
  user_id VARCHAR(150) NOT NULL,
  vote_type VARCHAR(10) NOT NULL CHECK (vote_type IN ('up', 'down')),
  country_code VARCHAR(10) NOT NULL DEFAULT 'AO',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT uq_user_technology_vote UNIQUE (user_id, technology_id)
);

-- 4. Índices para Otimização de Performance
CREATE INDEX IF NOT EXISTS idx_technologies_score ON technologies(score DESC, upvotes_count DESC);
CREATE INDEX IF NOT EXISTS idx_technologies_category ON technologies(category_id) WHERE is_active = TRUE;
CREATE INDEX IF NOT EXISTS idx_technologies_slug ON technologies(slug);
CREATE INDEX IF NOT EXISTS idx_technology_votes_tech_country ON technology_votes(technology_id, country_code);
CREATE INDEX IF NOT EXISTS idx_technology_votes_user ON technology_votes(user_id);
CREATE INDEX IF NOT EXISTS idx_technology_votes_created_at ON technology_votes(created_at);

-- 5. Função e Trigger para Atualização Automática de Score
CREATE OR REPLACE FUNCTION update_technology_score()
RETURNS TRIGGER AS $$
DECLARE
  target_tech_id UUID;
  new_upvotes INT;
  new_downvotes INT;
BEGIN
  IF (TG_OP = 'DELETE') THEN
    target_tech_id := OLD.technology_id;
  ELSE
    target_tech_id := NEW.technology_id;
  END IF;

  SELECT
    COALESCE(SUM(CASE WHEN vote_type = 'up' THEN 1 ELSE 0 END), 0),
    COALESCE(SUM(CASE WHEN vote_type = 'down' THEN 1 ELSE 0 END), 0)
  INTO new_upvotes, new_downvotes
  FROM technology_votes
  WHERE technology_id = target_tech_id;

  UPDATE technologies
  SET
    upvotes_count = new_upvotes,
    downvotes_count = new_downvotes,
    score = (new_upvotes - new_downvotes),
    updated_at = NOW()
  WHERE id = target_tech_id;

  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_technology_votes_score ON technology_votes;
CREATE TRIGGER trg_technology_votes_score
AFTER INSERT OR UPDATE OR DELETE ON technology_votes
FOR EACH ROW EXECUTE FUNCTION update_technology_score();

-- 6. Configuração de Row Level Security (RLS)
ALTER TABLE technology_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE technologies ENABLE ROW LEVEL SECURITY;
ALTER TABLE technology_votes ENABLE ROW LEVEL SECURITY;

-- Políticas de Leitura Pública
CREATE POLICY "Public Read Categories" ON technology_categories
  FOR SELECT USING (is_active = TRUE);

CREATE POLICY "Public Read Technologies" ON technologies
  FOR SELECT USING (is_active = TRUE);

CREATE POLICY "Public Read Votes Count" ON technology_votes
  FOR SELECT USING (TRUE);

-- Políticas para Votação de Utilizadores Autenticados
CREATE POLICY "Auth Insert Own Vote" ON technology_votes
  FOR INSERT WITH CHECK (auth.uid()::text = user_id OR user_id IS NOT NULL);

CREATE POLICY "Auth Update Own Vote" ON technology_votes
  FOR UPDATE USING (auth.uid()::text = user_id OR user_id IS NOT NULL);

CREATE POLICY "Auth Delete Own Vote" ON technology_votes
  FOR DELETE USING (auth.uid()::text = user_id OR user_id IS NOT NULL);
