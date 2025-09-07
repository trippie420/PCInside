'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

type AuthUser = { email: string; pseudo?: string }

export default function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  const [user, setUser] = useState<AuthUser | null>(null)

  // Récupère l'utilisateur depuis localStorage
  const readUser = () => {
    try {
      const raw = localStorage.getItem('pcinside:user')
      setUser(raw ? JSON.parse(raw) : null)
    } catch {
      setUser(null)
    }
  }

  useEffect(() => {
    readUser()

    // maj quand un autre onglet change le storage
    const onStorage = (e: StorageEvent) => {
      if (e.key === 'pcinside:user') readUser()
    }
    // évènement custom déclenché après login/logout
    const onAuth = () => readUser()

    window.addEventListener('storage', onStorage)
    window.addEventListener('pcinside:auth', onAuth)
    return () => {
      window.removeEventListener('storage', onStorage)
      window.removeEventListener('pcinside:auth', onAuth)
    }
  }, [])

  const isActive = (href: string) =>
    pathname === href ? 'nav-link active' : 'nav-link'

  const logout = () => {
    localStorage.removeItem('pcinside:user')
    localStorage.removeItem('pcinside:token')
    // notifie la navbar
    window.dispatchEvent(new Event('pcinside:auth'))
    router.push('/')
  }

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <div className="container flex items-center gap-4 py-3">
          <Link href="/" className="flex items-center gap-3">
            <span className="text-lg font-semibold">PCInside</span>
          </Link>

          <nav className="ml-auto flex items-center gap-3">
            <Link href="/" className={isActive('/')}>Accueil</Link>
            <Link href="/produits" className={isActive('/produits')}>Produits</Link>
            <Link href="/configurateur" className={isActive('/configurateur')}>Configurateur</Link>

            {/* À droite : soit Profil + Déconnexion, soit Register + Login */}
            {user ? (
              <>
                <Link href="/compte" className={isActive('/compte')}>
                  Profil
                </Link>
                <button onClick={logout} className="btn btn-outline px-3 py-1">
                  Déconnexion
                </button>
              </>
            ) : (
              <>
                <Link href="/register" className={isActive('/register')}>Register</Link>
                <Link href="/login" className={isActive('/login')}>Login</Link>
              </>
            )}

            <Link href="/panier" className="btn btn-primary">Panier</Link>
          </nav>
        </div>
      </div>
    </header>
  )
}
