'use client';

import { motion } from 'framer-motion';
import { ShoppingCart, Zap, Eye } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import type { Product } from '@/types/database';
import { toast } from 'sonner';
import { useState } from 'react';

interface ProductCardProps {
  product: Product;
  index?: number;
  featured?: boolean;
  onViewDetails?: (product: Product) => void;
}

export function ProductCard({ product, index = 0, featured = false, onViewDetails }: ProductCardProps) {
  const { addItem } = useCartStore();
  const [isHovered, setIsHovered] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem(product);
    toast.success(`${product.name} adicionado ao carrinho!`);
  };

  const handleViewDetails = () => {
    onViewDetails?.(product);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ y: -8 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 group cursor-pointer"
      onClick={handleViewDetails}
    >
      {/* Featured Badge */}
      {featured && (
        <div className="absolute top-3 right-3 z-20 flex items-center gap-1 bg-gradient-to-r from-brazil-yellow to-orange-400 text-white px-3 py-1 rounded-xl text-xs font-bold shadow-lg">
          <Zap size={14} />
          Destaque
        </div>
      )}

      {/* Product Image */}
      <div className="relative h-56 bg-gradient-to-br from-gray-100 to-gray-50 overflow-hidden">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-green-100 to-blue-100">
            <span className="text-6xl">📦</span>
          </div>
        )}

        {/* Gradient Overlay on Hover */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"
        />

        {/* VIP Badge */}
        {product.name.toLowerCase().includes('vip') && (
          <span className="absolute top-12 right-3 z-10 px-3 py-1 bg-gradient-to-r from-yellow-400 to-orange-400 text-white text-xs font-bold rounded-xl shadow-lg">
            VIP
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col h-full">
        <h3 className="font-bold text-gray-900 text-base mb-2 line-clamp-2 leading-tight">
          {product.name}
        </h3>

        {/* Price */}
        <div className="flex items-baseline gap-2 mb-4">
          <span className="text-2xl font-bold bg-gradient-to-r from-brazil-green to-green-700 bg-clip-text text-transparent">
            R$ {product.price.toFixed(2)}
          </span>
        </div>

        {/* Stock Info */}
        <div className="mb-4">
          <span className="text-xs text-brazil-green font-semibold">
            ✓ Em estoque
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 mt-auto">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleAddToCart}
            className="flex-1 bg-gradient-to-r from-brazil-green to-green-700 text-white font-semibold py-2 rounded-lg hover:from-green-700 hover:to-green-800 transition-all duration-200 flex items-center justify-center gap-2 text-sm"
          >
            <ShoppingCart size={16} />
            Comprar
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleViewDetails}
            className="flex-1 bg-gradient-to-r from-brazil-blue to-blue-700 text-white font-semibold py-2 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 flex items-center justify-center gap-2 text-sm"
          >
            <Eye size={16} />
            Detalhes
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
