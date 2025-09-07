import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { prisma } from '@/lib/db'

export async function POST(req: NextRequest) {
  const { items, email, pseudo, shippingAddress } = await req.json() as {
    items: { id:string; title:string; price:number; qty:number }[]
    email: string; pseudo?: string; shippingAddress?: string
  }

  if (!items?.length || !email) {
    return NextResponse.json({ error: 'bad_request' }, { status: 400 })
  }

  const stripeSecret = process.env.STRIPE_SECRET_KEY
  if (!stripeSecret) {
    return NextResponse.json({ error: 'stripe_not_configured' }, { status: 500 })
  }

  const amount = items.reduce((acc, it) => acc + Math.round(it.price * 100) * it.qty, 0)
  const number = 'PCI-' + Math.random().toString(36).slice(2, 8).toUpperCase()

  const order = await prisma.order.create({
    data: {
      number, email, pseudo, total: amount, status: 'PENDING', shippingAddress,
      items: { create: items.map(it => ({ productId: it.id, title: it.title, price: Math.round(it.price*100), qty: it.qty })) }
    }
  })

  const stripe = new Stripe(stripeSecret, { apiVersion: '2024-06-20' })
  const intent = await stripe.paymentIntents.create({
    amount, currency: 'eur', receipt_email: email,
    automatic_payment_methods: { enabled: true },
    metadata: { orderNumber: number, orderId: String(order.id) }
  })

  await prisma.order.update({ where: { id: order.id }, data: { stripePaymentIntentId: intent.id } })

  return NextResponse.json({ clientSecret: intent.client_secret, number })
}
