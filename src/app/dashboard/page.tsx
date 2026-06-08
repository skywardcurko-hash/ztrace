'use client'
import { useEffect, useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid } from 'recharts'
import { Star, Bell, ArrowRight, Zap } from 'lucide-react'
import Link from 'next/link'
import { Card, MetricCard, SectionLabel, ScoreRing } from '@/components/ui'
import { formatEur } from '@/lib/types'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

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
  { product: 'RTX 4070', brand: 'NVIDIA', price: 450, date: "Aujourd'hui 14:32", score: 85 },
  { product: 'PlayStation 5', brand: 'Sony', price: 320, date: 'Hier 19:45', score: 91 },
  { product: 'RTX 3080', brand: 'NVIDIA', price: 310, date: 'Il y a 2 jours', score: 72 },
  { product: 'Switch OLED', brand: 'Nintendo', price: 220, date: 'Il y a 3 jours', score: 78 },
]

const SAVED_PRODUCTS = [
  { name: 'RTX 4080 Super', brand: 'NVIDIA', price: 720 },
  { name: 'PS5 Slim', brand: 'Sony', price: 310 },
]

function CustomBarTooltip({ active, payload, label }: { active?: boolean; payload?: { value: number }[]; label?: string }) {
  if (!active || !payload?.length) return null
  return (
    <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', padding: '8px 12px', borderRadius: 2 }}>
      <p className="font-mono text-[10px] uppercase tracking-widest mb-1" style={{ color: 'var(--muted)' }}>{label}</p>
      <p className="font-display font-bold text-sm" style={{ color: 'var(--blue)' }}>{payload[0].value} estimations</p>
    </div>
  )
}

