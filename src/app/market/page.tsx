'use client'
import { useState, useMemo } from 'react'
import {
  LineChart, Line, XAxis, YAxis, Tooltip,
  ResponsiveContainer, CartesianGrid,
} from 'recharts'
import { Search, TrendingDown, TrendingUp, Minus } from 'lucide-react'
import {
  Card, PageHeader, Badge, DemandBar, TrendBadge, SectionLabel
} from '@/components/ui'
import {
  MARKET_PRODUCTS, CATEGORY_LABELS, formatEur,
  Product, ProductCategory,
} from '@/lib/types'

const CATEGORIES: { value: 'all' | ProductCategory; label: string }[] = [
  { value: 'all', label: 'Tout' },
  { value: 'gpu', label: 'Cartes graphiques' },
  { value: 'console', label: 'Consoles' },
  { value: 'cpu', label: 'Processeurs' },
  { value: 'pc', label: 'PC Gaming' },
  { value: 'monitor', label: 'Écrans' },
]

// Custom tooltip for recharts
function CustomTooltip({ active, payload, label }: {
  active?: boolean
  payload?: { value: number }[]
  label?: string
}) {
  if (!active || !payload?.length) return null
  return (
    <div
      className="card px-3 py-2"
      style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
    >
      <p className="font-mono text-[10px] uppercase tracking-widest mb-1" style={{ color: 'var(--muted)' }}>
        {label}
      </p>
      <p className="font-display font-bold text-sm" style={{ color: 'var(--blue)' }}>
        {formatEur(payload[0].value)}
      </p>
    </div>
  )
}

