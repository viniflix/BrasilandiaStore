'use client';

import { motion } from 'framer-motion';
import { ShoppingCart, Shield, Zap, Users, Crown, Gamepad2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

const features = [
  {
    icon: ShoppingCart,
    title: 'Loja Segura',
    description: 'Transações 100% seguras com Mercado Pago integrado',
    color: 'bg-green-500',
  },
  {
    icon: Zap,
    title: 'Entrega Instantânea',
    description: 'Receba seus itens no jogo em segundos',
    color: 'bg-yellow-500',
  },
  {
    icon: Shield,
    title: 'Confiável',
    description: 'Servidor confiável desde 2020 com milhares de jogadores',
    color: 'bg-blue-500',
  },
  {
    icon: Users,
    title: 'Comunidade Ativa',
    description: 'Junte-se a uma comunidade vibrante de jogadores',
    color: 'bg-purple-500',
  },
  {
    icon: Crown,
    title: 'Benefícios VIP',
    description: 'Acesso a conteúdo exclusivo e suporte prioritário',
    color: 'bg-orange-500',
  },
  {
    icon: Gamepad2,
    title: 'Experiência Premium',
    description: 'Itens únicos e coleções raras para se destacar',
    color: 'bg-red-500',
  },
];

const stats = [
  { label: 'Jogadores Ativos', value: '1000+', icon: '👥' },
  { label: 'Itens Disponíveis', value: '200+', icon: '🎁' },
  { label: 'Anos de Experiência', value: '4+', icon: '⭐' },
];

export function HeroSection() {
  return (
    <section className="relative min-h-screen bg-gradient-to-b from-brazil-blue via-brazil-blue/90 to-background pt-20 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-brazil-green/20 rounded-full blur-3xl" />
        <div className="absolute top-40 -left-40 w-80 h-80 bg-brazil-yellow/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[80vh] py-20">
          {/* Left Side - Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="z-20"
          >
            <div className="mb-6">
              <span className="inline-block px-4 py-2 bg-brazil-yellow/20 text-brazil-yellow rounded-full text-sm font-semibold">
                ✨ Bem-vindo ao BrasiLândia
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Loja Oficial do
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-brazil-yellow via-brazil-green to-brazil-yellow">
                Servidor BrasiLândia Pixelmon
              </span>
            </h1>

            <p className="text-xl text-white/80 mb-8 leading-relaxed">
              Adquira itens exclusivos, pokémons raros e benefícios VIP para turbinar sua experiência no servidor. 
              Transações seguras, entrega instantânea e comunidade incrível.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-8 py-8 border-t border-b border-white/10">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-3xl mb-2">{stat.icon}</div>
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-sm text-white/60">{stat.label}</div>
                </motion.div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/#produtos" className="w-full sm:w-auto">
                <Button size="lg" className="w-full bg-brazil-yellow hover:bg-brazil-yellow/90 text-brazil-blue font-bold">
                  <ShoppingCart className="w-5 h-5" />
                  Explorar Loja
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto border-white/30 text-white hover:bg-white/10"
              >
                Saber Mais
              </Button>
            </div>
          </motion.div>

          {/* Right Side - Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative h-96 lg:h-full"
          >
            {/* Decorative cards */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="relative w-full h-full max-w-md"
              >
                {/* Card 1 */}
                <motion.div
                  className="absolute top-0 right-0 w-48 h-64 bg-gradient-to-br from-brazil-yellow/30 to-brazil-green/30 rounded-2xl backdrop-blur-lg border border-white/20 p-4 shadow-2xl"
                  animate={{ rotate: [0, 5, 0] }}
                  transition={{ duration: 6, repeat: Infinity }}
                >
                  <div className="text-4xl mb-3">👑</div>
                  <h3 className="text-white font-bold mb-2">VIP Premium</h3>
                  <p className="text-white/70 text-sm">Acesso exclusivo a itens raros</p>
                </motion.div>

                {/* Card 2 */}
                <motion.div
                  className="absolute bottom-0 left-0 w-48 h-64 bg-gradient-to-br from-brazil-blue/30 to-blue-600/30 rounded-2xl backdrop-blur-lg border border-white/20 p-4 shadow-2xl"
                  animate={{ rotate: [0, -5, 0] }}
                  transition={{ duration: 6, repeat: Infinity, delay: 0.5 }}
                >
                  <div className="text-4xl mb-3">🐉</div>
                  <h3 className="text-white font-bold mb-2">Pokémons Raros</h3>
                  <p className="text-white/70 text-sm">Colecione criaturas lendárias</p>
                </motion.div>

                {/* Card 3 */}
                <motion.div
                  className="absolute top-1/4 left-1/2 transform -translate-x-1/2 w-48 h-64 bg-gradient-to-br from-purple-500/30 to-pink-500/30 rounded-2xl backdrop-blur-lg border border-white/20 p-4 shadow-2xl"
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 5, repeat: Infinity, delay: 1 }}
                >
                  <div className="text-4xl mb-3">✨</div>
                  <h3 className="text-white font-bold mb-2">Cosméticos</h3>
                  <p className="text-white/70 text-sm">Personalize seu avatar</p>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export function FeaturesSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Por que escolher
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brazil-blue to-brazil-green">
              {' '}BrasiLândia?
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Oferecemos a melhor experiência de compra para jogadores Pixelmon
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-brazil-blue/10 to-brazil-green/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all" />
              <div className="relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-shadow border border-gray-100">
                <div className={`${feature.color} w-14 h-14 rounded-xl flex items-center justify-center mb-4 text-white shadow-lg`}>
                  <feature.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
