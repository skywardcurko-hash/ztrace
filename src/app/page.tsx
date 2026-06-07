import Link from 'next/link'
import { BarChart2, Scan, Database, Bell, Zap, Shield, TrendingUp, ArrowRight } from 'lucide-react'

const FEATURES = [
  {
    icon: BarChart2,
    tag: 'Ztrace Estimation',
    title: 'Estimation IA en temps réel',
    desc: 'Renseignez le produit, son état et ses accessoires. L\'IA calcule instantanément le prix min, moyen et max du marché.',
    href: '/estimation',
    tags: ['Prix min / max', 'Demande marché', 'Vitesse de vente'],
  },
  {
    icon: Scan,
    tag: 'Ztrace AI Scan',
    title: 'Analyse d\'annonces',
    desc: 'Collez n\'importe quelle annonce. L\'IA détecte les incohérences, évalue le prix et génère un rapport avec score sur 100.',
    href: '/scan',
    tags: ['Score /100', 'Points suspects', 'Conseils'],
  },
  {
    icon: Database,
    tag: 'Ztrace Market',
    title: 'Base de données marché',
    desc: 'Historiques de prix, graphiques et tendances sur toutes les catégories : GPU, consoles, CPU, écrans gaming.',
    href: '/market',
    tags: ['Historique', 'Tendances', 'Graphiques'],
  },
  {
    icon: Bell,
    tag: 'Deal Alert',
    title: 'Alertes personnalisées',
    desc: 'Soyez notifié dès qu\'un produit atteint votre prix cible. Configurez une alerte en une phrase.',
    href: '/alerts',
    tags: ['Temps réel', 'Multi-produit', 'Smart'],
  },
]

const STATS = [
  { value: '250K+', label: 'Produits analysés' },
  { value: '98%', label: 'Précision des estimations' },
  { value: '€1.2M', label: 'Économisés par nos users' },
  { value: '12 sec', label: 'Temps moyen d\'analyse' },
]

