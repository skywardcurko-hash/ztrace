import { NextRequest, NextResponse } from 'next/server'

function getIP(req: NextRequest): string {
  const forwarded = req.headers.get('x-forwarded-for')
  const real = req.headers.get('x-real-ip')
  if (forwarded) return forwarded.split(',')[0].trim()
  if (real) return real.trim()
  return 'unknown'
}

export async function GET(req: NextRequest) {
  return NextResponse.json({ ip: getIP(req) })
}