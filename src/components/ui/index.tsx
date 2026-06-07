'use client'
import { clsx } from 'clsx'
import { ReactNode } from 'react'

// ─── Card ────────────────────────────────────────────────────
interface CardProps {
  children: ReactNode
  className?: string
  hover?: boolean
  accent?: boolean
  style?: React.CSSProperties
}

export function Card({ children, className, hover, accent, style }: CardProps) {
  return (
    <div
      className={clsx(
        'card relative overflow-hidden',
        hover && 'card-hover',
        accent && 'card-accent',
        className
      )}
      style={style}
    >
      {children}
    </div>
  )
}

// ─── SectionLabel ─────────────────────────────────────────────
export function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <p
      className="font-mono text-[10px] tracking-widest uppercase mb-2"
      style={{ color: 'var(--blue)' }}
    >
      {children}
    </p>
  )
}

// ─── PageHeader ───────────────────────────────────────────────
export function PageHeader({
  label,
  title,
  subtitle,
}: {
  label: string
  title: ReactNode
  subtitle?: string
}) {
  return (
    <div className="mb-8">
      <SectionLabel>{label}</SectionLabel>
      <h1
        className="font-display font-black text-3xl mb-2 animate-fadeUp"
        style={{ letterSpacing: '-0.5px' }}
      >
        {title}
      </h1>
      {subtitle && (
        <p
          className="text-sm animate-fadeUp delay-100"
          style={{ color: 'var(--muted)' }}
        >
          {subtitle}
        </p>
      )}
    </div>
  )
}

// ─── Badge ────────────────────────────────────────────────────
interface BadgeProps {
  children: ReactNode
  variant?: 'default' | 'success' | 'warning' | 'danger'
}

const badgeStyles = {
  default: { color: 'var(--blue)', background: 'var(--blue-dim)', borderColor: 'var(--border)' },
  success: { color: '#22c55e', background: 'rgba(34,197,94,0.08)', borderColor: 'rgba(34,197,94,0.2)' },
  warning: { color: '#f59e0b', background: 'rgba(245,158,11,0.08)', borderColor: 'rgba(245,158,11,0.2)' },
  danger: { color: '#ef4444', background: 'rgba(239,68,68,0.08)', borderColor: 'rgba(239,68,68,0.2)' },
}

export function Badge({ children, variant = 'default' }: BadgeProps) {
  return (
    <span
      className="badge"
      style={badgeStyles[variant]}
    >
      {children}
    </span>
  )
}

// ─── MetricCard ───────────────────────────────────────────────
export function MetricCard({
  label,
  value,
  sub,
  highlight,
}: {
  label: string
  value: ReactNode
  sub?: string
  highlight?: boolean
}) {
  return (
    <div
      className="rounded-sm p-4"
      style={{ background: highlight ? 'rgba(0,183,255,0.06)' : 'var(--surface)', border: `1px solid ${highlight ? 'rgba(0,183,255,0.3)' : 'var(--border-subtle)'}` }}
    >
      <p
        className="font-mono text-[10px] tracking-widest uppercase mb-1.5"
        style={{ color: 'var(--muted)' }}
      >
        {label}
      </p>
      <div
        className="font-display font-black text-2xl"
        style={{ color: highlight ? 'var(--blue)' : 'var(--white)', letterSpacing: '-0.5px' }}
      >
        {value}
      </div>
      {sub && (
        <p className="text-xs mt-1" style={{ color: 'var(--muted)' }}>
          {sub}
        </p>
      )}
    </div>
  )
}

// ─── Button ───────────────────────────────────────────────────
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  children: ReactNode
}

