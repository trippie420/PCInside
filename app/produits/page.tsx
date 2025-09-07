import products from '@/data/products'
import ProductCard from '@/components/ProductCard'
import Filters from '@/components/Filters'

type Props = {
  searchParams: { q?: string; category?: string; brand?: string; sort?: 'price_asc' | 'price_desc' | 'rating' }
}

export default function ProductsPage({ searchParams }: Props) {
  const q = (searchParams.q ?? '').toLowerCase()
  const category = searchParams.category ?? ''
  const brand = searchParams.brand ?? ''
  const sort = searchParams.sort ?? 'rating'

  let list = products.filter(p => {
    const matchQ = q ? (p.title + ' ' + p.description + ' ' + p.brand + ' ' + p.category).toLowerCase().includes(q) : true
    const matchC = category ? p.category === category : true
    const matchB = brand ? p.brand === brand : true
    return matchQ && matchC && matchB
  })

  if (sort === 'price_asc') list = list.sort((a,b)=>a.price-b.price)
  if (sort === 'price_desc') list = list.sort((a,b)=>b.price-a.price)
  if (sort === 'rating') list = list.sort((a,b)=>b.rating-a.rating)

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[260px,1fr] gap-6">
      <div className="lg:sticky lg:top-4 h-max">
        <Filters />
      </div>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-white/70">{list.length} résultat(s)</p>
          <form className="flex items-center gap-2" action="/produits">
            <input type="hidden" name="q" defaultValue={q} />
            <input type="hidden" name="category" defaultValue={category} />
            <input type="hidden" name="brand" defaultValue={brand} />
            <label className="sr-only" htmlFor="sort">Trier</label>
            <select className="select" id="sort" name="sort" defaultValue={sort}>
              <option value="rating">Les mieux notés</option>
              <option value="price_asc">Prix croissant</option>
              <option value="price_desc">Prix décroissant</option>
            </select>
            <button className="btn btn-outline" type="submit">Appliquer</button>
          </form>
        </div>
        {list.length === 0 ? (
          <div className="card p-6 text-white/70">Aucun produit ne correspond à votre recherche.</div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {list.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        )}
      </div>
    </div>
  )
}
