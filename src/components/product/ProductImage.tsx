import { useState } from 'react'
import { ImageOffIcon } from '@/components/ui/icons'
import { cn } from '@/utils/cn'

interface ProductImageProps {
  src: string | undefined
  alt: string
  className?: string
  loading?: 'lazy' | 'eager'
}

export function ProductImage({ src, alt, className, loading = 'lazy' }: ProductImageProps) {
  const [failed, setFailed] = useState(false)

  if (!src || failed) {
    return (
      <div className={cn('flex items-center justify-center bg-brand-50 text-brand-300', className)}>
        <ImageOffIcon width={32} height={32} />
      </div>
    )
  }

  return (
    <img
      src={src}
      alt={alt}
      loading={loading}
      decoding="async"
      onError={() => setFailed(true)}
      className={cn('object-cover', className)}
    />
  )
}
