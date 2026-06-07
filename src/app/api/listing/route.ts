import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { product, brand, condition, price, details } = await req.json()

    if (!product || !condition) {
      return NextResponse.json({ error: 'Produit et état requis.' }, { status: 400 })
    }

    const prompt = `Tu es un expert en rédaction d'annonces de revente de matériel gaming et électronique en France. Tu écris des annonces qui se vendent rapidement grâce à un titre accrocheur, une description claire et des arguments de vente percutants.

Génère une annonce optimisée pour ce produit :

- Produit : ${product}
- Marque : ${brand || 'Non précisée'}
- État : ${condition}
- Prix : ${price ? price + ' €' : 'Non précisé'}
- Détails supplémentaires : ${details || 'Aucun'}

Réponds UNIQUEMENT avec un objet JSON valide, sans aucun texte avant ou après :
{
  "title": <titre d'annonce accrocheur, max 60 caractères, inclut le produit + état + point fort>,
  "description": <description professionnelle de 150-200 mots, naturelle, rassurante, avec les arguments clés>,
  "tags": [<6 à 8 tags SEO pertinents pour le référencement sur LeBonCoin/Vinted>],
  "sellingPoints": [<4 arguments de vente courts et percutants>],
  "publishingTips": [<3 conseils pour maximiser la visibilité de l'annonce (moment de publication, photos, etc.)>]
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
        temperature: 0.6,
        max_tokens: 800,
      }),
    })

    if (!response.ok) {
      return NextResponse.json({ error: 'Erreur OpenAI.' }, { status: 500 })
    }

    const data = await response.json()
    const content = data.choices[0].message.content.trim()
    const clean = content.replace(/```json|```/g, '').trim()
    const result = JSON.parse(clean)

    return NextResponse.json(result)
  } catch (err) {
    console.error('Listing error:', err)
    return NextResponse.json({ error: 'Erreur serveur.' }, { status: 500 })
  }
}
