import PDFDocument from 'pdfkit'
import type { Order, OrderItem } from '@prisma/client'

export async function generateInvoicePdf(order: Order & { items: OrderItem[] }) {
  const doc = new PDFDocument({ size: 'A4', margin: 50 })
  const chunks: Buffer[] = []
  doc.on('data', (c) => chunks.push(c))

  doc.fontSize(20).text(`Facture PCInside #${order.number}`, { align: 'center' }).moveDown()
  doc.fontSize(12).text(`Date: ${new Date(order.createdAt).toLocaleDateString('fr-FR')}`)
  doc.text(`Commande: ${order.number}`)
  doc.text(`Email: ${order.email}`)
  if ((order as any).pseudo) doc.text(`Client: ${(order as any).pseudo}`)
  doc.moveDown().text('Articles:', { underline: true }).moveDown(0.5)
  order.items.forEach(it => doc.text(`${it.title} × ${it.qty} — ${(it.price/100).toFixed(2)} €`))
  doc.moveDown().text(`Total TTC: ${(order.total/100).toFixed(2)} €`, { align: 'right' })
  doc.end()

  return new Promise<Buffer>(resolve => doc.on('end', () => resolve(Buffer.concat(chunks))))
}
