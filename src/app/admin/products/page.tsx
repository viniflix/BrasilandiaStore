'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Pencil, Trash2, Search, Image as ImageIcon, Terminal } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Modal } from '@/components/ui/Modal';
import { supabase } from '@/lib/supabase';
import type { Product, Category } from '@/types/database';
import { toast } from 'sonner';

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    image: '',
    category_id: '',
    commands: [''],
    active: true,
  });

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast.error('Erro ao carregar produtos');
      console.error(error);
    } else {
      setProducts(data || []);
    }
    setIsLoading(false);
  };

  const fetchCategories = async () => {
    const { data } = await supabase.from('categories').select('*');
    setCategories(data || []);
  };

  const openModal = (product?: Product) => {
    if (product) {
      setEditingProduct(product);
      setFormData({
        name: product.name,
        description: product.description,
        price: product.price.toString(),
        image: product.image,
        category_id: product.category_id,
        commands: product.commands.length > 0 ? product.commands : [''],
        active: product.active,
      });
    } else {
      setEditingProduct(null);
      setFormData({
        name: '',
        description: '',
        price: '',
        image: '',
        category_id: categories[0]?.id || '',
        commands: [''],
        active: true,
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingProduct(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const productData = {
      name: formData.name,
      description: formData.description,
      price: parseFloat(formData.price),
      image: formData.image,
      category_id: formData.category_id,
      commands: formData.commands.filter((cmd) => cmd.trim() !== ''),
      active: formData.active,
    };

    if (editingProduct) {
      const { error } = await supabase
        .from('products')
        .update(productData as never)
        .eq('id', editingProduct.id);

      if (error) {
        toast.error('Erro ao atualizar produto');
      } else {
        toast.success('Produto atualizado com sucesso!');
        fetchProducts();
        closeModal();
      }
    } else {
      const { error } = await supabase.from('products').insert([productData] as never);

      if (error) {
        toast.error('Erro ao criar produto');
        console.error(error);
      } else {
        toast.success('Produto criado com sucesso!');
        fetchProducts();
        closeModal();
      }
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir este produto?')) return;

    const { error } = await supabase.from('products').delete().eq('id', id);

    if (error) {
      toast.error('Erro ao excluir produto');
    } else {
      toast.success('Produto excluído com sucesso!');
      fetchProducts();
    }
  };

  const addCommand = () => {
    setFormData((prev) => ({
      ...prev,
      commands: [...prev.commands, ''],
    }));
  };

  const updateCommand = (index: number, value: string) => {
    const newCommands = [...formData.commands];
    newCommands[index] = value;
    setFormData((prev) => ({ ...prev, commands: newCommands }));
  };

  const removeCommand = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      commands: prev.commands.filter((_, i) => i !== index),
    }));
  };

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="relative w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar produto..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white rounded-xl border
              focus:ring-2 focus:ring-brazil-green focus:border-transparent"
          />
        </div>
        <Button onClick={() => openModal()}>
          <Plus className="w-5 h-5" />
          Novo Produto
        </Button>
      </div>

      {/* Products Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-white rounded-2xl p-4 animate-pulse">
              <div className="h-40 bg-gray-200 rounded-xl mb-4" />
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
              <div className="h-4 bg-gray-200 rounded w-1/2" />
            </div>
          ))}
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-2xl">
          <ImageIcon className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900">Nenhum produto encontrado</h3>
          <p className="text-gray-500 mt-1">Comece criando seu primeiro produto</p>
          <Button className="mt-4" onClick={() => openModal()}>
            <Plus className="w-5 h-5" />
            Criar Produto
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white rounded-2xl overflow-hidden shadow-soft group"
            >
              <div className="relative h-40 bg-gray-100">
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <ImageIcon className="w-12 h-12 text-gray-300" />
                  </div>
                )}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100
                  transition-opacity flex items-center justify-center gap-2">
                  <button
                    onClick={() => openModal(product)}
                    className="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="p-2 bg-white rounded-full hover:bg-red-50 text-red-500 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                {!product.active && (
                  <span className="absolute top-2 right-2 px-2 py-1 bg-gray-900/80 text-white text-xs rounded-full">
                    Inativo
                  </span>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 truncate">{product.name}</h3>
                <p className="text-gray-500 text-sm mt-1 line-clamp-2">{product.description}</p>
                <div className="flex items-center justify-between mt-3">
                  <span className="text-brazil-green font-bold">
                    R$ {product.price.toFixed(2)}
                  </span>
                  <span className="text-xs text-gray-400 flex items-center gap-1">
                    <Terminal className="w-3 h-3" />
                    {product.commands.length} comando(s)
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Create/Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={editingProduct ? 'Editar Produto' : 'Novo Produto'}
        size="lg"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Nome do Produto"
              value={formData.name}
              onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
              placeholder="Ex: VIP Gold"
              required
            />
            <Input
              label="Preço (R$)"
              type="number"
              step="0.01"
              value={formData.price}
              onChange={(e) => setFormData((p) => ({ ...p, price: e.target.value }))}
              placeholder="49.90"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Descrição
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData((p) => ({ ...p, description: e.target.value }))}
              placeholder="Descreva o produto..."
              rows={3}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-300
                focus:ring-2 focus:ring-brazil-green focus:border-transparent"
            />
          </div>

          <Input
            label="URL da Imagem"
            value={formData.image}
            onChange={(e) => setFormData((p) => ({ ...p, image: e.target.value }))}
            placeholder="https://..."
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Categoria
            </label>
            <select
              value={formData.category_id}
              onChange={(e) => setFormData((p) => ({ ...p, category_id: e.target.value }))}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-300
                focus:ring-2 focus:ring-brazil-green focus:border-transparent"
            >
              <option value="">Selecione uma categoria</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Commands Array */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Comandos do Servidor
              <span className="text-gray-400 font-normal ml-2">
                (Use {'{player}'} para o nickname)
              </span>
            </label>
            <div className="space-y-2">
              {formData.commands.map((cmd, index) => (
                <div key={index} className="flex gap-2">
                  <div className="flex-1 relative">
                    <Terminal className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      value={cmd}
                      onChange={(e) => updateCommand(index, e.target.value)}
                      placeholder="Ex: lp user {player} parent set vip"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300
                        focus:ring-2 focus:ring-brazil-green focus:border-transparent font-mono text-sm"
                    />
                  </div>
                  {formData.commands.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeCommand(index)}
                      className="p-2.5 text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={addCommand}
              className="mt-2 text-sm text-brazil-green hover:underline flex items-center gap-1"
            >
              <Plus className="w-4 h-4" />
              Adicionar comando
            </button>
          </div>

          {/* Active Toggle */}
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.active}
              onChange={(e) => setFormData((p) => ({ ...p, active: e.target.checked }))}
              className="w-5 h-5 rounded border-gray-300 text-brazil-green focus:ring-brazil-green"
            />
            <span className="text-gray-700">Produto ativo</span>
          </label>

          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={closeModal} className="flex-1">
              Cancelar
            </Button>
            <Button type="submit" className="flex-1">
              {editingProduct ? 'Salvar Alterações' : 'Criar Produto'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
