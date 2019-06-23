var CACHE_STATIC_NAME = 'static-v4'
var CACHE_DYNAMIC_NAME = 'dynamic-v4'

self.addEventListener('install', function(event){
  console.log('[Service Worker] Installing Service worker', event)
  event.waitUntil(
    caches.open(CACHE_STATIC_NAME)
      .then(function(cache) {
        console.log('[Servide working] Precaching App shell')
        cache.addAll([
          '/',
          '/index.html',
          '/src/js/app.js',
          '/src/js/feed.js',
          '/src/js/material.min.js',
          '/src/css/app.css',
          '/src/css/feed.css',
          '/src/images/main-image.jpg',
          'https://fonts.googleapis.com/css?family=Roboto:400,700',
          'https://fonts.googleapis.com/icon?family=Material+Icons',
          'https://cdnjs.cloudflare.com/ajax/libs/material-design-lite/1.3.0/material.indigo-pink.min.css'
        ])
      })
    )
})

self.addEventListener('activate', function(event) {
  console.log('[Service Worker] Activating Service worker', event)
  event.waitUntil(
    caches.keys().then(list => {
      return Promise.all(list.map(key => {
        if(key !== CACHE_STATIC_NAME && key !== CACHE_DYNAMIC_NAME)
          return caches.delete(key)
      }))
    })
  )
  return self.clients.claim();
})

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(response => { 
          return response 
          || fetch(event.request).then(resp => {
            caches.open(CACHE_DYNAMIC_NAME)
              .then(cache => {
                cache.put(event.request.url, resp.clone())
                return resp
              })
          }).catch(err => {})
        })
  )
})