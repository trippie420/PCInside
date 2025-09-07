import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'; import { prisma } from '@/lib/db'
export async function POST(req: NextRequest){
  const { items, email, pseudo, shippingAddress } = await req.json()
  if(!items?.length || !email) return NextResponse.json({error:'bad_request'},{status:400})
  const number='PCI-'+Math.random().toString(36).slice(2,8).toUpperCase()
  const total=items.reduce((a: number,it: any)=>a+Math.round(it.price*100)*it.qty,0)
  const order=await prisma.order.create({ data:{ number,email,pseudo,total,status:'PENDING',shippingAddress, items:{create: items.map((it:any)=>({productId:it.id,title:it.title,price:Math.round(it.price*100),qty:it.qty})) } } })
  const secret=process.env.STRIPE_SECRET_KEY; const base=process.env.NEXT_PUBLIC_BASE_URL||'http://localhost:3000'
  if(!secret){ await prisma.order.update({where:{id:order.id}, data:{status:'PAID',paidAt:new Date()}}); return NextResponse.json({url:`${base}/checkout/success?number=${number}`, mock:true}) }
  const stripe=new Stripe(secret,{apiVersion:'2024-06-20'})
  const session=await stripe.checkout.sessions.create({ mode:'payment', customer_email: email, line_items: items.map((it:any)=>({
    quantity: it.qty, price_data:{currency:'eur', unit_amount: Math.round(it.price*100), product_data:{name:it.title}}
  })), success_url:`${base}/checkout/success?number=${number}`, cancel_url:`${base}/checkout/cancel`, metadata:{orderNumber:number}})
  await prisma.order.update({where:{id:order.id}, data:{stripeSessionId:session.id}})
  return NextResponse.json({url:session.url})
}
