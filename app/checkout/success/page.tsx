import Link from 'next/link'
import { prisma } from '@/lib/db'

export const dynamic = 'force-dynamic'

export default async function Success({ searchParams }: { searchParams: { number?: string } }) {
  const number = searchParams.number
  const order = number ? await prisma.order.findUnique({ where: { number } }) : null
  return (
    <div className="card p-8 space-y-4 text-center max-w-xl mx-auto">
      <h1 className="text-2xl font-bold">Merci pour votre commande 🎉</h1>
      {order ? (
        <>
          <p className="text-white/70">Commande : <span className="font-mono">{order.number}</span></p>
          <p className="text-white/70">Statut : <span className="badge">{order.status}</span></p>
          <div className="flex gap-2 justify-center">
            <Link href={`/api/orders/${order.number}/invoice`} className="btn btn-outline">Télécharger la facture</Link>
            <Link href="/compte/commandes" className="btn btn-primary">Mes commandes</Link>
          </div>
        </>
      ) : (
        <p className="text-white/70">Commande introuvable.</p>
      )}
    </div>
  )
}
