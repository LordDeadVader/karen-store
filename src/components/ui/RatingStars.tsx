import { StarIcon } from './icons'

export function RatingStars({ rating, count, size = 14 }: { rating: number; count?: number; size?: number }) {
  return (
    <div className="flex items-center gap-1">
      <div className="flex text-amber-400">
        {Array.from({ length: 5 }).map((_, i) => (
          <StarIcon key={i} width={size} height={size} filled={i < Math.round(rating)} />
        ))}
      </div>
      <span className="text-xs font-medium text-ink-500">
        {rating.toFixed(1)}
        {typeof count === 'number' && ` (${count})`}
      </span>
    </div>
  )
}
