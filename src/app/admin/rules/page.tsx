import { ServerRulesManager } from '@/components/admin/ServerRulesManager';

export default function RulesPage() {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Gerenciar Regras</h1>
        <p className="text-gray-600">Adicione, edite ou remova as regras do servidor</p>
      </div>

      <ServerRulesManager />
    </div>
  );
}
