// Stale-while-revalidate for same-origin requests. Cached copy is served
// immediately, the network copy replaces it for the next visit.
var cacheName = 'j15h-2';
var precache = [
  '/',
  '/style.css',
  '/script.js'
];

self.addEventListener('install', function (e) {
  e.waitUntil(
    caches.open(cacheName).then(function (cache) {
      return cache.addAll(precache);
    }).then(function () {
      return self.skipWaiting();
    })
  );
});

self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.map(function (key) {
        if (key !== cacheName) {
          return caches.delete(key);
        }
      }));
    }).then(function () {
      return self.clients.claim();
    })
  );
});

self.addEventListener('fetch', function (e) {
  var url = new URL(e.request.url);

  if (e.request.method !== 'GET' || url.origin !== self.location.origin) {
    return;
  }

  e.respondWith(
    caches.open(cacheName).then(function (cache) {
      return cache.match(e.request).then(function (cached) {
        var network = fetch(e.request).then(function (response) {
          if (response.ok) {
            cache.put(e.request, response.clone());
          }
          return response;
        }).catch(function () {
          return cached;
        });
        return cached || network;
      });
    })
  );
});
