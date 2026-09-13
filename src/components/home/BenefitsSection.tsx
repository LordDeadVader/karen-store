import type { HomeContent } from '@/types'
import { CreditCardIcon, PackageIcon, ShieldCheckIcon } from '@/components/ui/icons'
import type { IconProps } from '@/components/ui/icons'

const ICONS: Record<string, (props: IconProps) => React.JSX.Element> = {
  quality: ShieldCheckIcon,
  variety: PackageIcon,
  payment: CreditCardIcon,
}

export function BenefitsSection({ benefits }: { benefits: HomeContent['benefits'] }) {
  return (
    <section className="bg-brand-50/60 px-4 py-8 md:px-6">
      <div className="mx-auto grid max-w-5xl grid-cols-3 gap-3 md:gap-6">
        {benefits.map((benefit) => {
          const Icon = ICONS[benefit.icon] ?? ShieldCheckIcon
          return (
            <div key={benefit.title} className="flex flex-col items-center gap-1.5 text-center">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-brand-600 md:h-12 md:w-12">
                <Icon width={20} height={20} />
              </span>
              <p className="text-xs font-bold text-ink-900 md:text-sm">{benefit.title}</p>
              <p className="hidden text-xs text-ink-500 md:block">{benefit.description}</p>
            </div>
          )
        })}
      </div>
    </section>
  )
}
