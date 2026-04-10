// ─────────────────────────────────────────────
//  Healyis — Service Worker  (Cache-First strategy)
//  Version bump here forces clients to re-cache:
const CACHE_VERSION = 'healyis-v1';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/about.html',
  '/quiz-hub.html',
  '/resource-center.html',
  '/glossary.html',
  '/post.html',
  '/login.html',
  '/css/style.css',
  '/js/data.js',
  '/js/auth.js',
  '/js/app.js',
  '/js/quiz-engine.js',
  '/js/admin.js',
];

// ── Install: pre-cache all static assets ──────
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_VERSION).then((cache) => cache.addAll(STATIC_ASSETS))
  );
  // Activate immediately without waiting for old SW to die
  self.skipWaiting();
});

// ── Activate: purge stale caches ──────────────
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE_VERSION)
          .map((key) => caches.delete(key))
      )
    )
  );
  // Take control of all open clients immediately
  self.clients.claim();
});

// ── Fetch ─────────────────────────────────────
self.addEventListener('fetch', (event) => {
  const { request } = event;

  // Only handle GET requests from same origin
  if (request.method !== 'GET') return;
  if (!request.url.startsWith(self.location.origin)) return;

  const url = new URL(request.url);

  // HTML pages → Network First (always get fresh content if online)
  if (request.destination === 'document' || url.pathname.endsWith('.html') || url.pathname === '/') {
    event.respondWith(networkFirst(request));
    return;
  }

  // CSS / JS / fonts → Cache First (immutable during a deploy)
  event.respondWith(cacheFirst(request));
});

// ── Strategies ────────────────────────────────
async function networkFirst(request) {
  const cache = await caches.open(CACHE_VERSION);
  try {
    const networkResponse = await fetch(request);
    // Cache the fresh response for offline use
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch {
    // Offline — serve from cache
    const cached = await cache.match(request);
    return cached || offlineFallback();
  }
}

async function cacheFirst(request) {
  const cached = await caches.match(request);
  if (cached) return cached;

  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(CACHE_VERSION);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch {
    return offlineFallback();
  }
}

function offlineFallback() {
  return new Response(
    `<!DOCTYPE html><html><head><meta charset="UTF-8">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <title>Healyis — Offline</title>
    <style>
      body{font-family:system-ui,sans-serif;display:flex;align-items:center;justify-content:center;
        min-height:100vh;margin:0;background:#f0f5fa;color:#0d4f6c;text-align:center;padding:20px}
      h1{font-size:1.8rem;margin-bottom:12px}
      p{color:#64748b;max-width:360px;line-height:1.6}
      a{color:#00c2d4;font-weight:600}
    </style></head>
    <body>
      <div>
        <svg viewBox="0 0 24 24" width="56" height="56" fill="none" stroke="#0d4f6c" stroke-width="1.5"
          stroke-linecap="round" style="margin-bottom:16px">
          <path d="M9 4h6v5h5v6h-5v5H9v-5H4V9h5z"/>
        </svg>
        <h1>You're offline</h1>
        <p>No internet connection. Previously visited pages are available below.</p>
        <p style="margin-top:20px"><a href="/">Try going back home</a></p>
      </div>
    </body></html>`,
    { headers: { 'Content-Type': 'text/html' } }
  );
}
