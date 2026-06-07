import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { product, brand, condition, purchaseDate, warranty, accessories } = body

    if (!product || !condition) {
      return NextResponse.json({ error: 'Produit et état requis.' }, { status: 400 })
    }

    const conditionLabels: Record<string, string> = {
      new: 'Comme neuf',
      vgood: 'Très bon état',
      good: 'Bon état',
      fair: 'Correct',
    }
    const warrantyLabels: Record<string, string> = {
      none: 'Aucune garantie',
      '3m': '3 mois de garantie restante',
      '6m': '6 mois de garantie restante',
      '1y': '1 an de garantie restante',
      '2y': '2 ans de garantie restante',
    }
    const accessoryLabels: Record<string, string> = {
      none: 'Aucun accessoire',
      box: 'Boîte originale incluse',
      cables: 'Câbles inclus',
      full: 'Complet (boîte + accessoires)',
    }

    const prompt = `Tu es un expert en estimation de prix pour le marché de la revente de matériel gaming, informatique et électronique d'occasion en France et en Europe.

Un utilisateur veut estimer le prix de revente de son produit. Voici les informations :

- Produit : ${product}
- Marque : ${brand || 'Non précisée'}
- État : ${conditionLabels[condition] || condition}
- Date d'achat : ${purchaseDate || 'Non précisée'}
- Garantie : ${warrantyLabels[warranty] || 'Aucune'}
- Accessoires : ${accessoryLabels[accessories] || 'Aucun'}

Analyse ce produit en te basant sur ta connaissance du marché de l'occasion français (LeBonCoin, Vinted, BackMarket, eBay France).

Réponds UNIQUEMENT avec un objet JSON valide, sans aucun texte avant ou après, avec exactement cette structure :
{
  "minPrice": <nombre entier en euros>,
  "midPrice": <nombre entier en euros>,
  "maxPrice": <nombre entier en euros>,
  "demand": <nombre entier entre 0 et 100>,
  "demandLabel": <"Très forte demande" | "Forte demande" | "Demande modérée" | "Faible demande">,
  "saleSpeed": <"< 24h" | "2–5 jours" | "1–2 semaines" | "2–4 semaines">,
  "confidence": <nombre entier entre 0 et 100>,
  "ztraceScore": <nombre entier entre 0 et 100>,
  "trend": <"up" | "down" | "stable">,
  "trendPercent": <nombre décimal>,
  "tips": [<3 conseils personnalisés en français pour maximiser la vente>]
}`

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.3,
        max_tokens: 600,
      }),
    })

    if (!response.ok) {
      const err = await response.json()
      console.error('OpenAI error:', err)
      return NextResponse.json({ error: 'Erreur OpenAI.' }, { status: 500 })
    }

    const data = await response.json()
    const content = data.choices[0].message.content.trim()

    // Clean potential markdown code blocks
    const clean = content.replace(/```json|```/g, '').trim()
    const result = JSON.parse(clean)

    return NextResponse.json(result)
  } catch (err) {
    console.error('Estimate error:', err)
    return NextResponse.json({ error: 'Erreur serveur.' }, { status: 500 })
  }
}
