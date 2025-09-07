'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

type User = { email: string; pseudo?: string }

export default function ComptePage() {
  const [user, setUser] = useState<User | null>(null)
  const router = useRouter()

  useEffect(() => {
    try {
      const raw = localStorage.getItem('pcinside:user')
      setUser(raw ? JSON.parse(raw) : null)
    } catch {
      setUser(null)
    }
  }, [])

  const logout = () => {
    localStorage.removeItem('pcinside:user')
    localStorage.removeItem('pcinside:token')
    window.dispatchEvent(new Event('pcinside:auth'))
    router.push('/')
  }

  if (!user) {
    return (
      <div className="card p-6 max-w-lg mx-auto space-y-3">
        <h1 className="text-2xl font-bold">Mon compte</h1>
        <p className="text-white/70">Vous devez être connecté.</p>
        <div className="flex gap-2">
          <Link href="/login" className="btn btn-primary">Se connecter</Link>
          <Link href="/register" className="btn btn-outline">Créer un compte</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="grid gap-6 max-w-4xl mx-auto">
      <div className="card p-6">
        <h1 className="text-2xl font-bold mb-2">Bonjour {user.pseudo || user.email} 👋</h1>
        <p className="text-white/70">Email : <span className="font-mono">{user.email}</span></p>
        {user.pseudo && <p className="text-white/70">Pseudo : <span className="font-mono">{user.pseudo}</span></p>}
        <div className="mt-4 flex gap-2">
          <Link href="/compte/commandes" className="btn btn-outline">Mes commandes</Link>
          <Link href="/compte/retours" className="btn btn-outline">Retours (RMA)</Link>
          <button onClick={logout} className="btn btn-primary">Se déconnecter</button>
        </div>
      </div>

      <div className="card p-6">
        <h2 className="text-xl font-semibold mb-2">Adresses (bientôt)</h2>
        <p className="text-white/60 text-sm">Tu pourras ajouter des adresses de livraison/facturation ici.</p>
      </div>

      <div className="card p-6">
        <h2 className="text-xl font-semibold mb-2">Newsletter (bientôt)</h2>
        <p className="text-white/60 text-sm">Préférences d’abonnement à venir.</p>
      </div>
    </div>
  )
}
