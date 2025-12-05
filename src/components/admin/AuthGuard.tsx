'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { Loader2 } from 'lucide-react';

interface AuthGuardProps {
  children: React.ReactNode;
}

export function AuthGuard({ children }: AuthGuardProps) {
  const router = useRouter();
  const { user, isAdmin, loading, checkAuth } = useAuthStore();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const verify = async () => {
      await checkAuth();
      setChecked(true);
    };
    verify();
  }, [checkAuth]);

  useEffect(() => {
    if (checked && !loading) {
      if (!user) {
        router.push('/admin');
      } else if (!isAdmin) {
        router.push('/admin?error=unauthorized');
      }
    }
  }, [checked, loading, user, isAdmin, router]);

  if (loading || !checked) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-brazil-green mx-auto" />
          <p className="mt-4 text-gray-600">Verificando autenticação...</p>
        </div>
      </div>
    );
  }

  if (!user || !isAdmin) {
    return null;
  }

  return <>{children}</>;
}
