'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Store, LogIn, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useAuthStore } from '@/store/authStore';
import { toast } from 'sonner';

function AdminLoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, isAdmin, signIn, checkAuth, loading } = useAuthStore();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const verify = async () => {
      await checkAuth();
      setChecked(true);
    };
    verify();
  }, [checkAuth]);

  useEffect(() => {
    // Se já estiver logado como admin, redireciona
    if (checked && !loading && user && isAdmin) {
      router.push('/admin/dashboard');
    }
  }, [checked, loading, user, isAdmin, router]);

  useEffect(() => {
    const error = searchParams.get('error');
    if (error === 'unauthorized') {
      toast.error('Você não tem permissão para acessar o painel administrativo.');
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await signIn(email, password);

      if (error) {
        toast.error(error);
        setIsSubmitting(false);
        return;
      }

      toast.success('Login realizado com sucesso!');
      router.push('/admin/dashboard');
    } catch (err) {
      console.error('Login error:', err);
      toast.error('Erro ao fazer login. Tente novamente.');
      setIsSubmitting(false);
    }
  };

  if (loading || !checked) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-brazil-blue to-brazil-blue/80">
        <Loader2 className="w-12 h-12 animate-spin text-white" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-brazil-blue to-brazil-blue/80 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-brazil-yellow rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Store className="w-8 h-8 text-brazil-blue" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">BrasiLândia Store</h1>
            <p className="text-gray-500 mt-1">Painel Administrativo</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Email"
              type="email"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isSubmitting}
            />
            <Input
              label="Senha"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isSubmitting}
            />
            <Button
              type="submit"
              className="w-full"
              size="lg"
              disabled={isSubmitting}
            >
              <LogIn className="w-5 h-5" />
              {isSubmitting ? 'Entrando...' : 'Entrar'}
            </Button>
          </form>

          {/* Footer */}
          <p className="text-center text-gray-400 text-sm mt-6">
            Acesso restrito a administradores
          </p>
        </div>
      </motion.div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-brazil-blue to-brazil-blue/80">
          <Loader2 className="w-12 h-12 animate-spin text-white" />
        </div>
      }
    >
      <AdminLoginContent />
    </Suspense>
  );
}
