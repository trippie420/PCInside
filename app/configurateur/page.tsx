'use client'
import products from '@/data/products'
import { useMemo, useState } from 'react'
import { useCart } from '@/lib/cart'
import { formatEUR } from '@/lib/currency'

type Sel = { cpu?: string; mobo?: string; ram?: string; gpu?: string; ssd?: string; psu?: string; case?: string; cooler?: string }
const byId = (id?: string) => products.find(p=>p.id===id)

function chipsetToSocket(chipset?: string) {
  if (!chipset) return undefined
  const up = chipset.toUpperCase()
  if (up.includes('B650') || up.includes('X670') || up.includes('A620')) return 'AM5'
  if (up.includes('Z790') || up.includes('B760') || up.includes('H610')) return 'LGA1700'
  return undefined
}

export default function Configurateur() {
  const { addItem } = useCart()
  const [sel, setSel] = useState<Sel>({})

  const cpus = useMemo(()=>products.filter(p=>p.category==='Processeur'),[])
  const mobos = useMemo(()=>products.filter(p=>p.category==='Carte mère'),[])
  const rams = useMemo(()=>products.filter(p=>p.category==='Mémoire'),[])
  const gpus = useMemo(()=>products.filter(p=>p.category==='Carte graphique'),[])
  const ssds = useMemo(()=>products.filter(p=>p.category==='Stockage'),[])
  const psus = useMemo(()=>products.filter(p=>p.category==='Alimentation'),[])
  const cases = useMemo(()=>products.filter(p=>p.category==='Boîtier'),[])
  const coolers = useMemo(()=>products.filter(p=>p.category==='Refroidissement'),[])

  const cpuSock = useMemo(()=> byId(sel.cpu)?.specs?.Socket, [sel.cpu])
  const filteredMobos = useMemo(()=> !cpuSock ? mobos : mobos.filter(m => chipsetToSocket(m.specs?.Chipset) === cpuSock), [mobos, cpuSock])
  const filteredRam = useMemo(()=> cpuSock==='AM5' ? rams.filter(r=>/DDR5/i.test(r.title)) : rams, [rams, cpuSock])

  const selectedProducts = ['cpu','mobo','ram','gpu','ssd','psu','case','cooler']
    .map(k => byId((sel as any)[k]))
    .filter(Boolean) as typeof products

  const total = selectedProducts.reduce((a,p)=>a+p.price,0)

  const Select = ({ value, onChange, list, placeholder }: { value?: string, onChange:(v?:string)=>void, list: typeof products, placeholder:string }) => (
    <select className="select" value={value ?? ''} onChange={e=>onChange(e.target.value || undefined)}>
      <option value="">{placeholder}</option>
      {list.map(p => <option key={p.id} value={p.id}>{p.title} — {formatEUR(p.price)}</option>)}
    </select>
  )

  function addConfigToCart(){
    selectedProducts.forEach(p=>addItem(p))
    alert('Configuration ajoutée au panier !')
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Configurateur PC</h1>
      <p className="text-white/70">Cartes mères filtrées selon le socket CPU. AM5 → DDR5.</p>

      <div className="card p-4 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-[200px,1fr] gap-3 items-center">
          <span className="text-white/70">Processeur</span>
          <Select value={sel.cpu} onChange={v=>setSel(s=>({...s,cpu:v, mobo:undefined, ram:undefined}))} list={cpus} placeholder="Sélectionner un CPU" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[200px,1fr] gap-3 items-center">
          <span className="text-white/70">Carte mère</span>
          <Select value={sel.mobo} onChange={v=>setSel(s=>({...s,mobo:v}))} list={filteredMobos} placeholder="Sélectionner une carte mère" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[200px,1fr] gap-3 items-center">
          <span className="text-white/70">Mémoire</span>
          <Select value={sel.ram} onChange={v=>setSel(s=>({...s,ram:v}))} list={filteredRam} placeholder="Sélectionner une RAM" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[200px,1fr] gap-3 items-center">
          <span className="text-white/70">Carte graphique</span>
          <Select value={sel.gpu} onChange={v=>setSel(s=>({...s,gpu:v}))} list={gpus} placeholder="(Optionnel) Carte graphique" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[200px,1fr] gap-3 items-center">
          <span className="text-white/70">Stockage</span>
          <Select value={sel.ssd} onChange={v=>setSel(s=>({...s,ssd:v}))} list={ssds} placeholder="(Optionnel) SSD" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[200px,1fr] gap-3 items-center">
          <span className="text-white/70">Alimentation</span>
          <Select value={sel.psu} onChange={v=>setSel(s=>({...s,psu:v}))} list={psus} placeholder="(Optionnel) Alimentation" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[200px,1fr] gap-3 items-center">
          <span className="text-white/70">Boîtier</span>
          <Select value={sel.case} onChange={v=>setSel(s=>({...s,case:v}))} list={cases} placeholder="(Optionnel) Boîtier" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[200px,1fr] gap-3 items-center">
          <span className="text-white/70">Refroidissement</span>
          <Select value={sel.cooler} onChange={v=>setSel(s=>({...s,cooler:v}))} list={coolers} placeholder="(Optionnel) Refroidissement" />
        </div>
      </div>

      <div className="card p-4 space-y-3">
        <h2 className="font-semibold">Récapitulatif</h2>
        {selectedProducts.length ? (
          <ul className="space-y-1">
            {selectedProducts.map(p => (
              <li key={p.id} className="flex items-center justify-between">
                <span>{p.title}</span>
                <span className="text-white/80">{formatEUR(p.price)}</span>
              </li>
            ))}
          </ul>
        ) : <p className="text-white/70">Aucun composant choisi.</p>}
        <div className="flex items-center justify-between pt-2 border-t border-white/10">
          <span className="text-white/70">Total</span>
          <span className="text-xl font-semibold">{formatEUR(total)}</span>
        </div>
        <div className="flex gap-2">
          <button className="btn btn-outline" onClick={()=>setSel({})}>Réinitialiser</button>
          <button className="btn btn-primary" onClick={addConfigToCart} disabled={!selectedProducts.length}>Ajouter la config au panier</button>
        </div>
      </div>
    </div>
  )
}
