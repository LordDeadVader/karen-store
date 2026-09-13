import { Link } from 'react-router-dom'
import type { Category } from '@/types'
import { ProductImage } from '@/components/product/ProductImage'

export function CategoryShowcase({ categories }: { categories: Category[] }) {
  const active = categories.filter((c) => c.isActive)

  return (
    <section className="px-4 py-6 md:px-6">
      <h2 className="font-display mb-3 text-xl font-bold text-ink-900 md:text-2xl">Categorias</h2>
      <div className="no-scrollbar -mx-4 flex gap-3 overflow-x-auto px-4 md:mx-0 md:grid md:grid-cols-9 md:gap-3 md:px-0">
        {active.map((category) => (
          <Link key={category.id} to={`/categoria/${category.slug}`} className="group flex w-24 shrink-0 flex-col gap-2 md:w-auto">
            <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl bg-brand-50">
              <ProductImage
                src={category.image}
                alt={category.name}
                className="h-full w-full transition-transform duration-300 group-active:scale-95 md:group-hover:scale-105"
              />
            </div>
            <span className="text-center text-xs font-semibold text-ink-900 md:text-sm">{category.name}</span>
          </Link>
        ))}
      </div>
    </section>
  )
}
