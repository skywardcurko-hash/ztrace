import type { Metadata } from 'next'
import '@/styles/globals.css'
import { Navbar } from '@/components/layout/Navbar'

export const metadata: Metadata = {
  title: 'Ztrace — Analyse. Estime. Revends intelligemment.',
  description: 'La plateforme IA de référence européenne pour estimer, analyser et optimiser la vente de matériel gaming et électronique d\'occasion.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body>
        <div className="scanline" aria-hidden="true" />
        <div
          className="fixed inset-0 bg-grid pointer-events-none z-0"
          aria-hidden="true"
        />
        <Navbar />
        <main className="relative z-10 min-h-screen">
          {children}
        </main>
      </body>
    </html>
  )
}
