# Ztrace — Application Next.js

> Analyse. Estime. Revends intelligemment.

La plateforme IA de référence européenne pour estimer, analyser et optimiser la vente de matériel gaming et électronique d'occasion.

---

## Stack technique

- **Frontend** : Next.js 14 (App Router) + TypeScript
- **Styles** : Tailwind CSS + CSS custom properties
- **Charts** : Recharts
- **Icons** : Lucide React
- **Animations** : Framer Motion (disponible)
- **Fonts** : Syne (display) + Space Mono (mono) + DM Sans (body)

---

## Structure du projet

```
ztrace/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Layout racine + Navbar
│   │   ├── page.tsx            # Landing page
│   │   ├── estimation/
│   │   │   └── page.tsx        # Module d'estimation IA
│   │   ├── scan/
│   │   │   └── page.tsx        # AI Scan d'annonces
│   │   ├── market/
│   │   │   └── page.tsx        # Base de données marché + graphiques
│   │   ├── alerts/
│   │   │   └── page.tsx        # Système d'alertes
│   │   └── dashboard/
│   │       └── page.tsx        # Dashboard utilisateur
│   ├── components/
│   │   ├── layout/
│   │   │   └── Navbar.tsx      # Navigation principale
│   │   └── ui/
│   │       └── index.tsx       # Composants UI réutilisables
│   ├── lib/
│   │   └── types.ts            # Types, constantes, données mock, utils
│   └── styles/
│       └── globals.css         # Variables CSS + styles globaux
├── tailwind.config.ts
├── next.config.ts
├── tsconfig.json
└── package.json
```

---

## Installation

```bash
# Installer les dépendances
npm install

# Lancer en développement
npm run dev

# Build de production
npm run build
npm start
```

Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur.

---

## Pages disponibles

| Route | Description |
|---|---|
| `/` | Landing page avec présentation des fonctionnalités |
| `/estimation` | Formulaire d'estimation IA + rapport complet |
| `/scan` | Analyse d'annonces existantes (score + rapport) |
| `/market` | Base de données marché avec graphiques de prix |
| `/alerts` | Gestion des alertes Deal Alert |
| `/dashboard` | Dashboard utilisateur (stats, historique, favoris) |

---

## Personnalisation

### Design tokens (CSS)

Les couleurs principales sont dans `src/styles/globals.css` :

```css
:root {
  --black: #0D0D0D;
  --dark: #111111;
  --surface: #181818;
  --blue: #00B7FF;        /* Couleur primaire Ztrace */
  --blue-dim: rgba(0, 183, 255, 0.08);
  --border: rgba(0, 183, 255, 0.14);
}
```

### Connecter l'API OpenAI

Remplacez les fonctions de simulation dans `src/lib/types.ts` et les pages par des appels à votre API backend :

```typescript
// src/lib/api.ts
export async function estimateProduct(params: EstimationParams): Promise<EstimationResult> {
  const res = await fetch('/api/estimate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params),
  })
  return res.json()
}
```

### Variables d'environnement

Créez un fichier `.env.local` :

```bash
OPENAI_API_KEY=sk-...
DATABASE_URL=postgresql://...
NEXTAUTH_SECRET=...
NEXTAUTH_URL=http://localhost:3000
```

---

## Prochaines étapes recommandées

1. **Authentification** — Ajouter NextAuth.js avec Google Login + JWT
2. **Base de données** — PostgreSQL avec Prisma ORM
3. **API Routes** — `/api/estimate`, `/api/scan`, `/api/alerts`
4. **OpenAI** — Intégrer GPT-4 pour les estimations et l'analyse d'annonces
5. **Web scraping** — Cronjob pour récupérer les prix réels (LeBonCoin, Vinted, BackMarket)
6. **Notifications** — Nodemailer + push notifications pour les alertes

---

## Composants UI réutilisables

```tsx
import { Card, Button, Badge, MetricCard, ScoreRing, DemandBar } from '@/components/ui'

// Card avec hover
<Card hover accent className="p-5">…</Card>

// Bouton primary / ghost / danger
<Button variant="primary" size="lg">Estimer →</Button>

// Gauge de score circulaire
<ScoreRing score={85} size={120} label="SCORE" />

// Barre de demande
<DemandBar value={82} label="Demande" />

// Badge coloré
<Badge variant="success">Actif</Badge>

// Carte métrique
<MetricCard label="Prix moyen" value="450 €" highlight sub="Marché actuel" />
```

---

**Ztrace** — © 2025 — La référence européenne de l'estimation gaming
