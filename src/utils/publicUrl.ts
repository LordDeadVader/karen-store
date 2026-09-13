/**
 * Resolve um caminho de arquivo estático (pasta `public/`) considerando o
 * `base` configurado no Vite — necessário porque o site pode ser publicado
 * em um subcaminho (ex.: GitHub Pages: /karen-store/) em vez da raiz do domínio.
 */
export function publicUrl(path: string): string {
  const base = import.meta.env.BASE_URL.endsWith('/') ? import.meta.env.BASE_URL : `${import.meta.env.BASE_URL}/`
  return `${base}${path.replace(/^\//, '')}`
}
