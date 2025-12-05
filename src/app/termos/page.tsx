'use client';

import { motion } from 'framer-motion';
import { FileText, ScrollText } from 'lucide-react';
import { Navbar } from '@/components/store/Navbar';
import { Footer } from '@/components/store/Footer';

export default function TermosPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-3 bg-brazil-blue/10 rounded-full px-4 py-2 mb-6">
              <FileText className="w-5 h-5 text-brazil-blue" />
              <span className="text-sm font-semibold text-brazil-blue">Termos e Condições</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-brazil-blue to-brazil-green bg-clip-text text-transparent mb-4">
              Termos de Uso
            </h1>
            <p className="text-gray-600">Última atualização: {new Date().toLocaleDateString('pt-BR')}</p>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="prose prose-lg max-w-none"
          >
            <div className="space-y-8 text-gray-700">
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <ScrollText className="w-6 h-6 text-brazil-green" />
                  1. Aceitação dos Termos
                </h2>
                <p>
                  Ao acessar e usar a loja BrasiLândia, você concorda em cumprir estes termos de uso. Se você não concorda com
                  alguma parte destes termos, você não está autorizado a usar este site.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Descrição do Serviço</h2>
                <p>
                  BrasiLândia é um servidor Minecraft que oferece uma loja online onde os jogadores podem comprar items e
                  benefícios do jogo usando Mercado Pago como meio de pagamento. Os items comprados são entregues automaticamente
                  no inventário do jogador.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Conta do Usuário</h2>
                <ul className="list-disc list-inside space-y-2">
                  <li>Você é responsável por manter a confidencialidade das suas credenciais</li>
                  <li>Você concorda em fornecer informações precisas e completas</li>
                  <li>Você é responsável por todas as atividades realizadas em sua conta</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Compras e Pagamentos</h2>
                <ul className="list-disc list-inside space-y-2">
                  <li>Todos os preços são em Real (R$) e estão sujeitos a alterações sem aviso prévio</li>
                  <li>O pagamento é processado via Mercado Pago</li>
                  <li>A confirmação do pagamento é obrigatória para a entrega dos items</li>
                  <li>Items são entregues automaticamente em até 1 hora após confirmação</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Reembolsos</h2>
                <ul className="list-disc list-inside space-y-2">
                  <li>Reembolsos podem ser solicitados dentro de 7 dias após a compra</li>
                  <li>O reembolso será processado via Mercado Pago</li>
                  <li>Items já entregues no jogo não serão removidos em caso de reembolso</li>
                  <li>Contate o suporte no Discord para solicitar reembolso</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Código de Conduta</h2>
                <p className="mb-3">É proibido:</p>
                <ul className="list-disc list-inside space-y-2">
                  <li>Usar hacks, cheats ou modificações não permitidas</li>
                  <li>Fazer spam ou spam de publicidade</li>
                  <li>Desrespeitar outros jogadores</li>
                  <li>Fazer griefing ou destruir construções de outros</li>
                  <li>Explorar bugs ou glitches do servidor</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Punições</h2>
                <p>
                  Violações dos termos de uso podem resultar em advertência, mute, ban temporário ou ban permanente. Decisões
                  sobre punições são finais.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Disclaimer</h2>
                <p>
                  O serviço é fornecido "como está" sem garantias de qualquer tipo. Não nos responsabilizamos por perdas de items
                  ou problemas técnicos causados por terceiros.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Modificações dos Termos</h2>
                <p>
                  Reservamos o direito de modificar estes termos a qualquer momento. As modificações entram em vigor imediatamente
                  após a publicação.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Contato</h2>
                <p>
                  Para dúvidas sobre estes termos, entre em contato conosco no Discord: discord.gg/brasilandia ou
                  suporte@brasilandia.com.br
                </p>
              </section>
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-16 bg-gradient-to-r from-brazil-blue to-brazil-green rounded-3xl p-8 text-white text-center"
          >
            <h2 className="text-2xl font-bold mb-3">Concordas com os termos?</h2>
            <p className="mb-6 text-white/90">
              Continue navegando na loja ou volte à página inicial para começar a comprar!
            </p>
            <a
              href="/"
              className="inline-block bg-white text-brazil-blue px-8 py-3 rounded-xl font-bold hover:bg-gray-100 transition-colors"
            >
              Voltar ao Início
            </a>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  );
}
