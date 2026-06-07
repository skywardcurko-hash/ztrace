import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { text } = await req.json()

    if (!text || text.trim().length < 20) {
      return NextResponse.json({ error: 'Texte trop court.' }, { status: 400 })
    }

    const prompt = `Tu es un expert en analyse d'annonces de revente de matériel gaming et électronique d'occasion en France.

Analyse cette annonce de revente :

---
${text}
---

Évalue l'annonce sur plusieurs critères : cohérence du prix par rapport au marché français actuel, qualité de la description, points suspects, signaux de confiance, présence d'informations importantes.

Réponds UNIQUEMENT avec un objet JSON valide, sans aucun texte avant ou après, avec exactement cette structure :
{
  "score": <nombre entier entre 0 et 100>,
  "priceAssessment": <"underpriced" | "fair" | "overpriced">,
  "priceDiff": <nombre entier représentant le % d'écart par rapport au prix marché, négatif si sous-évalué>,
  "verdict": <string court résumant l'annonce en une phrase>,
  "issues": [
    {
      "type": <"error" | "warning" | "info">,
      "label": <titre court du point>,
      "detail": <explication en 1-2 phrases>
    }
  ],
  "improvements": [<5 conseils précis pour améliorer l'annonce>]
}

Les "issues" doivent contenir entre 3 et 6 points. Sois précis et factuel.`

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
    console.error('Scan error:', err)
    return NextResponse.json({ error: 'Erreur serveur.' }, { status: 500 })
  }
}
