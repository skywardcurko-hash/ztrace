'use client'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Loader2, Mail, Lock, Chrome } from 'lucide-react'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

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
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ background: 'var(--black)' }}
    >
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/">
            <span
              className="font-display font-black text-3xl"
              style={{ letterSpacing: '-1px' }}
            >
              Z<span style={{ color: 'var(--blue)' }}>trace</span>
            </span>
          </Link>
          <p className="font-mono text-[10px] uppercase tracking-widest mt-2" style={{ color: 'var(--muted)' }}>
            Connexion à votre compte
          </p>
        </div>

        {/* Card */}
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
              <Chrome size={16} />
            )}
            Continuer avec Google
          </button>

          <div className="flex items-center gap-3 mb-4">
            <div className="flex-1 h-px" style={{ background: 'var(--border-subtle)' }} />
            <span className="font-mono text-[10px]" style={{ color: 'var(--muted)' }}>ou</span>
            <div className="flex-1 h-px" style={{ background: 'var(--border-subtle)' }} />
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-3">
            <div>
              <label className="font-mono text-[10px] uppercase tracking-widest block mb-1.5" style={{ color: 'var(--muted)' }}>
                Email
              </label>
              <div className="relative">
                <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--muted)' }} />
                <input
                  className="z-input pl-9"
                  type="email"
                  placeholder="vous@email.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div>
              <label className="font-mono text-[10px] uppercase tracking-widest block mb-1.5" style={{ color: 'var(--muted)' }}>
                Mot de passe
              </label>
              <div className="relative">
                <Lock size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--muted)' }} />
                <input
                  className="z-input pl-9"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            {error && (
              <div
                className="rounded-sm p-3 text-sm"
                style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', color: '#ef4444' }}
              >
                {error}
              </div>
            )}

            {success && (
              <div
                className="rounded-sm p-3 text-sm"
                style={{ background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.2)', color: '#22c55e' }}
              >
                {success}
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
          <Link href="/auth/register" className="font-bold transition-colors" style={{ color: 'var(--blue)' }}>
            Créer un compte
          </Link>
        </p>
      </div>
    </div>
  )
}
