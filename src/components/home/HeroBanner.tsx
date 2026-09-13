import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import type { Banner } from '@/types'
import { ProductImage } from '@/components/product/ProductImage'
import { cn } from '@/utils/cn'

export function HeroBanner({ banners }: { banners: Banner[] }) {
  const [index, setIndex] = useState(0)
  const touchStartX = useRef<number | null>(null)

  useEffect(() => {
    if (banners.length <= 1) return
    const timer = setInterval(() => setIndex((i) => (i + 1) % banners.length), 5000)
    return () => clearInterval(timer)
  }, [banners.length])

  if (banners.length === 0) return null

  function goTo(next: number) {
    setIndex((next + banners.length) % banners.length)
  }

  return (
    <section
      className="relative aspect-[4/5] w-full overflow-hidden sm:aspect-[16/9] md:aspect-[21/9]"
      onTouchStart={(e) => (touchStartX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchStartX.current === null) return
        const delta = e.changedTouches[0].clientX - touchStartX.current
        if (delta > 40) goTo(index - 1)
        if (delta < -40) goTo(index + 1)
        touchStartX.current = null
      }}
    >
      {banners.map((banner, i) => (
        <Link
          key={banner.id}
          to={banner.linkTo}
          className={cn(
            'absolute inset-0 transition-opacity duration-500',
            i === index ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0',
          )}
        >
          <ProductImage src={banner.image} alt={banner.title} className="h-full w-full" loading={i === 0 ? 'eager' : 'lazy'} />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-900/55 via-ink-900/5 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 flex flex-col items-start gap-2 p-6 pb-8 text-white md:p-10">
            <h2 className="font-display max-w-md text-2xl leading-tight font-bold drop-shadow-sm md:text-4xl">{banner.title}</h2>
            <p className="max-w-sm text-sm text-white/90 md:text-base">{banner.subtitle}</p>
            <span className="mt-2 inline-flex items-center rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-ink-900">
              {banner.buttonLabel}
            </span>
          </div>
        </Link>
      ))}

      {banners.length > 1 && (
        <div className="absolute inset-x-0 bottom-3 flex justify-center gap-1.5">
          {banners.map((banner, i) => (
            <button
              key={banner.id}
              type="button"
              aria-label={`Ir para banner ${i + 1}`}
              onClick={() => goTo(i)}
              className={cn('h-1.5 rounded-full transition-all', i === index ? 'w-6 bg-white' : 'w-1.5 bg-white/50')}
            />
          ))}
        </div>
      )}
    </section>
  )
}
