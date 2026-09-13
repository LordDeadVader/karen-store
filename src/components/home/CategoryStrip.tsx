import { NavLink } from 'react-router-dom'
import type { Category } from '@/types'
import { cn } from '@/utils/cn'

export function CategoryStrip({ categories }: { categories: Category[] }) {
  const active = categories.filter((c) => c.isActive)

  return (
    <div className="no-scrollbar flex gap-2 overflow-x-auto px-3 py-2.5 md:px-6">
      <NavLink
        to="/categoria/novidades"
        className={({ isActive }) =>
          cn(
            'shrink-0 rounded-full border px-3.5 py-1.5 text-xs font-semibold whitespace-nowrap transition-colors',
            isActive ? 'border-brand-600 bg-brand-600 text-white' : 'border-ink-900/10 text-ink-700',
          )
        }
      >
        ✨ Novidades
      </NavLink>
      <NavLink
        to="/categoria/promocoes"
        className={({ isActive }) =>
          cn(
            'shrink-0 rounded-full border px-3.5 py-1.5 text-xs font-semibold whitespace-nowrap transition-colors',
            isActive ? 'border-brand-600 bg-brand-600 text-white' : 'border-ink-900/10 text-ink-700',
          )
        }
      >
        🏷️ Promoções
      </NavLink>
      {active.map((category) => (
        <NavLink
          key={category.id}
          to={`/categoria/${category.slug}`}
          className={({ isActive }) =>
            cn(
              'shrink-0 rounded-full border px-3.5 py-1.5 text-xs font-semibold whitespace-nowrap transition-colors',
              isActive ? 'border-brand-600 bg-brand-600 text-white' : 'border-ink-900/10 text-ink-700',
            )
          }
        >
          {category.icon} {category.name}
        </NavLink>
      ))}
    </div>
  )
}
