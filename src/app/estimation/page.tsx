'use client'
import { useState } from 'react'
import { Loader2, Lightbulb, Zap, Copy, Check } from 'lucide-react'
import {
  Card, PageHeader, MetricCard, Button, ScoreRing, DemandBar, SectionLabel
} from '@/components/ui'
import { CONDITION_OPTIONS, WARRANTY_OPTIONS, ACCESSORY_OPTIONS, formatEur } from '@/lib/types'

interface FormState {
  product: string
  brand: string
  condition: string
  purchaseDate: string
  warranty: string
  accessories: string
}

interface EstimationResult {
  minPrice: number
  midPrice: number
  maxPrice: number
  demand: number
  demandLabel: string
  saleSpeed: string
  confidence: number
  ztraceScore: number
  trend: 'up' | 'down' | 'stable'
  trendPercent: number
  tips: string[]
}

export default function EstimationPage() {
  const [form, setForm] = useState<FormState>({
    product: '',
    brand: '',
    condition: '',
    purchaseDate: '',
    warranty: 'none',
    accessories: 'none',
  })
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<EstimationResult | null>(null)
  const [error, setError] = useState('')
  const [errors, setErrors] = useState<Partial<FormState>>({})
  const [copied, setCopied] = useState(false)

  function validate() {
    const e: Partial<FormState> = {}
    if (!form.product.trim()) e.product = 'Requis'
    if (!form.condition) e.condition = 'Requis'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  async function handleSubmit() {
    if (!validate()) return
    setLoading(true)
    setResult(null)
    setError('')

    try {
      const res = await fetch('/api/estimate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Erreur')
      setResult(data)
    } catch (err) {
      setError('Erreur lors de l\'analyse. Vérifiez votre connexion et réessayez.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  function handleChange(field: keyof FormState, value: string) {
    setForm(f => ({ ...f, [field]: value }))
    if (errors[field]) setErrors(e => ({ ...e, [field]: undefined }))
  }

  async function copyResult() {
    if (!result) return
    const text = `Estimation Ztrace — ${form.product}
Prix minimum : ${formatEur(result.minPrice)}
Prix moyen : ${formatEur(result.midPrice)}
Prix maximum : ${formatEur(result.maxPrice)}
Demande : ${result.demandLabel} (${result.demand}/100)
Vitesse de vente estimée : ${result.saleSpeed}
Score Ztrace : ${result.ztraceScore}/100`
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <PageHeader
        label="Ztrace Estimation — Propulsé par GPT-4"
        title={<>Estimez votre <span style={{ color: 'var(--blue)' }}>matériel</span></>}
        subtitle="L'IA analyse le marché français en temps réel et calcule le prix optimal pour votre produit."
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Form */}
        <Card className="p-6">
          <div className="flex items-center gap-2 pb-4 mb-5 border-b" style={{ borderColor: 'var(--border-subtle)' }}>
            <span className="w-2 h-2 rounded-full" style={{ background: '#ff5f56' }} />
            <span className="w-2 h-2 rounded-full" style={{ background: '#ffbd2e' }} />
            <span className="w-2 h-2 rounded-full" style={{ background: '#27c93f' }} />
            <span className="font-mono text-[10px] ml-auto" style={{ color: 'var(--muted)' }}>
              ztrace_ai_estimation.gpt4
            </span>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="font-mono text-[10px] uppercase tracking-widest block mb-1.5" style={{ color: 'var(--muted)' }}>
                  Produit *
                </label>
                <input
                  className={`z-input ${errors.product ? 'border-red-500/50' : ''}`}
                  placeholder="RTX 4070, PS5, Switch..."
                  value={form.product}
                  onChange={e => handleChange('product', e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleSubmit()}
                />
                {errors.product && <p className="font-mono text-[10px] mt-1" style={{ color: '#ef4444' }}>Requis</p>}
              </div>
              <div>
                <label className="font-mono text-[10px] uppercase tracking-widest block mb-1.5" style={{ color: 'var(--muted)' }}>
                  Marque
                </label>
                <input
                  className="z-input"
                  placeholder="NVIDIA, Sony, ASUS..."
                  value={form.brand}
                  onChange={e => handleChange('brand', e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="font-mono text-[10px] uppercase tracking-widest block mb-1.5" style={{ color: 'var(--muted)' }}>
                État *
              </label>
              <select
                className={`z-input ${errors.condition ? 'border-red-500/50' : ''}`}
                value={form.condition}
                onChange={e => handleChange('condition', e.target.value)}
              >
                <option value="">Sélectionner l&apos;état</option>
                {CONDITION_OPTIONS.map(o => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
              {errors.condition && <p className="font-mono text-[10px] mt-1" style={{ color: '#ef4444' }}>Requis</p>}
            </div>

            <div>
              <label className="font-mono text-[10px] uppercase tracking-widest block mb-1.5" style={{ color: 'var(--muted)' }}>
                Date d&apos;achat
              </label>
              <input
                className="z-input"
                placeholder="Ex : Janvier 2024"
                value={form.purchaseDate}
                onChange={e => handleChange('purchaseDate', e.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="font-mono text-[10px] uppercase tracking-widest block mb-1.5" style={{ color: 'var(--muted)' }}>
                  Garantie restante
                </label>
                <select className="z-input" value={form.warranty} onChange={e => handleChange('warranty', e.target.value)}>
                  {WARRANTY_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
              </div>
              <div>
                <label className="font-mono text-[10px] uppercase tracking-widest block mb-1.5" style={{ color: 'var(--muted)' }}>
                  Accessoires inclus
                </label>
                <select className="z-input" value={form.accessories} onChange={e => handleChange('accessories', e.target.value)}>
                  {ACCESSORY_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
              </div>
            </div>

            {error && (
              <div className="rounded-sm p-3 text-sm" style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', color: '#ef4444' }}>
                {error}
              </div>
            )}

            <Button onClick={handleSubmit} disabled={loading} size="lg" className="w-full justify-center mt-2">
              {loading ? (
                <><Loader2 size={16} className="animate-spin" /> Analyse IA en cours…</>
              ) : (
                '↗ Lancer l\'estimation IA'
              )}
            </Button>

            {loading && (
              <p className="font-mono text-[10px] text-center" style={{ color: 'var(--muted)' }}>
                GPT-4 analyse le marché… environ 5 secondes
              </p>
            )}
          </div>
        </Card>

        {/* Results */}
        <div>
          {!result && !loading && (
            <Card className="p-8 flex flex-col items-center justify-center text-center h-full min-h-[300px]">
              <div className="w-12 h-12 rounded-sm flex items-center justify-center mb-4" style={{ background: 'var(--blue-dim)', border: '1px solid var(--border)' }}>
                <Zap size={20} style={{ color: 'var(--blue)' }} />
              </div>
              <p className="font-display font-bold mb-2">Analyse IA réelle</p>
              <p className="text-sm" style={{ color: 'var(--muted)' }}>
                GPT-4 analyse le marché de l&apos;occasion français en temps réel pour chaque estimation.
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
              <p className="font-mono text-xs mb-1" style={{ color: 'var(--muted)' }}>Analyse GPT-4 en cours…</p>
              <p className="font-mono text-[10px]" style={{ color: 'var(--muted)', opacity: 0.5 }}>Consultation du marché de l&apos;occasion français</p>
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
                    className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest transition-colors"
                    style={{ color: copied ? '#22c55e' : 'var(--muted)' }}
                  >
                    {copied ? <Check size={12} /> : <Copy size={12} />}
                    {copied ? 'Copié !' : 'Copier'}
                  </button>
                </div>
                <div className="space-y-3">
                  {result.tips.map((tip, i) => (
                    <div key={i} className="flex gap-3 text-sm">
                      <span className="font-mono text-[10px] mt-0.5 flex-shrink-0" style={{ color: 'var(--blue)' }}>
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <p style={{ color: 'var(--muted)' }}>{tip}</p>
                    </div>
                  ))}
                </div>
              </Card>

              <div className="grid grid-cols-2 gap-3">
                <MetricCard label="Demande marché" value={result.demandLabel} sub={`${result.demand}/100`} />
                <MetricCard label="Ztrace Score" value={`${result.ztraceScore}/100`} highlight sub="Propulsé par GPT-4" />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
