'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Pencil, Trash2, FolderTree } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Modal } from '@/components/ui/Modal';
import { supabase } from '@/lib/supabase';
import type { Category } from '@/types/database';
import { toast } from 'sonner';

// Available icons for categories
const iconOptions = [
  '🎮', '⚔️', '🛡️', '💎', '🏆', '⭐', '🎁', '🪙',
  '🐉', '🦊', '🔥', '⚡', '🌟', '👑', '🎯', '🎪'
];

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    icon: '🎮',
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast.error('Erro ao carregar categorias');
      console.error(error);
    } else {
      setCategories(data || []);
    }
    setIsLoading(false);
  };

  const openModal = (category?: Category) => {
    if (category) {
      setEditingCategory(category);
      setFormData({
        name: category.name,
        slug: category.slug,
        icon: category.icon,
      });
    } else {
      setEditingCategory(null);
      setFormData({
        name: '',
        slug: '',
        icon: '🎮',
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingCategory(null);
  };

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const handleNameChange = (name: string) => {
    setFormData((prev) => ({
      ...prev,
      name,
      slug: generateSlug(name),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const categoryData = {
      name: formData.name,
      slug: formData.slug,
      icon: formData.icon,
    };

    if (editingCategory) {
      const { error } = await supabase
        .from('categories')
        .update(categoryData as never)
        .eq('id', editingCategory.id);

      if (error) {
        toast.error('Erro ao atualizar categoria');
      } else {
        toast.success('Categoria atualizada com sucesso!');
        fetchCategories();
        closeModal();
      }
    } else {
      const { error } = await supabase.from('categories').insert([categoryData] as never);

      if (error) {
        toast.error('Erro ao criar categoria');
        console.error(error);
      } else {
        toast.success('Categoria criada com sucesso!');
        fetchCategories();
        closeModal();
      }
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir esta categoria? Os produtos dessa categoria ficarão sem categoria.')) return;

    const { error } = await supabase.from('categories').delete().eq('id', id);

    if (error) {
      toast.error('Erro ao excluir categoria');
    } else {
      toast.success('Categoria excluída com sucesso!');
      fetchCategories();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <p className="text-gray-500">Organize seus produtos em categorias</p>
        <Button onClick={() => openModal()}>
          <Plus className="w-5 h-5" />
          Nova Categoria
        </Button>
      </div>

      {/* Categories List */}
      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-2xl p-6 animate-pulse">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-200 rounded-xl" />
                <div className="flex-1">
                  <div className="h-5 bg-gray-200 rounded w-1/3 mb-2" />
                  <div className="h-4 bg-gray-200 rounded w-1/4" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : categories.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-2xl">
          <FolderTree className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900">Nenhuma categoria</h3>
          <p className="text-gray-500 mt-1">Crie categorias para organizar seus produtos</p>
          <Button className="mt-4" onClick={() => openModal()}>
            <Plus className="w-5 h-5" />
            Criar Categoria
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white rounded-2xl p-6 shadow-soft flex items-center justify-between group"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-2xl">
                  {category.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{category.name}</h3>
                  <p className="text-gray-400 text-sm">/{category.slug}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => openModal(category)}
                  className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
                >
                  <Pencil className="w-4 h-4 text-gray-600" />
                </button>
                <button
                  onClick={() => handleDelete(category.id)}
                  className="p-2 hover:bg-red-50 rounded-xl transition-colors"
                >
                  <Trash2 className="w-4 h-4 text-red-500" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Create/Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={editingCategory ? 'Editar Categoria' : 'Nova Categoria'}
        size="sm"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Nome da Categoria"
            value={formData.name}
            onChange={(e) => handleNameChange(e.target.value)}
            placeholder="Ex: VIPs"
            required
          />

          <Input
            label="Slug (URL)"
            value={formData.slug}
            onChange={(e) => setFormData((p) => ({ ...p, slug: e.target.value }))}
            placeholder="vips"
            required
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ícone
            </label>
            <div className="grid grid-cols-8 gap-2">
              {iconOptions.map((icon) => (
                <button
                  key={icon}
                  type="button"
                  onClick={() => setFormData((p) => ({ ...p, icon }))}
                  className={`
                    w-10 h-10 rounded-xl text-xl flex items-center justify-center
                    transition-all duration-200
                    ${formData.icon === icon
                      ? 'bg-brazil-green/20 ring-2 ring-brazil-green'
                      : 'bg-gray-100 hover:bg-gray-200'
                    }
                  `}
                >
                  {icon}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={closeModal} className="flex-1">
              Cancelar
            </Button>
            <Button type="submit" className="flex-1">
              {editingCategory ? 'Salvar' : 'Criar'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
