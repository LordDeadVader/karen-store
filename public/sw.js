const CACHE_NAME = 'karen-store-v1'
// Base resolvida a partir do próprio escopo do service worker, para funcionar
// tanto na raiz do domínio quanto em um subcaminho (ex.: GitHub Pages).
const BASE = new URL('.', self.registration.scope).pathname
const APP_SHELL = [BASE, `${BASE}manifest.webmanifest`, `${BASE}favicon-32.png`, `${BASE}apple-touch-icon.png`]

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL)))
  self.skipWaiting()
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)))),
  )
  self.clients.claim()
})

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return

  event.respondWith(
    caches.match(event.request).then((cached) => {
      const network = fetch(event.request)
        .then((response) => {
          if (response.ok) {
            const clone = response.clone()
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone))
          }
          return response
        })
        .catch(() => cached)
      return cached || network
    }),
  )
})
