-- ============================================
-- NOVAS TABELAS PARA MELHOR ESTRUTURA
-- ============================================

-- Configurações do Servidor (logo, background, info)
CREATE TABLE IF NOT EXISTS server_config (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  server_name TEXT NOT NULL DEFAULT 'BrasiLândia',
  server_logo_url TEXT,
  server_banner_bg_url TEXT,
  server_description TEXT,
  ip_address TEXT NOT NULL DEFAULT 'play.brasilandia.com.br',
  version TEXT DEFAULT '1.20.4',
  max_players INTEGER DEFAULT 500,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Regras do Servidor
CREATE TABLE IF NOT EXISTS server_rules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  punishment TEXT NOT NULL,
  punishment_duration_days INTEGER,
  can_buy_unban BOOLEAN DEFAULT FALSE,
  unban_product_id BIGINT REFERENCES products(id),
  order_index INTEGER DEFAULT 0,
  active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Produtos mais vendidos (view, not stored)
-- Será calculado através de uma query ao banco

-- Adicionando coluna de most_sold aos products
ALTER TABLE products
ADD COLUMN IF NOT EXISTS sales_count INTEGER DEFAULT 0;

-- Índices para performance
CREATE INDEX IF NOT EXISTS idx_server_rules_active ON server_rules(active);
CREATE INDEX IF NOT EXISTS idx_products_sales ON products(sales_count DESC);

-- ============================================
-- DADOS INICIAIS
-- ============================================

-- Inserir configuração padrão do servidor
INSERT INTO server_config (server_name, ip_address, version, server_description)
VALUES (
  'BrasiLândia',
  'play.brasilandia.com.br',
  '1.20.4',
  'A melhor loja de items para seu servidor Minecraft. Compre com segurança e receba instantaneamente!'
)
ON CONFLICT DO NOTHING;

-- Inserir algumas regras de exemplo
INSERT INTO server_rules (title, description, punishment, punishment_duration_days, can_buy_unban, order_index, active)
VALUES
  (
    'Não usar hacks',
    'Proibido usar qualquer tipo de hack, cheat ou modificação que dê vantagem injusta.',
    'Ban permanente',
    NULL,
    TRUE,
    1,
    TRUE
  ),
  (
    'Respeito entre players',
    'Proibido desrespeitar outros jogadores, fazer bullying ou assédio.',
    'Mute ou Ban temporário',
    7,
    FALSE,
    2,
    TRUE
  ),
  (
    'Spam não permitido',
    'Proibido fazer spam no chat, publicidade de outros servidores.',
    'Mute permanente',
    NULL,
    FALSE,
    3,
    TRUE
  ),
  (
    'Griefing proibido',
    'Destruir ou danificar construções de outros players é proibido.',
    'Ban temporário',
    30,
    TRUE,
    4,
    TRUE
  );

-- RLS Policies para server_config
ALTER TABLE server_config ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read server_config" ON server_config
  FOR SELECT USING (TRUE);

CREATE POLICY "Allow admin update server_config" ON server_config
  FOR UPDATE USING (
    auth.jwt() ->> 'email' IN (SELECT email FROM admin_whitelist)
  );

-- RLS Policies para server_rules
ALTER TABLE server_rules ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read active rules" ON server_rules
  FOR SELECT USING (active = TRUE);

CREATE POLICY "Allow admin manage rules" ON server_rules
  FOR ALL USING (
    auth.jwt() ->> 'email' IN (SELECT email FROM admin_whitelist)
  );
