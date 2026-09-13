import { cn } from '@/utils/cn'

export function StepIndicator({ steps, currentIndex }: { steps: string[]; currentIndex: number }) {
  return (
    <div className="flex items-center gap-2 px-4 py-4 md:px-6">
      {steps.map((step, i) => (
        <div key={step} className="flex flex-1 items-center gap-2">
          <div className="flex flex-1 flex-col gap-1.5">
            <div className={cn('h-1.5 rounded-full', i <= currentIndex ? 'bg-brand-600' : 'bg-ink-900/10')} />
            <span className={cn('hidden text-[11px] font-medium sm:block', i <= currentIndex ? 'text-ink-900' : 'text-ink-500')}>{step}</span>
          </div>
        </div>
      ))}
    </div>
  )
}
