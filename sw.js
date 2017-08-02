/* eslint-env worker */

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open('limonte').then(cache => {
      return cache.addAll([
        '/'
        // '/css/styles.css',
        // '/css/styles-svg.css',
        // '/js/app.js',
        // '/svg/head.svg.xml',
        // '/mp3/zippi.mp3',
        // '/mp3/The_Commission_Creton.mp3'
      ])
      .then(() => self.skipWaiting())
    })
  )
})

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim())
})

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request)
    })
  )
})
