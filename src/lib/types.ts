// ============================================================
// ZTRACE — Types & Constants
// ============================================================

export interface Product {
  id: string
  name: string
  brand: string
  category: ProductCategory
  image?: string
  priceHistory: PricePoint[]
  currentPrice: number
  demand: number // 0–100
  trend: 'up' | 'down' | 'stable'
  trendPercent: number
}

export type ProductCategory =
  | 'gpu'
  | 'console'
  | 'pc'
  | 'monitor'
  | 'accessory'
  | 'cpu'
  | 'laptop'

export interface PricePoint {
  date: string
  price: number
  volume?: number
}

export interface EstimationResult {
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

export interface ScanResult {
  score: number
  priceAssessment: 'underpriced' | 'fair' | 'overpriced'
  priceDiff: number
  issues: ScanIssue[]
  improvements: string[]
  verdict: string
}

export interface ScanIssue {
  type: 'warning' | 'error' | 'info'
  label: string
  detail: string
}

export interface Alert {
  id: string
  product: string
  condition: 'below' | 'above'
  targetPrice: number
  active: boolean
  createdAt: string
}

export interface UserStats {
  estimationsToday: number
  estimationsLimit: number
  totalEstimations: number
  savedAmount: number
  plan: 'free' | 'premium'
}

// ============================================================
// Mock data
// ============================================================

export const MOCK_PRICE_HISTORY: PricePoint[] = [
  { date: 'Jan', price: 520 },
  { date: 'Fév', price: 495 },
  { date: 'Mar', price: 480 },
  { date: 'Avr', price: 510 },
  { date: 'Mai', price: 465 },
  { date: 'Jun', price: 450 },
  { date: 'Jul', price: 440 },
  { date: 'Aoû', price: 455 },
  { date: 'Sep', price: 430 },
  { date: 'Oct', price: 415 },
  { date: 'Nov', price: 420 },
  { date: 'Déc', price: 410 },
]

export const MARKET_PRODUCTS: Product[] = [
  {
    id: 'rtx4070',
    name: 'RTX 4070',
    brand: 'NVIDIA',
    category: 'gpu',
    priceHistory: MOCK_PRICE_HISTORY,
    currentPrice: 410,
    demand: 82,
    trend: 'down',
    trendPercent: 3.2,
  },
  {
    id: 'rtx4080',
    name: 'RTX 4080 Super',
    brand: 'NVIDIA',
    category: 'gpu',
    priceHistory: MOCK_PRICE_HISTORY.map(p => ({ ...p, price: p.price * 1.6 })),
    currentPrice: 720,
    demand: 74,
    trend: 'down',
    trendPercent: 1.8,
  },
  {
    id: 'rtx3080',
    name: 'RTX 3080',
    brand: 'NVIDIA',
    category: 'gpu',
    priceHistory: MOCK_PRICE_HISTORY.map(p => ({ ...p, price: p.price * 0.75 })),
    currentPrice: 310,
    demand: 58,
    trend: 'down',
    trendPercent: 5.1,
  },
  {
    id: 'ps5',
    name: 'PlayStation 5',
    brand: 'Sony',
    category: 'console',
    priceHistory: MOCK_PRICE_HISTORY.map(p => ({ ...p, price: Math.round(290 + Math.random() * 40) })),
    currentPrice: 320,
    demand: 88,
    trend: 'stable',
    trendPercent: 0.4,
  },
  {
    id: 'rx7900xt',
    name: 'RX 7900 XT',
    brand: 'AMD',
    category: 'gpu',
    priceHistory: MOCK_PRICE_HISTORY.map(p => ({ ...p, price: p.price * 1.3 })),
    currentPrice: 560,
    demand: 61,
    trend: 'down',
    trendPercent: 2.3,
  },
  {
    id: 'xboxsx',
    name: 'Xbox Series X',
    brand: 'Microsoft',
    category: 'console',
    priceHistory: MOCK_PRICE_HISTORY.map(p => ({ ...p, price: Math.round(280 + Math.random() * 30) })),
    currentPrice: 295,
    demand: 55,
    trend: 'stable',
    trendPercent: 0.9,
  },
  {
    id: 'i9-14900k',
    name: 'Core i9-14900K',
    brand: 'Intel',
    category: 'cpu',
    priceHistory: MOCK_PRICE_HISTORY.map(p => ({ ...p, price: p.price * 0.9 })),
    currentPrice: 380,
    demand: 67,
    trend: 'down',
    trendPercent: 4.0,
  },
  {
    id: 'r9-7950x',
    name: 'Ryzen 9 7950X',
    brand: 'AMD',
    category: 'cpu',
    priceHistory: MOCK_PRICE_HISTORY.map(p => ({ ...p, price: p.price * 0.85 })),
    currentPrice: 350,
    demand: 71,
    trend: 'down',
    trendPercent: 3.5,
  },
]

export const CATEGORY_LABELS: Record<ProductCategory, string> = {
  gpu: 'Carte graphique',
  console: 'Console',
  pc: 'PC Gaming',
  monitor: 'Écran',
  accessory: 'Accessoire',
  cpu: 'Processeur',
  laptop: 'Laptop Gaming',
}

export const CONDITION_OPTIONS = [
  { value: 'new', label: 'Comme neuf', modifier: 1.12 },
  { value: 'vgood', label: 'Très bon état', modifier: 1.0 },
  { value: 'good', label: 'Bon état', modifier: 0.87 },
  { value: 'fair', label: 'Correct', modifier: 0.72 },
]

export const WARRANTY_OPTIONS = [
  { value: 'none', label: 'Aucune garantie', modifier: 1.0 },
  { value: '3m', label: '3 mois', modifier: 1.02 },
  { value: '6m', label: '6 mois', modifier: 1.05 },
  { value: '1y', label: '1 an', modifier: 1.09 },
  { value: '2y', label: '2 ans', modifier: 1.15 },
]

export const ACCESSORY_OPTIONS = [
  { value: 'none', label: 'Aucun accessoire', modifier: 1.0 },
  { value: 'box', label: 'Boîte originale', modifier: 1.04 },
  { value: 'cables', label: 'Câbles inclus', modifier: 1.02 },
  { value: 'full', label: 'Complet (boîte + accessoires)', modifier: 1.08 },
]

// ============================================================
// Utility functions
// ============================================================

export function formatEur(value: number): string {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(value)
}

export function getDemandLabel(demand: number): string {
  if (demand >= 80) return 'Très forte demande'
  if (demand >= 65) return 'Forte demande'
  if (demand >= 45) return 'Demande modérée'
  return 'Faible demande'
}

export function getSaleSpeed(demand: number): string {
  if (demand >= 80) return '< 24h'
  if (demand >= 65) return '2–5 jours'
  if (demand >= 45) return '1–2 semaines'
  return '2–4 semaines'
}

export function computeEstimation(
  basePrice: number,
  conditionModifier: number,
  warrantyModifier: number,
  accessoryModifier: number,
  demand: number
): EstimationResult {
  const adjusted = Math.round(basePrice * conditionModifier * warrantyModifier * accessoryModifier)
  const minPrice = Math.round(adjusted * 0.88)
  const maxPrice = Math.round(adjusted * 1.12)
  const confidence = Math.min(95, 70 + Math.round(demand * 0.3))
  const ztraceScore = Math.min(99, Math.round((demand * 0.5) + (confidence * 0.3) + (conditionModifier * 15)))

  return {
    minPrice,
    midPrice: adjusted,
    maxPrice,
    demand,
    demandLabel: getDemandLabel(demand),
    saleSpeed: getSaleSpeed(demand),
    confidence,
    ztraceScore,
    tips: [
      conditionModifier < 1 ? 'Nettoyez soigneusement le produit avant la vente.' : 'Excellent état — mettez-le en avant dans l\'annonce.',
      warrantyModifier > 1 ? 'Mentionnez la garantie restante dans le titre.' : 'Sans garantie, justifiez le prix par l\'état du produit.',
      demand >= 70 ? 'Forte demande — publiez le soir entre 19h et 21h pour maximiser la visibilité.' : 'Demande modérée — privilégiez le week-end pour publier.',
    ],
  }
}
