'use client';

import { motion } from 'framer-motion';
import { ShoppingCart, Eye } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import type { Product } from '@/types/database';
import { toast } from 'sonner';

interface ProductCardProps {
  product: Product;
  index?: number;
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { addItem } = useCartStore();

  const handleAddToCart = () => {
    addItem(product);
    toast.success(`${product.name} adicionado ao carrinho!`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ y: -5 }}
      className="bg-white rounded-2xl overflow-hidden shadow-soft group"
    >
      {/* Product Image */}
      <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-50 overflow-hidden">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-6xl">🎁</span>
          </div>
        )}

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-brazil-blue/80 opacity-0 group-hover:opacity-100
          transition-opacity duration-300 flex items-center justify-center gap-3">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleAddToCart}
            className="p-3 bg-brazil-green text-white rounded-xl"
          >
            <ShoppingCart className="w-5 h-5" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-3 bg-white text-brazil-blue rounded-xl"
          >
            <Eye className="w-5 h-5" />
          </motion.button>
        </div>

        {/* VIP Badge (if applicable) */}
        {product.name.toLowerCase().includes('vip') && (
          <span className="absolute top-3 right-3 px-3 py-1 bg-brazil-yellow text-brazil-blue
            text-xs font-bold rounded-full shadow-lg">
            VIP
          </span>
        )}
      </div>

      {/* Product Info */}
      <div className="p-5">
        <h3 className="font-bold text-gray-900 text-lg mb-1 truncate">{product.name}</h3>
        <p className="text-gray-500 text-sm line-clamp-2 mb-4 h-10">{product.description}</p>

        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-brazil-green">
              R$ {product.price.toFixed(2)}
            </span>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleAddToCart}
            className="px-4 py-2 bg-brazil-green text-white rounded-xl font-semibold
              flex items-center gap-2 hover:bg-brazil-green/90 transition-colors"
          >
            <ShoppingCart className="w-4 h-4" />
            Comprar
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
