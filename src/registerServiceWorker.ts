import { publicUrl } from './utils/publicUrl'

export function registerServiceWorker(): void {
  if (!import.meta.env.PROD) return
  if (!('serviceWorker' in navigator)) return

  window.addEventListener('load', () => {
    navigator.serviceWorker.register(publicUrl('sw.js'), { scope: import.meta.env.BASE_URL }).catch(() => {
      // Falha silenciosa: o site continua funcionando normalmente sem PWA offline.
    })
  })
}
