import { create } from 'zustand';
import { supabase } from '~/shared/lib/supabase';

interface ProfileState {
  profile: Profile | null
  isLoading: boolean
  error: string | null
}

interface ProfileActions {
  fetchProfile: (userId: string) => Promise<void>
  updateProfile: (userId: string, data: Partial<Profile>) => Promise<void>
  clearProfile: () => void
}

type ProfileStore = ProfileState & ProfileActions

export const useProfileStore = create<ProfileStore>((set, get) => ({
  profile: null,
  isLoading: false,
  error: null,

  fetchProfile: async (userId: string) => {
    set({ isLoading: true, error: null})

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single()

      if (error) throw error

      set({ profile: data, isLoading: false })
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Fetch failed',
        isLoading: false
      })
    }
  },

  updateProfile: async (userId: string, data: Partial<Profile>) => {
    set({ isLoading: true, error: null})

    try {
      const { error } = await supabase
        .from('profiles')
        .update(data)
        .eq('id', userId)

      if (error) throw error

      set((state) => ({
        profile: state.profile ? { ...state.profile, ...data } : null,
        isLoading: false
      }))
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Update failed',
        isLoading: false
      })
    }
  },

  clearProfile: () => set({ profile: null }),
}))