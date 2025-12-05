'use client';

import Link from 'next/link';
import { Store, Heart, Mail, MessageCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

interface FooterConfig {
  discord_link: string;
  logo_icon_url: string;
}

export function Footer() {
  const [config, setConfig] = useState<FooterConfig>({
    discord_link: 'https://discord.gg/brasilandia',
    logo_icon_url: '',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFooterConfig();
  }, []);

  const fetchFooterConfig = async () => {
    try {
      const { data, error } = await (supabase as any)
        .from('server_config')
        .select('*')
        .single();

      if (data) {
        setConfig({
          discord_link: 'https://discord.gg/brasilandia',
          logo_icon_url: (data as any).server_logo_url || '',
        });
      }
    } catch (error) {
      console.error('Error fetching footer config:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="bg-gradient-to-b from-gray-900 via-brazil-blue to-gray-900 text-white border-t-4 border-brazil-green">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 bg-gradient-to-br from-brazil-yellow to-orange-500 rounded-2xl flex items-center justify-center font-bold text-brazil-blue shadow-xl">
                {config.logo_icon_url ? (
                  <img src={config.logo_icon_url} alt="Logo" className="w-full h-full object-cover rounded-2xl" />
                ) : (
                  <span className="text-2xl">⛏️</span>
                )}
              </div>
              <div>
                <h3 className="font-bold text-2xl text-white">BrasiLândia</h3>
                <p className="text-gray-300 text-sm">A melhor loja de items Minecraft</p>
              </div>
            </div>
            <p className="text-gray-400 max-w-sm text-sm leading-relaxed">
              Loja oficial do servidor Minecraft BrasiLândia. Compre com segurança via Mercado Pago e desfrute de uma experiência incrível!
            </p>
            <div className="flex gap-3 mt-6">
              <a href={config.discord_link} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 hover:bg-brazil-yellow/20 flex items-center justify-center transition-colors">
                <MessageCircle className="w-5 h-5 text-white" />
              </a>
              <a href="mailto:suporte@brasilandia.com.br" className="w-10 h-10 rounded-full bg-white/10 hover:bg-brazil-yellow/20 flex items-center justify-center transition-colors">
                <Mail className="w-5 h-5 text-white" />
              </a>
            </div>
          </div>

          {/* Navegação */}
          <div>
            <h4 className="font-bold text-white mb-6 text-lg flex items-center gap-2">
              <Store className="w-5 h-5 text-brazil-yellow" />
              Navegação
            </h4>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-gray-300 hover:text-brazil-yellow transition-colors font-medium">
                  Início
                </Link>
              </li>
              <li>
                <Link href="/loja" className="text-gray-300 hover:text-brazil-yellow transition-colors font-medium">
                  Loja
                </Link>
              </li>
              <li>
                <Link href="/regras" className="text-gray-300 hover:text-brazil-yellow transition-colors font-medium">
                  Regras do Servidor
                </Link>
              </li>
            </ul>
          </div>

          {/* Suporte */}
          <div>
            <h4 className="font-bold text-white mb-6 text-lg flex items-center gap-2">
              <Heart className="w-5 h-5 text-brazil-yellow" />
              Suporte
            </h4>
            <ul className="space-y-3">
              <li>
                <a href={config.discord_link} target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-brazil-yellow transition-colors font-medium">
                  Discord
                </a>
              </li>
              <li>
                <Link href="/faq" className="text-gray-300 hover:text-brazil-yellow transition-colors font-medium">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/termos" className="text-gray-300 hover:text-brazil-yellow transition-colors font-medium">
                  Termos de Uso
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10" />

        {/* Bottom Bar */}
        <div className="py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} BrasiLândia Store. Todos os direitos reservados.
          </p>
          <p className="text-gray-400 text-sm flex items-center gap-1">
            Feito com <Heart className="w-4 h-4 text-brazil-yellow fill-brazil-yellow" /> no Brasil
          </p>
        </div>
      </div>
    </footer>
  );
}
