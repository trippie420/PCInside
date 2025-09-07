import products from '@/data/products'
import { notFound } from 'next/navigation'
import { formatEUR } from '@/lib/currency'
import RatingStars from '@/components/RatingStars'
import Link from 'next/link'
import { AddToCartButton } from '@/lib/cart'
import dynamic from 'next/dynamic'

const Gallery = dynamic(() => import('@/components/Gallery'), { ssr: false })

export default function ProductDetailPage({ params }: { params: { slug: string }}) {
  const product = products.find(p => p.slug === params.slug)
  if (!product) return notFound()

  const images = [product.image, '/placeholder.svg', '/placeholder.svg', '/placeholder.svg', '/placeholder.svg']

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="card p-4">
        <Gallery images={images} />
      </div>
      <div className="space-y-4">
        <div className="space-y-2">
          <h1 className="text-2xl md:text-3xl font-bold">{product.title}</h1>
          <div className="flex items-center gap-2">
            <RatingStars rating={product.rating} />
            <span className="text-white/60 text-sm">• {product.brand}</span>
            <Link href={'/produits?category=' + encodeURIComponent(product.category)} className="badge">{product.category}</Link>
          </div>
        </div>

        <p className="text-white/80">{product.description}</p>

        <div className="card p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-white/70">Prix</span>
            <span className="text-2xl font-semibold">{formatEUR(product.price)}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-white/70">Disponibilité</span>
            <span className={"badge " + (product.inStock ? "" : "opacity-60")}>{product.inStock ? "En stock" : "Rupture"}</span>
          </div>
          <AddToCartButton product={product} />
        </div>

        <div className="card p-4">
          <h3 className="font-semibold mb-2">Caractéristiques</h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {Object.entries(product.specs).map(([k,v]) => (
              <li key={k} className="flex items-center justify-between gap-4">
                <span className="text-white/60">{k}</span>
                <span className="font-medium">{v}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
