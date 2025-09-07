'use client'
import { useState } from 'react'
import { useAuth } from '@/lib/auth'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'

type AuthUser = { email: string; pseudo?: string; [k: string]: any }

export default function LoginPage() {
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()
  const params = useSearchParams()
  const next = params.get('next') || '/'

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    // Le login() peut renvoyer true/false ou un objet user.
    const res = await login(email.trim(), password)
    const success = !!res

    if (!success) {
      setError('Email ou mot de passe incorrect')
      return
    }

    // Récupère le user retourné si dispo, sinon crée un objet basique
    const user: AuthUser =
      typeof res === 'object' && res !== null
        ? (res as AuthUser)
        : { email: email.trim() }

    // Persiste en localStorage pour la Navbar
    try {
      localStorage.setItem('pcinside:user', JSON.stringify(user))
      // Si tu gères un token côté login(), mets-le ici si dispo
      // localStorage.setItem('pcinside:token', user.token || '1')
    } catch {}

    // Notifie la Navbar qu'on est connecté
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('pcinside:auth'))
    }

    router.push(next)
  }

  return (
    <div className="max-w-md mx-auto card p-6 space-y-4">
      <h1 className="text-xl font-bold">Connexion</h1>
      {error && <p className="text-red-400">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          className="input"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className="input"
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="btn btn-primary w-full">Se connecter</button>
      </form>
      <p className="text-white/60 text-sm">
        Pas de compte ?{' '}
        <Link className="underline" href={'/register?next=' + encodeURIComponent(next)}>
          Créer un compte
        </Link>
      </p>
    </div>
  )
}