export default function MarketPage() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState<'all' | ProductCategory>('all')
  const [selected, setSelected] = useState<Product>(MARKET_PRODUCTS[0])

  const filtered = useMemo(() => {
    return MARKET_PRODUCTS.filter(p => {
      const matchCat = category === 'all' || p.category === category
      const matchSearch = !search || p.name.toLowerCase().includes(search.toLowerCase()) || p.brand.toLowerCase().includes(search.toLowerCase())
      return matchCat && matchSearch
    })
  }, [search, category])

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <PageHeader
        label="Ztrace Market"
        title={<>Base de données <span style={{ color: 'var(--blue)' }}>marché</span></>}
        subtitle="Historiques de prix, tendances et analyse de la demande sur tous les produits gaming et électronique."
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Sidebar: filters + list */}
        <div className="lg:col-span-1 space-y-4">

          {/* Search */}
          <div className="relative">
            <Search
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2"
              style={{ color: 'var(--muted)' }}
            />
            <input
              className="z-input pl-8"
              placeholder="Rechercher un produit…"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>

          {/* Category filter */}
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map(c => (
              <button
                key={c.value}
                onClick={() => setCategory(c.value)}
                className="font-mono text-[10px] uppercase tracking-widest px-3 py-1.5 rounded-sm border transition-all"
                style={
                  category === c.value
                    ? { background: 'var(--blue-dim)', borderColor: 'rgba(0,183,255,0.4)', color: 'var(--blue)' }
                    : { background: 'transparent', borderColor: 'var(--border-subtle)', color: 'var(--muted)' }
                }
              >
                {c.label}
              </button>
            ))}
          </div>

          {/* Product list */}
          <div className="space-y-2">
            {filtered.map(product => (
              <button
                key={product.id}
                onClick={() => setSelected(product)}
                className="w-full text-left card p-3 transition-all"
                style={
                  selected.id === product.id
                    ? { borderColor: 'rgba(0,183,255,0.5)', background: 'rgba(0,183,255,0.04)' }
                    : {}
                }
              >
                <div className="flex items-start justify-between mb-1">
                  <div>
                    <p className="font-display font-bold text-sm">{product.name}</p>
                    <p className="text-xs" style={{ color: 'var(--muted)' }}>{product.brand}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-display font-bold text-sm" style={{ color: 'var(--blue)' }}>
                      {formatEur(product.currentPrice)}
                    </p>
                    <TrendBadge trend={product.trend} percent={product.trendPercent} />
                  </div>
                </div>
                <div
                  className="h-0.5 rounded-full overflow-hidden mt-2"
                  style={{ background: 'rgba(255,255,255,0.05)' }}
                >
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${product.demand}%`, background: 'var(--blue)', opacity: 0.5 }}
                  />
                </div>
              </button>
            ))}

            {filtered.length === 0 && (
              <div className="text-center py-8">
                <p className="text-sm" style={{ color: 'var(--muted)' }}>Aucun résultat</p>
              </div>
            )}
          </div>
        </div>

        {/* Main: chart + details */}
        <div className="lg:col-span-2 space-y-4">

          {/* Product header */}
          <Card className="p-5">
            <div className="flex items-start justify-between">
              <div>
                <Badge>{CATEGORY_LABELS[selected.category]}</Badge>
                <h2
                  className="font-display font-black text-2xl mt-2 mb-1"
                  style={{ letterSpacing: '-0.5px' }}
                >
                  {selected.brand} {selected.name}
                </h2>
                <div className="flex items-center gap-4">
                  <span
                    className="font-display font-black text-3xl"
                    style={{ color: 'var(--blue)', letterSpacing: '-1px' }}
                  >
                    {formatEur(selected.currentPrice)}
                  </span>
                  <span className="flex items-center gap-1 text-sm font-mono">
                    {selected.trend === 'down' && <TrendingDown size={14} style={{ color: '#ef4444' }} />}
                    {selected.trend === 'up' && <TrendingUp size={14} style={{ color: '#22c55e' }} />}
                    {selected.trend === 'stable' && <Minus size={14} style={{ color: 'var(--muted)' }} />}
                    <TrendBadge trend={selected.trend} percent={selected.trendPercent} />
                    <span style={{ color: 'var(--muted)' }}>/ mois</span>
                  </span>
                </div>
              </div>
              <div className="text-right">
                <p className="font-mono text-[10px] uppercase tracking-widest mb-1" style={{ color: 'var(--muted)' }}>
                  Mise à jour
                </p>
                <p className="font-mono text-xs" style={{ color: 'var(--blue)' }}>
                  Il y a 2h
                </p>
              </div>
            </div>
          </Card>

          {/* Price chart */}
          <Card className="p-5">
            <SectionLabel>Évolution du prix — 12 derniers mois</SectionLabel>
            <div className="mt-4" style={{ height: 220 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={selected.priceHistory} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
                  <CartesianGrid
                    strokeDasharray="0"
                    stroke="rgba(255,255,255,0.04)"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="date"
                    tick={{ fill: '#555', fontFamily: 'Space Mono', fontSize: 10 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fill: '#555', fontFamily: 'Space Mono', fontSize: 10 }}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={v => `${v}€`}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Line
                    type="monotone"
                    dataKey="price"
                    stroke="var(--blue)"
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 4, fill: 'var(--blue)', strokeWidth: 0 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Stats row */}
          <div className="grid grid-cols-3 gap-3">
            <div
              className="rounded-sm p-4"
              style={{ background: 'var(--surface)', border: '1px solid var(--border-subtle)' }}
            >
              <p className="font-mono text-[10px] uppercase tracking-widest mb-1.5" style={{ color: 'var(--muted)' }}>
                Plus bas 12 mois
              </p>
              <p className="font-display font-black text-xl" style={{ letterSpacing: '-0.5px' }}>
                {formatEur(Math.min(...selected.priceHistory.map(p => p.price)))}
              </p>
            </div>
            <div
              className="rounded-sm p-4"
              style={{ background: 'rgba(0,183,255,0.06)', border: '1px solid rgba(0,183,255,0.3)' }}
            >
              <p className="font-mono text-[10px] uppercase tracking-widest mb-1.5" style={{ color: 'var(--muted)' }}>
                Prix actuel
              </p>
              <p
                className="font-display font-black text-xl"
                style={{ letterSpacing: '-0.5px', color: 'var(--blue)' }}
              >
                {formatEur(selected.currentPrice)}
              </p>
            </div>
            <div
              className="rounded-sm p-4"
              style={{ background: 'var(--surface)', border: '1px solid var(--border-subtle)' }}
            >
              <p className="font-mono text-[10px] uppercase tracking-widest mb-1.5" style={{ color: 'var(--muted)' }}>
                Plus haut 12 mois
              </p>
              <p className="font-display font-black text-xl" style={{ letterSpacing: '-0.5px' }}>
                {formatEur(Math.max(...selected.priceHistory.map(p => p.price)))}
              </p>
            </div>
          </div>

          {/* Demand */}
          <Card className="p-5">
            <SectionLabel>Indicateurs marché</SectionLabel>
            <div className="mt-4 space-y-4">
              <DemandBar value={selected.demand} label="Demande" />
              <div className="grid grid-cols-2 gap-4 text-sm pt-2">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-widest mb-1" style={{ color: 'var(--muted)' }}>
                    Vitesse de vente estimée
                  </p>
                  <p className="font-bold" style={{ color: 'var(--blue)' }}>
                    {selected.demand >= 80 ? '< 24h' : selected.demand >= 65 ? '2–5 jours' : '1–2 semaines'}
                  </p>
                </div>
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-widest mb-1" style={{ color: 'var(--muted)' }}>
                    Tendance 30 jours
                  </p>
                  <p className="font-bold">
                    {selected.trend === 'down' ? `↓ -${selected.trendPercent}%` : selected.trend === 'up' ? `↑ +${selected.trendPercent}%` : `→ stable`}
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
