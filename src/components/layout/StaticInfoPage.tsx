import { useDocumentTitle } from '@/hooks/useDocumentTitle'

export function StaticInfoPage({ title, content }: { title: string; content: string }) {
  useDocumentTitle(title)

  return (
    <div className="mx-auto max-w-2xl px-4 py-8 md:px-6">
      <h1 className="font-display mb-4 text-2xl font-bold text-ink-900">{title}</h1>
      <p className="leading-relaxed whitespace-pre-line text-ink-700">{content}</p>
    </div>
  )
}
