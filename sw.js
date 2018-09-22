const CACHE_NAME = "v2";
// const urlsToCache = [
//   "/",
//   "/index.html",
//   "/restaurant.html",
//   "/css/styles.css",
//   "/data/restaurants.json",
//   "/js/dbhelper.js",
//   "/js/main.js",
//   "/js/restaurant_info.js",
//   "/js/sw_register.js",
//   "/img/1.jpg",
//   "/img/2.jpg",
//   "/img/3.jpg",
//   "/img/4.jpg",
//   "/img/5.jpg",
//   "/img/6.jpg",
//   "/img/7.jpg",
//   "/img/8.jpg",
//   "/img/9.jpg",
//   "/img/10.jpg"
// ];

self.addEventListener("install", e => {
  console.log("Service Worker: Installed");

  // e.waitUntil(
  //   caches
  //     .open(CACHE_NAME)
  //     .then(cache => {
  //       console.log("Service Worker: Caching Files");
  //       return cache.addAll(urlsToCache);
  //     })
  //     .catch(error => {
  //       console.log("Cache open failed: ", error);
  //     })
  // );
});

self.addEventListener("activate", e => {
  console.log("Service Worker: Activated");
  e.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            console.log("Service Worker: Clearing Old Cache");
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

self.addEventListener("fetch", e => {
  console.log("Service Worker: Fetching");
  e.respondWith(
    fetch(e.request)
      .then(response => {
        console.log("clone response");
        const resClone = response.clone();

        console.log("open cache");
        caches.open(CACHE_NAME).then(cache => {
          cache.put(e.request, resClone);
        });
        return response;
      })
      .catch(err =>
        caches.match(e.request).then(response => response)
      )
  );
});

// self.addEventListener("fetch", e => {
//   console.log("Service Worker: Fetching");
//   e.respondWith(
//     fetch(e.request).catch(() => caches.match(e.request))
//   );
// });
