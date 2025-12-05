'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingCart, Star } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import type { Product } from '@/types/database';
import { toast } from 'sonner';

interface ProductDetailModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ProductDetailModal({ product, isOpen, onClose }: ProductDetailModalProps) {
  const { addItem } = useCartStore();

  const handleAddToCart = () => {
    if (product) {
      addItem(product);
      toast.success(`${product.name} adicionado ao carrinho!`);
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && product && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
          >
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto pointer-events-auto">
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-lg transition-colors z-10"
              >
                <X className="w-6 h-6 text-gray-600" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
                {/* Image */}
                <div className="flex items-center justify-center">
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-96 object-cover rounded-xl"
                    />
                  ) : (
                    <div className="w-full h-96 bg-gradient-to-br from-green-100 to-blue-100 rounded-xl flex items-center justify-center text-6xl">
                      📦
                    </div>
                  )}
                </div>

                {/* Details */}
                <div className="flex flex-col">
                  {/* Header */}
                  <div className="mb-6">
                    <div className="flex items-center gap-3 mb-3">
                      <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                      <span className="font-semibold text-gray-700">4.8 (256 avaliações)</span>
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h2>
                    <p className="text-gray-600 text-lg mb-4">{product.description}</p>
                  </div>

                  {/* Price */}
                  <div className="mb-6 p-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl border-2 border-green-200">
                    <p className="text-gray-600 text-sm mb-2 uppercase font-medium">Preço</p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-bold text-green-600">
                        R$ {product.price.toFixed(2)}
                      </span>
                      <span className="text-gray-500">/unidade</span>
                    </div>
                  </div>

                  {/* Stock Status */}
                  <div className="mb-6 p-4 bg-green-50 rounded-xl border border-green-200">
                    <p className="text-green-700 font-semibold flex items-center gap-2">
                      ✓ Em estoque
                    </p>
                  </div>

                  {/* Action Button */}
                  <button
                    onClick={handleAddToCart}
                    className="w-full py-4 bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-all transform hover:scale-105 active:scale-95"
                  >
                    <ShoppingCart className="w-6 h-6" />
                    Adicionar ao Carrinho
                  </button>

                  {/* Details Info */}
                  {product.commands && product.commands.length > 0 && (
                    <div className="mt-6 p-4 bg-gray-50 rounded-xl">
                      <p className="text-sm font-semibold text-gray-700 mb-3">Comandos inclusos:</p>
                      <ul className="space-y-2">
                        {product.commands.map((cmd, idx) => (
                          <li key={idx} className="text-sm text-gray-600 flex items-start gap-2">
                            <span className="text-green-600 mt-1">•</span>
                            <code className="bg-gray-200 px-2 py-1 rounded text-xs">{cmd}</code>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
