import { useRef, useState } from 'react'
import { ProductImage } from './ProductImage'
import { cn } from '@/utils/cn'

export function ProductGallery({ images, name }: { images: string[]; name: string }) {
  const [index, setIndex] = useState(0)
  const touchStartX = useRef<number | null>(null)
  const gallery = images.length > 0 ? images : [undefined]

  function goTo(next: number) {
    setIndex((next + gallery.length) % gallery.length)
  }

  return (
    <div>
      <div
        className="relative aspect-[3/4] w-full overflow-hidden bg-brand-50 md:rounded-2xl"
        onTouchStart={(e) => (touchStartX.current = e.touches[0].clientX)}
        onTouchEnd={(e) => {
          if (touchStartX.current === null) return
          const delta = e.changedTouches[0].clientX - touchStartX.current
          if (delta > 40) goTo(index - 1)
          if (delta < -40) goTo(index + 1)
          touchStartX.current = null
        }}
      >
        <ProductImage src={gallery[index]} alt={`${name} — foto ${index + 1}`} className="h-full w-full" loading="eager" />

        {gallery.length > 1 && (
          <div className="absolute inset-x-0 bottom-3 flex justify-center gap-1.5">
            {gallery.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Ver foto ${i + 1}`}
                onClick={() => goTo(i)}
                className={cn('h-1.5 rounded-full transition-all', i === index ? 'w-6 bg-ink-900' : 'w-1.5 bg-ink-900/25')}
              />
            ))}
          </div>
        )}
      </div>

      {gallery.length > 1 && (
        <div className="no-scrollbar mt-2 hidden gap-2 overflow-x-auto md:flex">
          {gallery.map((img, i) => (
            <button
              key={i}
              type="button"
              onClick={() => goTo(i)}
              className={cn('h-20 w-16 shrink-0 overflow-hidden rounded-xl border-2', i === index ? 'border-brand-600' : 'border-transparent')}
            >
              <ProductImage src={img} alt={`${name} — miniatura ${i + 1}`} className="h-full w-full" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
