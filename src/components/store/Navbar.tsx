'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Menu, X, User } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { Cart } from './Cart';

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { items, toggleCart } = useCartStore();
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      <nav className="bg-brazil-blue sticky top-0 z-40 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-brazil-yellow rounded-xl flex items-center justify-center">
                <span className="text-brazil-blue font-bold text-lg">B</span>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-white font-bold text-xl">BrasiLândia</h1>
                <p className="text-white/60 text-xs -mt-1">Pixelmon Store</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <Link href="/" className="text-white/80 hover:text-white transition-colors">
                Início
              </Link>
              <Link href="/#produtos" className="text-white/80 hover:text-white transition-colors">
                Produtos
              </Link>
              <Link href="/#categorias" className="text-white/80 hover:text-white transition-colors">
                Categorias
              </Link>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4">
              {/* Cart Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleCart}
                className="relative p-2 text-white hover:bg-white/10 rounded-xl transition-colors"
              >
                <ShoppingCart className="w-6 h-6" />
                {totalItems > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 w-5 h-5 bg-brazil-yellow text-brazil-blue
                      text-xs font-bold rounded-full flex items-center justify-center"
                  >
                    {totalItems}
                  </motion.span>
                )}
              </motion.button>

              {/* Admin Link */}
              <Link
                href="/admin"
                className="hidden md:flex items-center gap-2 px-4 py-2 bg-white/10
                  hover:bg-white/20 text-white rounded-xl transition-colors"
              >
                <User className="w-4 h-4" />
                <span className="text-sm">Admin</span>
              </Link>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 text-white hover:bg-white/10 rounded-xl"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-brazil-blue/95 border-t border-white/10"
            >
              <div className="px-4 py-4 space-y-2">
                <Link
                  href="/"
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-4 py-2 text-white/80 hover:text-white hover:bg-white/10 rounded-xl"
                >
                  Início
                </Link>
                <Link
                  href="/#produtos"
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-4 py-2 text-white/80 hover:text-white hover:bg-white/10 rounded-xl"
                >
                  Produtos
                </Link>
                <Link
                  href="/#categorias"
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-4 py-2 text-white/80 hover:text-white hover:bg-white/10 rounded-xl"
                >
                  Categorias
                </Link>
                <Link
                  href="/admin"
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-4 py-2 text-white/80 hover:text-white hover:bg-white/10 rounded-xl"
                >
                  Painel Admin
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Cart Sidebar */}
      <Cart />
    </>
  );
}
