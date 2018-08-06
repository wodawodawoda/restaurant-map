const staticCacheName = "restaurant-map-v2"
//asdadaasfsss
self.addEventListener('install', e => {
	console.log('elomordo')
	const urlsCache = [
		'/',
		'css/styles.css',
		'css/restaurantPage.css',
		'js/main.js',
		'js/dbhelper.js',
		'js/restaurant_info.js',
		'https://unpkg.com/leaflet@1.3.1/dist/leaflet.js',
		'https://unpkg.com/leaflet@1.3.1/dist/leaflet.css',
		'data/restaurants.json',
	]
	e.waitUntil(
			caches.open(staticCacheName)
					.then(cache => {
						cache.addAll(urlsCache)
					})
					.catch(console.error)
	)
})

self.addEventListener('fetch', e => {
	e.respondWith(
			caches.match(e.request)
					.then(res => {
						if(res) return res
						e.waitUntil(
								caches.open(staticCacheName)
										.then(cache => cache.add(e.request.url))
						)
						return fetch(e.request)
					})
					.catch(err => new Response(err))
	)
})

self.addEventListener('message', e => {
	if(e.data.action) {
		self.skipWaiting();
	}
})
