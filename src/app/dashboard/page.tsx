'use client'
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid } from 'recharts'
import { TrendingUp, Clock, Star, Bell, ArrowRight, Zap } from 'lucide-react'
import Link from 'next/link'
import { Card, PageHeader, MetricCard, SectionLabel, Badge, ScoreRing } from '@/components/ui'
import { formatEur } from '@/lib/types'

const ACTIVITY_DATA = [
  { day: 'Lun', estimations: 3 },
  { day: 'Mar', estimations: 1 },
  { day: 'Mer', estimations: 4 },
  { day: 'Jeu', estimations: 2 },
  { day: 'Ven', estimations: 5 },
  { day: 'Sam', estimations: 3 },
  { day: 'Dim', estimations: 2 },
]

const RECENT_ESTIMATIONS = [
  { product: 'RTX 4070', brand: 'NVIDIA', price: 450, date: 'Aujourd\'hui 14:32', score: 85 },
  { product: 'PlayStation 5', brand: 'Sony', price: 320, date: 'Hier 19:45', score: 91 },
  { product: 'RTX 3080', brand: 'NVIDIA', price: 310, date: 'Il y a 2 jours', score: 72 },
  { product: 'Switch OLED', brand: 'Nintendo', price: 220, date: 'Il y a 3 jours', score: 78 },
]

const SAVED_PRODUCTS = [
  { name: 'RTX 4080 Super', brand: 'NVIDIA', price: 720, trend: 'down' as const },
  { name: 'PS5 Slim', brand: 'Sony', price: 310, trend: 'stable' as const },
]

function CustomBarTooltip({ active, payload, label }: { active?: boolean; payload?: { value: number }[]; label?: string }) {
  if (!active || !payload?.length) return null
  return (
    <div className="card px-3 py-2" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
      <p className="font-mono text-[10px] uppercase tracking-widest mb-1" style={{ color: 'var(--muted)' }}>{label}</p>
      <p className="font-display font-bold text-sm" style={{ color: 'var(--blue)' }}>{payload[0].value} estimations</p>
    </div>
  )
}

