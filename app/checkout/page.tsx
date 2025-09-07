'use client'

import { useState } from 'react'
import { useCart } from '@/lib/cart'
import { useAuth } from '@/lib/auth'
import { formatEUR } from '@/lib/currency'
import { useRouter } from 'next/navigation'
import { loadStripe } from '@stripe/stripe-js'
import { Elements, PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '')

type PayloadItem = { id: string; title: string; price: number; qty: number }

export default function CheckoutPage() {
  const { items, total, clear } = useCart()
  const { user } = useAuth()
  const router = useRouter()

  // État levé AU NIVEAU PARENT pour pouvoir passer clientSecret à <Elements>
  const [clientSecret, setClientSecret] = useState<string | null>(null)
  const [orderNumber, setOrderNumber] = useState<string | null>(null)
  const [creating, setCreating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  if (!user) return <div className="card p-6 text-white/70">Redirection vers la connexion…</div>
  if (items.length === 0) return <div className="card p-6 text-white/70">Votre panier est vide.</div>

  // 1) Formulaire adresse → crée PaymentIntent + Order, puis setClientSecret
  async function createIntent(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    setCreating(true)
    const fd = new FormData(e.currentTarget)
    const address = `${fd.get('address')} ${fd.get('zip')} ${fd.get('city')}`.trim()

    const res = await fetch('/api/payments/create-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        items: items.map(({ product, qty }) => ({ id: product.id, title: product.title, price: product.price, qty })),
        email: String(fd.get('email') || user.email),
        pseudo: user.pseudo,
        shippingAddress: address,
      }),
    })

    const text = await res.text()
    let data: any = null
    try { data = JSON.parse(text) } catch { setError('Erreur serveur (non-JSON)'); setCreating(false); return }

    if (!res.ok || !data?.clientSecret) {
      setError(data?.error || 'Erreur côté serveur')
      setCreating(false)
      return
    }
    setClientSecret(data.clientSecret)
    setOrderNumber(data.number)
    setCreating(false)
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr,360px] gap-6">
      <div className="card p-4 space-y-4">
        <h1 className="text-2xl font-bold">Adresse & paiement</h1>

        {!clientSecret ? (
          <form onSubmit={createIntent} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><label>Prénom</label><input className="input" required name="firstName" /></div>
            <div><label>Nom</label><input className="input" required name="lastName" /></div>
            <div className="md:col-span-2"><label>Adresse</label><input className="input" required name="address" /></div>
            <div><label>Ville</label><input className="input" required name="city" /></div>
            <div><label>Code postal</label><input className="input" required name="zip" /></div>
            <div className="md:col-span-2"><label>Email</label><input type="email" className="input" required name="email" defaultValue={user.email} /></div>
            {error && <p className="text-red-400 text-sm md:col-span-2">{error}</p>}
            <div className="md:col-span-2">
              <button className="btn btn-primary" disabled={creating}>
                {creating ? 'Création du paiement…' : 'Continuer vers le paiement'}
              </button>
            </div>
          </form>
        ) : (
          // 2) Une fois clientSecret dispo → on MONTE Elements avec options={{ clientSecret }}
          <Elements
            stripe={stripePromise}
            options={{ clientSecret, appearance: { theme: 'night' as const } }}
          >
            <CardPayment
              onSuccess={() => { clear(); router.push(`/checkout/success?number=${orderNumber}`) }}
            />
          </Elements>
        )}

        <p className="text-white/60 text-sm">
          Paiement sécurisé par Stripe. Les informations de carte ne passent pas par nos serveurs.
        </p>
      </div>

      <div className="card p-4 space-y-3 h-max">
        <h2 className="font-semibold">Récapitulatif</h2>
        <div className="divide-y divide-white/10">
          {items.map(({ product, qty }) => (
            <div key={product.id} className="py-3 flex items-center justify-between">
              <span className="text-white/80">{product.title} × {qty}</span>
              <span className="font-medium">{formatEUR(product.price * qty)}</span>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between pt-2">
          <span className="text-white/70">Total</span>
          <span className="text-xl font-semibold">{formatEUR(total)}</span>
        </div>
      </div>
    </div>
  )
}

function CardPayment({ onSuccess }: { onSuccess: () => void }) {
  const stripe = useStripe()
  const elements = useElements()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function pay(e: React.FormEvent) {
    e.preventDefault()
    if (!stripe || !elements) return
    setLoading(true); setError(null)

    const { error: err } = await stripe.confirmPayment({
      elements,
      redirect: 'if_required', // on reste dans la page si pas besoin de redirection 3DS
    })
    if (err) {
      setError(err.message || 'Paiement refusé'); setLoading(false); return
    }
    onSuccess()
  }

  return (
    <form onSubmit={pay} className="space-y-3">
      <PaymentElement />
      {error && <p className="text-red-400 text-sm">{error}</p>}
      <button className="btn btn-primary" disabled={!stripe || loading}>
        {loading ? 'Traitement…' : 'Payer'}
      </button>
    </form>
  )
}
