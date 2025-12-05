'use client';

import { motion } from 'framer-motion';
import { Settings, Trash2, Eye, EyeOff, GripVertical } from 'lucide-react';
import { useState } from 'react';

export interface Widget {
  id: string;
  name: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  enabled: boolean;
  order: number;
  color: string;
  component?: React.ComponentType<any>;
}

interface WidgetSystemProps {
  widgets: Widget[];
  onToggleWidget: (widgetId: string) => void;
  onReorderWidgets: (widgets: Widget[]) => void;
}

export default function WidgetSystem({
  widgets,
  onToggleWidget,
  onReorderWidgets,
}: WidgetSystemProps) {
  const [draggedItem, setDraggedItem] = useState<string | null>(null);

  const handleDragStart = (widgetId: string) => {
    setDraggedItem(widgetId);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (targetId: string) => {
    if (!draggedItem || draggedItem === targetId) return;

    const draggedIndex = widgets.findIndex((w) => w.id === draggedItem);
    const targetIndex = widgets.findIndex((w) => w.id === targetId);

    const newWidgets = [...widgets];
    [newWidgets[draggedIndex], newWidgets[targetIndex]] = [
      newWidgets[targetIndex],
      newWidgets[draggedIndex],
    ];

    const reorderedWidgets = newWidgets.map((w, idx) => ({
      ...w,
      order: idx,
    }));

    onReorderWidgets(reorderedWidgets);
    setDraggedItem(null);
  };

  return (
    <div className="space-y-4">
      <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-2xl p-6 border border-blue-100">
        <div className="flex items-center gap-3 mb-2">
          <Settings className="w-5 h-5 text-brazil-blue" />
          <h3 className="text-lg font-bold text-gray-900">Widgets da Vitrine</h3>
        </div>
        <p className="text-sm text-gray-600">
          Customize quais widgets aparecem em sua loja. Arraste para reordenar.
        </p>
      </div>

      <div className="space-y-3">
        {widgets.map((widget) => (
          <motion.div
            key={widget.id}
            draggable
            onDragStart={() => handleDragStart(widget.id)}
            onDragOver={handleDragOver}
            onDrop={() => handleDrop(widget.id)}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className={`p-4 rounded-xl border-2 transition-all ${
              draggedItem === widget.id
                ? 'opacity-50 border-dashed'
                : widget.enabled
                  ? 'bg-white border-green-200 shadow-lg'
                  : 'bg-gray-50 border-gray-200'
            } cursor-grab active:cursor-grabbing`}
          >
            <div className="flex items-center gap-4">
              {/* Drag Handle */}
              <GripVertical className="w-5 h-5 text-gray-400 flex-shrink-0" />

              {/* Widget Info */}
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center text-white flex-shrink-0 ${widget.color}`}
                  >
                    {widget.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">{widget.title}</h4>
                    <p className="text-sm text-gray-600">{widget.description}</p>
                  </div>
                </div>
              </div>

              {/* Toggle Button */}
              <button
                onClick={() => onToggleWidget(widget.id)}
                className={`p-2 rounded-lg transition-all ${
                  widget.enabled
                    ? 'bg-green-100 text-green-600 hover:bg-green-200'
                    : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                }`}
                title={widget.enabled ? 'Desabilitar' : 'Habilitar'}
              >
                {widget.enabled ? (
                  <Eye className="w-5 h-5" />
                ) : (
                  <EyeOff className="w-5 h-5" />
                )}
              </button>

              {/* Settings Button */}
              <button
                className="p-2 rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-200 transition-all"
                title="Configurar"
              >
                <Settings className="w-5 h-5" />
              </button>

              {/* Delete Button */}
              <button
                className="p-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 transition-all"
                title="Remover"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>

            {/* Status Badge */}
            <div className="mt-3 flex items-center gap-2 text-xs">
              <span
                className={`px-2 py-1 rounded-full font-semibold ${
                  widget.enabled
                    ? 'bg-green-100 text-green-700'
                    : 'bg-gray-200 text-gray-700'
                }`}
              >
                {widget.enabled ? '✓ Ativo' : '○ Inativo'}
              </span>
              <span className="text-gray-500">Ordem: {widget.order + 1}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Summary */}
      <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-4 border border-yellow-100">
        <p className="text-sm text-gray-700">
          <strong>{widgets.filter((w) => w.enabled).length}</strong> de{' '}
          <strong>{widgets.length}</strong> widgets ativos
        </p>
      </div>
    </div>
  );
}
