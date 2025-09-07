export default function OrderDone({ params }: { params: { id: string }}) {
  return (
    <div className="card p-8 space-y-4 text-center max-w-xl mx-auto">
      <h1 className="text-2xl font-bold">Merci pour votre commande 🎉</h1>
      <p className="text-white/70">Votre numéro de commande est <span className="font-mono">{params.id}</span>.</p>
      <p className="text-white/60 text-sm">Ceci est une démonstration — aucun paiement réel n'a été effectué.</p>
    </div>
  )
}
