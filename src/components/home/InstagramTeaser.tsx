import { InstagramIcon } from '@/components/ui/icons'

const PLACEHOLDER = '[Configure no painel administrativo]'

export function InstagramTeaser({ instagram, storeName }: { instagram: string; storeName: string }) {
  if (!instagram || instagram === PLACEHOLDER) return null

  return (
    <section className="px-4 py-8 md:px-6">
      <a
        href={instagram}
        target="_blank"
        rel="noreferrer"
        className="mx-auto flex max-w-3xl flex-col items-center gap-3 rounded-3xl bg-gradient-to-br from-brand-100 to-brand-200 px-6 py-8 text-center transition-transform hover:scale-[1.01]"
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-brand-600 shadow-sm">
          <InstagramIcon width={24} height={24} />
        </div>
        <p className="font-display text-lg font-semibold text-ink-900">Siga a {storeName} no Instagram</p>
        <p className="text-sm text-ink-700">Novidades, bastidores e promoções exclusivas por lá ✨</p>
      </a>
    </section>
  )
}
