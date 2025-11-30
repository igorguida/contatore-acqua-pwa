/*
 * 2025-11-30 Igor Guida - Madeinlinux®
 * In questo file definisco il service worker della PWA.
 * Qui gestisco il caching base dei file principali per usare l'app anche offline.
 */

const CACHE_NAME = "acqua-oggi-v1";

// Qui elenco i file principali che voglio mettere in cache
const ASSETS_TO_CACHE = [
  "index.html",
  "manifest.webmanifest",
  "icons/icon-192.png",
  "icons/icon-512.png"
];

// Installazione: qui metto in cache i file di base
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// Attivazione: qui posso pulire vecchie cache, se cambio versione
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      );
    })
  );
});

// Fetch: qui intercetto le richieste e provo a rispondere dalla cache
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return cachedResponse || fetch(event.request);
    })
  );
});
