'use client'
import { useState } from 'react'
import { Loader2, AlertTriangle, CheckCircle2, Info, TrendingDown, TrendingUp } from 'lucide-react'
import { Card, PageHeader, Button, ScoreRing, SectionLabel } from '@/components/ui'

interface ScanIssue {
  type: 'warning' | 'error' | 'info'
  label: string
  detail: string
}

interface ScanResult {
  score: number
  priceAssessment: 'underpriced' | 'fair' | 'overpriced'
  priceDiff: number
  issues: ScanIssue[]
  improvements: string[]
  verdict: string
}

const EXAMPLE_AD = `RTX 4070 ASUS ROG STRIX OC - Comme neuf

Vends ma RTX 4070 ASUS ROG Strix OC. Utilisée seulement 6 mois pour du gaming 1440p.

Prix : 600€ ferme

Carte en parfait état, aucune modification. Vendue sans boîte mais avec tous les câbles d'origine. Garantie constructeur encore valable 18 mois.

Cause de vente : passage sur une 4080.
Pas d'envoi, remise en main propre uniquement sur Paris 11e.`

export default function ScanPage() {
  const [text, setText] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<ScanResult | null>(null)
  const [error, setError] = useState('')

  async function handleScan() {
    if (!text.trim() || text.trim().length < 20) {
      setError('Veuillez coller une annonce complète.')
      return
    }
    setLoading(true)
    setResult(null)
    setError('')

    try {
      const res = await fetch('/api/scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      setResult(data)
    } catch (err) {
      setError('Erreur lors de l\'analyse. Réessayez.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const issueIcon = (type: ScanIssue['type']) => {
    if (type === 'error') return <AlertTriangle size={14} style={{ color: '#ef4444', flexShrink: 0 }} />
    if (type === 'warning') return <AlertTriangle size={14} style={{ color: '#f59e0b', flexShrink: 0 }} />
    return <Info size={14} style={{ color: 'var(--blue)', flexShrink: 0 }} />
  }

  const issueBg = (type: ScanIssue['type']) => {
    if (type === 'error') return 'rgba(239,68,68,0.06)'
    if (type === 'warning') return 'rgba(245,158,11,0.06)'
    return 'var(--blue-dim)'
  }

  const issueBorder = (type: ScanIssue['type']) => {
    if (type === 'error') return 'rgba(239,68,68,0.2)'
    if (type === 'warning') return 'rgba(245,158,11,0.2)'
    return 'var(--border)'
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <PageHeader
        label="Ztrace AI Scan — Propulsé par GPT-4"
        title={<>Analysez n&apos;importe quelle <span style={{ color: 'var(--blue)' }}>annonce</span></>}
        subtitle="GPT-4 analyse le prix, la description, les incohérences et génère un rapport détaillé avec score sur 100."
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <Card className="p-5">
            <div className="flex items-center justify-between mb-3">
              <SectionLabel>Texte de l&apos;annonce</SectionLabel>
              <button
                className="font-mono text-[10px] uppercase tracking-widest transition-colors"
                style={{ color: 'var(--blue)' }}
                onClick={() => { setText(EXAMPLE_AD); setResult(null); setError('') }}
              >
                ↓ Exemple
              </button>
            </div>
            <textarea
              className="z-input resize-none"
              style={{ minHeight: 280, lineHeight: 1.7 }}
              placeholder="Collez ici le texte complet de l'annonce à analyser…"
              value={text}
              onChange={e => { setText(e.target.value); setError('') }}
            />
            <div className="flex items-center justify-between mt-3">
              <span className="font-mono text-[10px]" style={{ color: 'var(--muted)' }}>
                {text.length} caractères
              </span>
              <Button onClick={handleScan} disabled={loading || !text.trim()} size="md">
                {loading ? (
                  <><Loader2 size={14} className="animate-spin" /> Analyse…</>
                ) : '↗ Analyser l\'annonce'}
              </Button>
            </div>
            {error && (
              <p className="font-mono text-[11px] mt-2" style={{ color: '#ef4444' }}>{error}</p>
            )}
            {loading && (
              <p className="font-mono text-[10px] mt-2 text-center" style={{ color: 'var(--muted)' }}>
                GPT-4 analyse l&apos;annonce… environ 5 secondes
              </p>
            )}
          </Card>
        </div>

        <div>
          {!result && !loading && (
            <Card className="p-8 flex flex-col items-center justify-center text-center min-h-[320px]">
              <div className="w-12 h-12 rounded-sm flex items-center justify-center mb-4" style={{ background: 'var(--blue-dim)', border: '1px solid var(--border)' }}>
                <Info size={20} style={{ color: 'var(--blue)' }} />
              </div>
              <p className="font-display font-bold mb-2">Analyse IA réelle</p>
              <p className="text-sm" style={{ color: 'var(--muted)' }}>
                GPT-4 évalue le prix, la qualité de description et détecte les points suspects.
              </p>
            </Card>
          )}

          {loading && (
            <Card className="p-8 flex flex-col items-center justify-center min-h-[320px]">
              <div className="flex gap-2 mb-4">
                {[0, 1, 2].map(i => (
                  <span key={i} className="w-2 h-2 rounded-full" style={{ background: 'var(--blue)', animation: `pulse 1s ${i * 0.15}s ease-in-out infinite` }} />
                ))}
              </div>
              <p className="font-mono text-xs" style={{ color: 'var(--muted)' }}>GPT-4 analyse l&apos;annonce…</p>
            </Card>
          )}

          {result && (
            <div className="space-y-4 animate-fadeUp">
              <Card className="p-5">
                <div className="flex items-center gap-5">
                  <ScoreRing score={result.score} size={90} label="SCAN" />
                  <div className="flex-1">
                    <p className="font-display font-bold text-base mb-1" style={{ color: result.score >= 75 ? '#22c55e' : result.score >= 55 ? '#f59e0b' : '#ef4444' }}>
                      {result.score >= 75 ? '✓ ' : result.score >= 55 ? '⚠ ' : '✗ '}
                      {result.verdict}
                    </p>
                    <div className="flex items-center gap-2 mt-3">
                      {result.priceAssessment === 'overpriced' && (
                        <span className="flex items-center gap-1 font-mono text-[11px]" style={{ color: '#ef4444' }}>
                          <TrendingUp size={12} /> Prix surévalué ({result.priceDiff > 0 ? '+' : ''}{result.priceDiff}%)
                        </span>
                      )}
                      {result.priceAssessment === 'fair' && (
                        <span className="flex items-center gap-1 font-mono text-[11px]" style={{ color: '#22c55e' }}>
                          <CheckCircle2 size={12} /> Prix cohérent avec le marché
                        </span>
                      )}
                      {result.priceAssessment === 'underpriced' && (
                        <span className="flex items-center gap-1 font-mono text-[11px]" style={{ color: 'var(--blue)' }}>
                          <TrendingDown size={12} /> Prix sous le marché ({result.priceDiff}%)
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-5">
                <SectionLabel>Points détectés par GPT-4</SectionLabel>
                <div className="space-y-2 mt-3">
                  {result.issues.map((issue, i) => (
                    <div key={i} className="rounded-sm p-3" style={{ background: issueBg(issue.type), border: `1px solid ${issueBorder(issue.type)}` }}>
                      <div className="flex items-center gap-2 mb-1">
                        {issueIcon(issue.type)}
                        <span className="font-bold text-sm">{issue.label}</span>
                      </div>
                      <p className="text-xs leading-relaxed ml-5" style={{ color: 'var(--muted)' }}>{issue.detail}</p>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="p-5">
                <SectionLabel>Améliorations conseillées</SectionLabel>
                <div className="space-y-2.5 mt-3">
                  {result.improvements.map((tip, i) => (
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
