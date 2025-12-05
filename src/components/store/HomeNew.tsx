'use client';

import { MessageSquare, Trophy, Gamepad2, RotateCw, Server, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';

// Discord Widget
function DiscordWidget() {
  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
          <MessageSquare className="w-6 h-6 text-white" />
        </div>
        <h3 className="text-lg font-bold text-gray-900">Discord</h3>
      </div>
      
      <div className="space-y-4 mb-6">
        <div>
          <p className="text-xs text-gray-500 uppercase tracking-wide font-medium mb-2">Status</p>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <span className="font-semibold text-gray-900">Online</span>
          </div>
        </div>
        
        <div>
          <p className="text-xs text-gray-500 uppercase tracking-wide font-medium mb-2">Membros Ativos</p>
          <p className="text-3xl font-bold text-blue-600">1,234</p>
        </div>
      </div>

      <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold">
        Entrar no Discord
      </Button>
    </div>
  );
}

// Rankings Widget
function RankingsWidget() {
  const topPlayers = [
    { rank: 1, name: 'PlayerX', spent: 'R$ 5,230', icon: '👑' },
    { rank: 2, name: 'GamerPro', spent: 'R$ 4,890', icon: '🥈' },
    { rank: 3, name: 'NinjaKid', spent: 'R$ 3,450', icon: '🥉' },
  ];

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-yellow-400 rounded-xl flex items-center justify-center">
          <Trophy className="w-6 h-6 text-white" />
        </div>
        <h3 className="text-lg font-bold text-gray-900">Top Compradores</h3>
      </div>
      
      <div className="space-y-3">
        {topPlayers.map((player) => (
          <div key={player.rank} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{player.icon}</span>
              <div>
                <p className="font-semibold text-gray-900 text-sm">{player.name}</p>
              </div>
            </div>
            <span className="font-bold text-green-600 text-sm">{player.spent}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// Lootbox Widget
function LootboxWidget() {
  const boxes = [
    { emoji: '📦', name: 'Comum', price: 'R$ 9,90', color: 'bg-gray-100' },
    { emoji: '💎', name: 'Rara', price: 'R$ 19,90', color: 'bg-purple-100' },
    { emoji: '👑', name: 'Lendária', price: 'R$ 49,90', color: 'bg-yellow-100' },
  ];

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-pink-500 rounded-xl flex items-center justify-center">
          <Gamepad2 className="w-6 h-6 text-white" />
        </div>
        <h3 className="text-lg font-bold text-gray-900">Lootboxes</h3>
      </div>
      
      <div className="space-y-2 mb-6">
        {boxes.map((box) => (
          <div key={box.name} className={`p-3 rounded-xl flex items-center justify-between ${box.color}`}>
            <div className="flex items-center gap-2">
              <span className="text-xl">{box.emoji}</span>
              <span className="font-medium text-gray-900 text-sm">{box.name}</span>
            </div>
            <span className="font-bold text-pink-600 text-sm">{box.price}</span>
          </div>
        ))}
      </div>

      <Button className="w-full bg-pink-500 hover:bg-pink-600 text-white rounded-xl font-semibold">
        Abrir Lootbox
      </Button>
    </div>
  );
}

// Roleta Widget
function RoletaWidget() {
  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center">
          <RotateCw className="w-6 h-6 text-white" />
        </div>
        <h3 className="text-lg font-bold text-gray-900">Roleta da Sorte</h3>
      </div>
      
      <div className="flex flex-col items-center justify-center py-8 mb-6">
        <div className="text-6xl animate-spin mb-4">🎡</div>
        <p className="text-sm text-gray-600 text-center">Gire a roleta e ganhe prêmios incríveis!</p>
      </div>

      <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-semibold">
        Girar Roleta
      </Button>
    </div>
  );
}

// Server IP Widget
function ServerIPWidget() {
  const serverIP = 'play.brasilandia.com.br';
  const version = '1.20.4';
  const players = '234/500';

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-cyan-500 rounded-xl flex items-center justify-center">
          <Server className="w-6 h-6 text-white" />
        </div>
        <h3 className="text-lg font-bold text-gray-900">IP do Servidor</h3>
      </div>
      
      <div className="space-y-4 mb-6">
        <div>
          <p className="text-xs text-gray-500 uppercase tracking-wide font-medium mb-2">Endereço</p>
          <p className="font-bold text-gray-900 break-all text-sm bg-gray-50 p-3 rounded-lg">{serverIP}</p>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-blue-50 rounded-xl p-3 text-center">
            <p className="text-xs text-gray-600 font-medium">Versão</p>
            <p className="font-bold text-blue-600 text-sm mt-1">{version}</p>
          </div>
          <div className="bg-green-50 rounded-xl p-3 text-center">
            <p className="text-xs text-gray-600 font-medium">Jogadores</p>
            <p className="font-bold text-green-600 text-sm mt-1">{players}</p>
          </div>
        </div>
      </div>

      <button 
        onClick={() => navigator.clipboard.writeText(serverIP)}
        className="w-full bg-cyan-500 hover:bg-cyan-600 text-white rounded-xl font-semibold py-2 transition-colors"
      >
        Copiar IP
      </button>
    </div>
  );
}

// Hero Section - Clean Banner
export function HeroSection() {
  return (
    <section className="bg-gradient-to-r from-blue-600 to-green-600 text-white py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">⛏️ BrasiLândia</h1>
          <p className="text-lg sm:text-xl text-white/90 mb-6">
            A melhor loja de items para seu servidor Minecraft. Compre com segurança e receba instantaneamente!
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="bg-white text-blue-600 font-semibold py-3 px-8 rounded-xl hover:bg-gray-100 transition-colors flex items-center justify-center gap-2">
              Explorar Produtos
              <ArrowRight className="w-5 h-5" />
            </button>
            <button className="border-2 border-white text-white font-semibold py-3 px-8 rounded-xl hover:bg-white/10 transition-colors">
              Discord
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

// Widgets Section
export function WidgetsSection() {
  return (
    <section className="bg-white py-16 sm:py-20 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">Comunidade</h2>
          <p className="text-gray-600">Acompanhe o melhor da comunidade BrasiLândia</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          <div className="lg:col-span-2">
            <DiscordWidget />
          </div>
          <div className="lg:col-span-2">
            <RankingsWidget />
          </div>
          <div>
            <RoletaWidget />
          </div>
          <div>
            <LootboxWidget />
          </div>
          <div>
            <ServerIPWidget />
          </div>
        </div>
      </div>
    </section>
  );
}
