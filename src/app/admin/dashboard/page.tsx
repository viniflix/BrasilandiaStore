'use client';

import { motion } from 'framer-motion';
import {
  DollarSign,
  ShoppingCart,
  Package,
  Users,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import type { Order } from '@/types/database';

interface DashboardStats {
  totalSales: number;
  totalOrders: number;
  totalProducts: number;
  totalCustomers: number;
  salesByMonth: Array<{ name: string; vendas: number }>;
  recentOrders: Order[];
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setIsLoading(true);
    try {
      // Fetch all orders
      const { data: orders, error: ordersError } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });

      if (ordersError) {
        console.error('Error fetching orders:', ordersError);
        setIsLoading(false);
        return;
      }

      // Fetch products count
      const { count: productCount, error: productError } = await supabase
        .from('products')
        .select('*', { count: 'exact', head: true });

      if (productError) {
        console.error('Error fetching products count:', productError);
      }

      // Calculate stats from real data
      const approvedOrders = ((orders as Order[]) || []).filter(o => o.status === 'approved');
      const totalSales = approvedOrders.reduce((sum, order) => sum + order.total, 0);
      const totalOrders = approvedOrders.length;
      const uniqueCustomers = new Set(approvedOrders.map(o => o.email)).size;

      // Group sales by month
      const salesByMonth = Array.from({ length: 7 }, (_, i) => {
        const date = new Date();
        date.setMonth(date.getMonth() - (6 - i));
        const monthName = date.toLocaleString('pt-BR', { month: 'short' });
        const month = date.getMonth();
        const year = date.getFullYear();

        const monthSales = approvedOrders
          .filter(o => {
            const oDate = new Date(o.created_at);
            return oDate.getMonth() === month && oDate.getFullYear() === year;
          })
          .reduce((sum, o) => sum + o.total, 0);

        return {
          name: monthName.charAt(0).toUpperCase() + monthName.slice(1),
          vendas: Math.round(monthSales * 100) / 100,
        };
      });

      const recentOrders = approvedOrders.slice(0, 5);

      setStats({
        totalSales,
        totalOrders,
        totalProducts: productCount || 0,
        totalCustomers: uniqueCustomers,
        salesByMonth,
        recentOrders,
      });
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading || !stats) {
    return (
      <div className="space-y-8 animate-pulse">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-gray-200 rounded-2xl h-32" />
          ))}
        </div>
        <div className="bg-gray-200 rounded-2xl h-96" />
      </div>
    );
  }

  const statsData = [
    {
      title: 'Vendas Totais',
      value: `R$ ${stats.totalSales.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`,
      change: stats.totalOrders > 0 ? `+${stats.totalOrders} pedidos` : 'Sem vendas',
      isPositive: stats.totalOrders > 0,
      icon: DollarSign,
      color: 'bg-green-500',
    },
    {
      title: 'Pedidos Aprovados',
      value: stats.totalOrders.toString(),
      change: stats.totalOrders > 0 ? '+' + stats.totalOrders : 'Nenhum',
      isPositive: stats.totalOrders > 0,
      icon: ShoppingCart,
      color: 'bg-blue-500',
    },
    {
      title: 'Produtos',
      value: stats.totalProducts.toString(),
      change: stats.totalProducts > 0 ? '+' + stats.totalProducts : 'Adicione produtos',
      isPositive: true,
      icon: Package,
      color: 'bg-purple-500',
    },
    {
      title: 'Clientes',
      value: stats.totalCustomers.toString(),
      change: stats.totalCustomers > 0 ? '+' + stats.totalCustomers : 'Sem clientes',
      isPositive: stats.totalCustomers > 0,
      icon: Users,
      color: 'bg-orange-500',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsData.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-2xl p-6 shadow-soft"
          >
            <div className="flex items-start justify-between">
              <div className={`${stat.color} p-3 rounded-xl`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <div className={`flex items-center gap-1 text-sm font-medium
                ${stat.isPositive ? 'text-green-500' : 'text-red-500'}`}>
                {stat.isPositive ? (
                  <ArrowUpRight className="w-4 h-4" />
                ) : (
                  <ArrowDownRight className="w-4 h-4" />
                )}
                {stat.change}
              </div>
            </div>
            <div className="mt-4">
              <h3 className="text-gray-500 text-sm">{stat.title}</h3>
              <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl p-6 shadow-soft"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold text-gray-900">Vendas Mensais</h3>
              <p className="text-gray-500 text-sm">Últimos 7 meses</p>
            </div>
            <div className="flex items-center gap-2 text-brazil-green">
              <TrendingUp className="w-5 h-5" />
              <span className="font-semibold">+23%</span>
            </div>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={stats.salesByMonth}>
                <defs>
                  <linearGradient id="colorVendas" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#009C3B" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#009C3B" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: 'none',
                    borderRadius: '12px',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="vendas"
                  stroke="#009C3B"
                  strokeWidth={3}
                  fill="url(#colorVendas)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Bar Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-2xl p-6 shadow-soft"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold text-gray-900">Análise de Vendas</h3>
              <p className="text-gray-500 text-sm">Por período</p>
            </div>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats.salesByMonth}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: 'none',
                    borderRadius: '12px',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                  }}
                />
                <Bar dataKey="vendas" fill="#002776" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Recent Orders */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-white rounded-2xl p-6 shadow-soft"
      >
        <div className="mb-6">
          <h3 className="text-lg font-bold text-gray-900">Últimos Pedidos</h3>
          <p className="text-gray-500 text-sm">Pedidos aprovados recentemente</p>
        </div>

        {stats.recentOrders.length === 0 ? (
          <div className="text-center py-8">
            <ShoppingCart className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">Nenhum pedido aprovado ainda</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Cliente</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Email</th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-700">Valor</th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-700">Status</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Data</th>
                </tr>
              </thead>
              <tbody>
                {stats.recentOrders.map((order) => (
                  <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                    <td className="py-4 px-4 text-gray-900 font-medium">{order.player_nickname}</td>
                    <td className="py-4 px-4 text-gray-600 text-sm">{order.email}</td>
                    <td className="py-4 px-4 text-right font-semibold text-green-600">
                      R$ {order.total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </td>
                    <td className="py-4 px-4 text-center">
                      <span className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-700">
                        Aprovado
                      </span>
                    </td>
                    <td className="py-4 px-4 text-gray-600 text-sm">
                      {new Date(order.created_at).toLocaleDateString('pt-BR')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </motion.div>
    </div>
  );
}
