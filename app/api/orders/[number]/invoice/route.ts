import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { generateInvoicePdf } from '@/lib/invoice'

export async function GET(_: NextRequest, { params }: { params: { number: string } }) {
  const order = await prisma.order.findUnique({ where: { number: params.number }, include: { items: true } })
  if (!order) return new NextResponse('Not found', { status: 404 })
  const pdf = await generateInvoicePdf(order)
  return new NextResponse(pdf, { headers: { 'Content-Type': 'application/pdf', 'Content-Disposition': `inline; filename=facture-${order.number}.pdf` } })
}
