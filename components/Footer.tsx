export default function Footer() {
  return (
    <footer className="footer-grad mt-12">
      <div className="container py-8 text-sm text-white/60 flex flex-col md:flex-row gap-2 md:items-center justify-between">
        <p>© {new Date().getFullYear()} PCInside — Démo e-commerce.</p>
        <p>Construit avec Next.js & Tailwind.</p>
      </div>
    </footer>
  )
}
