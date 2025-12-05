'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check, Users } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { ProductCard } from './ProductCard';
import type { Product } from '@/types/database';

interface ServerConfig {
  server_name: string;
  server_logo_url: string;
  server_banner_bg_url: string;
  server_description: string;
  ip_address: string;
  version: string;
  max_players: number;
}

// Hero Section com Background Dinâmico
export function HeroServerInfo() {
  const [config, setConfig] = useState<ServerConfig | null>(null);
  const [copiedIP, setCopiedIP] = useState(false);
  const [loading, setLoading] = useState(true);
  const [playersOnline, setPlayersOnline] = useState(234);

  useEffect(() => {
    fetchServerConfig();
  }, []);

  const fetchServerConfig = async () => {
    try {
      const { data, error } = await supabase
        .from('server_config')
        .select('*')
        .single();

      if (error) throw error;
      setConfig(data);
    } catch (error) {
      console.error('Error fetching server config:', error);
      // Fallback config
      setConfig({
        server_name: 'BrasiLândia',
        server_logo_url: '',
        server_banner_bg_url: '',
        server_description: 'A melhor loja de items para seu servidor Minecraft',
        ip_address: 'play.brasilandia.com.br',
        version: '1.20.4',
        max_players: 500,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCopyIP = () => {
    navigator.clipboard.writeText(config?.ip_address || '');
    setCopiedIP(true);
    setTimeout(() => setCopiedIP(false), 2000);
  };

  return (
    <section
      className="relative min-h-[600px] overflow-hidden"
      style={{
        backgroundImage: config?.server_banner_bg_url ? `url(${config.server_banner_bg_url})` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Gradient Overlay Blur Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-brazil-blue/95 via-brazil-green/85 to-brazil-blue/95 backdrop-blur-sm" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
          {/* Left: Texto Principal */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="text-white lg:col-span-1"
          >
            <h1 className="text-5xl sm:text-6xl font-bold mb-4 leading-tight">
              {config?.server_name}
            </h1>
            <p className="text-lg text-white/90 mb-8 leading-relaxed">
              {config?.server_description}
            </p>
            <button className="bg-white text-blue-600 font-bold py-3 px-8 rounded-xl hover:bg-gray-100 transition-colors">
              Entrar no Servidor
            </button>
          </motion.div>

          {/* Center: Logo do Server */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex justify-center lg:col-span-1"
          >
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="w-80 h-80 flex items-center justify-center"
            >
              {config?.server_logo_url ? (
                <img
                  src={config.server_logo_url}
                  alt={config.server_name}
                  className="w-full h-full object-contain drop-shadow-2xl"
                />
              ) : (
                <div className="text-[200px] drop-shadow-2xl">⛏️</div>
              )}
            </motion.div>
          </motion.div>

          {/* Right: Server Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4 lg:col-span-1"
          >
            {/* IP Section */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-white/15 backdrop-blur-md rounded-3xl p-8 border border-white/30 shadow-2xl hover:bg-white/20 transition-colors"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                  <Copy className="w-6 h-6 text-white" />
                </div>
                <p className="text-white/90 text-base font-bold uppercase tracking-wider">Conecte-se Agora</p>
              </div>
              <div className="flex items-center gap-3">
                <code className="flex-1 bg-black/40 text-white font-mono text-lg p-5 rounded-2xl break-all font-bold">
                  {config?.ip_address}
                </code>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleCopyIP}
                  className="p-4 hover:bg-white/30 rounded-2xl transition-colors text-white"
                >
                  {copiedIP ? <Check className="w-7 h-7" /> : <Copy className="w-7 h-7" />}
                </motion.button>
              </div>
            </motion.div>

            {/* Server Stats - Better organized */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-white/15 backdrop-blur-md rounded-3xl p-7 border border-white/30 shadow-xl hover:bg-white/20 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-brazil-yellow/30 flex items-center justify-center">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <div>
                  <p className="text-white/80 text-sm font-medium uppercase tracking-wider">Jogadores Online</p>
                  <p className="text-white text-3xl font-bold">
                    {playersOnline}<span className="text-xl text-white/80">/{config?.max_players}</span>
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-white/15 backdrop-blur-md rounded-3xl p-7 border border-white/30 shadow-xl hover:bg-white/20 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-brazil-green/30 flex items-center justify-center">
                  <span className="text-3xl">🎮</span>
                </div>
                <div>
                  <p className="text-white/80 text-sm font-medium uppercase tracking-wider">Versão</p>
                  <p className="text-white text-3xl font-bold">{config?.version}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// Produtos Mais Vendidos
export function TopSellingProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTopProducts();
  }, []);

  const fetchTopProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('active', true)
        .order('sales_count', { ascending: false })
        .limit(4);

      if (error) throw error;
      setProducts((data || []) as any[]);
    } catch (error) {
      console.error('Error fetching top products:', error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-16 sm:py-20 bg-gradient-to-b from-white to-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-brazil-green to-brazil-blue bg-clip-text text-transparent mb-3">Mais Vendidos</h2>
          <p className="text-gray-700 font-medium">Os itens mais procurados pela comunidade</p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl p-4 animate-pulse">
                <div className="h-48 bg-gray-200 rounded-xl mb-4" />
                <div className="h-4 bg-gray-200 rounded mb-3" />
                <div className="h-4 bg-gray-200 rounded w-2/3" />
              </div>
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">Nenhum produto disponível no momento</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <ProductCard product={product} index={index} featured={false} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
