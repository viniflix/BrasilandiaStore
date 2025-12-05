'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { Navbar } from '@/components/store/Navbar';
import { Footer } from '@/components/store/Footer';

const faqs = [
  {
    id: 1,
    question: 'Como compro items no servidor?',
    answer: 'Para comprar items, acesse a página LOJA, escolha o item desejado, adicione ao carrinho e finalize a compra via Mercado Pago. Os items serão entregues automaticamente no seu inventário.',
  },
  {
    id: 2,
    question: 'Qual é o tempo de entrega dos items?',
    answer: 'Os items são entregues instantaneamente após a confirmação do pagamento no Mercado Pago. Você receberá uma notificação no servidor indicando que sua compra foi processada.',
  },
  {
    id: 3,
    question: 'Posso devolver uma compra?',
    answer: 'Sim, você pode solicitar reembolso dentro de 7 dias após a compra. Entre em contato com nosso suporte no Discord para processar o pedido.',
  },
  {
    id: 4,
    question: 'Como faço para entrar no servidor?',
    answer: 'Copie o IP do servidor na página inicial e cole no Minecraft em "Multi-player". O servidor roda na versão 1.20.4.',
  },
  {
    id: 5,
    question: 'Existe suporte técnico?',
    answer: 'Sim! Entre em contato conosco no Discord para suporte técnico. Respondemos em até 24 horas.',
  },
  {
    id: 6,
    question: 'Os dados de meu cartão são seguros?',
    answer: 'Sim! Usamos Mercado Pago para processar pagamentos. Seus dados são 100% seguros e criptografados.',
  },
];

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl border border-gray-200 overflow-hidden"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-5 flex items-center justify-between hover:bg-gray-50 transition-colors"
      >
        <span className="font-semibold text-gray-900 text-left">{question}</span>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
          <ChevronDown className="w-5 h-5 text-brazil-green" />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="px-6 py-4 bg-gradient-to-r from-brazil-green/5 to-brazil-blue/5 border-t border-gray-200"
          >
            <p className="text-gray-700 leading-relaxed">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQPage() {
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
            <div className="inline-flex items-center gap-3 bg-brazil-green/10 rounded-full px-4 py-2 mb-6">
              <HelpCircle className="w-5 h-5 text-brazil-green" />
              <span className="text-sm font-semibold text-brazil-green">Dúvidas Frequentes</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-brazil-green to-brazil-blue bg-clip-text text-transparent mb-4">
              Perguntas Frequentes
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Encontre respostas para as perguntas mais comuns sobre como comprar items e usar o servidor.
            </p>
          </motion.div>

          {/* FAQ List */}
          <div className="space-y-4">
            {faqs.map((faq) => (
              <FAQItem key={faq.id} question={faq.question} answer={faq.answer} />
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-16 bg-gradient-to-r from-brazil-blue to-brazil-green rounded-3xl p-8 text-white text-center"
          >
            <h2 className="text-2xl font-bold mb-3">Ainda tem dúvidas?</h2>
            <p className="mb-6 text-white/90">
              Entre em contato com nosso time de suporte no Discord. Estamos aqui para ajudar!
            </p>
            <a
              href="https://discord.gg/brasilandia"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-white text-brazil-blue px-8 py-3 rounded-xl font-bold hover:bg-gray-100 transition-colors"
            >
              Ir para Discord
            </a>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  );
}
