import Link from 'next/link'
import products from '@/data/products'
import ProductCard from '@/components/ProductCard'

export default function HomePage() {
  const best = products.slice(0, 8)
  return (
    <div className="space-y-10">
      <section className="relative overflow-hidden rounded-2xl shadow-elev">
        <div className="absolute inset-0"
             style={{background:'radial-gradient(1000px 400px at -10% -10%, rgba(139,92,246,.35), transparent), radial-gradient(800px 400px at 110% -10%, rgba(34,211,238,.2), transparent), linear-gradient(135deg, #1a1636, #110f24)'}}/>
        <div className="relative p-8 md:p-12">
          <div className="max-w-3xl space-y-4">
            <span className="chip">Nouveau</span>
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">
              PCInside — Monte ton PC comme un pro.
            </h1>
            <p className="text-white/80">
              CPU, GPU, RAM, SSD, cartes mères et plus. Essaie notre <span className="font-semibold">Configurateur</span> avec filtres de compatibilité.
            </p>
            <div className="flex gap-3">
              <Link href="/produits" className="btn btn-primary">Voir les produits</Link>
              <Link href="/configurateur" className="btn btn-outline">Configurateur</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Meilleures ventes</h2>
          <Link href="/produits" className="text-sm text-white/70 underline">Tout voir</Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {best.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>
    </div>
  )
}
