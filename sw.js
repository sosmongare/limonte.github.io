/* eslint-env worker */

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open('limonte').then(cache => {
      return cache.addAll([
        '/'
      ])
      .then(() => self.skipWaiting())
    })
  )
})

self.addEventListener('activate', e => {
  e.waitUntil(self.clients.claim())
})

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(response => {
      return response || fetch(e.request)
    })
  )
})
