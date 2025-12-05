'use client';

import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { AdminProtectedLayout } from '@/components/admin/AdminProtectedLayout';
import { usePathname } from 'next/navigation';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLoginPage = pathname === '/admin' || pathname === '/admin/';

  // Renderizar apenas o conteúdo na página de login
  if (isLoginPage) {
    return <>{children}</>;
  }

  // Renderizar layout protegido com sidebar para as outras páginas
  return (
    <AdminProtectedLayout>
      <div className="flex min-h-screen bg-gray-50">
        <AdminSidebar />
        <div className="flex-1 flex flex-col">
          <AdminHeader />
          <main className="flex-1 p-8">
            {children}
          </main>
        </div>
      </div>
    </AdminProtectedLayout>
  );
}
