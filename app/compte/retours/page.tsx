'use client'
import { useSearchParams } from 'next/navigation'
import { useState } from 'react'
export default function ReturnsPage(){
  const params=useSearchParams(); const number=params.get('number')||''; const [reason,setReason]=useState('')
  async function submit(e:React.FormEvent){ e.preventDefault(); const r=await fetch('/api/returns',{method:'POST',headers:{'Content-Type':'application/json'}, body: JSON.stringify({number,reason})}); if(r.ok){ alert('Demande envoyée'); (e.target as HTMLFormElement).reset() } else alert('Erreur') }
  return (<div className="max-w-lg space-y-4"><h1 className="text-2xl font-bold">Demande de retour (RMA)</h1>
    <form onSubmit={submit} className="card p-4 space-y-3">
      <input className="input" placeholder="Numéro de commande" defaultValue={number}/>
      <textarea className="input" placeholder="Motif du retour" value={reason} onChange={e=>setReason(e.target.value)}/>
      <button className="btn btn-primary">Envoyer</button>
    </form></div>)
}
