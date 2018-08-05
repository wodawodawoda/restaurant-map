self.addEventListener('install', e => {
	console.log('installaction')
})

self.addEventListener('fetch', e => {
	console.log('fetch')
})
