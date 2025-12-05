'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';
import { Save } from 'lucide-react';

interface ServerConfig {
  id: string;
  server_name: string;
  server_logo_url: string;
  server_banner_bg_url: string;
  server_description: string;
  ip_address: string;
  version: string;
  max_players: number;
}

export function ServerSettingsForm() {
  const [config, setConfig] = useState<ServerConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchConfig();
  }, []);

  const fetchConfig = async () => {
    try {
      const { data, error } = await supabase
        .from('server_config')
        .select('*')
        .single();

      if (error) throw error;
      setConfig(data);
    } catch (error) {
      console.error('Error fetching config:', error);
      toast.error('Erro ao carregar configurações');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!config) return;
    setSaving(true);

    try {
      const updateData = {
        server_name: config.server_name,
        server_logo_url: config.server_logo_url,
        server_banner_bg_url: config.server_banner_bg_url,
        server_description: config.server_description,
        ip_address: config.ip_address,
        version: config.version,
        max_players: config.max_players,
      };

      const client = supabase as any;
      const { error } = await client
        .from('server_config')
        .update(updateData)
        .eq('id', config.id);

      if (error) throw error;
      toast.success('Configurações salvas com sucesso!');
    } catch (error) {
      console.error('Error saving config:', error);
      toast.error('Erro ao salvar configurações');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="text-center py-8">Carregando...</div>;
  }

  if (!config) {
    return <div className="text-center py-8">Erro ao carregar configurações</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Nome do Servidor</label>
        <input
          type="text"
          value={config.server_name}
          onChange={(e) => setConfig({ ...config, server_name: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Descrição</label>
        <textarea
          value={config.server_description}
          onChange={(e) => setConfig({ ...config, server_description: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 h-24"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">IP do Servidor</label>
          <input
            type="text"
            value={config.ip_address}
            onChange={(e) => setConfig({ ...config, ip_address: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Versão</label>
          <input
            type="text"
            value={config.version}
            onChange={(e) => setConfig({ ...config, version: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Máximo de Jogadores</label>
        <input
          type="number"
          value={config.max_players}
          onChange={(e) => setConfig({ ...config, max_players: parseInt(e.target.value) })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">URL da Logo</label>
        <input
          type="url"
          value={config.server_logo_url || ''}
          onChange={(e) => setConfig({ ...config, server_logo_url: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          placeholder="https://exemplo.com/logo.png"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">URL do Banner (Background)</label>
        <input
          type="url"
          value={config.server_banner_bg_url || ''}
          onChange={(e) => setConfig({ ...config, server_banner_bg_url: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          placeholder="https://exemplo.com/banner.jpg"
        />
      </div>

      <button
        onClick={handleSave}
        disabled={saving}
        className="w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold rounded-lg flex items-center justify-center gap-2 transition-colors"
      >
        <Save className="w-5 h-5" />
        {saving ? 'Salvando...' : 'Salvar Configurações'}
      </button>
    </div>
  );
}