export default function DashboardPage() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <div className="flex items-start justify-between mb-8">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-widest mb-1" style={{ color: 'var(--blue)' }}>
            Dashboard
          </p>
          <h1 className="font-display font-black text-3xl" style={{ letterSpacing: '-0.5px' }}>
            Bienvenue, <span style={{ color: 'var(--blue)' }}>utilisateur</span>
          </h1>
          <p className="text-sm mt-1" style={{ color: 'var(--muted)' }}>
            Voici un résumé de votre activité Ztrace.
          </p>
        </div>
        <div
          className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest px-3 py-2 rounded-sm border"
          style={{ color: 'var(--muted)', borderColor: 'var(--border-subtle)' }}
        >
          Plan gratuit —{' '}
          <Link href="/#pricing" className="transition-colors" style={{ color: 'var(--blue)' }}>
            Upgrader
          </Link>
        </div>
      </div>

      {/* Metrics row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <MetricCard label="Estimations aujourd'hui" value="3/5" highlight sub="Limite plan gratuit" />
        <MetricCard label="Total estimations" value="47" sub="Depuis le début" />
        <MetricCard label="Alertes actives" value="2" sub="Sur 3 configurées" />
        <MetricCard label="Économies estimées" value={formatEur(820)} sub="Vs prix marché moyen" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Left column */}
        <div className="lg:col-span-2 space-y-5">

          {/* Activity chart */}
          <Card className="p-5">
            <SectionLabel>Activité cette semaine</SectionLabel>
            <div className="mt-4" style={{ height: 160 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={ACTIVITY_DATA} margin={{ top: 0, right: 0, bottom: 0, left: -30 }}>
                  <CartesianGrid strokeDasharray="0" stroke="rgba(255,255,255,0.04)" vertical={false} />
                  <XAxis
                    dataKey="day"
                    tick={{ fill: '#555', fontFamily: 'Space Mono', fontSize: 10 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fill: '#555', fontFamily: 'Space Mono', fontSize: 10 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip content={<CustomBarTooltip />} cursor={{ fill: 'rgba(0,183,255,0.04)' }} />
                  <Bar dataKey="estimations" fill="var(--blue)" opacity={0.7} radius={[2, 2, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Recent estimations */}
          <Card className="p-5">
            <div className="flex items-center justify-between mb-4">
              <SectionLabel>Estimations récentes</SectionLabel>
              <Link
                href="/estimation"
                className="font-mono text-[10px] uppercase tracking-widest flex items-center gap-1 transition-colors"
                style={{ color: 'var(--blue)' }}
              >
                Nouvelle <ArrowRight size={10} />
              </Link>
            </div>

            <div className="space-y-0">
              {RECENT_ESTIMATIONS.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 py-3"
                  style={{ borderBottom: i < RECENT_ESTIMATIONS.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}
                >
                  <ScoreRing score={item.score} size={44} label="" />
                  <div className="flex-1 min-w-0">
                    <p className="font-display font-bold text-sm">{item.product}</p>
                    <p className="text-xs" style={{ color: 'var(--muted)' }}>{item.brand}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="font-display font-bold text-sm" style={{ color: 'var(--blue)' }}>
                      {formatEur(item.price)}
                    </p>
                    <p className="font-mono text-[10px]" style={{ color: 'var(--muted)' }}>{item.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Right column */}
        <div className="space-y-5">

          {/* Plan usage */}
          <Card className="p-5">
            <SectionLabel>Usage du plan</SectionLabel>
            <div className="mt-4">
              <div className="flex justify-between mb-2 text-sm">
                <span style={{ color: 'var(--muted)' }}>Estimations aujourd&apos;hui</span>
                <span className="font-mono" style={{ color: 'var(--blue)' }}>3 / 5</span>
              </div>
              <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
                <div className="h-full rounded-full" style={{ width: '60%', background: 'var(--blue)' }} />
              </div>
              <p className="text-xs mt-2" style={{ color: 'var(--muted)' }}>
                2 estimations restantes aujourd&apos;hui. Réinitialisation à minuit.
              </p>
            </div>
            <Link
              href="/#pricing"
              className="btn-glow mt-4 flex items-center justify-center gap-2 font-display font-bold text-xs py-2.5 rounded-sm w-full"
              style={{ background: 'var(--blue)', color: 'var(--black)' }}
            >
              <Zap size={12} />
              Passer Premium — 9.99 €/mois
            </Link>
          </Card>

          {/* Saved products */}
          <Card className="p-5">
            <div className="flex items-center justify-between mb-4">
              <SectionLabel>Produits favoris</SectionLabel>
              <Star size={14} style={{ color: 'var(--muted)' }} />
            </div>
            <div className="space-y-3">
              {SAVED_PRODUCTS.map(p => (
                <div
                  key={p.name}
                  className="flex items-center justify-between py-2"
                  style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}
                >
                  <div>
                    <p className="font-display font-bold text-sm">{p.name}</p>
                    <p className="text-xs" style={{ color: 'var(--muted)' }}>{p.brand}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-mono text-sm" style={{ color: 'var(--blue)' }}>
                      {formatEur(p.price)}
                    </p>
                  </div>
                </div>
              ))}
              <Link
                href="/market"
                className="flex items-center gap-1 font-mono text-[10px] uppercase tracking-widest mt-2 transition-colors"
                style={{ color: 'var(--blue)' }}
              >
                Explorer le Market <ArrowRight size={10} />
              </Link>
            </div>
          </Card>

          {/* Active alerts preview */}
          <Card className="p-5">
            <div className="flex items-center justify-between mb-4">
              <SectionLabel>Alertes actives</SectionLabel>
              <Link href="/alerts">
                <Bell size={14} style={{ color: 'var(--blue)' }} />
              </Link>
            </div>
            <div className="space-y-3">
              {[
                { product: 'RTX 4070', price: 400 },
                { product: 'PlayStation 5', price: 300 },
              ].map(a => (
                <div key={a.product} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="pulse-dot" />
                    <span className="text-sm">{a.product}</span>
                  </div>
                  <span className="font-mono text-xs" style={{ color: 'var(--blue)' }}>
                    &lt; {formatEur(a.price)}
                  </span>
                </div>
              ))}
              <Link
                href="/alerts"
                className="flex items-center gap-1 font-mono text-[10px] uppercase tracking-widest mt-2 transition-colors"
                style={{ color: 'var(--blue)' }}
              >
                Gérer les alertes <ArrowRight size={10} />
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