export default function HomePage() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-16">

      {/* Hero */}
      <section className="text-center mb-20">
        <div
          className="inline-flex items-center gap-2 font-mono text-[10px] tracking-widest uppercase px-4 py-2 rounded-sm border mb-8 animate-fadeUp"
          style={{ color: 'var(--blue)', borderColor: 'var(--border)', background: 'var(--blue-dim)' }}
        >
          <span className="pulse-dot" />
          Référence européenne du resell gaming
        </div>

        <h1
          className="font-display font-black mb-6 animate-fadeUp delay-100"
          style={{ fontSize: 'clamp(44px, 6vw, 80px)', lineHeight: 1.0, letterSpacing: '-2px' }}
        >
          L&apos;IA qui estime la valeur<br />
          réelle de votre{' '}
          <span style={{ color: 'var(--blue)' }}>matériel</span>
        </h1>

        <p
          className="font-mono text-sm mb-10 animate-fadeUp delay-200"
          style={{ color: 'var(--muted)', letterSpacing: '0.5px' }}
        >
          Analyse. Estime. Revends intelligemment.
        </p>

        <div className="flex items-center justify-center gap-4 animate-fadeUp delay-300">
          <Link
            href="/estimation"
            className="btn-glow font-display font-bold px-8 py-4 rounded-sm text-sm"
            style={{ background: 'var(--blue)', color: 'var(--black)' }}
          >
            Estimer un produit →
          </Link>
          <Link
            href="/market"
            className="font-display font-semibold px-8 py-4 rounded-sm text-sm border transition-colors"
            style={{ borderColor: 'rgba(255,255,255,0.1)', color: 'var(--white)' }}
          >
            Explorer le marché
          </Link>
        </div>
      </section>

      {/* Stats */}
      <section
        className="grid grid-cols-2 md:grid-cols-4 mb-20 overflow-hidden rounded-sm border"
        style={{ borderColor: 'var(--border)' }}
      >
        {STATS.map((stat, i) => (
          <div
            key={i}
            className="p-6 text-center"
            style={{
              background: 'var(--surface)',
              borderRight: i < 3 ? '1px solid var(--border)' : 'none',
            }}
          >
            <div
              className="font-display font-black text-3xl mb-1"
              style={{ color: 'var(--blue)', letterSpacing: '-1px' }}
            >
              {stat.value}
            </div>
            <div className="font-mono text-[10px] uppercase tracking-widest" style={{ color: 'var(--muted)' }}>
              {stat.label}
            </div>
          </div>
        ))}
      </section>

      {/* Features */}
      <section className="mb-20">
        <p className="font-mono text-[10px] tracking-widest uppercase mb-2" style={{ color: 'var(--blue)' }}>
          Fonctionnalités
        </p>
        <h2
          className="font-display font-black text-3xl mb-10"
          style={{ letterSpacing: '-0.5px' }}
        >
          Tout ce dont vous avez besoin
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {FEATURES.map(({ icon: Icon, tag, title, desc, href, tags }) => (
            <Link
              key={href}
              href={href}
              className="card card-hover card-accent group relative block p-6"
              style={{ textDecoration: 'none' }}
            >
              <div
                className="w-9 h-9 flex items-center justify-center rounded-sm border mb-4"
                style={{ background: 'var(--blue-dim)', borderColor: 'var(--border)' }}
              >
                <Icon size={16} style={{ color: 'var(--blue)' }} />
              </div>
              <p className="font-mono text-[10px] tracking-widest uppercase mb-1" style={{ color: 'var(--blue)' }}>
                {tag}
              </p>
              <h3 className="font-display font-bold text-lg mb-2" style={{ letterSpacing: '-0.2px' }}>
                {title}
              </h3>
              <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--muted)' }}>
                {desc}
              </p>
              <div className="flex flex-wrap gap-2">
                {tags.map(t => (
                  <span key={t} className="badge">{t}</span>
                ))}
              </div>
              <div
                className="absolute bottom-5 right-5 transition-transform group-hover:translate-x-1"
                style={{ color: 'var(--blue)' }}
              >
                <ArrowRight size={16} />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Ztrace Score highlight */}
      <section
        className="card p-8 mb-20 grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
      >
        <div>
          <p className="font-mono text-[10px] tracking-widest uppercase mb-2" style={{ color: 'var(--blue)' }}>
            Algorithme propriétaire
          </p>
          <h2
            className="font-display font-black text-2xl mb-4"
            style={{ letterSpacing: '-0.3px' }}
          >
            Le Ztrace Score
          </h2>
          <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--muted)' }}>
            Notre algorithme propriétaire analyse en profondeur chaque produit et génère un score unique combinant valeur réelle, potentiel de revente, vitesse de vente estimée et niveau de confiance.
          </p>
          <div className="grid grid-cols-2 gap-3">
            {[
              { icon: TrendingUp, label: 'Valeur réelle' },
              { icon: Zap, label: 'Potentiel revente' },
              { icon: BarChart2, label: 'Vitesse de vente' },
              { icon: Shield, label: 'Niveau de confiance' },
            ].map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-2 text-sm"
                style={{ color: 'var(--muted)' }}
              >
                <Icon size={14} style={{ color: 'var(--blue)', flexShrink: 0 }} />
                {label}
              </div>
            ))}
          </div>
        </div>

        {/* Score SVG */}
        <div className="flex items-center justify-center">
          <div className="relative" style={{ width: 160, height: 160 }}>
            <svg viewBox="0 0 160 160" style={{ transform: 'rotate(-90deg)' }}>
              <circle cx="80" cy="80" r="66" fill="none" stroke="rgba(0,183,255,0.08)" strokeWidth="8" />
              <circle
                cx="80" cy="80" r="66"
                fill="none"
                stroke="var(--blue)"
                strokeWidth="8"
                strokeDasharray="414.7"
                strokeDashoffset="62.2"
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span
                className="font-display font-black"
                style={{ fontSize: 44, color: 'var(--blue)', letterSpacing: '-2px', lineHeight: 1 }}
              >
                85
              </span>
              <span className="font-mono text-[9px] tracking-widest" style={{ color: 'var(--muted)' }}>
                SCORE
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="mb-16">
        <p className="font-mono text-[10px] tracking-widest uppercase mb-2" style={{ color: 'var(--blue)' }}>
          Tarifs
        </p>
        <h2
          className="font-display font-black text-3xl mb-10"
          style={{ letterSpacing: '-0.5px' }}
        >
          Simple et transparent
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
          {/* Free */}
          <div className="card p-6">
            <p className="font-mono text-[10px] uppercase tracking-widest mb-2" style={{ color: 'var(--muted)' }}>
              Gratuit
            </p>
            <p
              className="font-display font-black text-4xl mb-1"
              style={{ letterSpacing: '-1px' }}
            >
              0 €
              <span className="text-sm font-normal" style={{ color: 'var(--muted)', letterSpacing: 0 }}>
                {' '}/ mois
              </span>
            </p>
            <ul className="mt-5 space-y-2.5">
              {['5 estimations par jour', 'Analyse basique des annonces', 'Accès au Ztrace Market'].map(f => (
                <li key={f} className="flex items-center gap-2 text-sm" style={{ color: 'var(--muted)' }}>
                  <span style={{ color: 'var(--blue)' }}>✓</span> {f}
                </li>
              ))}
              {['Alertes avancées', 'Historique complet'].map(f => (
                <li key={f} className="flex items-center gap-2 text-sm opacity-30">
                  <span>×</span> {f}
                </li>
              ))}
            </ul>
            <Link
              href="/estimation"
              className="mt-6 block text-center font-display font-bold text-sm py-3 rounded-sm border transition-colors"
              style={{ borderColor: 'rgba(255,255,255,0.1)', color: 'var(--white)' }}
            >
              Commencer gratuitement
            </Link>
          </div>

          {/* Premium */}
          <div
            className="card p-6 relative"
            style={{ borderColor: 'var(--blue)' }}
          >
            <div
              className="absolute top-0 right-6 font-mono text-[9px] font-bold tracking-widest px-3 py-1 rounded-b-sm"
              style={{ background: 'var(--blue)', color: 'var(--black)' }}
            >
              RECOMMANDÉ
            </div>
            <p className="font-mono text-[10px] uppercase tracking-widest mb-2" style={{ color: 'var(--muted)' }}>
              Premium
            </p>
            <p
              className="font-display font-black text-4xl mb-1"
              style={{ letterSpacing: '-1px' }}
            >
              9.99 €
              <span className="text-sm font-normal" style={{ color: 'var(--muted)', letterSpacing: 0 }}>
                {' '}/ mois
              </span>
            </p>
            <ul className="mt-5 space-y-2.5">
              {[
                'Estimations illimitées',
                'Alertes Deal avancées',
                'Historique complet',
                'Analyses IA détaillées',
                'Accès prioritaire aux nouveautés',
              ].map(f => (
                <li key={f} className="flex items-center gap-2 text-sm" style={{ color: 'var(--muted)' }}>
                  <span style={{ color: 'var(--blue)' }}>✓</span> {f}
                </li>
              ))}
            </ul>
            <button
              className="btn-glow mt-6 w-full font-display font-bold text-sm py-3 rounded-sm"
              style={{ background: 'var(--blue)', color: 'var(--black)', border: 'none' }}
            >
              Passer Premium →
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        className="flex items-center justify-between pt-8 border-t text-sm"
        style={{ borderColor: 'var(--border)' }}
      >
        <span
          className="font-display font-black"
          style={{ letterSpacing: '-0.3px' }}
        >
          Z<span style={{ color: 'var(--blue)' }}>trace</span>
        </span>
        <span className="font-mono text-[10px] tracking-widest" style={{ color: 'var(--muted)' }}>
          © 2025 ZTRACE — LA RÉFÉRENCE EUROPÉENNE
        </span>
      </footer>
    </div>
  )
}
