export default function RatingStars({ rating }: { rating: number }) {
  const full = Math.floor(rating)
  const half = rating - full >= 0.5
  const empty = 5 - full - (half ? 1 : 0)
  return (
    <span className="inline-flex items-center text-yellow-400">
      {'★'.repeat(full)}
      {half ? '☆' : ''}
      {'☆'.repeat(empty)}
      <span className="sr-only">{rating} sur 5</span>
    </span>
  )
}
