import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { supabase } from '~/shared/lib/supabase'
import type { User } from '@supabase/supabase-js'

interface AuthState {
  user: User | null
  session: any | null // TODO: fix this type
  isLoading: boolean
  error: string | null
}

interface AuthActions {
  signIn: (email: string, passwor: string) => Promise<void>
  signInWithProvider: (provider: 'google' | 'github') => Promise<{error?: string}>
  signUp: (email: string, password: string, userData?: any) => Promise<void>
  signOut: () => void
  resetPassword: (email: string) => Promise<void>
  updatePassword: (newPassword: string) => Promise<void>
  setSession: (session: any) => void
  clearError: () => void
}

type AuthStore = AuthState & AuthActions

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      session: null,
      isLoading: false,
      error: null,

      signIn: async (email, password) => {
        set({isLoading: true, error: null})

        try {
          const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
          })

          if (error) throw error

          set({
            user: data.user,
            session: data.session,
            isLoading: false
          })
          localStorage.setItem('auth-token', data.session?.access_token || '')
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : 'Sign in failed',
            isLoading: false
          })
        }
      },

      signInWithProvider: async (provider: 'google' | 'github') => {
        set({ isLoading: true, error: null });

        try {
        // Определяем URL для редиректа после авторизации
        const redirectTo = `${window.location.origin}/auth/callback`;
      
        const { data, error } = await supabase.auth.signInWithOAuth({
          provider,
          options: {
            redirectTo,
          },
        });
      
        if (error) throw error;
      
        // Важно! signInWithOAuth не возвращает сразу сессию,
        // она появится после редиректа обратно в приложение
          set({ isLoading: false });
          return {};
        } catch (error: any) {
          set({ error: error.message, isLoading: false });
          return { error: error.message };
        }
      },

      signUp: async (email, password, userData) => {
        set({isLoading: true, error: null})
        
        try {
          const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
              data: userData
            },
          })

          if (error) throw error

          if(data.user) {
            await supabase.from('profiles').insert([
              {
                id: data.user.id,
                email: data.user.email,
                ...userData
              }
            ])
          }

          set({
            user: data.user,
            session: data.session,
            isLoading: false
          })
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : 'Sign in failed',
            isLoading: false
          })
        }
      },

      signOut: async () => {
        set({isLoading: true})

        try {
          const { error } = await supabase.auth.signOut()
          if (error) throw error

          set({
            user: null,
            session: null,
            isLoading: false
          })
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : 'Sign out failed',
            isLoading: false
          })
        }
      },

      resetPassword: async (email) => {
        set({isLoading: true, error: null})

        try {
          const { error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: `${window.location.origin}/reset-password`
          })

          if (error) throw error
          set({ isLoading: false })
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : 'Reset password failed',
            isLoading: false
          })
        }
      },

      updatePassword: async (newPassword) => {
        set({ isLoading: true, error: null })

        try {
          const { error } = await supabase.auth.updateUser({
            password: newPassword,
          })

          if (error) throw error
          set({ isLoading: false})
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : 'Update password failed',
            isLoading: false
        })
        }
      },

      setSession: (session) => {
        set({
          session,
          user: session?.user ?? null
        })
      },

      clearError: () => set({ error: null})
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        session: state.session,
      }),
    }
  )
)

export const useUser = () => useAuthStore((state) => state.user)
export const useIsAuthenticated = () => useAuthStore((state) => !!state.user)
export const useAuthLoading = () => useAuthStore((state) => state.isLoading)