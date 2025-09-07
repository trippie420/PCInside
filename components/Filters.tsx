'use client'
import products from '@/data/products'
import { useSearchParams, useRouter } from 'next/navigation'
import { useState, useMemo } from 'react'

export default function Filters() {
  const params = useSearchParams()
  const router = useRouter()
  const categories = useMemo(() => Array.from(new Set(products.map(p=>p.category))), [])
  const brands = useMemo(() => Array.from(new Set(products.map(p=>p.brand))).sort(), [])

  const [category, setCategory] = useState(params.get('category') ?? '')
  const [brand, setBrand] = useState(params.get('brand') ?? '')
  const [q] = useState(params.get('q') ?? '')
  const [sort] = useState(params.get('sort') ?? 'rating')

  function submit(e: React.FormEvent) {
    e.preventDefault()
    const url = new URL(window.location.href)
    url.pathname = '/produits'
    url.searchParams.delete('page')
    if (q) url.searchParams.set('q', q); else url.searchParams.delete('q')
    if (category) url.searchParams.set('category', category); else url.searchParams.delete('category')
    if (brand) url.searchParams.set('brand', brand); else url.searchParams.delete('brand')
    if (sort) url.searchParams.set('sort', sort); else url.searchParams.delete('sort')
    router.push(url.pathname + (url.search || ''))
  }

  function reset() {
    setCategory('')
    setBrand('')
    const url = new URL(window.location.href)
    url.pathname = '/produits'
    url.search = ''
    router.push(url.pathname)
  }

  return (
    <aside className="card p-4 space-y-4">
      <h3 className="font-semibold">Filtres</h3>
      <form onSubmit={submit} className="space-y-3">
        <div>
          <label>Catégorie</label>
          <select className="select mt-1" value={category} onChange={e=>setCategory(e.target.value)}>
            <option value="">Toutes</option>
            {categories.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <label>Marque</label>
          <select className="select mt-1" value={brand} onChange={e=>setBrand(e.target.value)}>
            <option value="">Toutes</option>
            {brands.map(b => <option key={b} value={b}>{b}</option>)}
          </select>
        </div>
        <div className="flex gap-2">
          <button className="btn btn-primary flex-1" type="submit">Appliquer</button>
          <button className="btn btn-outline flex-1" type="button" onClick={reset}>Réinitialiser</button>
        </div>
      </form>
    </aside>
  )
}
