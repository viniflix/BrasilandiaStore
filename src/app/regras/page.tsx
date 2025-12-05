'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, Clock, ShoppingCart } from 'lucide-react';
import { Navbar } from '@/components/store/Navbar';
import { Footer } from '@/components/store/Footer';
import { supabase } from '@/lib/supabase';
import { useCartStore } from '@/store/cartStore';

interface ServerRule {
  id: string;
  title: string;
  description: string;
  punishment: string;
  punishment_duration_days: number | null;
  can_buy_unban: boolean;
  unban_product_id: string | null;
  order_index: number;
}

export default function RegrasPage() {
  const [rules, setRules] = useState<ServerRule[]>([]);
  const [loading, setLoading] = useState(true);
  const { addItem } = useCartStore();

  useEffect(() => {
    fetchRules();
  }, []);

  const fetchRules = async () => {
    try {
      const { data, error } = await supabase
        .from('server_rules')
        .select('*')
        .eq('active', true)
        .order('order_index', { ascending: true });

      if (error) throw error;
      setRules((data || []) as ServerRule[]);
    } catch (error) {
      console.error('Error fetching rules:', error);
      setRules([]);
    } finally {
      setLoading(false);
    }
  };

  const handleBuyUnban = async (productId: string) => {
    // Buscar o produto e adicionar ao carrinho
    try {
      const { data: product, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', productId)
        .single();

      if (error) throw error;
      if (product) {
        addItem(product);
      }
    } catch (error) {
      console.error('Error adding unban to cart:', error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-1">
        {/* Hero Header */}
        <section className="bg-gradient-to-r from-red-600 to-orange-600 text-white py-16 sm:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-4 mb-4">
              <AlertCircle className="w-8 h-8" />
              <h1 className="text-4xl sm:text-5xl font-bold">📋 Regras do Servidor</h1>
            </div>
            <p className="text-lg text-white/90">
              Leia atentamente as regras para manter uma comunidade saudável e segura
            </p>
          </div>
        </section>

        {/* Rules Content */}
        <section className="py-16 sm:py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {loading ? (
              <div className="space-y-6">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="bg-gray-100 rounded-2xl p-6 animate-pulse">
                    <div className="h-6 bg-gray-300 rounded mb-4 w-2/3" />
                    <div className="h-4 bg-gray-300 rounded mb-2" />
                    <div className="h-4 bg-gray-300 rounded w-5/6" />
                  </div>
                ))}
              </div>
            ) : rules.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600 text-lg">Nenhuma regra cadastrada no momento</p>
              </div>
            ) : (
              <div className="space-y-6">
                {rules.map((rule, index) => (
                  <motion.div
                    key={rule.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-white rounded-2xl border-2 border-gray-200 overflow-hidden hover:border-gray-300 transition-colors"
                  >
                    <div className="bg-gradient-to-r from-gray-50 to-transparent p-6 border-b border-gray-200">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <span className="text-2xl font-bold text-gray-900">{index + 1}.</span>
                            <h3 className="text-2xl font-bold text-gray-900">{rule.title}</h3>
                          </div>
                          <p className="text-gray-600 leading-relaxed">{rule.description}</p>
                        </div>
                      </div>
                    </div>

                    <div className="p-6 space-y-4">
                      {/* Punishment Info */}
                      <div className="flex items-center gap-3 p-4 bg-red-50 rounded-xl border border-red-200">
                        <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                        <div>
                          <p className="font-semibold text-red-900">Punição: {rule.punishment}</p>
                          {rule.punishment_duration_days && (
                            <p className="text-sm text-red-700 flex items-center gap-2 mt-1">
                              <Clock className="w-4 h-4" />
                              Duração: {rule.punishment_duration_days} dias
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Unban Option */}
                      {rule.can_buy_unban && rule.unban_product_id && (
                        <button
                          onClick={() => handleBuyUnban(rule.unban_product_id!)}
                          className="w-full flex items-center justify-center gap-2 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl transition-colors"
                        >
                          <ShoppingCart className="w-5 h-5" />
                          Comprar Desban
                        </button>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
