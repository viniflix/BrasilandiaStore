'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Save, Palette, Store, Key, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { supabase } from '@/lib/supabase';
import type { StoreSettings } from '@/types/database';
import { toast } from 'sonner';

export default function SettingsPage() {
  const [settings, setSettings] = useState<StoreSettings | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const [formData, setFormData] = useState({
    store_name: 'BrasiLândia Store',
    logo_url: '',
    primary_green: '#009C3B',
    primary_blue: '#002776',
    primary_yellow: '#FFDF00',
    background_color: '#F5F5F7',
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from('store_settings')
      .select('*')
      .single();

    if (error && error.code !== 'PGRST116') {
      console.error(error);
    }

    if (data) {
      const settingsData = data as StoreSettings;
      setSettings(settingsData);
      setFormData({
        store_name: settingsData.store_name,
        logo_url: settingsData.logo_url,
        primary_green: settingsData.primary_green,
        primary_blue: settingsData.primary_blue,
        primary_yellow: settingsData.primary_yellow,
        background_color: settingsData.background_color,
      });
    }
    setIsLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    if (settings) {
      // Update existing settings
      const { error } = await supabase
        .from('store_settings')
        .update(formData as never)
        .eq('id', settings.id);

      if (error) {
        toast.error('Erro ao salvar configurações');
        console.error(error);
      } else {
        toast.success('Configurações salvas com sucesso!');
        fetchSettings();
      }
    } else {
      // Create new settings
      const { error } = await supabase
        .from('store_settings')
        .insert([formData] as never);

      if (error) {
        toast.error('Erro ao criar configurações');
        console.error(error);
      } else {
        toast.success('Configurações criadas com sucesso!');
        fetchSettings();
      }
    }

    setIsSaving(false);
  };

  const resetToDefaults = () => {
    setFormData({
      store_name: 'BrasiLândia Store',
      logo_url: '',
      primary_green: '#009C3B',
      primary_blue: '#002776',
      primary_yellow: '#FFDF00',
      background_color: '#F5F5F7',
    });
    toast.info('Valores restaurados para o padrão');
  };

  if (isLoading) {
    return (
      <div className="animate-pulse space-y-6">
        <div className="h-64 bg-gray-200 rounded-2xl" />
        <div className="h-64 bg-gray-200 rounded-2xl" />
      </div>
    );
  }

  return (
    <div className="max-w-3xl space-y-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Store Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-6 shadow-soft"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-brazil-blue/10 rounded-xl">
              <Store className="w-5 h-5 text-brazil-blue" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">Informações da Loja</h3>
          </div>

          <div className="space-y-4">
            <Input
              label="Nome da Loja"
              value={formData.store_name}
              onChange={(e) => setFormData((p) => ({ ...p, store_name: e.target.value }))}
              placeholder="BrasiLândia Store"
            />
            <Input
              label="URL do Logo"
              value={formData.logo_url}
              onChange={(e) => setFormData((p) => ({ ...p, logo_url: e.target.value }))}
              placeholder="https://..."
            />
            {formData.logo_url && (
              <div className="p-4 bg-gray-50 rounded-xl">
                <p className="text-sm text-gray-500 mb-2">Pré-visualização:</p>
                <img
                  src={formData.logo_url}
                  alt="Logo preview"
                  className="max-h-20 object-contain"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              </div>
            )}
          </div>
        </motion.div>

        {/* Colors */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl p-6 shadow-soft"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-brazil-green/10 rounded-xl">
              <Palette className="w-5 h-5 text-brazil-green" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">Cores da Loja</h3>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Primary Green */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Verde Principal
              </label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={formData.primary_green}
                  onChange={(e) => setFormData((p) => ({ ...p, primary_green: e.target.value }))}
                  className="w-12 h-10 rounded-lg border cursor-pointer"
                />
                <input
                  type="text"
                  value={formData.primary_green}
                  onChange={(e) => setFormData((p) => ({ ...p, primary_green: e.target.value }))}
                  className="flex-1 px-4 py-2 rounded-xl border border-gray-300 font-mono text-sm"
                />
              </div>
            </div>

            {/* Primary Blue */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Azul Principal
              </label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={formData.primary_blue}
                  onChange={(e) => setFormData((p) => ({ ...p, primary_blue: e.target.value }))}
                  className="w-12 h-10 rounded-lg border cursor-pointer"
                />
                <input
                  type="text"
                  value={formData.primary_blue}
                  onChange={(e) => setFormData((p) => ({ ...p, primary_blue: e.target.value }))}
                  className="flex-1 px-4 py-2 rounded-xl border border-gray-300 font-mono text-sm"
                />
              </div>
            </div>

            {/* Primary Yellow */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Amarelo Principal
              </label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={formData.primary_yellow}
                  onChange={(e) => setFormData((p) => ({ ...p, primary_yellow: e.target.value }))}
                  className="w-12 h-10 rounded-lg border cursor-pointer"
                />
                <input
                  type="text"
                  value={formData.primary_yellow}
                  onChange={(e) => setFormData((p) => ({ ...p, primary_yellow: e.target.value }))}
                  className="flex-1 px-4 py-2 rounded-xl border border-gray-300 font-mono text-sm"
                />
              </div>
            </div>

            {/* Background */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Cor de Fundo
              </label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={formData.background_color}
                  onChange={(e) => setFormData((p) => ({ ...p, background_color: e.target.value }))}
                  className="w-12 h-10 rounded-lg border cursor-pointer"
                />
                <input
                  type="text"
                  value={formData.background_color}
                  onChange={(e) => setFormData((p) => ({ ...p, background_color: e.target.value }))}
                  className="flex-1 px-4 py-2 rounded-xl border border-gray-300 font-mono text-sm"
                />
              </div>
            </div>
          </div>

          {/* Color Preview */}
          <div className="mt-6 p-4 rounded-xl" style={{ backgroundColor: formData.background_color }}>
            <p className="text-sm text-gray-500 mb-2">Pré-visualização das cores:</p>
            <div className="flex gap-2">
              <div
                className="w-16 h-8 rounded-lg"
                style={{ backgroundColor: formData.primary_green }}
              />
              <div
                className="w-16 h-8 rounded-lg"
                style={{ backgroundColor: formData.primary_blue }}
              />
              <div
                className="w-16 h-8 rounded-lg border"
                style={{ backgroundColor: formData.primary_yellow }}
              />
            </div>
          </div>
        </motion.div>

        {/* API Keys Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl p-6 shadow-soft"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-yellow-100 rounded-xl">
              <Key className="w-5 h-5 text-yellow-600" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">Chaves de API</h3>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
            <p className="text-yellow-800 text-sm">
              As chaves de API (Supabase, Mercado Pago, Pterodactyl) devem ser configuradas
              diretamente no arquivo <code className="bg-yellow-100 px-1 rounded">.env.local</code> do servidor
              por questões de segurança.
            </p>
          </div>
        </motion.div>

        {/* Actions */}
        <div className="flex gap-3">
          <Button type="button" variant="outline" onClick={resetToDefaults}>
            <RefreshCw className="w-4 h-4" />
            Restaurar Padrões
          </Button>
          <Button type="submit" isLoading={isSaving} className="flex-1">
            <Save className="w-4 h-4" />
            Salvar Configurações
          </Button>
        </div>
      </form>
    </div>
  );
}
