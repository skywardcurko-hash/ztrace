'use client'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'
import { Loader2, Mail, Lock, User, Chrome } from 'lucide-react'

export default function RegisterPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault()
    if (password.length < 8) {
      setError('Le mot de passe doit contenir au moins 8 caractères.')
      return
    }
    setLoading(true)
    setError('')

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: name },
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    })

    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    setSuccess('Compte créé ! Vérifiez votre email pour confirmer votre inscription.')
    setLoading(false)
  }

  async function handleGoogle() {
    setGoogleLoading(true)
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    })
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ background: 'var(--black)' }}
    >
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <Link href="/">
            <span className="font-display font-black text-3xl" style={{ letterSpacing: '-1px' }}>
              Z<span style={{ color: 'var(--blue)' }}>trace</span>
            </span>
          </Link>
          <p className="font-mono text-[10px] uppercase tracking-widest mt-2" style={{ color: 'var(--muted)' }}>
            Créer votre compte gratuit
          </p>
        </div>

        <div className="card p-6">
          <button
            onClick={handleGoogle}
            disabled={googleLoading}
            className="w-full flex items-center justify-center gap-3 py-3 rounded-sm border font-display font-bold text-sm transition-all mb-4"
            style={{ borderColor: 'rgba(255,255,255,0.12)', color: 'var(--white)', background: 'transparent' }}
          >
            {googleLoading ? <Loader2 size={16} className="animate-spin" /> : <Chrome size={16} />}
            Continuer avec Google
          </button>

          <div className="flex items-center gap-3 mb-4">
            <div className="flex-1 h-px" style={{ background: 'var(--border-subtle)' }} />
            <span className="font-mono text-[10px]" style={{ color: 'var(--muted)' }}>ou</span>
            <div className="flex-1 h-px" style={{ background: 'var(--border-subtle)' }} />
          </div>

          <form onSubmit={handleRegister} className="space-y-3">
            <div>
              <label className="font-mono text-[10px] uppercase tracking-widest block mb-1.5" style={{ color: 'var(--muted)' }}>
                Nom complet
              </label>
              <div className="relative">
                <User size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--muted)' }} />
                <input
                  className="z-input pl-9"
                  type="text"
                  placeholder="Votre nom"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  required
                />
              </div>
            </div>

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
                  placeholder="8 caractères minimum"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            {error && (
              <div className="rounded-sm p-3 text-sm" style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', color: '#ef4444' }}>
                {error}
              </div>
            )}
            {success && (
              <div className="rounded-sm p-3 text-sm" style={{ background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.2)', color: '#22c55e' }}>
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
              Créer mon compte
            </button>
          </form>

          <p className="font-mono text-[10px] text-center mt-4" style={{ color: 'var(--muted)' }}>
            Gratuit · 5 estimations/jour · Sans CB
          </p>
        </div>

        <p className="text-center text-sm mt-4" style={{ color: 'var(--muted)' }}>
          Déjà un compte ?{' '}
          <Link href="/auth/login" className="font-bold" style={{ color: 'var(--blue)' }}>
            Se connecter
          </Link>
        </p>
      </div>
    </div>
  )
}
