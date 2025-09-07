'use client'
import { useCart } from '@/lib/cart'
import { formatEUR } from '@/lib/currency'
import Link from 'next/link'

export default function CartPage() {
  const { items, total, removeItem, clear } = useCart()
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Panier</h1>
      {items.length === 0 ? (
        <div className="card p-6">
          <p className="text-white/70">Votre panier est vide.</p>
          <Link href="/produits" className="btn btn-primary mt-4 inline-block">Continuer mes achats</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-[1fr,360px] gap-6">
          <div className="card p-4 divide-y divide-white/10">
            {items.map(({ product, qty }) => (
              <div key={product.id} className="py-4 flex items-center gap-4">
                <img src={product.image} alt={product.title} className="w-20 h-20 rounded-md object-cover"/>
                <div className="flex-1">
                  <p className="font-medium">{product.title}</p>
                  <p className="text-sm text-white/60">{product.brand}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">{formatEUR(product.price)}</p>
                  <p className="text-sm text-white/60">Qté: {qty}</p>
                </div>
                <button onClick={() => removeItem(product.id)} className="btn btn-outline ml-2">Retirer</button>
              </div>
            ))}
          </div>
          <div className="card p-4 space-y-3 h-max">
            <div className="flex items-center justify-between">
              <span className="text-white/70">Total</span>
              <span className="text-2xl font-semibold">{formatEUR(total)}</span>
            </div>
            <Link href="/checkout" className="btn btn-primary w-full text-center">Passer commande</Link>
            <button onClick={clear} className="btn btn-outline w-full">Vider le panier</button>
          </div>
        </div>
      )}
    </div>
  )
}
