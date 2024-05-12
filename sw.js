const staticCacheName = "site-static-v1";
const assets = [
  "/",
  "/index.html",
  "/main.js",
  "/css/style.css",
  "/images/day/clear.jpg",
  "/images/day/cloudy.jpg",
  "/images/day/rainy.jpg",
  "/images/day/snowy.jpg",
  "/images/night/clear.jpg",
  "/images/night/cloudy.jpg",
  "/images/night/rainy.jpg",
  "/images/night/snowy.jpg",
  "https://fonts.googleapis.com/css2?family=Rubik:wght@400;700",
  "https://api.openweathermap.org/data/2.5/weather?q=london&appid=d058ddc29a7179b3d84e0300ecf6d7ca",
  "https://api.openweathermap.org/data/2.5/weather?q=pittsburg&appid=d058ddc29a7179b3d84e0300ecf6d7ca",
  "https://api.openweathermap.org/data/2.5/weather?q=paris&appid=d058ddc29a7179b3d84e0300ecf6d7ca",
];
// событие install
self.addEventListener("install", (evt) => {
  evt.waitUntil(
    caches.open(staticCacheName).then((cache) => {
      cache.addAll(assets);
    })
  );
});
// событие activate
self.addEventListener("activate", (evt) => {
  evt.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys
          .filter((key) => key !== staticCacheName)
          .map((key) => caches.delete(key))
      );
    })
  );
});
// событие fetch
self.addEventListener("fetch", (evt) => {
  evt.respondWith(
    caches.match(evt.request).then((cacheRes) => {
      return cacheRes || fetch(evt.request);
    })
  );
});
