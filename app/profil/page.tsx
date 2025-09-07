'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth'

type UserRec = { email: string; pseudo: string; password: string }

// petit helper local pour hasher comme dans lib/auth.tsx
async function sha256(s: string) {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(s))
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('')
}

export default function ProfilPage() {
  const { user, logout } = useAuth()
  const router = useRouter()

  // redirige si non connecté
  useEffect(() => {
    if (!user) router.replace('/login?next=' + encodeURIComponent('/profil'))
  }, [user, router])

  const [pseudo, setPseudo] = useState(user?.pseudo ?? '')
  const [status, setStatus] = useState<string>('')

  // change pseudo (met à jour users[] + session)
  async function savePseudo() {
    if (!user) return
    const users: UserRec[] = JSON.parse(localStorage.getItem('users') || '[]')
    const idx = users.findIndex(u => u.email === user.email)
    if (idx < 0) return setStatus('Utilisateur introuvable.')
    users[idx].pseudo = pseudo.trim() || users[idx].pseudo
    localStorage.setItem('users', JSON.stringify(users))
    localStorage.setItem('session', JSON.stringify({ email: user.email, pseudo: users[idx].pseudo }))
    setStatus('Pseudo mis à jour ✅')
    setTimeout(() => location.reload(), 600) // recharge pour maj du contexte
  }

  // change mot de passe (vérifie l’ancien)
  async function changePassword(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!user) return
    const form = new FormData(e.currentTarget)
    const oldp = String(form.get('old') || '')
    const newp = String(form.get('new') || '')
    const users: UserRec[] = JSON.parse(localStorage.getItem('users') || '[]')
    const idx = users.findIndex(u => u.email === user.email)
    if (idx < 0) return setStatus('Utilisateur introuvable.')
    const ok = users[idx].password === await sha256(oldp)
    if (!ok) return setStatus('Ancien mot de passe incorrect ❌')
    users[idx].password = await sha256(newp)
    localStorage.setItem('users', JSON.stringify(users))
    setStatus('Mot de passe modifié ✅')
    e.currentTarget.reset()
  }

  // supprimer le compte (retire users[] + session)
  function deleteAccount() {
    if (!user) return
    if (!confirm('Supprimer définitivement votre compte ?')) return
    const users: UserRec[] = JSON.parse(localStorage.getItem('users') || '[]')
    const left = users.filter(u => u.email !== user.email)
    localStorage.setItem('users', JSON.stringify(left))
    localStorage.removeItem('session')
    router.replace('/')
    setTimeout(() => location.reload(), 100)
  }

  if (!user) {
    return <div className="card p-6 text-white/70">Redirection vers la connexion…</div>
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Mon profil</h1>

      <div className="card p-4 space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <div className="text-white/60 text-sm">Email</div>
            <div className="font-medium">{user.email}</div>
          </div>
          <div>
            <div className="text-white/60 text-sm">Pseudo</div>
            <div className="flex gap-2">
              <input className="input flex-1" value={pseudo} onChange={e=>setPseudo(e.target.value)} />
              <button className="btn btn-primary" onClick={savePseudo}>Enregistrer</button>
            </div>
          </div>
        </div>
        {status && <p className="text-sm text-white/70">{status}</p>}
      </div>

      <div className="card p-4 space-y-3">
        <h2 className="font-semibold">Changer le mot de passe</h2>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-3" onSubmit={changePassword}>
          <input className="input" type="password" name="old" placeholder="Ancien mot de passe" required />
          <input className="input" type="password" name="new" placeholder="Nouveau mot de passe" required />
          <div className="md:col-span-2">
            <button className="btn btn-primary">Mettre à jour</button>
          </div>
        </form>
      </div>

      <div className="card p-4 flex items-center justify-between">
        <button className="btn btn-outline" onClick={logout}>Se déconnecter</button>
        <button className="btn btn-outline" onClick={deleteAccount}>Supprimer mon compte</button>
      </div>
    </div>
  )
}
