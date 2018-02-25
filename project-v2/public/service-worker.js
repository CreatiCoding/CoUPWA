let cacheName = 'CoUPWA-webtoon-1.0.0';
let filesToCache = [
    '/',
    '/css/open-iconic-bootstrap.css',
    '/css/bootstrap.min.css',
    '/css/swiper.min.css',
    '/css/main.css',
    '/fonts/open-iconic.woff',
    '/js/jquery-1.12.4.min.js',
    '/js/firebase/firebase-app.js',
    '/js/firebase/firebase-auth.js',
    '/js/firebase/firebase-database.js',
    '/js/firebase/firebase-messaging.js',
    '/js/firebase/firebase-storage.js',
    '/js/firebase/init.js',
    '/bundle.js',
    '/bannerImage?num=0',
    '/bannerImage?num=1',
    '/bannerImage?num=2',
    '/bannerImage?num=3',
    '/bannerImage?num=4',
    '/bannerImage?num=5',
    '/getWeekAllToonInfoBySort',
    '/favicon.ico',
    '/images/thumbnail_default.png',
    '/manifest.json',
    '/fonts/GodoM.ttf',
    '/fonts/godoRoundedL.ttf',
    '/images/naver_icon_144.png',
];

self.addEventListener('install', function(e){
	e.waitUntil(caches.open(cacheName).then(function(cache) {
		fetch("/getWeekAllToonInfoBySort").then(function(response) {
			response.json().then(function(a) {
				cache.addAll(a.map(function(ele){
					return "/images?path="+ele.path;
				}).concat(filesToCache));
			});
		});
	}));
});

self.addEventListener('activate', function(e) {
    console.log('[ServiceWorker] Activate', e);
    e.waitUntil(
        caches.keys().then(function(keyList) {
            return Promise.all(
                keyList.map(function(key) {
                    if (key !== cacheName && key !== 'thumbnail') {
                        console.log('[ServiceWorker] Removing old cache', key);
                        return caches.delete(key);
                    }
                })
            );
        })
    );
    return self.clients.claim();
});
self.addEventListener('fetch', function(event) {
        event.respondWith(
            caches.match(event.request).then(function(response) {
                return response || fetch(event.request);
            })
        );
});
