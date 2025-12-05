'use client';

import { usePathname } from 'next/navigation';
import { Bell, Search } from 'lucide-react';

const pageTitles: Record<string, string> = {
  '/admin/dashboard': 'Dashboard',
  '/admin/products': 'Gerenciar Produtos',
  '/admin/categories': 'Gerenciar Categorias',
  '/admin/orders': 'Pedidos',
  '/admin/settings': 'Configurações',
};

export function AdminHeader() {
  const pathname = usePathname();
  const title = pageTitles[pathname] || 'Admin';

  return (
    <header className="bg-white border-b px-8 py-4 flex items-center justify-between">
      <h1 className="text-2xl font-bold text-gray-900">{title}</h1>

      <div className="flex items-center gap-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar..."
            className="pl-10 pr-4 py-2 bg-gray-100 rounded-xl border-0
              focus:ring-2 focus:ring-brazil-green focus:bg-white
              transition-all duration-200 w-64"
          />
        </div>

        {/* Notifications */}
        <button className="relative p-2 hover:bg-gray-100 rounded-xl transition-colors">
          <Bell className="w-5 h-5 text-gray-600" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
        </button>
      </div>
    </header>
  );
}
