-- BrasiLândia Store - Supabase Database Schema
-- Run this in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Categories Table
CREATE TABLE IF NOT EXISTS categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) NOT NULL UNIQUE,
    icon VARCHAR(10) DEFAULT '🎮',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Products Table
CREATE TABLE IF NOT EXISTS products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(200) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    image TEXT,
    category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
    commands TEXT[] DEFAULT ARRAY[]::TEXT[],
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add active column if it doesn't exist
ALTER TABLE products ADD COLUMN IF NOT EXISTS active BOOLEAN DEFAULT true;

-- Orders Table
CREATE TABLE IF NOT EXISTS orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    player_nickname VARCHAR(50) NOT NULL,
    email VARCHAR(255) NOT NULL,
    total DECIMAL(10, 2) NOT NULL,
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'delivered', 'cancelled')),
    payment_id VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Order Items Table
CREATE TABLE IF NOT EXISTS order_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    product_id UUID REFERENCES products(id) ON DELETE SET NULL,
    product_name VARCHAR(200) NOT NULL,
    quantity INTEGER NOT NULL DEFAULT 1,
    price DECIMAL(10, 2) NOT NULL,
    commands TEXT[] DEFAULT ARRAY[]::TEXT[]
);

-- Store Settings Table
CREATE TABLE IF NOT EXISTS store_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add missing columns if they don't exist (one by one to avoid conflicts)
ALTER TABLE store_settings ADD COLUMN IF NOT EXISTS store_name VARCHAR(100);
ALTER TABLE store_settings ADD COLUMN IF NOT EXISTS logo_url TEXT;
ALTER TABLE store_settings ADD COLUMN IF NOT EXISTS primary_green VARCHAR(7);
ALTER TABLE store_settings ADD COLUMN IF NOT EXISTS primary_blue VARCHAR(7);
ALTER TABLE store_settings ADD COLUMN IF NOT EXISTS primary_yellow VARCHAR(7);
ALTER TABLE store_settings ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE;

-- Admin Whitelist Table
CREATE TABLE IF NOT EXISTS admin_whitelist (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) NOT NULL UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_active ON products(active);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at);
CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON order_items(order_id);

-- Set all existing products as active
UPDATE products SET active = true WHERE active IS NULL;

-- Update store settings with default values (first record only)
UPDATE store_settings SET 
    store_name = 'BrasiLândia Store',
    logo_url = '',
    primary_green = '#009C3B',
    primary_blue = '#002776',
    primary_yellow = '#FFDF00',
    updated_at = NOW()
WHERE id = (SELECT id FROM store_settings ORDER BY id LIMIT 1);

-- Sample categories (optional)
-- Just insert, if slug already exists it will error but that's ok - categories already setup
INSERT INTO categories (name, slug, icon) 
SELECT 'VIPs', 'vips', '👑'
WHERE NOT EXISTS (SELECT 1 FROM categories WHERE slug = 'vips');

INSERT INTO categories (name, slug, icon) 
SELECT 'Itens', 'itens', '🎁'
WHERE NOT EXISTS (SELECT 1 FROM categories WHERE slug = 'itens');

INSERT INTO categories (name, slug, icon) 
SELECT 'Pokémons', 'pokemons', '🐉'
WHERE NOT EXISTS (SELECT 1 FROM categories WHERE slug = 'pokemons');

INSERT INTO categories (name, slug, icon) 
SELECT 'Cosméticos', 'cosmeticos', '✨'
WHERE NOT EXISTS (SELECT 1 FROM categories WHERE slug = 'cosmeticos');

INSERT INTO categories (name, slug, icon) 
SELECT 'Moedas', 'moedas', '🪙'
WHERE NOT EXISTS (SELECT 1 FROM categories WHERE slug = 'moedas');

-- RLS (Row Level Security) Policies
-- Enable RLS
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE store_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_whitelist ENABLE ROW LEVEL SECURITY;

-- Public read access for products and categories
CREATE POLICY "Public read access for products" ON products
    FOR SELECT USING (true);

CREATE POLICY "Public read access for categories" ON categories
    FOR SELECT USING (true);

CREATE POLICY "Public read access for store settings" ON store_settings
    FOR SELECT USING (true);

-- Authenticated users can insert orders
CREATE POLICY "Anyone can create orders" ON orders
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Anyone can create order items" ON order_items
    FOR INSERT WITH CHECK (true);

-- Admin policies (requires auth.uid() to be in admin_whitelist)
-- Products - Admins can do everything
CREATE POLICY "Admins can insert products" ON products
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM admin_whitelist
            WHERE email = auth.jwt() ->> 'email'
        )
    );

CREATE POLICY "Admins can update products" ON products
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM admin_whitelist
            WHERE email = auth.jwt() ->> 'email'
        )
    );

CREATE POLICY "Admins can delete products" ON products
    FOR DELETE USING (
        EXISTS (
            SELECT 1 FROM admin_whitelist
            WHERE email = auth.jwt() ->> 'email'
        )
    );

-- Categories - Admins can do everything
CREATE POLICY "Admins can insert categories" ON categories
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM admin_whitelist
            WHERE email = auth.jwt() ->> 'email'
        )
    );

CREATE POLICY "Admins can update categories" ON categories
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM admin_whitelist
            WHERE email = auth.jwt() ->> 'email'
        )
    );

CREATE POLICY "Admins can delete categories" ON categories
    FOR DELETE USING (
        EXISTS (
            SELECT 1 FROM admin_whitelist
            WHERE email = auth.jwt() ->> 'email'
        )
    );

-- Store Settings - Admins can do everything
CREATE POLICY "Admins can insert settings" ON store_settings
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM admin_whitelist
            WHERE email = auth.jwt() ->> 'email'
        )
    );

CREATE POLICY "Admins can update settings" ON store_settings
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM admin_whitelist
            WHERE email = auth.jwt() ->> 'email'
        )
    );

CREATE POLICY "Admins can delete settings" ON store_settings
    FOR DELETE USING (
        EXISTS (
            SELECT 1 FROM admin_whitelist
            WHERE email = auth.jwt() ->> 'email'
        )
    );

CREATE POLICY "Admins can view all orders" ON orders
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM admin_whitelist
            WHERE email = auth.jwt() ->> 'email'
        )
    );

CREATE POLICY "Admins can update orders" ON orders
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM admin_whitelist
            WHERE email = auth.jwt() ->> 'email'
        )
    );

CREATE POLICY "Admins can view order items" ON order_items
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM admin_whitelist
            WHERE email = auth.jwt() ->> 'email'
        )
    );

CREATE POLICY "Admins can view whitelist" ON admin_whitelist
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM admin_whitelist
            WHERE email = auth.jwt() ->> 'email'
        )
    );

-- Add your admin email to the whitelist
-- INSERT INTO admin_whitelist (email) VALUES ('your-email@example.com');
