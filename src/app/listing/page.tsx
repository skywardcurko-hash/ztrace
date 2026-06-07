'use client'
import { useState } from 'react'
import { Loader2, Copy, Check, Tag, FileText, Zap } from 'lucide-react'
import { Card, PageHeader, Button, SectionLabel } from '@/components/ui'
import { CONDITION_OPTIONS } from '@/lib/types'

interface ListingResult {
  title: string
  description: string
  tags: string[]
  sellingPoints: string[]
  publishingTips: string[]
}

export default function ListingPage() {
  const [form, setForm] = useState({ product: '', brand: '', condition: '', price: '', details: '' })
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<ListingResult | null>(null)
  const [error, setError] = useState('')
  const [copied, setCopied] = useState<string | null>(null)

  async function handleGenerate() {
    if (!form.product || !form.condition) {
      setError('Produit et état sont requis.')
      return
    }
    setLoading(true)
    setResult(null)
    setError('')

    try {
      const res = await fetch('/api/listing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      setResult(data)
    } catch (err) {
      setError('Erreur lors de la génération. Réessayez.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  async function copyText(text: string, key: string) {
    await navigator.clipboard.writeText(text)
    setCopied(key)
    setTimeout(() => setCopied(null), 2000)
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <PageHeader
        label="Ztrace Listing Builder — Propulsé par GPT-4"
        title={<>Générez une annonce <span style={{ color: 'var(--blue)' }}>optimisée</span></>}
        subtitle="GPT-4 rédige un titre accrocheur, une description professionnelle et des arguments de vente pour maximiser vos chances."
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Form */}
        <Card className="p-6">
          <div className="flex items-center gap-2 pb-4 mb-5 border-b" style={{ borderColor: 'var(--border-subtle)' }}>
            <span className="w-2 h-2 rounded-full" style={{ background: '#ff5f56' }} />
            <span className="w-2 h-2 rounded-full" style={{ background: '#ffbd2e' }} />
            <span className="w-2 h-2 rounded-full" style={{ background: '#27c93f' }} />
            <span className="font-mono text-[10px] ml-auto" style={{ color: 'var(--muted)' }}>
              ztrace_listing_builder.gpt4
            </span>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="font-mono text-[10px] uppercase tracking-widest block mb-1.5" style={{ color: 'var(--muted)' }}>Produit *</label>
                <input className="z-input" placeholder="RTX 4070, PS5..." value={form.product} onChange={e => setForm(f => ({ ...f, product: e.target.value }))} />
              </div>
              <div>
                <label className="font-mono text-[10px] uppercase tracking-widest block mb-1.5" style={{ color: 'var(--muted)' }}>Marque</label>
                <input className="z-input" placeholder="NVIDIA, Sony..." value={form.brand} onChange={e => setForm(f => ({ ...f, brand: e.target.value }))} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="font-mono text-[10px] uppercase tracking-widest block mb-1.5" style={{ color: 'var(--muted)' }}>État *</label>
                <select className="z-input" value={form.condition} onChange={e => setForm(f => ({ ...f, condition: e.target.value }))}>
                  <option value="">Sélectionner</option>
                  {CONDITION_OPTIONS.map(o => <option key={o.value} value={o.label}>{o.label}</option>)}
                </select>
              </div>
              <div>
                <label className="font-mono text-[10px] uppercase tracking-widest block mb-1.5" style={{ color: 'var(--muted)' }}>Prix souhaité (€)</label>
                <input className="z-input" type="number" placeholder="450" value={form.price} onChange={e => setForm(f => ({ ...f, price: e.target.value }))} />
              </div>
            </div>

            <div>
              <label className="font-mono text-[10px] uppercase tracking-widest block mb-1.5" style={{ color: 'var(--muted)' }}>Détails supplémentaires</label>
              <textarea
                className="z-input resize-none"
                style={{ minHeight: 100 }}
                placeholder="Garantie restante, accessoires inclus, raison de vente, particularités..."
                value={form.details}
                onChange={e => setForm(f => ({ ...f, details: e.target.value }))}
              />
            </div>

            {error && (
              <div className="rounded-sm p-3 text-sm" style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', color: '#ef4444' }}>
                {error}
              </div>
            )}

            <Button onClick={handleGenerate} disabled={loading} size="lg" className="w-full justify-center">
              {loading ? <><Loader2 size={16} className="animate-spin" /> Génération en cours…</> : '↗ Générer l\'annonce'}
            </Button>
          </div>
        </Card>

        {/* Result */}
        <div>
          {!result && !loading && (
            <Card className="p-8 flex flex-col items-center justify-center text-center min-h-[400px]">
              <div className="w-12 h-12 rounded-sm flex items-center justify-center mb-4" style={{ background: 'var(--blue-dim)', border: '1px solid var(--border)' }}>
                <FileText size={20} style={{ color: 'var(--blue)' }} />
              </div>
              <p className="font-display font-bold mb-2">Listing Builder IA</p>
              <p className="text-sm" style={{ color: 'var(--muted)' }}>
                GPT-4 génère un titre optimisé, une description professionnelle et des tags SEO pour votre annonce.
              </p>
            </Card>
          )}

          {loading && (
            <Card className="p-8 flex flex-col items-center justify-center min-h-[400px]">
              <div className="flex gap-2 mb-4">
                {[0, 1, 2].map(i => (
                  <span key={i} className="w-2 h-2 rounded-full" style={{ background: 'var(--blue)', animation: `pulse 1s ${i * 0.15}s ease-in-out infinite` }} />
                ))}
              </div>
              <p className="font-mono text-xs" style={{ color: 'var(--muted)' }}>GPT-4 rédige votre annonce…</p>
            </Card>
          )}

          {result && (
            <div className="space-y-4 animate-fadeUp">

              {/* Title */}
              <Card className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <SectionLabel>Titre optimisé</SectionLabel>
                  <button onClick={() => copyText(result.title, 'title')} className="flex items-center gap-1 font-mono text-[10px] uppercase tracking-widest" style={{ color: copied === 'title' ? '#22c55e' : 'var(--muted)' }}>
                    {copied === 'title' ? <Check size={11} /> : <Copy size={11} />}
                    {copied === 'title' ? 'Copié' : 'Copier'}
                  </button>
                </div>
                <p className="font-display font-bold text-base" style={{ color: 'var(--blue)' }}>{result.title}</p>
                <p className="font-mono text-[10px] mt-1" style={{ color: 'var(--muted)' }}>{result.title.length} caractères</p>
              </Card>

              {/* Description */}
              <Card className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <SectionLabel>Description professionnelle</SectionLabel>
                  <button onClick={() => copyText(result.description, 'desc')} className="flex items-center gap-1 font-mono text-[10px] uppercase tracking-widest" style={{ color: copied === 'desc' ? '#22c55e' : 'var(--muted)' }}>
                    {copied === 'desc' ? <Check size={11} /> : <Copy size={11} />}
                    {copied === 'desc' ? 'Copié' : 'Copier'}
                  </button>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>{result.description}</p>
              </Card>

              {/* Tags */}
              <Card className="p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Tag size={13} style={{ color: 'var(--blue)' }} />
                  <SectionLabel>Tags SEO</SectionLabel>
                </div>
                <div className="flex flex-wrap gap-2">
                  {result.tags.map(tag => (
                    <span key={tag} className="badge">{tag}</span>
                  ))}
                </div>
              </Card>

              {/* Selling points + tips */}
              <div className="grid grid-cols-2 gap-3">
                <Card className="p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Zap size={12} style={{ color: 'var(--blue)' }} />
                    <SectionLabel>Arguments de vente</SectionLabel>
                  </div>
                  {result.sellingPoints.map((p, i) => (
                    <div key={i} className="flex gap-2 text-xs mb-2">
                      <span style={{ color: 'var(--blue)' }}>✓</span>
                      <span style={{ color: 'var(--muted)' }}>{p}</span>
                    </div>
                  ))}
                </Card>
                <Card className="p-4">
                  <SectionLabel>Conseils de publication</SectionLabel>
                  <div className="mt-2 space-y-2">
                    {result.publishingTips.map((tip, i) => (
                      <div key={i} className="flex gap-2 text-xs">
                        <span className="font-mono text-[9px] mt-0.5 flex-shrink-0" style={{ color: 'var(--blue)' }}>{String(i + 1).padStart(2, '0')}</span>
                        <span style={{ color: 'var(--muted)' }}>{tip}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
