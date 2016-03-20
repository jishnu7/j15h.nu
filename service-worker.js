var cacheName = 'j15h-1';
var filesToCache = [
  '/',
  '/index.html',
  '/script.js'
];

self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener('activate', function(e) {
  e.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (key !== cacheName) {
          return caches.delete(key);
        }
      }));
    })
  );
});

self.addEventListener('fetch', function(e) {
  if (e.request.url.indexOf('google-analytics') > 0) {
    return fetch(e.request);
  } else {
    e.respondWith(
      caches.match(e.request).then(function(response) {
        if (response) {
          return response;
        } else {
          return fetch(e.request)
            .then(function(response) {
              return caches.open(cacheName).then(function(cache) {
                cache.put(e.request.url, response.clone());
                return response;
              });
            });
        }
      })
    );
  }
});
