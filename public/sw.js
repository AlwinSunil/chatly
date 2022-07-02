importScripts(
    "https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js"
)

workbox.routing.registerRoute(
    new RegExp(".png$"),
    workbox.strategies.cacheFirst({
        cacheName: "images-cache",
    })
)
