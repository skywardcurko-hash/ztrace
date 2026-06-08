'use client'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { BarChart2, Scan, Database, Bell, LayoutDashboard, LogOut, User } from 'lucide-react'
import { clsx } from 'clsx'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import type { User as SupabaseUser } from '@supabase/supabase-js'

const NAV_LINKS = [
  { href: '/estimation', label: 'Estimation', icon: BarChart2 },
  { href: '/scan', label: 'AI Scan', icon: Scan },
  { href: '/market', label: 'Market', icon: Database },
  { href: '/alerts', label: 'Alertes', icon: Bell },
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
]

export function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  const [user, setUser] = useState<SupabaseUser | null>(null)

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user))
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })
    return () => listener.subscription.unsubscribe()
  }, [])

  async function handleLogout() {
    await supabase.auth.signOut()
    router.push('/')
  }

  const userName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Compte'

  return (
    <header
      className="sticky top-0 z-50 border-b"
      style={{ background: 'rgba(13,13,13,0.92)', backdropFilter: 'blur(12px)', borderColor: 'var(--border)' }}
    >
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        {/* Logo — Orbitron */}
        <Link href="/" className="flex items-center gap-3 group">
          <span
            style={{
              fontFamily: 'Orbitron, sans-serif',
              fontWeight: 900,
              fontSize: 18,
              letterSpacing: '1px',
              color: 'var(--white)',
            }}
          >
            Z<span style={{ color: 'var(--blue)' }}>TRACE</span>
          </span>
          <span
            className="font-mono text-[9px] tracking-widest px-2 py-0.5 rounded-sm border"
            style={{ color: 'var(--blue)', borderColor: 'var(--border)', background: 'var(--blue-dim)' }}
          >
            BETA
          </span>
        </Link>

        {/* Nav links */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map(({ href, label, icon: Icon }) => {
            const active = pathname === href
            return (
              <Link
                key={href}
                href={href}
                className={clsx(
                  'flex items-center gap-2 px-3 py-1.5 rounded-sm text-sm transition-all duration-150',
                  active ? 'font-medium' : 'hover:text-white'
                )}
                style={{
                  color: active ? 'var(--blue)' : 'var(--muted)',
                  background: active ? 'var(--blue-dim)' : 'transparent',
                  fontFamily: 'Rajdhani, sans-serif',
                  fontWeight: 600,
                  letterSpacing: '0.5px',
                }}
              >
                <Icon size={14} />
                {label}
              </Link>
            )
          })}
        </nav>

        {/* Right */}
        <div className="flex items-center gap-3">
          {user ? (
            <>
              <Link
                href="/profile"
                className="hidden sm:flex items-center gap-2 transition-colors"
                style={{ color: 'var(--muted)', fontFamily: 'Space Mono, monospace', fontSize: 10, letterSpacing: '1px', textTransform: 'uppercase' }}
              >
                <User size={12} />
                {userName}
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center gap-1.5 transition-colors"
                style={{ color: 'var(--muted)', fontFamily: 'Space Mono, monospace', fontSize: 10, letterSpacing: '1px', textTransform: 'uppercase' }}
              >
                <LogOut size={12} />
                <span className="hidden sm:inline">Déco</span>
              </button>
            </>
          ) : (
            <>
              <Link
                href="/auth/login"
                className="text-xs px-3 py-2 rounded-sm transition-colors"
                style={{ color: 'var(--muted)', fontFamily: 'Rajdhani, sans-serif', fontWeight: 600 }}
              >
                Connexion
              </Link>
              <Link
                href="/auth/register"
                className="btn-glow text-xs px-4 py-2 rounded-sm"
                style={{
                  background: 'var(--blue)',
                  color: 'var(--black)',
                  fontFamily: 'Orbitron, sans-serif',
                  fontWeight: 700,
                  fontSize: 11,
                  letterSpacing: '1px',
                }}
              >
                S&apos;INSCRIRE →
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Mobile nav */}
      <nav
        className="md:hidden flex items-center overflow-x-auto px-4 pb-2 gap-1"
        style={{ borderTop: '1px solid var(--border-subtle)' }}
      >
        {NAV_LINKS.map(({ href, label, icon: Icon }) => {
          const active = pathname === href
          return (
            <Link
              key={href}
              href={href}
              className="flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-sm text-xs transition-all"
              style={{
                color: active ? 'var(--blue)' : 'var(--muted)',
                background: active ? 'var(--blue-dim)' : 'transparent',
                fontFamily: 'Rajdhani, sans-serif',
                fontWeight: 600,
              }}
            >
              <Icon size={12} />
              {label}
            </Link>
          )
        })}
      </nav>
    </header>
  )
}
