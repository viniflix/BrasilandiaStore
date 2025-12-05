'use client';

import React from 'react';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { ProductCard } from './ProductCard';
import { ProductDetailModal } from './ProductDetailModal';
import { ProductGridSkeletonLoader } from '@/components/ui/Skeleton';
import { supabase } from '@/lib/supabase';
import type { Product, Category } from '@/types/database';

export function ProductGrid() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const [productsRes, categoriesRes] = await Promise.all([
        supabase.from('products').select('*').eq('active', true).order('created_at', { ascending: false }),
        supabase.from('categories').select('*').order('name'),
      ]);

      if (productsRes.error) {
        console.error('Error fetching products:', productsRes.error);
        setProducts([]);
      } else if (productsRes.data) {
        setProducts((productsRes.data as any[]).map(p => ({
          ...p,
          active: p.active !== false,
          commands: Array.isArray(p.commands) ? p.commands : [],
        })));
      }

      if (categoriesRes.error) {
        console.error('Error fetching categories:', categoriesRes.error);
        setCategories([]);
      } else if (categoriesRes.data) {
        setCategories(categoriesRes.data as Category[]);
      }
    } catch (error) {
      console.error('Error in fetchData:', error);
      setProducts([]);
      setCategories([]);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === 'all' || product.category_id === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="produtos" className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-brazil-green to-brazil-blue bg-clip-text text-transparent mb-2">
            Produtos Disponíveis
          </h2>
          <p className="text-gray-700 font-medium">
            Escolha os melhores itens para sua jornada
          </p>
        </motion.div>

        {/* Filters */}
        <div className="flex flex-col gap-6 mb-8">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar produtos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white text-gray-900 rounded-xl border border-gray-300 hover:border-gray-400 focus:border-brazil-green focus:ring-1 focus:ring-brazil-green transition-colors placeholder-gray-500"
            />
          </div>

          {/* Categories - Grid Layout */}
          <div id="categorias">
            <p className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wider">Categorias</p>
            <div className="flex flex-wrap gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory('all')}
                className={`px-4 py-2 rounded-xl font-medium whitespace-nowrap transition-all ${selectedCategory === 'all'
                  ? 'bg-gradient-to-r from-brazil-green to-green-700 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                  }`}
              >
                Todos
              </motion.button>
              {categories.map((cat) => (
                <motion.button
                  key={cat.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-xl font-medium whitespace-nowrap transition-all ${selectedCategory === cat.id
                    ? 'bg-gradient-to-r from-brazil-blue to-blue-700 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                    }`}
                >
                  {cat.icon} {cat.name}
                </motion.button>
              ))}
            </div>
          </div>
        </div>

        {/* Products Grid */}
        {isLoading ? (
          <ProductGridSkeletonLoader />
        ) : filteredProducts.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Nenhum produto encontrado</h3>
            <p className="text-gray-600 mb-6">Tente ajustar seus filtros de busca</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
              }}
              className="px-6 py-2 bg-brazil-green text-white rounded-xl font-semibold hover:bg-green-700 transition-colors"
            >
              Limpar Filtros
            </button>
          </motion.div>
        ) : (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            initial="hidden"
            animate="show"
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.05,
                },
              },
            }}
          >
            {filteredProducts.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                index={index}
                onViewDetails={(prod) => {
                  setSelectedProduct(prod);
                  setIsModalOpen(true);
                }}
              />
            ))}
          </motion.div>
        )}
      </div>

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedProduct(null);
        }}
      />
    </section>
  );
}
