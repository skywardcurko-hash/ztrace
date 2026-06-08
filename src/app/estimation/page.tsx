'use client'
import { useState, useRef, useEffect } from 'react'
import { Loader2, Lightbulb, Zap, Copy, Check, Search, ChevronDown } from 'lucide-react'
import {
  Card, PageHeader, MetricCard, Button, ScoreRing, DemandBar, SectionLabel
} from '@/components/ui'
import { WARRANTY_OPTIONS, ACCESSORY_OPTIONS, formatEur } from '@/lib/types'
import { CATALOG, CATEGORIES, searchProducts, type ProductEntry } from '@/lib/catalog'

const CONDITION_OPTIONS = [
  { value: 'new', label: 'Comme neuf — jamais utilisé ou très peu' },
  { value: 'vgood', label: 'Très bon état — quelques traces légères' },
  { value: 'good', label: "Bon état — traces d'usure normales" },
  { value: 'fair', label: 'Correct — traces visibles, fonctionnel' },
]

interface EstimationResult {
  minPrice: number
  midPrice: number
  maxPrice: number
  demand: number
  demandLabel: string
  saleSpeed: string
  confidence: number
  ztraceScore: number
  tips: string[]
}

export default function EstimationPage() {
  const [query, setQuery] = useState('')
  const [suggestions, setSuggestions] = useState<ProductEntry[]>([])
  const [selectedProduct, setSelectedProduct] = useState<ProductEntry | null>(null)
  const [showDropdown, setShowDropdown] = useState(false)
  const [showCatalog, setShowCatalog] = useState(false)
  const [activeCategory, setActiveCategory] = useState(CATEGORIES[0])

  const [condition, setCondition] = useState('')
  const [purchaseDate, setPurchaseDate] = useState('')
  const [warranty, setWarranty] = useState('none')
  const [accessories, setAccessories] = useState('none')

  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<EstimationResult | null>(null)
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)

  const searchRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowDropdown(false)
        setShowCatalog(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  function handleSearch(value: string) {
    setQuery(value)
    setSelectedProduct(null)
    setResult(null)
    if (value.length >= 2) {
      setSuggestions(searchProducts(value))
      setShowDropdown(true)
      setShowCatalog(false)
    } else {
      setSuggestions([])
      setShowDropdown(false)
    }
  }

  function selectProduct(product: ProductEntry) {
    setSelectedProduct(product)
    setQuery(product.name)
    setShowDropdown(false)
    setShowCatalog(false)
    setResult(null)
    setError('')
  }

  async function handleSubmit() {
    if (!selectedProduct) { setError('Sélectionnez un produit dans la liste.'); return }
    if (!condition) { setError("Choisissez l'état du produit."); return }
    setLoading(true)
    setResult(null)
    setError('')

    try {
      const res = await fetch('/api/estimate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          product: selectedProduct.name,
          brand: selectedProduct.brand,
          category: selectedProduct.category,
          basePrice: selectedProduct.basePrice ?? selectedProduct.msrp ?? 0,
          condition,
          purchaseDate,
          warranty,
          accessories,
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      setResult(data)
    } catch {
      setError("Erreur lors de l'analyse. Réessayez.")
    } finally {
      setLoading(false)
    }
  }

  async function copyResult() {
    if (!result || !selectedProduct) return
    const text = `Estimation Ztrace — ${selectedProduct.name}\nPrix minimum : ${formatEur(result.minPrice)}\nPrix moyen : ${formatEur(result.midPrice)}\nPrix maximum : ${formatEur(result.maxPrice)}\nDemande : ${result.demandLabel} (${result.demand}/100)\nZtrace Score : ${result.ztraceScore}/100`
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const catalogByCategory = CATALOG.filter(p => p.category === activeCategory)

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <PageHeader
        label="Ztrace Estimation — IA"
        title={<>Estimez votre <span style={{ color: 'var(--blue)' }}>matériel</span></>}
        subtitle="Sélectionnez un produit dans notre catalogue de +200 références, renseignez l'état et obtenez une estimation IA précise."
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Form */}
        <Card className="p-6">
          <div className="flex items-center gap-2 pb-4 mb-5 border-b" style={{ borderColor: 'var(--border-subtle)' }}>
            <span className="w-2 h-2 rounded-full" style={{ background: '#ff5f56' }} />
            <span className="w-2 h-2 rounded-full" style={{ background: '#ffbd2e' }} />
            <span className="w-2 h-2 rounded-full" style={{ background: '#27c93f' }} />
            <span className="font-mono text-[10px] ml-auto" style={{ color: 'var(--muted)' }}>ztrace_estimation.ai</span>
          </div>

          <div className="space-y-4">

            {/* Product search */}
            <div ref={searchRef}>
              <label className="font-mono text-[10px] uppercase tracking-widest block mb-1.5" style={{ color: 'var(--muted)' }}>
                Produit *
              </label>

              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: 'var(--muted)' }} />
                  <input
                    className="z-input pl-9"
                    placeholder="Rechercher un produit..."
                    value={query}
                    onChange={e => handleSearch(e.target.value)}
                    onFocus={() => { if (query.length >= 2) setShowDropdown(true) }}
                  />

                  {/* Search suggestions */}
                  {showDropdown && suggestions.length > 0 && (
                    <div
                      className="absolute top-full left-0 right-0 mt-1 rounded-sm border overflow-hidden z-50"
                      style={{ background: 'var(--surface)', borderColor: 'var(--border)', maxHeight: 240, overflowY: 'auto' }}
                    >
                      {suggestions.map(p => (
                        <button
                          key={p.id}
                          onClick={() => selectProduct(p)}
                          className="w-full text-left px-3 py-2.5 flex items-center justify-between transition-colors"
                          style={{ borderBottom: '1px solid var(--border-subtle)' }}
                          onMouseEnter={e => (e.currentTarget.style.background = 'var(--blue-dim)')}
                          onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                        >
                          <div>
                            <p className="text-sm font-medium">{p.name}</p>
                            <p className="font-mono text-[10px]" style={{ color: 'var(--muted)' }}>{p.brand} · {p.category}</p>
                          </div>
                          <span className="font-mono text-xs ml-3" style={{ color: 'var(--blue)', flexShrink: 0 }}>
                            ~{formatEur(p.basePrice ?? p.msrp ?? 0)}
                          </span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Catalog button */}
                <button
                  onClick={() => { setShowCatalog(!showCatalog); setShowDropdown(false) }}
                  className="flex items-center gap-1.5 px-3 rounded-sm border text-sm transition-all flex-shrink-0"
                  style={{
                    borderColor: showCatalog ? 'var(--blue)' : 'rgba(255,255,255,0.1)',
                    color: showCatalog ? 'var(--blue)' : 'var(--muted)',
                    background: showCatalog ? 'var(--blue-dim)' : 'transparent',
                    fontFamily: 'Space Mono, monospace',
                    fontSize: 10,
                  }}
                >
                  <ChevronDown size={12} />
                  Catalogue
                </button>
              </div>

              {/* Catalog browser */}
              {showCatalog && (
                <div
                  className="mt-2 rounded-sm border overflow-hidden"
                  style={{ background: 'var(--dark)', borderColor: 'var(--border)' }}
                >
                  <div className="grid grid-cols-3 gap-0" style={{ height: 320 }}>
                    {/* Category list */}
                    <div className="overflow-y-auto border-r" style={{ borderColor: 'var(--border-subtle)' }}>
                      {CATEGORIES.map(cat => (
                        <button
                          key={cat}
                          onClick={() => setActiveCategory(cat)}
                          className="w-full text-left px-3 py-2 text-xs transition-colors"
                          style={{
                            background: activeCategory === cat ? 'var(--blue-dim)' : 'transparent',
                            color: activeCategory === cat ? 'var(--blue)' : 'var(--muted)',
                            borderBottom: '1px solid var(--border-subtle)',
                            fontFamily: 'Space Mono, monospace',
                            fontSize: 9,
                            letterSpacing: '0.5px',
                          }}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>

                    {/* Product list */}
                    <div className="col-span-2 overflow-y-auto">
                      {catalogByCategory.map(p => (
                        <button
                          key={p.id}
                          onClick={() => selectProduct(p)}
                          className="w-full text-left px-3 py-2.5 flex items-center justify-between transition-colors"
                          style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}
                          onMouseEnter={e => (e.currentTarget.style.background = 'rgba(0,183,255,0.04)')}
                          onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                        >
                          <div>
                            <p className="text-xs font-medium leading-tight">{p.name}</p>
                            <p className="font-mono text-[9px] mt-0.5" style={{ color: 'var(--muted)' }}>{p.brand}</p>
                          </div>
                          <span className="font-mono text-[10px] ml-2 flex-shrink-0" style={{ color: 'var(--blue)' }}>
                            ~{formatEur(p.basePrice ?? p.msrp ?? 0)}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Selected product badge */}
              {selectedProduct && (
                <div
                  className="mt-2 flex items-center justify-between px-3 py-2 rounded-sm"
                  style={{ background: 'var(--blue-dim)', border: '1px solid rgba(0,183,255,0.3)' }}
                >
                  <div>
                    <p className="text-sm font-medium" style={{ color: 'var(--blue)' }}>{selectedProduct.name}</p>
                    <p className="font-mono text-[10px]" style={{ color: 'var(--muted)' }}>{selectedProduct.brand} · {selectedProduct.category}</p>
                  </div>
                  <span className="font-mono text-xs" style={{ color: 'var(--blue)' }}>✓ Sélectionné</span>
                </div>
              )}
            </div>

            {/* Condition */}
            <div>
              <label className="font-mono text-[10px] uppercase tracking-widest block mb-1.5" style={{ color: 'var(--muted)' }}>
                État *
              </label>
              <div className="grid grid-cols-2 gap-2">
                {CONDITION_OPTIONS.map(o => (
                  <button
                    key={o.value}
                    onClick={() => setCondition(o.value)}
                    className="text-left px-3 py-2.5 rounded-sm border text-xs transition-all"
                    style={{
                      borderColor: condition === o.value ? 'var(--blue)' : 'rgba(255,255,255,0.08)',
                      background: condition === o.value ? 'var(--blue-dim)' : 'var(--dark)',
                      color: condition === o.value ? 'var(--blue)' : 'var(--muted)',
                    }}
                  >
                    {o.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Date + Warranty */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="font-mono text-[10px] uppercase tracking-widest block mb-1.5" style={{ color: 'var(--muted)' }}>
                  Date d&apos;achat
                </label>
                <input
                  className="z-input"
                  placeholder="Ex : Janv. 2024"
                  value={purchaseDate}
                  onChange={e => setPurchaseDate(e.target.value)}
                />
              </div>
              <div>
                <label className="font-mono text-[10px] uppercase tracking-widest block mb-1.5" style={{ color: 'var(--muted)' }}>
                  Garantie restante
                </label>
                <select className="z-input" value={warranty} onChange={e => setWarranty(e.target.value)}>
                  {WARRANTY_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
              </div>
            </div>

            {/* Accessories */}
            <div>
              <label className="font-mono text-[10px] uppercase tracking-widest block mb-1.5" style={{ color: 'var(--muted)' }}>
                Accessoires inclus
              </label>
              <select className="z-input" value={accessories} onChange={e => setAccessories(e.target.value)}>
                {ACCESSORY_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </div>

            {error && (
              <div className="rounded-sm p-3 text-sm" style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', color: '#ef4444' }}>
                {error}
              </div>
            )}

            <Button onClick={handleSubmit} disabled={loading} size="lg" className="w-full justify-center">
              {loading ? <><Loader2 size={16} className="animate-spin" /> Analyse en cours…</> : "↗ Lancer l'estimation IA"}
            </Button>
          </div>
        </Card>

        {/* Results */}
        <div>
          {!result && !loading && (
            <Card className="p-8 flex flex-col items-center justify-center text-center h-full min-h-[300px]">
              <div className="w-12 h-12 rounded-sm flex items-center justify-center mb-4" style={{ background: 'var(--blue-dim)', border: '1px solid var(--border)' }}>
                <Zap size={20} style={{ color: 'var(--blue)' }} />
              </div>
              <p className="font-display font-bold mb-2">+200 produits disponibles</p>
              <p className="text-sm" style={{ color: 'var(--muted)' }}>
                GPU, consoles, PC, claviers, souris, casques, VR et bien plus — cherchez ou parcourez le catalogue.
              </p>
            </Card>
          )}

          {loading && (
            <Card className="p-8 flex flex-col items-center justify-center min-h-[300px]">
              <div className="flex gap-2 mb-4">
                {[0, 1, 2].map(i => (
                  <span key={i} className="w-2 h-2 rounded-full" style={{ background: 'var(--blue)', animation: `pulse 1s ${i * 0.15}s ease-in-out infinite` }} />
                ))}
              </div>
              <p className="font-mono text-xs" style={{ color: 'var(--muted)' }}>Analyse IA en cours…</p>
            </Card>
          )}

          {result && (
            <div className="space-y-4 animate-fadeUp">
              <div className="grid grid-cols-3 gap-3">
                <MetricCard label="Prix minimum" value={formatEur(result.minPrice)} />
                <MetricCard label="Prix moyen" value={formatEur(result.midPrice)} highlight />
                <MetricCard label="Prix maximum" value={formatEur(result.maxPrice)} />
              </div>

              <Card className="p-5">
                <div className="flex items-center gap-6">
                  <ScoreRing score={result.ztraceScore} size={100} />
                  <div className="flex-1 space-y-3">
                    <DemandBar value={result.demand} label="Demande" />
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <p className="font-mono text-[10px] uppercase tracking-widest mb-0.5" style={{ color: 'var(--muted)' }}>Vitesse de vente</p>
                        <p className="font-bold" style={{ color: 'var(--blue)' }}>{result.saleSpeed}</p>
                      </div>
                      <div>
                        <p className="font-mono text-[10px] uppercase tracking-widest mb-0.5" style={{ color: 'var(--muted)' }}>Confiance IA</p>
                        <p className="font-bold">{result.confidence}%</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-5">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Lightbulb size={14} style={{ color: 'var(--blue)' }} />
                    <SectionLabel>Conseils personnalisés</SectionLabel>
                  </div>
                  <button
                    onClick={copyResult}
                    className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest"
                    style={{ color: copied ? '#22c55e' : 'var(--muted)' }}
                  >
                    {copied ? <Check size={12} /> : <Copy size={12} />}
                    {copied ? 'Copié !' : 'Copier'}
                  </button>
                </div>
                <div className="space-y-3">
                  {result.tips?.map((tip, i) => (
                    <div key={i} className="flex gap-3 text-sm">
                      <span className="font-mono text-[10px] mt-0.5 flex-shrink-0" style={{ color: 'var(--blue)' }}>
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <p style={{ color: 'var(--muted)' }}>{tip}</p>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}