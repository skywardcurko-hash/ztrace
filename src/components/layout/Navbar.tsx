'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { BarChart2, Scan, Database, Bell, LayoutDashboard } from 'lucide-react'
import { clsx } from 'clsx'

const NAV_LINKS = [
  { href: '/estimation', label: 'Estimation', icon: BarChart2 },
  { href: '/scan', label: 'AI Scan', icon: Scan },
  { href: '/market', label: 'Market', icon: Database },
  { href: '/alerts', label: 'Alertes', icon: Bell },
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
]

export function Navbar() {
  const pathname = usePathname()

  return (
    <header
      className="sticky top-0 z-50 border-b"
      style={{ background: 'rgba(13,13,13,0.92)', backdropFilter: 'blur(12px)', borderColor: 'var(--border)' }}
    >
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <span
            className="font-display font-black text-xl tracking-tight"
            style={{ letterSpacing: '-0.5px' }}
          >
            Z<span style={{ color: 'var(--blue)' }}>trace</span>
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
            const active = pathname === href || pathname.startsWith(href + '/')
            return (
              <Link
                key={href}
                href={href}
                className={clsx(
                  'flex items-center gap-2 px-3 py-1.5 rounded-sm text-sm transition-all duration-150',
                  active
                    ? 'font-medium'
                    : 'text-[var(--muted)] hover:text-white'
                )}
                style={active
                  ? { color: 'var(--blue)', background: 'var(--blue-dim)' }
                  : {}}
              >
                <Icon size={14} />
                <span className="font-body">{label}</span>
              </Link>
            )
          })}
        </nav>

        {/* Right: plan + CTA */}
        <div className="flex items-center gap-3">
          <span
            className="hidden sm:flex font-mono text-[9px] tracking-widest items-center gap-1.5"
            style={{ color: 'var(--muted)' }}
          >
            <span className="pulse-dot" style={{ width: 5, height: 5 }} />
            3/5 estimations
          </span>
          <button
            className="btn-glow font-display font-bold text-xs px-4 py-2 rounded-sm"
            style={{ background: 'var(--blue)', color: 'var(--black)' }}
          >
            Premium →
          </button>
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
              className={clsx(
                'flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-sm text-xs transition-all',
                active ? 'font-medium' : 'text-[var(--muted)]'
              )}
              style={active ? { color: 'var(--blue)', background: 'var(--blue-dim)' } : {}}
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