export default function DashboardPage() {
  const [usageCount, setUsageCount] = useState<number>(0)
  const [usageLoading, setUsageLoading] = useState(true)
  const MAX = 5

  useEffect(() => {
    async function fetchUsage() {
      try {
        const ipRes = await fetch('https://api.ipify.org?format=json')
        const { ip } = await ipRes.json()

        const { data } = await supabase
          .from('usage_limits')
          .select('estimate_count')
          .eq('ip_address', ip)
          .single()

        setUsageCount(data?.estimate_count ?? 0)
      } catch {
        setUsageCount(0)
      } finally {
        setUsageLoading(false)
      }
    }
    fetchUsage()
  }, [])

  const remaining = Math.max(0, MAX - usageCount)
  const usagePercent = Math.min(100, (usageCount / MAX) * 100)
  const usageColor = usageCount >= MAX ? '#ef4444' : usageCount >= 4 ? '#f59e0b' : 'var(--blue)'

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <div className="flex items-start justify-between mb-8">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-widest mb-1" style={{ color: 'var(--blue)' }}>Dashboard</p>
          <h1 className="font-display font-black text-3xl" style={{ letterSpacing: '-0.5px' }}>
            Bienvenue, <span style={{ color: 'var(--blue)' }}>utilisateur</span>
          </h1>
          <p className="text-sm mt-1" style={{ color: 'var(--muted)' }}>Voici un résumé de votre activité Ztrace.</p>
        </div>
        <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest px-3 py-2 rounded-sm border" style={{ color: 'var(--muted)', borderColor: 'var(--border-subtle)' }}>
          Plan gratuit —{' '}
          <Link href="/#pricing" style={{ color: 'var(--blue)' }}>Upgrader</Link>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <MetricCard
          label="Estimations aujourd'hui"
          value={usageLoading ? '…' : `${usageCount}/${MAX}`}
          highlight={usageCount >= MAX}
          sub={usageLoading ? 'Chargement…' : usageCount >= MAX ? 'Limite atteinte' : `${remaining} restante${remaining > 1 ? 's' : ''}`}
        />
        <MetricCard label="Total estimations" value="47" sub="Depuis le début" />
        <MetricCard label="Alertes actives" value="2" sub="Sur 3 configurées" />
        <MetricCard label="Economies estimées" value={formatEur(820)} sub="Vs prix marché moyen" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-5">
          <Card className="p-5">
            <SectionLabel>Activité cette semaine</SectionLabel>
            <div className="mt-4" style={{ height: 160 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={ACTIVITY_DATA} margin={{ top: 0, right: 0, bottom: 0, left: -30 }}>
                  <CartesianGrid strokeDasharray="0" stroke="rgba(255,255,255,0.04)" vertical={false} />
                  <XAxis dataKey="day" tick={{ fill: '#555', fontFamily: 'Space Mono', fontSize: 10 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: '#555', fontFamily: 'Space Mono', fontSize: 10 }} axisLine={false} tickLine={false} />
                  <Tooltip content={<CustomBarTooltip />} cursor={{ fill: 'rgba(0,183,255,0.04)' }} />
                  <Bar dataKey="estimations" fill="var(--blue)" opacity={0.7} radius={[2, 2, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card className="p-5">
            <div className="flex items-center justify-between mb-4">
              <SectionLabel>Estimations récentes</SectionLabel>
              <Link href="/estimation" className="font-mono text-[10px] uppercase tracking-widest flex items-center gap-1" style={{ color: 'var(--blue)' }}>
                Nouvelle <ArrowRight size={10} />
              </Link>
            </div>
            <div className="space-y-0">
              {RECENT_ESTIMATIONS.map((item, i) => (
                <div key={i} className="flex items-center gap-4 py-3" style={{ borderBottom: i < RECENT_ESTIMATIONS.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}>
                  <ScoreRing score={item.score} size={44} label="" />
                  <div className="flex-1 min-w-0">
                    <p className="font-display font-bold text-sm">{item.product}</p>
                    <p className="text-xs" style={{ color: 'var(--muted)' }}>{item.brand}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="font-display font-bold text-sm" style={{ color: 'var(--blue)' }}>{formatEur(item.price)}</p>
                    <p className="font-mono text-[10px]" style={{ color: 'var(--muted)' }}>{item.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="space-y-5">
          <Card className="p-5">
            <SectionLabel>Usage du plan</SectionLabel>
            <div className="mt-4">
              <div className="flex justify-between mb-2 text-sm">
                <span style={{ color: 'var(--muted)' }}>Estimations aujourd&apos;hui</span>
                <span className="font-mono" style={{ color: usageColor }}>
                  {usageLoading ? '…' : `${usageCount} / ${MAX}`}
                </span>
              </div>
              <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
                <div className="h-full rounded-full transition-all duration-500" style={{ width: `${usagePercent}%`, background: usageColor }} />
              </div>
              <p className="text-xs mt-2" style={{ color: 'var(--muted)' }}>
                {usageLoading ? 'Chargement…' : usageCount >= MAX ? 'Limite atteinte. Passez Premium pour continuer.' : `${remaining} estimation${remaining > 1 ? 's' : ''} restante${remaining > 1 ? 's' : ''}.`}
              </p>
            </div>
            <Link href="/#pricing" className="mt-4 flex items-center justify-center gap-2 font-display font-bold text-xs py-2.5 rounded-sm w-full" style={{ background: 'var(--blue)', color: 'var(--black)' }}>
              <Zap size={12} />
              Passer Premium — 9.99 euros/mois
            </Link>
          </Card>

          <Card className="p-5">
            <div className="flex items-center justify-between mb-4">
              <SectionLabel>Produits favoris</SectionLabel>
              <Star size={14} style={{ color: 'var(--muted)' }} />
            </div>
            <div className="space-y-3">
              {SAVED_PRODUCTS.map(p => (
                <div key={p.name} className="flex items-center justify-between py-2" style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                  <div>
                    <p className="font-display font-bold text-sm">{p.name}</p>
                    <p className="text-xs" style={{ color: 'var(--muted)' }}>{p.brand}</p>
                  </div>
                  <p className="font-mono text-sm" style={{ color: 'var(--blue)' }}>{formatEur(p.price)}</p>
                </div>
              ))}
              <Link href="/market" className="flex items-center gap-1 font-mono text-[10px] uppercase tracking-widest mt-2" style={{ color: 'var(--blue)' }}>
                Explorer le Market <ArrowRight size={10} />
              </Link>
            </div>
          </Card>

          <Card className="p-5">
            <div className="flex items-center justify-between mb-4">
              <SectionLabel>Alertes actives</SectionLabel>
              <Link href="/alerts"><Bell size={14} style={{ color: 'var(--blue)' }} /></Link>
            </div>
            <div className="space-y-3">
              {[{ product: 'RTX 4070', price: 400 }, { product: 'PlayStation 5', price: 300 }].map(a => (
                <div key={a.product} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="pulse-dot" />
                    <span className="text-sm">{a.product}</span>
                  </div>
                  <span className="font-mono text-xs" style={{ color: 'var(--blue)' }}>&lt; {formatEur(a.price)}</span>
                </div>
              ))}
              <Link href="/alerts" className="flex items-center gap-1 font-mono text-[10px] uppercase tracking-widest mt-2" style={{ color: 'var(--blue)' }}>
                Gerer les alertes <ArrowRight size={10} />
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}