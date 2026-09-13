import { Link } from 'react-router-dom'
import type { Category } from '@/types'

export function CategoryShowcase({ categories }: { categories: Category[] }) {
  const active = categories.filter((c) => c.isActive)

  return (
    <section className="px-4 py-6 md:px-6">
      <h2 className="font-display mb-3 text-xl font-bold text-ink-900 md:text-2xl">Categorias</h2>
      <div className="no-scrollbar -mx-4 flex gap-4 overflow-x-auto px-4 md:mx-0 md:grid md:grid-cols-9 md:gap-3 md:px-0">
        {active.map((category) => (
          <Link key={category.id} to={`/categoria/${category.slug}`} className="flex shrink-0 flex-col items-center gap-1.5">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-50 text-2xl transition-transform active:scale-95 md:h-20 md:w-20 md:text-3xl">
              {category.icon}
            </span>
            <span className="w-16 text-center text-xs font-medium text-ink-700 md:w-20">{category.name}</span>
          </Link>
        ))}
      </div>
    </section>
  )
}
