/* 首爾 2026 PWA — offline service worker
   App shell (html/css/js) = network-first，線上永遠拿最新、離線回退快取；
   圖示／KML = cache-first（內容穩定）；跨來源 = stale-while-revalidate。 */
const CACHE = "seoul2026-v5";
const SHELL = ["./", "./index.html", "./app.css", "./app.js", "./manifest.webmanifest"];
const ASSETS = [
  ...SHELL,
  "./seoul2026.kml",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/icon-maskable-512.png",
  "./icons/apple-touch-icon.png",
  "./icons/favicon-32.png",
];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE).then((c) => c.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

// Allow the page to tell a waiting SW to take over immediately.
self.addEventListener("message", (e) => {
  if (e.data === "skipWaiting") self.skipWaiting();
});

const netFirst = (req) =>
  fetch(req).then((res) => {
    const copy = res.clone();
    caches.open(CACHE).then((c) => c.put(req, copy)).catch(() => {});
    return res;
  }).catch(() => caches.match(req).then((hit) => hit || caches.match("./index.html")));

const cacheFirst = (req) =>
  caches.match(req).then((hit) =>
    hit || fetch(req).then((res) => {
      const copy = res.clone();
      caches.open(CACHE).then((c) => c.put(req, copy)).catch(() => {});
      return res;
    }).catch(() => hit)
  );

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);

  // App-shell navigations + same-origin html/css/js: network-first (fresh when online).
  if (req.mode === "navigate") { e.respondWith(netFirst(req)); return; }
  if (url.origin === location.origin) {
    if (/\.(?:html|css|js)$/.test(url.pathname) || url.pathname.endsWith("/")) {
      e.respondWith(netFirst(req));
    } else {
      e.respondWith(cacheFirst(req)); // icons, kml — stable assets
    }
    return;
  }

  // Cross-origin (e.g. Google Fonts): stale-while-revalidate, best-effort.
  e.respondWith(
    caches.match(req).then((hit) => {
      const net = fetch(req).then((res) => {
        const copy = res.clone();
        caches.open(CACHE).then((c) => c.put(req, copy)).catch(() => {});
        return res;
      }).catch(() => hit);
      return hit || net;
    })
  );
});
