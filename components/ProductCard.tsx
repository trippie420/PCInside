'use client'
import type { Product } from '@/lib/types'
import { formatEUR } from '@/lib/currency'
import Link from 'next/link'
import RatingStars from './RatingStars'
import { AddToCartSmall } from '@/lib/cart'

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="card prod-card p-3 flex flex-col shadow-elev">
      <Link href={'/produits/' + product.slug} className="block prod-img">
        <img src={product.image} alt={product.title} className="w-full h-40 object-cover"/>
        <div className="absolute inset-0 pointer-events-none"
             style={{background:'linear-gradient(to top, rgba(0,0,0,.35), transparent 60%)'}}/>
      </Link>
      <div className="flex-1 py-3 space-y-1">
        <div className="flex items-center gap-2">
          <span className="chip">{product.brand}</span>
          <span className="badge">{product.category}</span>
        </div>
        <Link href={'/produits/' + product.slug} className="font-semibold leading-tight line-clamp-2">{product.title}</Link>
        <div className="flex items-center gap-2">
          <RatingStars rating={product.rating} />
        </div>
      </div>
      <div className="flex items-center justify-between mt-auto pt-2">
        <span className="price text-lg">{formatEUR(product.price)}</span>
        <AddToCartSmall product={product} />
      </div>
    </div>
  )
}
