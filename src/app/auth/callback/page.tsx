'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function AuthCallbackPage() {
  const router = useRouter()

  useEffect(() => {
    supabase.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_IN') {
        router.push('/dashboard')
      }
    })
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--black)' }}>
      <div className="text-center">
        <div className="flex gap-2 justify-center mb-4">
          {[0, 1, 2].map(i => (
            <span
              key={i}
              className="w-2 h-2 rounded-full"
              style={{ background: 'var(--blue)', animation: `pulse 1s ${i * 0.15}s ease-in-out infinite` }}
            />
          ))}
        </div>
        <p className="font-mono text-xs" style={{ color: 'var(--muted)' }}>Connexion en cours…</p>
      </div>
    </div>
  )
}
