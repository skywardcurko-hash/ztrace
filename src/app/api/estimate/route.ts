import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'
import { createClient } from '@supabase/supabase-js'

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SECRET_KEY!
)

const MAX_FREE_ESTIMATES = 5

function getIP(req: NextRequest): string {
  const forwarded = req.headers.get('x-forwarded-for')
  const real = req.headers.get('x-real-ip')
  if (forwarded) return forwarded.split(',')[0].trim()
  if (real) return real.trim()
  return 'unknown'
}

export async function POST(req: NextRequest) {
  try {
    const ip = getIP(req)

    // Vérifie et incrémente le compteur
    const { data: existing } = await supabase
      .from('usage_limits')
      .select('*')
      .eq('ip_address', ip)
      .single()

    if (existing) {
      if (existing.estimate_count >= MAX_FREE_ESTIMATES) {
        return NextResponse.json(
          { error: 'LIMIT_REACHED', count: existing.estimate_count },
          { status: 429 }
        )
      }
      await supabase
        .from('usage_limits')
        .update({
          estimate_count: existing.estimate_count + 1,
          last_used_at: new Date().toISOString(),
        })
        .eq('ip_address', ip)
    } else {
      await supabase
        .from('usage_limits')
        .insert({ ip_address: ip, estimate_count: 1 })
    }

    const body = await req.json()
    const { product, brand, category, basePrice, condition, purchaseDate, warranty, accessories } = body

    const conditionMap: Record<string, string> = {
      new: 'comme neuf',
      vgood: 'très bon état',
      good: 'bon état',
      fair: 'état correct',
    }

    const prompt = `Tu es un expert en revente de matériel gaming et électronique d'occasion en France.

Produit : ${product} (${brand}) — catégorie : ${category}
Prix neuf indicatif : ${basePrice}€
État : ${conditionMap[condition] || condition}
Date d'achat : ${purchaseDate || 'non renseignée'}
Garantie restante : ${warranty}
Accessoires inclus : ${accessories}

Réponds UNIQUEMENT en JSON valide avec cette structure exacte :
{
  "minPrice": number,
  "midPrice": number,
  "maxPrice": number,
  "demand": number (0-100),
  "demandLabel": string ("Très faible" | "Faible" | "Moyenne" | "Forte" | "Très forte"),
  "saleSpeed": string (ex: "2-4 jours"),
  "confidence": number (0-100),
  "ztraceScore": number (0-100),
  "tips": string[] (3 conseils pour maximiser la vente)
}`

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
      response_format: { type: 'json_object' },
      max_tokens: 500,
    })

    const result = JSON.parse(completion.choices[0].message.content || '{}')
    return NextResponse.json(result)

  } catch (err: unknown) {
    console.error('Estimate error:', err)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}