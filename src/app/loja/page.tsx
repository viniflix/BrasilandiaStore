'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Navbar } from '@/components/store/Navbar';
import { ProductGrid } from '@/components/store/ProductGrid';
import { Footer } from '@/components/store/Footer';
import { supabase } from '@/lib/supabase';
import { Trophy, TrendingUp } from 'lucide-react';

interface TopBuyer {
  username: string;
  purchases: number;
}

export default function LojPage() {
  const [topBuyers, setTopBuyers] = useState<TopBuyer[]>([
    { username: 'Player123', purchases: 45 },
    { username: 'ViniGamer', purchases: 38 },
    { username: 'MasterCraft', purchases: 32 },
  ]);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-gray-50">
      <Navbar />
      <main className="flex-1">
        {/* Hero/Header da Loja */}
        <section className="bg-gradient-to-r from-brazil-blue via-brazil-green to-brazil-blue text-white py-16 sm:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h1 className="text-4xl sm:text-5xl font-bold mb-4 flex items-center gap-3">
                🛍️ Nossa Loja
              </h1>
              <p className="text-lg text-white/90">
                Explore nossa seleção completa de itens para melhorar sua experiência no servidor
              </p>
            </motion.div>
          </div>
        </section>

        {/* Main Content - 70/30 Layout */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* 70% - Produtos */}
            <div className="lg:col-span-2">
              <ProductGrid />
            </div>

            {/* 30% - Ranking de Compradores */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="sticky top-20 space-y-6"
              >
                {/* Top Buyers Card */}
                <div className="bg-gradient-to-br from-brazil-yellow/10 to-orange-50 rounded-3xl border-2 border-brazil-yellow/30 overflow-hidden shadow-lg">
                  <div className="bg-gradient-to-r from-brazil-yellow to-orange-400 px-6 py-4 flex items-center gap-3">
                    <Trophy className="w-6 h-6 text-white" />
                    <h3 className="text-lg font-bold text-white">Top Compradores</h3>
                  </div>

                  <div className="p-6 space-y-4">
                    {topBuyers.map((buyer, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-brazil-yellow/20 hover:border-brazil-yellow/50 transition-colors group cursor-pointer"
                      >
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-brazil-green to-brazil-blue flex items-center justify-center font-bold text-white">
                          {index + 1}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-gray-900 truncate group-hover:text-brazil-green transition-colors">
                            {buyer.username}
                          </p>
                          <p className="text-sm text-gray-600">
                            {buyer.purchases} compras
                          </p>
                        </div>
                        <div className="flex-shrink-0">
                          <TrendingUp className="w-5 h-5 text-brazil-yellow" />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Info Card */}
                <div className="bg-gradient-to-br from-brazil-blue/10 to-blue-50 rounded-3xl border-2 border-brazil-blue/30 p-6">
                  <h4 className="font-bold text-gray-900 mb-3 text-sm uppercase tracking-wider">💡 Dica</h4>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    Quanto mais você compra, mais acessos exclusivos você ganha! Suba no ranking e conquiste prêmios especiais.
                  </p>
                </div>

                {/* CTA Card */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="bg-gradient-to-br from-brazil-green to-green-700 rounded-3xl p-6 text-white shadow-lg"
                >
                  <h4 className="font-bold mb-2">Quer ser Top Comprador?</h4>
                  <p className="text-sm text-white/90 mb-4">
                    Compre items na loja e suba no ranking!
                  </p>
                  <a href="/loja" className="text-sm font-bold text-white hover:underline">
                    Começar agora →
                  </a>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
