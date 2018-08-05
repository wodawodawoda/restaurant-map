if('serviceWorker' in navigator) {
	navigator.serviceWorker.register('/sw.js', { scope: '/' })
			.then(function(registration) {
				console.log('Service Worker Registered');
			});
	navigator.serviceWorker.ready.then(function(registration) {
		console.log('Service Worker Ready');
	});
}

// /**
// 	* Register service worker
// 	*/
// navigator.serviceWorker.register('/serviceWorker.js')
// 		.then(res => console.log('Registeration worked'))
// 		.catch(console.error)
//
