'use client';

import { motion } from 'framer-motion';
import { ShoppingCart, Users, Zap, Shield, MessageSquare, Trophy, Gamepad2, RotateCw, Server } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

// Hero Section - Clean Minecraft Theme
export function HeroSection() {
  return (
    <section className="relative min-h-[550px] bg-gradient-to-b from-gray-950 via-blue-950 to-gray-950 overflow-hidden py-20">
      {/* Minecraft-style background grid */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,156,59,0.3)_1px,transparent_1px),linear-gradient(rgba(0,156,59,0.3)_1px,transparent_1px)] bg-[40px_40px]"></div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-brazil-green/10 rounded-lg transform rotate-45"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-brazil-blue/10 rounded-lg transform -rotate-45"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[450px]">
          {/* Left: Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-white"
          >
            <div className="mb-8">
              <h1 className="text-5xl lg:text-6xl font-bold mb-4 leading-tight">
                <span className="block">BrasiLândia</span>
                <span className="block mt-2">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-brazil-green via-brazil-yellow to-brazil-blue">
                    Server
                  </span>
                </span>
              </h1>
              <div className="h-1 w-20 bg-gradient-to-r from-brazil-green to-brazil-blue mb-4"></div>
              <p className="text-lg text-gray-300 mb-2">
                Loja oficial do servidor de Minecraft
              </p>
              <p className="text-gray-400">
                Compre itens, cosméticos e benefícios VIP para melhorar sua experiência
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-black/40 backdrop-blur-sm p-4 rounded-lg border border-brazil-green/30 hover:border-brazil-green/60 transition-colors"
              >
                <div className="text-2xl font-bold text-brazil-green">1K+</div>
                <div className="text-xs text-gray-400 mt-1">Jogadores</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-black/40 backdrop-blur-sm p-4 rounded-lg border border-brazil-blue/30 hover:border-brazil-blue/60 transition-colors"
              >
                <div className="text-2xl font-bold text-brazil-blue">500+</div>
                <div className="text-xs text-gray-400 mt-1">Produtos</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-black/40 backdrop-blur-sm p-4 rounded-lg border border-brazil-yellow/30 hover:border-brazil-yellow/60 transition-colors"
              >
                <div className="text-2xl font-bold text-brazil-yellow">4+</div>
                <div className="text-xs text-gray-400 mt-1">Anos Online</div>
              </motion.div>
            </div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex gap-3 flex-wrap"
            >
              <Link href="/#produtos">
                <Button className="bg-gradient-to-r from-brazil-green to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-semibold">
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Explorar Loja
                </Button>
              </Link>
              <button className="px-6 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-lg font-semibold transition-colors backdrop-blur border border-white/20">
                Discord
              </button>
            </motion.div>
          </motion.div>

          {/* Right: Minecraft Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="hidden lg:flex items-center justify-center"
          >
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="relative"
            >
              {/* Stacked blocks effect */}
              <div className="relative w-48 h-48">
                {/* Bottom block */}
                <div className="absolute inset-0 bg-gradient-to-br from-brazil-green/80 to-emerald-700 rounded-sm shadow-2xl transform translate-y-4"></div>
                {/* Middle block */}
                <div className="absolute inset-0 bg-gradient-to-br from-brazil-blue/80 to-blue-800 rounded-sm shadow-2xl"></div>
                {/* Top block */}
                <div className="absolute inset-0 bg-gradient-to-br from-brazil-yellow/60 to-orange-600 rounded-sm shadow-2xl transform -translate-y-4"></div>

                {/* Pickaxe icon */}
                <div className="absolute inset-0 flex items-center justify-center text-7xl drop-shadow-lg">
                  ⛏️
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// Why Choose Us - Clean Cards
export function WhyChooseSection() {
  const reasons = [
    {
      icon: Shield,
      title: 'Segurança Garantida',
      description: 'Transações criptografadas com Mercado Pago',
      color: 'from-green-600 to-emerald-500',
    },
    {
      icon: Zap,
      title: 'Entrega Instantânea',
      description: 'Receba seus itens no jogo em segundos',
      color: 'from-yellow-600 to-orange-500',
    },
    {
      icon: Users,
      title: 'Comunidade Ativa',
      description: '1000+ jogadores jugando diariamente',
      color: 'from-purple-600 to-indigo-500',
    },
  ];

  return (
    <section className="py-16 bg-gray-950 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-white mb-3">
            Por que escolher <span className="text-brazil-green">BrasiLândia</span>?
          </h2>
          <p className="text-gray-400 text-sm">Temos tudo que você precisa</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <div className="relative bg-gray-900/50 backdrop-blur border border-gray-800 rounded-lg p-6 hover:border-gray-700 transition-all h-full">
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${reason.color} flex items-center justify-center mb-4`}>
                  <reason.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{reason.title}</h3>
                <p className="text-gray-400 text-sm">{reason.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Widgets Preview Section - Flexible Layout
export function WidgetsPreviewSection() {
  const widgets = [
    {
      id: 'discord',
      title: '💬 Discord',
      description: 'Comunidade',
      color: 'from-indigo-600 to-purple-600',
      enabled: true,
    },
    {
      id: 'rankings',
      title: '🏆 Rankings',
      description: 'Top Compradores',
      color: 'from-yellow-600 to-orange-600',
      enabled: true,
    },
    {
      id: 'lootbox',
      title: '🎮 Lootbox',
      description: 'Sistema de Lootboxes',
      color: 'from-pink-600 to-rose-600',
      enabled: true,
    },
    {
      id: 'roleta',
      title: '🎡 Roleta',
      description: 'Roleta da Sorte',
      color: 'from-purple-600 to-indigo-600',
      enabled: false,
    },
    {
      id: 'server-ip',
      title: '🌐 Server',
      description: 'IP do Servidor',
      color: 'from-green-600 to-emerald-600',
      enabled: true,
    },
  ];

  const enabledWidgets = widgets.filter(w => w.enabled);

  return (
    <section className="py-16 bg-gray-950 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-white mb-3">
            Funcionalidades da Loja
          </h2>
          <p className="text-gray-400 text-sm">Widgets customizáveis nas configurações</p>
        </motion.div>

        {/* Dynamic grid - adapts based on enabled widgets */}
        <div className={`grid gap-6 ${
          enabledWidgets.length === 5 ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-5' :
          enabledWidgets.length === 4 ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4' :
          enabledWidgets.length === 3 ? 'grid-cols-1 md:grid-cols-3' :
          enabledWidgets.length === 2 ? 'grid-cols-1 md:grid-cols-2' :
          'grid-cols-1'
        }`}>
          {enabledWidgets.map((widget, index) => (
            <motion.div
              key={widget.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="group"
            >
              <div className={`relative bg-gradient-to-br ${widget.color} rounded-lg p-6 h-full overflow-hidden cursor-pointer hover:shadow-lg transition-all`}>
                {/* Background pattern */}
                <div className="absolute inset-0 opacity-10 bg-[linear-gradient(45deg,rgba(0,0,0,0.3)_25%,transparent_25%)]"></div>

                <div className="relative z-10">
                  <div className="text-3xl mb-2">{widget.title.split(' ')[0]}</div>
                  <h3 className="text-white font-bold text-sm mb-1">{widget.title.split(' ')[1]}</h3>
                  <p className="text-white/80 text-xs">{widget.description}</p>
                  <button className="mt-4 text-white/70 hover:text-white text-xs font-semibold transition-colors">
                    Visualizar →
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Info box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-8 bg-gray-900/50 border border-gray-800 rounded-lg p-4 text-center"
        >
          <p className="text-gray-400 text-sm">
            ✓ {enabledWidgets.length} de {widgets.length} widgets ativos • Customize nas{' '}
            <Link href="/admin/settings" className="text-brazil-green hover:text-emerald-400 transition-colors">
              configurações
            </Link>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
