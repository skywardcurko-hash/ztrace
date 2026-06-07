'use client'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Loader2 } from 'lucide-react'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      setError('Email ou mot de passe incorrect.')
      setLoading(false)
      return
    }

    router.push('/dashboard')
  }

  async function handleGoogle() {
    setGoogleLoading(true)
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    })
    if (error) {
      setError('Erreur Google. Réessayez.')
      setGoogleLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ background: 'var(--black)' }}>
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <Link href="/">
            <span className="font-display font-black text-3xl" style={{ letterSpacing: '-1px' }}>
              Z<span style={{ color: 'var(--blue)' }}>trace</span>
            </span>
          </Link>
          <p className="font-mono text-[10px] uppercase tracking-widest mt-2" style={{ color: 'var(--muted)' }}>
            Connexion à votre compte
          </p>
        </div>

        <div className="card p-6">
          {/* Google */}
          <button
            onClick={handleGoogle}
            disabled={googleLoading}
            className="w-full flex items-center justify-center gap-3 py-3 rounded-sm border font-display font-bold text-sm transition-all mb-4"
            style={{ borderColor: 'rgba(255,255,255,0.12)', color: 'var(--white)', background: 'transparent' }}
          >
            {googleLoading ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
            )}
            Continuer avec Google
          </button>

          <div className="flex items-center gap-3 mb-4">
            <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.06)' }} />
            <span className="font-mono text-[10px]" style={{ color: 'var(--muted)' }}>ou</span>
            <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.06)' }} />
          </div>

          <form onSubmit={handleLogin} className="space-y-3">
            <div>
              <label className="font-mono text-[10px] uppercase tracking-widest block mb-1.5" style={{ color: 'var(--muted)' }}>
                Email
              </label>
              <input
                className="z-input"
                type="email"
                placeholder="vous@email.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="font-mono text-[10px] uppercase tracking-widest block mb-1.5" style={{ color: 'var(--muted)' }}>
                Mot de passe
              </label>
              <input
                className="z-input"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
            </div>

            {error && (
              <div className="rounded-sm p-3 text-sm" style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', color: '#ef4444' }}>
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-glow w-full font-display font-bold py-3 rounded-sm text-sm flex items-center justify-center gap-2"
              style={{ background: 'var(--blue)', color: 'var(--black)', border: 'none' }}
            >
              {loading ? <Loader2 size={16} className="animate-spin" /> : null}
              Se connecter
            </button>
          </form>
        </div>

        <p className="text-center text-sm mt-4" style={{ color: 'var(--muted)' }}>
          Pas encore de compte ?{' '}
          <Link href="/auth/register" className="font-bold" style={{ color: 'var(--blue)' }}>
            Créer un compte
          </Link>
        </p>
      </div>
    </div>
  )
}
