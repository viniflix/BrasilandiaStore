import { Settings, MessageSquare, Trophy, Gamepad2, RotateCw, Server } from 'lucide-react';
import type { Widget } from './WidgetSystem';

// Discord Widget
function DiscordWidget() {
  return (
    <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-8 text-white">
      <div className="flex items-center gap-3 mb-6">
        <MessageSquare className="w-6 h-6" />
        <h3 className="text-xl font-bold">Discord da Comunidade</h3>
      </div>
      <div className="bg-black/30 rounded-xl p-4 mb-4">
        <p className="text-sm text-gray-200 mb-4">Status do Servidor Discord:</p>
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
          <span className="font-semibold">Online - 1,234 membros</span>
        </div>
      </div>
      <button className="w-full bg-indigo-600 hover:bg-indigo-700 py-2 rounded-lg font-semibold transition-colors">
        Entrar no Discord
      </button>
    </div>
  );
}

// Rankings Widget
function RankingsWidget() {
  const topPlayers = [
    { rank: 1, name: 'PlayerX', spent: 'R$ 5,230' },
    { rank: 2, name: 'GamerPro', spent: 'R$ 4,890' },
    { rank: 3, name: 'NinjaKid', spent: 'R$ 3,450' },
  ];

  return (
    <div className="bg-gradient-to-br from-yellow-500 to-orange-600 rounded-2xl p-8 text-white">
      <div className="flex items-center gap-3 mb-6">
        <Trophy className="w-6 h-6" />
        <h3 className="text-xl font-bold">Top Compradores</h3>
      </div>
      <div className="space-y-3">
        {topPlayers.map((player) => (
          <div key={player.rank} className="flex items-center justify-between bg-black/30 p-3 rounded-lg">
            <div className="flex items-center gap-3">
              <span className="font-bold text-lg w-8">{player.rank}º</span>
              <span className="font-semibold">{player.name}</span>
            </div>
            <span className="text-yellow-200 font-bold">{player.spent}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// Lootbox Widget
function LootboxWidget() {
  return (
    <div className="bg-gradient-to-br from-pink-500 to-red-600 rounded-2xl p-8 text-white">
      <div className="flex items-center gap-3 mb-6">
        <Gamepad2 className="w-6 h-6" />
        <h3 className="text-xl font-bold">Lootboxes</h3>
      </div>
      <div className="bg-black/30 rounded-xl p-4 mb-4">
        <p className="text-sm text-gray-200 mb-3">Abra lootboxes e ganhe itens exclusivos!</p>
        <div className="flex gap-3">
          <div className="flex-1 text-center">
            <div className="text-3xl mb-1">📦</div>
            <p className="text-xs">Comum</p>
            <p className="text-sm font-bold">R$ 9,90</p>
          </div>
          <div className="flex-1 text-center">
            <div className="text-3xl mb-1">💎</div>
            <p className="text-xs">Rara</p>
            <p className="text-sm font-bold">R$ 19,90</p>
          </div>
          <div className="flex-1 text-center">
            <div className="text-3xl mb-1">👑</div>
            <p className="text-xs">Lendária</p>
            <p className="text-sm font-bold">R$ 49,90</p>
          </div>
        </div>
      </div>
      <button className="w-full bg-pink-600 hover:bg-pink-700 py-2 rounded-lg font-semibold transition-colors">
        Ver Lootboxes
      </button>
    </div>
  );
}

// Roleta Widget
function RoletaWidget() {
  return (
    <div className="bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl p-8 text-white">
      <div className="flex items-center gap-3 mb-6">
        <RotateCw className="w-6 h-6" />
        <h3 className="text-xl font-bold">Roleta da Sorte</h3>
      </div>
      <div className="bg-black/30 rounded-xl p-6 mb-4 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-3 animate-spin inline-block">🎡</div>
          <p className="text-sm text-gray-200">Gire e ganhe prêmios incríveis!</p>
        </div>
      </div>
      <button className="w-full bg-purple-600 hover:bg-purple-700 py-2 rounded-lg font-semibold transition-colors">
        Girar Roleta
      </button>
    </div>
  );
}

// Server IP Widget
function ServerIPWidget() {
  const serverIP = '187.45.230.123:25565';

  return (
    <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-8 text-white">
      <div className="flex items-center gap-3 mb-6">
        <Server className="w-6 h-6" />
        <h3 className="text-xl font-bold">IP do Servidor</h3>
      </div>
      <div className="bg-black/30 rounded-xl p-4 mb-4">
        <p className="text-sm text-gray-300 mb-2">Conecte ao nosso servidor:</p>
        <div className="flex items-center justify-between bg-gray-900 p-3 rounded-lg">
          <code className="font-mono font-bold text-green-300 break-all">{serverIP}</code>
          <button className="ml-2 text-green-300 hover:text-green-200 transition-colors" title="Copiar">
            📋
          </button>
        </div>
      </div>
      <div className="bg-black/30 p-3 rounded-lg">
        <p className="text-xs text-gray-300">
          <span className="text-green-300 font-bold">●</span> Servidor Online - 127/200 jogadores
        </p>
      </div>
    </div>
  );
}

export const AVAILABLE_WIDGETS: Widget[] = [
  {
    id: 'discord',
    name: 'discord',
    title: 'Discord da Comunidade',
    description: 'Mostre o status do seu servidor Discord e link para entrar',
    icon: <MessageSquare className="w-5 h-5" />,
    enabled: true,
    order: 0,
    color: 'bg-indigo-500',
    component: DiscordWidget,
  },
  {
    id: 'rankings',
    name: 'rankings',
    title: 'Top Compradores',
    description: 'Ranking dos maiores compradores e doadores',
    icon: <Trophy className="w-5 h-5" />,
    enabled: true,
    order: 1,
    color: 'bg-yellow-500',
    component: RankingsWidget,
  },
  {
    id: 'lootbox',
    name: 'lootbox',
    title: 'Sistema de Lootboxes',
    description: 'Permita que jogadores abram lootboxes para ganhar itens',
    icon: <Gamepad2 className="w-5 h-5" />,
    enabled: true,
    order: 2,
    color: 'bg-pink-500',
    component: LootboxWidget,
  },
  {
    id: 'roleta',
    name: 'roleta',
    title: 'Roleta da Sorte',
    description: 'Uma roleta interativa para ganhar prêmios aleatórios',
    icon: <RotateCw className="w-5 h-5" />,
    enabled: false,
    order: 3,
    color: 'bg-purple-500',
    component: RoletaWidget,
  },
  {
    id: 'server-ip',
    name: 'server-ip',
    title: 'IP do Servidor',
    description: 'Mostre o IP e status do seu servidor Minecraft',
    icon: <Server className="w-5 h-5" />,
    enabled: true,
    order: 4,
    color: 'bg-green-500',
    component: ServerIPWidget,
  },
];
