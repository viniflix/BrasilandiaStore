'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';
import { Save, Plus, Trash2 } from 'lucide-react';

interface ServerRule {
  id: string;
  title: string;
  description: string;
  punishment: string;
  punishment_duration_days: number | null;
  can_buy_unban: boolean;
  unban_product_id: string | null;
  order_index: number;
}

export function ServerRulesManager() {
  const [rules, setRules] = useState<ServerRule[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingRule, setEditingRule] = useState<ServerRule | null>(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchRules();
  }, []);

  const fetchRules = async () => {
    try {
      const { data, error } = await supabase
        .from('server_rules')
        .select('*')
        .order('order_index', { ascending: true });

      if (error) throw error;
      setRules((data || []) as ServerRule[]);
    } catch (error) {
      console.error('Error fetching rules:', error);
      toast.error('Erro ao carregar regras');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveRule = async (rule: Omit<ServerRule, 'id'> & { id?: string }) => {
    try {
      if (rule.id) {
        // Update
        const { id, ...ruleData } = rule;
        const client = supabase as any;
        const { error } = await client
          .from('server_rules')
          .update(ruleData)
          .eq('id', id);

        if (error) throw error;
        toast.success('Regra atualizada com sucesso!');
      } else {
        // Insert
        const { error } = await supabase
          .from('server_rules')
          .insert([rule] as any);

        if (error) throw error;
        toast.success('Regra criada com sucesso!');
      }

      await fetchRules();
      setEditingRule(null);
      setShowForm(false);
    } catch (error) {
      console.error('Error saving rule:', error);
      toast.error('Erro ao salvar regra');
    }
  };

  const handleDeleteRule = async (id: string) => {
    if (!confirm('Tem certeza que deseja deletar esta regra?')) return;

    try {
      const { error } = await supabase
        .from('server_rules')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast.success('Regra deletada com sucesso!');
      await fetchRules();
    } catch (error) {
      console.error('Error deleting rule:', error);
      toast.error('Erro ao deletar regra');
    }
  };

  if (loading) {
    return <div className="text-center py-8">Carregando...</div>;
  }

  return (
    <div className="space-y-6">
      <button
        onClick={() => setShowForm(true)}
        className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-colors"
      >
        <Plus className="w-5 h-5" />
        Nova Regra
      </button>

      {showForm && (
        <RuleForm
          rule={editingRule}
          onSave={handleSaveRule}
          onCancel={() => {
            setShowForm(false);
            setEditingRule(null);
          }}
        />
      )}

      <div className="space-y-4">
        {rules.length === 0 ? (
          <p className="text-gray-600 text-center py-8">Nenhuma regra cadastrada</p>
        ) : (
          rules.map((rule) => (
            <div key={rule.id} className="bg-white p-6 rounded-lg border border-gray-200 space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="text-lg font-bold text-gray-900">{rule.title}</h4>
                  <p className="text-gray-600 mt-1">{rule.description}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setEditingRule(rule);
                      setShowForm(true);
                    }}
                    className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDeleteRule(rule.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <div className="flex gap-6 text-sm text-gray-600">
                <div>Punição: <span className="font-semibold text-red-600">{rule.punishment}</span></div>
                {rule.punishment_duration_days && (
                  <div>Duração: <span className="font-semibold">{rule.punishment_duration_days} dias</span></div>
                )}
                {rule.can_buy_unban && (
                  <div className="text-green-600 font-semibold">Passível de compra de desban</div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

interface RuleFormProps {
  rule: ServerRule | null;
  onSave: (rule: Omit<ServerRule, 'id'> & { id?: string }) => Promise<void>;
  onCancel: () => void;
}

function RuleForm({ rule, onSave, onCancel }: RuleFormProps) {
  const [formData, setFormData] = useState(
    rule || {
      title: '',
      description: '',
      punishment: '',
      punishment_duration_days: null,
      can_buy_unban: false,
      unban_product_id: null,
      order_index: 0,
    }
  );
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await onSave({
        ...formData,
        id: rule?.id,
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg border border-gray-200 space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Título</label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Descrição</label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 h-20"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Punição</label>
          <input
            type="text"
            value={formData.punishment}
            onChange={(e) => setFormData({ ...formData, punishment: e.target.value })}
            required
            placeholder="Ex: Ban temporário"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Duração (dias)</label>
          <input
            type="number"
            value={formData.punishment_duration_days || ''}
            onChange={(e) =>
              setFormData({
                ...formData,
                punishment_duration_days: e.target.value ? parseInt(e.target.value) : (null as any),
              })
            }
            placeholder="Deixar vazio para permanente"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={formData.can_buy_unban}
          onChange={(e) => setFormData({ ...formData, can_buy_unban: e.target.checked })}
          className="w-4 h-4 text-blue-600 rounded focus:ring-2"
        />
        <label className="text-sm text-gray-700">Permite compra de desban?</label>
      </div>

      <div className="flex gap-3 pt-4">
        <button
          type="submit"
          disabled={saving}
          className="flex-1 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold rounded-lg flex items-center justify-center gap-2 transition-colors"
        >
          <Save className="w-5 h-5" />
          {saving ? 'Salvando...' : 'Salvar'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 py-2 bg-gray-300 hover:bg-gray-400 text-gray-900 font-semibold rounded-lg transition-colors"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}
