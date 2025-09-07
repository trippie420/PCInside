'use client'
import { createContext, useContext, useEffect, useMemo, useReducer } from 'react'
import type { Product } from './types'
import { formatEUR } from './currency'

type CartItem = { product: Product, qty: number }
type CartState = { items: CartItem[] }

type Action = { type:'ADD', product: Product, qty?: number } | { type:'REMOVE', id:string } | { type:'CLEAR' }

function reducer(state: CartState, action: Action): CartState {
  switch (action.type) {
    case 'ADD': {
      const idx = state.items.findIndex(i => i.product.id === action.product.id)
      if (idx >= 0) {
        const items = [...state.items]
        items[idx] = { ...items[idx], qty: items[idx].qty + (action.qty ?? 1) }
        return { items }
      }
      return { items: [...state.items, { product: action.product, qty: action.qty ?? 1 }] }
    }
    case 'REMOVE': return { items: state.items.filter(i => i.product.id !== action.id) }
    case 'CLEAR': return { items: [] }
    default: return state
  }
}

const CartContext = createContext<{
  items: CartItem[]; addItem:(p:Product, qty?:number)=>void; removeItem:(id:string)=>void; clear:()=>void; total:number; count:number;
} | null>(null)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { items: [] })

  useEffect(() => {
    try {
      const raw = localStorage.getItem('cart:v1'); if (raw) {
        const parsed = JSON.parse(raw); if (parsed && Array.isArray(parsed.items)) {
          parsed.items.forEach((it:any)=>dispatch({ type:'ADD', product: it.product, qty: it.qty }))
        }
      }
    } catch {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => { localStorage.setItem('cart:v1', JSON.stringify(state)) }, [state])

  const value = useMemo(() => {
    const total = state.items.reduce((acc, it) => acc + it.product.price * it.qty, 0)
    const count = state.items.reduce((acc, it) => acc + it.qty, 0)
    return {
      items: state.items,
      addItem: (p: Product, qty?: number) => dispatch({ type:'ADD', product:p, qty }),
      removeItem: (id: string) => dispatch({ type:'REMOVE', id }),
      clear: () => dispatch({ type:'CLEAR' }),
      total, count
    }
  }, [state])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart(){ const ctx = useContext(CartContext); if(!ctx) throw new Error('useCart must be used within CartProvider'); return ctx }
export function AddToCartButton({ product }: { product: Product }) { const { addItem } = useCart(); return <button className="btn btn-primary w-full" onClick={() => addItem(product)}>Ajouter au panier</button> }
export function AddToCartSmall({ product }: { product: Product }) { const { addItem } = useCart(); return <button title={'Ajouter ' + product.title + ' (' + formatEUR(product.price) + ')'} className="btn btn-primary" onClick={() => addItem(product)}>+</button> }
