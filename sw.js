// The name of our cache (storage container)
const CACHE_NAME = 'tictactoe-offline-v1';

// The files we want to save for offline use
const FILES_TO_CACHE = [
  './',
  './index.html'
];

// Step 1: Install the Service Worker and save the files
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Caching offline game files');
      return cache.addAll(FILES_TO_CACHE);
    })
  );
});

// Step 2: When the app asks for a file, check the cache first!
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // If the file is in the cache, serve it offline. If not, fetch from internet.
      return response || fetch(event.request);
    })
  );
});