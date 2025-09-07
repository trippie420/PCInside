'use client'
import { useEffect, useState } from 'react'
import { useAuth } from '@/lib/auth'
import Link from 'next/link'
type Order = { number:string, status:string, total:number, createdAt:string }
export default function OrdersPage(){
  const { user } = useAuth()
  const [orders,setOrders]=useState<Order[]>([])
  useEffect(()=>{ if(user){ fetch('/api/me/orders').then(r=>r.json()).then(d=>setOrders(d.orders||[])) } },[user])
  if(!user) return <div className="card p-6 text-white/70">Connectez-vous pour voir vos commandes.</div>
  return (<div className="space-y-4"><h1 className="text-2xl font-bold">Mes commandes</h1>
    {!orders.length ? <div className="card p-4 text-white/70">Aucune commande.</div> :
      <div className="space-y-2">
        {orders.map(o=>(<div key={o.number} className="card p-4 flex items-center justify-between">
          <div><div className="font-medium">Commande {o.number}</div>
          <div className="text-white/60 text-sm">{new Date(o.createdAt).toLocaleString('fr-FR')} • <span className="badge">{o.status}</span></div></div>
          <div className="flex gap-2">
            <Link href={`/api/orders/${o.number}/invoice`} className="btn btn-outline">Facture</Link>
            <Link href={`/compte/retours?number=${o.number}`} className="btn btn-outline">Retour</Link>
          </div>
        </div>))}
      </div>}
  </div>)
}
