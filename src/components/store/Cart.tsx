'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export function Cart() {
  const { items, isOpen, setCartOpen, removeItem, updateQuantity, getTotal, clearCart } = useCartStore();
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const handleCheckout = async () => {
    if (!nickname.trim()) {
      alert('Por favor, insira seu nickname do jogo');
      return;
    }
    if (!email.trim()) {
      alert('Por favor, insira seu email');
      return;
    }

    setIsCheckingOut(true);

    // TODO: Integrate with Mercado Pago
    // For now, just simulate
    setTimeout(() => {
      alert('Checkout seria processado aqui com Mercado Pago!');
      setIsCheckingOut(false);
    }, 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setCartOpen(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          {/* Cart Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-xl z-50"
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5" />
                  Carrinho
                </h2>
                <button
                  onClick={() => setCartOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Items */}
              <div className="flex-1 overflow-y-auto p-6">
                {items.length === 0 ? (
                  <div className="text-center py-12">
                    <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900">Carrinho vazio</h3>
                    <p className="text-gray-500 mt-1">Adicione produtos para continuar</p>
                    <Button
                      className="mt-4"
                      onClick={() => setCartOpen(false)}
                    >
                      Continuar Comprando
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {items.map((item) => (
                      <motion.div
                        key={item.product.id}
                        layout
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: -100 }}
                        className="flex gap-4 p-4 bg-gray-50 rounded-xl"
                      >
                        {/* Product Image */}
                        <div className="w-20 h-20 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                          {item.product.image ? (
                            <img
                              src={item.product.image}
                              alt={item.product.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-2xl">
                              🎁
                            </div>
                          )}
                        </div>

                        {/* Product Info */}
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-gray-900 truncate">
                            {item.product.name}
                          </h4>
                          <p className="text-brazil-green font-bold">
                            R$ {item.product.price.toFixed(2)}
                          </p>

                          {/* Quantity Controls */}
                          <div className="flex items-center gap-2 mt-2">
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                              className="p-1 hover:bg-gray-200 rounded-lg transition-colors"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="w-8 text-center font-medium">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                              className="p-1 hover:bg-gray-200 rounded-lg transition-colors"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => removeItem(item.product.id)}
                              className="p-1 hover:bg-red-100 text-red-500 rounded-lg transition-colors ml-auto"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer */}
              {items.length > 0 && (
                <div className="border-t p-6 space-y-4">
                  {/* Player Info */}
                  <div className="space-y-3">
                    <Input
                      label="Nickname no Jogo"
                      placeholder="Seu nick exato do servidor"
                      value={nickname}
                      onChange={(e) => setNickname(e.target.value)}
                    />
                    <Input
                      label="Email"
                      type="email"
                      placeholder="seu@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  {/* Total */}
                  <div className="flex items-center justify-between py-3 border-t">
                    <span className="text-gray-600">Total</span>
                    <span className="text-2xl font-bold text-brazil-green">
                      R$ {getTotal().toFixed(2)}
                    </span>
                  </div>

                  {/* Checkout Button */}
                  <Button
                    onClick={handleCheckout}
                    isLoading={isCheckingOut}
                    className="w-full"
                    size="lg"
                  >
                    Finalizar Compra
                    <ArrowRight className="w-5 h-5" />
                  </Button>

                  <button
                    onClick={clearCart}
                    className="w-full text-sm text-gray-500 hover:text-red-500 transition-colors"
                  >
                    Limpar carrinho
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
