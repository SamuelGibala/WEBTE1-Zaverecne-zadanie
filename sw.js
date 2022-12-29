const cache_container = "static_v1";
const files = [
    "index.html",
    "js/game.js",
    "js/swiped-events.min.js",
    "css/style.css",
    "img/auto192x192.png",
    "img/auto256x256.png",
    "img/auto384x384.png",
    "img/auto512x512.png",
    "img/auto_bez_pozadia.png",
    "img/auto_na_ceste.jpg",
    "img/auto_s_konarom.jpg",
    "img/auto_s_kuzelom.jpg",
    "img/auto_v_cieli.jpg",
    "img/auto_v_diere.jpg",
    "img/autoFavicon.jpg",
    "img/back.png",
    "img/cesta.jpg",
    "img/ciel.jpg",
    "img/diera.jpg",
    "img/help.png",
    "img/help2.png",
    "img/help_mark.png",
    "img/help_transparent.png",
    "img/konar.jpg",
    "img/kuzel.jpg",
    "img/next.png",
    "img/play.png",
    "img/play_transparent.png",
    "img/title.png",
    "img/Try.png",
    "json/game.json",
    "manifest.json",
    "README.md"
];

self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(cache_container).then(cache => {
            return cache.addAll(files)
        })
    )
})

self.addEventListener('activate', function(event) {
    console.log("service worker activated", event)
})
self.addEventListener('fetch', function(event){
   console.log(`intercepting fetch request for: ${event.request.url}`);
});
