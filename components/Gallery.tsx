'use client'
import { useState } from 'react'

export default function Gallery({ images }: { images: string[] }) {
  const [current, setCurrent] = useState(images[0])

  return (
    <div className="space-y-3">
      <div className="relative overflow-hidden rounded-xl border border-white/10">
        <img
          src={current}
          alt="Aperçu"
          className="w-full h-auto transition-transform duration-500 hover:scale-105"
        />
        <div className="absolute inset-0 pointer-events-none" style={{background:'linear-gradient(to top, rgba(0,0,0,.25), transparent 60%)'}}/>
      </div>
      <div className="grid grid-cols-5 gap-2">
        {images.map(src => (
          <button
            key={src}
            onClick={() => setCurrent(src)}
            className={"border rounded-lg overflow-hidden " + (src===current ? 'ring-primary' : 'border-white/10')}
            title="Voir l'image"
          >
            <img src={src} alt="" className="w-full h-16 object-cover" />
          </button>
        ))}
      </div>
    </div>
  )
}
