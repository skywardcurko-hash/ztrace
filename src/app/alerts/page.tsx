'use client'
import { useState } from 'react'
import { Bell, BellOff, Trash2, Plus } from 'lucide-react'
import { Card, PageHeader, Button, Badge, SectionLabel } from '@/components/ui'
import { Alert } from '@/lib/types'
import { formatEur } from '@/lib/types'

const INITIAL_ALERTS: Alert[] = [
  {
    id: '1',
    product: 'RTX 4070',
    condition: 'below',
    targetPrice: 400,
    active: true,
    createdAt: '2025-06-01',
  },
  {
    id: '2',
    product: 'PlayStation 5',
    condition: 'below',
    targetPrice: 300,
    active: true,
    createdAt: '2025-05-28',
  },
  {
    id: '3',
    product: 'RTX 3080',
    condition: 'below',
    targetPrice: 280,
    active: false,
    createdAt: '2025-05-15',
  },
]

export default function AlertsPage() {
  const [alerts, setAlerts] = useState<Alert[]>(INITIAL_ALERTS)
  const [form, setForm] = useState({ product: '', condition: 'below' as 'below' | 'above', price: '' })
  const [error, setError] = useState('')

  function addAlert() {
    if (!form.product.trim()) { setError('Renseignez un produit.'); return }
    const price = parseInt(form.price)
    if (isNaN(price) || price <= 0) { setError('Prix invalide.'); return }
    setError('')

    const newAlert: Alert = {
      id: Date.now().toString(),
      product: form.product.trim(),
      condition: form.condition,
      targetPrice: price,
      active: true,
      createdAt: new Date().toISOString().split('T')[0],
    }
    setAlerts(a => [newAlert, ...a])
    setForm({ product: '', condition: 'below', price: '' })
  }

  function toggleAlert(id: string) {
    setAlerts(a => a.map(al => al.id === id ? { ...al, active: !al.active } : al))
  }

  function deleteAlert(id: string) {
    setAlerts(a => a.filter(al => al.id !== id))
  }

  const active = alerts.filter(a => a.active)
  const inactive = alerts.filter(a => !a.active)

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <PageHeader
        label="Ztrace Deal Alert"
        title={<>Alertes <span style={{ color: 'var(--blue)' }}>personnalisées</span></>}
        subtitle="Soyez notifié dès qu'un produit atteint votre prix cible. Configurable en quelques secondes."
      />

      {/* Create alert */}
      <Card className="p-5 mb-6">
        <SectionLabel>Nouvelle alerte</SectionLabel>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 mt-3">
          <div className="sm:col-span-2">
            <input
              className="z-input"
              placeholder="Produit (ex : RTX 4070 Ti)"
              value={form.product}
              onChange={e => setForm(f => ({ ...f, product: e.target.value }))}
            />
          </div>
          <div>
            <select
              className="z-input"
              value={form.condition}
              onChange={e => setForm(f => ({ ...f, condition: e.target.value as 'below' | 'above' }))}
            >
              <option value="below">Passe sous</option>
              <option value="above">Passe au-dessus de</option>
            </select>
          </div>
          <div className="flex gap-2">
            <input
              className="z-input"
              type="number"
              placeholder="Prix (€)"
              value={form.price}
              onChange={e => setForm(f => ({ ...f, price: e.target.value }))}
              onKeyDown={e => e.key === 'Enter' && addAlert()}
            />
            <Button onClick={addAlert} size="md" className="flex-shrink-0">
              <Plus size={16} />
            </Button>
          </div>
        </div>
        {error && (
          <p className="font-mono text-[11px] mt-2" style={{ color: '#ef4444' }}>{error}</p>
        )}

        {/* Example suggestions */}
        <div className="mt-4 flex flex-wrap gap-2">
          <span className="font-mono text-[10px] uppercase tracking-widest" style={{ color: 'var(--muted)' }}>
            Suggestions :
          </span>
          {[
            { product: 'RTX 4080 Super', price: 650 },
            { product: 'PS5 Slim', price: 280 },
            { product: 'Ryzen 9 7950X', price: 300 },
          ].map(s => (
            <button
              key={s.product}
              className="font-mono text-[10px] px-3 py-1 rounded-sm border transition-colors"
              style={{ borderColor: 'var(--border)', color: 'var(--blue)', background: 'var(--blue-dim)' }}
              onClick={() => setForm({ product: s.product, condition: 'below', price: String(s.price) })}
            >
              {s.product} &lt; {s.price} €
            </button>
          ))}
        </div>
      </Card>

      {/* Active alerts */}
      {active.length > 0 && (
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <SectionLabel>Alertes actives</SectionLabel>
            <span
              className="font-mono text-[10px] px-2 py-0.5 rounded-sm"
              style={{ background: 'var(--blue-dim)', color: 'var(--blue)' }}
            >
              {active.length}
            </span>
          </div>
          <div className="space-y-2">
            {active.map(alert => (
              <AlertRow
                key={alert.id}
                alert={alert}
                onToggle={() => toggleAlert(alert.id)}
                onDelete={() => deleteAlert(alert.id)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Inactive alerts */}
      {inactive.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-3">
            <SectionLabel>Alertes désactivées</SectionLabel>
          </div>
          <div className="space-y-2 opacity-60">
            {inactive.map(alert => (
              <AlertRow
                key={alert.id}
                alert={alert}
                onToggle={() => toggleAlert(alert.id)}
                onDelete={() => deleteAlert(alert.id)}
              />
            ))}
          </div>
        </div>
      )}

      {alerts.length === 0 && (
        <Card className="p-12 flex flex-col items-center justify-center text-center">
          <Bell size={32} style={{ color: 'var(--muted)' }} className="mb-3" />
          <p className="font-display font-bold mb-1">Aucune alerte configurée</p>
          <p className="text-sm" style={{ color: 'var(--muted)' }}>
            Créez votre première alerte en utilisant le formulaire ci-dessus.
          </p>
        </Card>
      )}

      {/* Info banner */}
      <div
        className="mt-8 rounded-sm p-4 flex items-start gap-3"
        style={{ background: 'var(--blue-dim)', border: '1px solid var(--border)' }}
      >
        <Bell size={16} style={{ color: 'var(--blue)', flexShrink: 0, marginTop: 2 }} />
        <div>
          <p className="font-display font-bold text-sm mb-0.5">Notifications en temps réel</p>
          <p className="text-sm" style={{ color: 'var(--muted)' }}>
            Les alertes Premium sont vérifiées toutes les heures et envoyées par email et notification push. Le plan gratuit vérifie une fois par jour.
          </p>
        </div>
        <Badge>Premium</Badge>
      </div>
    </div>
  )
}

function AlertRow({
  alert,
  onToggle,
  onDelete,
}: {
  alert: Alert
  onToggle: () => void
  onDelete: () => void
}) {
  return (
    <div
      className="card p-4 flex items-center gap-4"
      style={alert.active ? {} : { opacity: 0.7 }}
    >
      <button
        onClick={onToggle}
        className="flex-shrink-0 transition-colors"
        title={alert.active ? 'Désactiver' : 'Activer'}
      >
        {alert.active ? (
          <Bell size={18} style={{ color: 'var(--blue)' }} />
        ) : (
          <BellOff size={18} style={{ color: 'var(--muted)' }} />
        )}
      </button>

      <div className="flex-1 min-w-0">
        <p className="font-display font-bold text-sm">{alert.product}</p>
        <p className="font-mono text-[11px] mt-0.5" style={{ color: 'var(--muted)' }}>
          {alert.condition === 'below' ? 'Prévenir quand le prix passe sous' : 'Prévenir quand le prix dépasse'}{' '}
          <span style={{ color: 'var(--blue)' }}>{formatEur(alert.targetPrice)}</span>
        </p>
      </div>

      <div className="text-right flex-shrink-0">
        <Badge variant={alert.active ? 'default' : 'warning'}>
          {alert.active ? 'Active' : 'Pausée'}
        </Badge>
        <p className="font-mono text-[10px] mt-1" style={{ color: 'var(--muted)' }}>
          {new Date(alert.createdAt).toLocaleDateString('fr-FR')}
        </p>
      </div>

      <button
        onClick={onDelete}
        className="flex-shrink-0 transition-opacity hover:opacity-100 opacity-40"
        title="Supprimer"
      >
        <Trash2 size={15} style={{ color: '#ef4444' }} />
      </button>
    </div>
  )
}
