import { create } from 'zustand';
import { supabase } from '@/lib/supabase';
import type { User } from '@supabase/supabase-js';

interface AuthStore {
  user: User | null;
  isAdmin: boolean;
  loading: boolean;
  setUser: (user: User | null) => void;
  setIsAdmin: (isAdmin: boolean) => void;
  setLoading: (loading: boolean) => void;
  checkAuth: () => Promise<void>;
  signIn: (email: string, password: string) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
}

export const useAuthStore = create<AuthStore>((set, get) => ({
  user: null,
  isAdmin: false,
  loading: true,

  setUser: (user) => set({ user }),
  setIsAdmin: (isAdmin) => set({ isAdmin }),
  setLoading: (loading) => set({ loading }),

  checkAuth: async () => {
    try {
      set({ loading: true });

      const { data: { session } } = await supabase.auth.getSession();

      if (session?.user && session.user.email) {
        set({ user: session.user });

        // Check if user is admin
        const { data: adminData } = await supabase
          .from('admin_whitelist')
          .select('email')
          .eq('email', session.user.email)
          .single();

        set({ isAdmin: !!adminData });
      } else {
        set({ user: null, isAdmin: false });
      }
    } catch (error) {
      console.error('Auth check error:', error);
      set({ user: null, isAdmin: false });
    } finally {
      set({ loading: false });
    }
  },

  signIn: async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        return { error: error.message };
      }

      if (data.user && data.user.email) {
        set({ user: data.user });

        // Check if user is admin
        const { data: adminData } = await supabase
          .from('admin_whitelist')
          .select('email')
          .eq('email', data.user.email)
          .single();

        set({ isAdmin: !!adminData });
      }

      return { error: null };
    } catch (error) {
      return { error: 'Erro ao fazer login' };
    }
  },

  signOut: async () => {
    await supabase.auth.signOut();
    set({ user: null, isAdmin: false });
  },
}));
