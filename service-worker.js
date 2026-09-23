// Network first, cache fallback. A normal reload always shows the current
// files. The cache is only used when the network is unavailable.
var cacheName = 'j15h-3';
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
    fetch(e.request).then(function (response) {
      if (response.ok) {
        var copy = response.clone();
        caches.open(cacheName).then(function (cache) {
          cache.put(e.request, copy);
        });
      }
      return response;
    }).catch(function () {
      return caches.match(e.request);
    })
  );
});
