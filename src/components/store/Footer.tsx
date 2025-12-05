'use client';

import Link from 'next/link';
import { Store, Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-brazil-blue text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-brazil-yellow rounded-xl flex items-center justify-center">
                <Store className="w-6 h-6 text-brazil-blue" />
              </div>
              <div>
                <h3 className="font-bold text-xl">BrasiLândia Store</h3>
                <p className="text-white/60 text-sm">Pixelmon Server</p>
              </div>
            </div>
            <p className="text-white/70 max-w-sm">
              A melhor loja para turbinar sua aventura no servidor Pixelmon BrasiLândia.
              Pagamentos seguros via Mercado Pago.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-bold mb-4">Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-white/70 hover:text-white transition-colors">
                  Início
                </Link>
              </li>
              <li>
                <Link href="/#produtos" className="text-white/70 hover:text-white transition-colors">
                  Produtos
                </Link>
              </li>
              <li>
                <Link href="/#categorias" className="text-white/70 hover:text-white transition-colors">
                  Categorias
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-bold mb-4">Suporte</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-white/70 hover:text-white transition-colors">
                  Discord
                </a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-white transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-white transition-colors">
                  Termos de Uso
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/60 text-sm">
            © {new Date().getFullYear()} BrasiLândia Store. Todos os direitos reservados.
          </p>
          <p className="text-white/60 text-sm flex items-center gap-1">
            Feito com <Heart className="w-4 h-4 text-red-500 fill-red-500" /> no Brasil
          </p>
        </div>
      </div>
    </footer>
  );
}
