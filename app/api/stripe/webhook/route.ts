import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { prisma } from '@/lib/db'
import { generateInvoicePdf } from '@/lib/invoice'
import { sendOrderEmail } from '@/lib/email'

export async function POST(req: NextRequest) {
  const secret = process.env.STRIPE_SECRET_KEY
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET
  if (!secret || !endpointSecret) return NextResponse.json({ ok: true, disabled: true })

  const stripe = new Stripe(secret, { apiVersion: '2024-06-20' })
  const sig = req.headers.get('stripe-signature') as string
  const raw = await req.text()

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(raw, sig, endpointSecret)
  } catch {
    return new NextResponse('Invalid signature', { status: 400 })
  }

  if (event.type === 'payment_intent.succeeded') {
    const pi = event.data.object as Stripe.PaymentIntent
    const number = pi.metadata?.orderNumber as string | undefined
    if (number) {
      const order = await prisma.order.update({
        where: { number },
        data: { status: 'PAID', paidAt: new Date() },
        include: { items: true },
      })
      const pdf = await generateInvoicePdf(order)
      await sendOrderEmail(
        order.email,
        `Confirmation commande ${order.number}`,
        `<p>Merci pour votre commande ${order.number}.</p><p>La facture est en pièce jointe.</p>`,
        { filename: `facture-${order.number}.pdf`, content: pdf }
      )
    }
  }

  // On garde la compat Checkout Session si utilisée ailleurs
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session
    const number = session.metadata?.orderNumber as string | undefined
    if (number) {
      const order = await prisma.order.update({
        where: { number },
        data: { status: 'PAID', paidAt: new Date(), stripePaymentIntentId: session.payment_intent as string },
        include: { items: true },
      })
      const pdf = await generateInvoicePdf(order)
      await sendOrderEmail(order.email, `Confirmation commande ${order.number}`,
        `<p>Merci pour votre commande ${order.number}.</p>`, { filename:`facture-${order.number}.pdf`, content: pdf })
    }
  }

  if (event.type === 'charge.refunded') {
    const charge = event.data.object as Stripe.Charge
    if (charge.payment_intent)
      await prisma.order.updateMany({ where: { stripePaymentIntentId: String(charge.payment_intent) }, data: { status: 'REFUNDED', refundAt: new Date() } })
  }

  return NextResponse.json({ received: true })
}

export const config = { api: { bodyParser: false } } as any
