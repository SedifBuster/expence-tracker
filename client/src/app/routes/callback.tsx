import { useEffect } from 'react';
import { useNavigate } from 'react-router';

import type { Route } from './+types/auth';
import { supabase } from '../../shared/lib/supabase';


export function meta({}: Route.MetaArgs) {
  return [
    { title: "redirect page" },
    { name: "description", content: "please wait..." },
  ];
}

export function AuthCallback() {
  const navigate = useNavigate();
  //const setSession = useAuthStore((state) => state.setSession)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        //setSession(session)
        navigate('/dashboard')
      } else {
        navigate('/auth')
      }
    });
  }, [navigate])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-900 mx-auto"></div>
        <p className="mt-4 text-gray-300">We are completing the login...</p>
      </div>
    </div>
  );
}