export function Button({
  variant = 'primary',
  size = 'md',
  children,
  className,
  ...props
}: ButtonProps) {
  const sizeClass = size === 'sm' ? 'px-3 py-1.5 text-xs' : size === 'lg' ? 'px-8 py-4 text-base' : 'px-5 py-2.5 text-sm'

  const base = 'font-display font-bold rounded-sm transition-all duration-150 cursor-pointer inline-flex items-center gap-2'

  if (variant === 'primary') {
    return (
      <button
        className={clsx(base, sizeClass, 'btn-glow', className)}
        style={{ background: 'var(--blue)', color: 'var(--black)', border: 'none' }}
        {...props}
      >
        {children}
      </button>
    )
  }

  if (variant === 'ghost') {
    return (
      <button
        className={clsx(base, sizeClass, className)}
        style={{ background: 'transparent', color: 'var(--white)', border: '1px solid rgba(255,255,255,0.12)' }}
        onMouseEnter={e => {
          ;(e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--blue)'
          ;(e.currentTarget as HTMLButtonElement).style.color = 'var(--blue)'
        }}
        onMouseLeave={e => {
          ;(e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.12)'
          ;(e.currentTarget as HTMLButtonElement).style.color = 'var(--white)'
        }}
        {...props}
      >
        {children}
      </button>
    )
  }

  return (
    <button
      className={clsx(base, sizeClass, className)}
      style={{ background: 'rgba(239,68,68,0.1)', color: '#ef4444', border: '1px solid rgba(239,68,68,0.2)' }}
      {...props}
    >
      {children}
    </button>
  )
}

// ─── ScoreRing ────────────────────────────────────────────────
export function ScoreRing({
  score,
  size = 120,
  label = 'SCORE',
}: {
  score: number
  size?: number
  label?: string
}) {
  const r = (size / 2) - 10
  const circ = 2 * Math.PI * r
  const dash = circ - (circ * score) / 100

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg
        viewBox={`0 0 ${size} ${size}`}
        style={{ transform: 'rotate(-90deg)' }}
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="rgba(0,183,255,0.1)"
          strokeWidth={6}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="var(--blue)"
          strokeWidth={6}
          strokeDasharray={circ}
          strokeDashoffset={dash}
          strokeLinecap="round"
          className="score-ring"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span
          className="font-display font-black"
          style={{ fontSize: size * 0.28, color: 'var(--blue)', letterSpacing: '-1px', lineHeight: 1 }}
        >
          {score}
        </span>
        <span
          className="font-mono"
          style={{ fontSize: size * 0.09, color: 'var(--muted)', letterSpacing: '1px' }}
        >
          {label}
        </span>
      </div>
    </div>
  )
}

// ─── DemandBar ────────────────────────────────────────────────
export function DemandBar({ value, label }: { value: number; label?: string }) {
  const color = value >= 75 ? 'var(--blue)' : value >= 50 ? '#f59e0b' : '#ef4444'

  return (
    <div>
      {label && (
        <div className="flex justify-between mb-1.5">
          <span className="font-mono text-[10px] uppercase tracking-widest" style={{ color: 'var(--muted)' }}>
            Niveau de demande
          </span>
          <span className="font-mono text-[11px]" style={{ color }}>
            {value}/100
          </span>
        </div>
      )}
      <div
        className="h-1 rounded-full overflow-hidden"
        style={{ background: 'rgba(255,255,255,0.06)' }}
      >
        <div
          className="h-full rounded-full demand-bar-fill"
          style={{ width: `${value}%`, background: color }}
        />
      </div>
    </div>
  )
}

// ─── TrendBadge ───────────────────────────────────────────────
export function TrendBadge({ trend, percent }: { trend: 'up' | 'down' | 'stable'; percent: number }) {
  if (trend === 'up') {
    return (
      <span className="font-mono text-[11px]" style={{ color: '#22c55e' }}>
        ↑ +{percent}%
      </span>
    )
  }
  if (trend === 'down') {
    return (
      <span className="font-mono text-[11px]" style={{ color: '#ef4444' }}>
        ↓ -{percent}%
      </span>
    )
  }
  return (
    <span className="font-mono text-[11px]" style={{ color: 'var(--muted)' }}>
      → {percent}%
    </span>
  )
}
