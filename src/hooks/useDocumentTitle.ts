import { useEffect } from 'react'

export function useDocumentTitle(title: string, description?: string): void {
  useEffect(() => {
    const previousTitle = document.title
    document.title = title ? `${title} | Karen Store` : 'Karen Store — Moda Feminina Online'

    let metaDescription: HTMLMetaElement | null = null
    let previousDescription: string | null = null
    if (description) {
      metaDescription = document.querySelector('meta[name="description"]')
      if (metaDescription) {
        previousDescription = metaDescription.getAttribute('content')
        metaDescription.setAttribute('content', description)
      }
    }

    return () => {
      document.title = previousTitle
      if (metaDescription && previousDescription !== null) {
        metaDescription.setAttribute('content', previousDescription)
      }
    }
  }, [title, description])
}
