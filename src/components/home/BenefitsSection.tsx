import type { HomeContent } from '@/types'

export function BenefitsSection({ benefits }: { benefits: HomeContent['benefits'] }) {
  return (
    <section className="bg-brand-50/60 px-4 py-8 md:px-6">
      <div className="mx-auto grid max-w-5xl grid-cols-3 gap-3 md:gap-6">
        {benefits.map((benefit) => (
          <div key={benefit.title} className="flex flex-col items-center gap-1.5 text-center">
            <span className="text-2xl md:text-3xl">{benefit.icon}</span>
            <p className="text-xs font-bold text-ink-900 md:text-sm">{benefit.title}</p>
            <p className="hidden text-xs text-ink-500 md:block">{benefit.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
