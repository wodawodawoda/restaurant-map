if('serviceWorker' in navigator) {
	navigator.serviceWorker.register('/sw.js', { scope: '/' })
			.then(function(reg) {

				if(!navigator.serviceWorker.controller) {
					return console.log('lastest version')
				}

				if(reg.waiting) {
					console.log('There is new version available')

					const popUpInfo = document.createElement('p')
					popUpInfo.innerHTML = '<button>Update</button>'
					popUpInfo.onclick = () => {
						reg.waiting.postMessage({action: 'skipWaiting'})
					}
					return document.body.appendChild(popUpInfo)
				}

				if(reg.installing) {
					progressTracker(reg.installing)
					return console.log('New verion is installing')
				}

				reg.addEventListener('updatefound', e => {
					progressTracker(reg.installing)
					return console.log('New verion is found and installing')
				})

				reg.addEventListener('controllerchange', e => {
					window.location.reload()
				})

				console.log('Service Worker Registered');
			});
	navigator.serviceWorker.ready.then(function(reg) {
		console.log('Service Worker Ready');
	});
}

const progressTracker = (worker) => {
	worker.addEventListener('statechange', e => {
		if(worker.state === 'installed') {
			console.log('Update ready')
		}
	})
}
