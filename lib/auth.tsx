'use client'
import { createContext, useContext, useEffect, useState } from 'react'

type User = { email: string, pseudo: string }
type AuthContextType = {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  register: (email: string, pseudo: string, password: string) => Promise<boolean>
}

async function hashPassword(pwd: string) {
  const enc = new TextEncoder().encode(pwd)
  const buf = await crypto.subtle.digest('SHA-256', enc)
  return Array.from(new Uint8Array(buf)).map(b=>b.toString(16).padStart(2,'0')).join('')
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User|null>(null)

  useEffect(() => {
    try {
      const raw = localStorage.getItem('session')
      if (raw) setUser(JSON.parse(raw))
    } catch {}
  }, [])

  async function register(email: string, pseudo: string, password: string) {
    const users = JSON.parse(localStorage.getItem('users') || '[]')
    if (users.find((u:any)=>u.email===email)) return false
    const hash = await hashPassword(password)
    users.push({ email, pseudo, password: hash })
    localStorage.setItem('users', JSON.stringify(users))
    localStorage.setItem('session', JSON.stringify({ email, pseudo }))
    setUser({ email, pseudo })
    return true
  }

  async function login(email: string, password: string) {
    const users = JSON.parse(localStorage.getItem('users') || '[]')
    const hash = await hashPassword(password)
    const u = users.find((u:any)=>u.email===email && u.password===hash)
    if (!u) return false
    localStorage.setItem('session', JSON.stringify({ email, pseudo: u.pseudo }))
    setUser({ email, pseudo: u.pseudo })
    return true
  }

  function logout() {
    localStorage.removeItem('session')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be inside AuthProvider')
  return ctx
}
