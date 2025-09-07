import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'
import { AuthProvider } from '@/lib/auth'
import Footer from '@/components/Footer'
import CookieBanner from '@/components/CookieBanner'
import { CartProvider } from '@/lib/cart'

export const metadata: Metadata = {
  title: 'PCInside — Composants PC au meilleur prix',
  description: 'Boutique démo de composants PC + configurateur simple.',
  metadataBase: new URL('http://localhost:3000')
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <AuthProvider>
        <CartProvider>
          <Navbar />
          <main className="container my-8">{children}</main>
          <Footer />
        </CartProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
