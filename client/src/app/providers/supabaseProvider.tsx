import { useEffect } from "react"
import { useAuthStore } from "~/features/auth/model/store"
import { supabase } from "~/shared/lib/supabase"


export function SupabaseProvider ({ children }: { children: React.ReactNode }) {
  const { setSession } = useAuthStore()

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
        setSession(session)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session)
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  return <>{children}</>
}