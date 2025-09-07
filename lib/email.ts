import nodemailer from 'nodemailer'
export async function sendOrderEmail(to: string, subject: string, html: string, attachment?: {filename:string, content:Buffer}) {
  const host = process.env.SMTP_HOST
  const user = process.env.SMTP_USER
  const pass = process.env.SMTP_PASS
  const port = Number(process.env.SMTP_PORT || 587)

  if (!host || !user || !pass) {
    console.log('[email:dev]', { to, subject })
    return { ok: true, dev: true }
  }

  const transporter = nodemailer.createTransport({ host, port, secure: port===465, auth: { user, pass } })
  await transporter.sendMail({
    from: `PCInside <${user}>`,
    to, subject, html,
    attachments: attachment ? [attachment] : []
  })
  return { ok: true }
}
