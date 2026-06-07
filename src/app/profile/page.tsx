'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import type { User } from '@supabase/supabase-js'
import { PageHeader, Card, MetricCard, SectionLabel } from '@/components/ui'
import { LogOut, Mail, Calendar, Shield } from 'lucide-react'

export default function ProfilePage() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) {
        router.push('/auth/login')
        return
      }
      setUser(data.user)
      setLoading(false)
    })
  }, [router])

  async function handleLogout() {
    await supabase.auth.signOut()
    router.push('/')
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex gap-2">
          {[0, 1, 2].map(i => (
            <span key={i} className="w-2 h-2 rounded-full" style={{ background: 'var(--blue)', animation: `pulse 1s ${i * 0.15}s ease-in-out infinite` }} />
          ))}
        </div>
      </div>
    )
  }

  if (!user) return null

  const name = user.user_metadata?.full_name || user.email?.split('@')[0] || 'Utilisateur'
  const initials = name.slice(0, 2).toUpperCase()
  const createdAt = new Date(user.created_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <PageHeader
        label="Mon profil"
        title={<>Bonjour, <span style={{ color: 'var(--blue)' }}>{name}</span></>}
        subtitle="Gérez votre compte et consultez vos statistiques."
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Profile card */}
        <div className="md:col-span-1">
          <Card className="p-6 text-center">
            <div
              className="w-16 h-16 rounded-sm flex items-center justify-center mx-auto mb-4 font-display font-black text-2xl"
              style={{ background: 'var(--blue-dim)', border: '1px solid var(--border)', color: 'var(--blue)' }}
            >
              {initials}
            </div>
            <p className="font-display font-bold text-lg mb-0.5">{name}</p>
            <p className="font-mono text-[10px] uppercase tracking-widest" style={{ color: 'var(--muted)' }}>
              Plan gratuit
            </p>

            <div className="mt-4 space-y-2 text-left">
              <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--muted)' }}>
                <Mail size={13} style={{ flexShrink: 0 }} />
                <span className="truncate">{user.email}</span>
              </div>
              <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--muted)' }}>
                <Calendar size={13} style={{ flexShrink: 0 }} />
                Membre depuis {createdAt}
              </div>
              <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--muted)' }}>
                <Shield size={13} style={{ flexShrink: 0 }} />
                Email {user.email_confirmed_at ? 'vérifié ✓' : 'non vérifié'}
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="mt-5 w-full flex items-center justify-center gap-2 font-display font-bold text-xs py-2.5 rounded-sm border transition-all"
              style={{ borderColor: 'rgba(239,68,68,0.3)', color: '#ef4444', background: 'rgba(239,68,68,0.06)' }}
            >
              <LogOut size={13} />
              Se déconnecter
            </button>
          </Card>
        </div>

        {/* Stats */}
        <div className="md:col-span-2 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <MetricCard label="Estimations aujourd'hui" value="3/5" highlight sub="Limite plan gratuit" />
            <MetricCard label="Total estimations" value="0" sub="Depuis l'inscription" />
            <MetricCard label="Alertes actives" value="0" sub="Deal Alert" />
            <MetricCard label="Scans réalisés" value="0" sub="AI Scan" />
          </div>

          {/* Upgrade card */}
          <Card className="p-5" style={{ borderColor: 'var(--blue)' }}>
            <div className="flex items-start justify-between">
              <div>
                <SectionLabel>Passez Premium</SectionLabel>
                <p className="font-display font-bold text-lg mt-1 mb-2">Estimations illimitées</p>
                <p className="text-sm" style={{ color: 'var(--muted)' }}>
                  Débloquez les estimations illimitées, les alertes avancées et l&apos;historique complet.
                </p>
              </div>
              <span
                className="font-display font-black text-xl flex-shrink-0 ml-4"
                style={{ color: 'var(--blue)' }}
              >
                9.99€
              </span>
            </div>
            <button
              className="btn-glow mt-4 font-display font-bold text-sm px-6 py-2.5 rounded-sm"
              style={{ background: 'var(--blue)', color: 'var(--black)', border: 'none' }}
            >
              Passer Premium →
            </button>
          </Card>
        </div>
      </div>
    </div>
  )
}
