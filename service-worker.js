const CACHE_NAME = 'v1-cache';
const urlsToCache = [
  './',
  './index.html',
  './styles.css',  // 若你有獨立的 CSS 檔
  './script.js'    // 若你有獨立的 JS 檔
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
  );
});

if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('service-worker.js')
      .then(function(registration) {
        console.log('Service Worker 註冊成功：', registration.scope);
      })
      .catch(function(err) {
        console.log('Service Worker 註冊失敗：', err);
      });
  });
}


// 更新 service worker 時可進一步加入邏輯移除舊快取
