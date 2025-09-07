'use client'
import { useEffect, useState } from 'react'
export default function CookieBanner(){
  const [open,setOpen]=useState(false)
  useEffect(()=>{ if(!localStorage.getItem('cookie:consent')) setOpen(true) },[])
  if(!open) return null
  return (<div className="fixed bottom-4 left-0 right-0 z-50"><div className="container">
    <div className="card p-4 flex flex-col md:flex-row gap-3 md:items-center justify-between">
      <p className="text-white/80 text-sm">Nous utilisons des cookies pour améliorer votre expérience.</p>
      <div className="flex gap-2">
        <button className="btn btn-outline" onClick={()=>{localStorage.setItem('cookie:consent','denied'); setOpen(false)}}>Refuser</button>
        <button className="btn btn-primary" onClick={()=>{localStorage.setItem('cookie:consent','granted'); setOpen(false)}}>Accepter</button>
      </div>
    </div></div></div>)
}
