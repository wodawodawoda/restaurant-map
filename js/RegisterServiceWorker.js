if('serviceWorker' in navigator) {
	navigator.serviceWorker.register('/sw.js', { scope: '/' })
			.then(function(reg) {

				if(!navigator.serviceWorker.controller) {
					return console.log('lastest version')
				}

				if(reg.waiting) {
					console.log('There is new version available')

					/**
						* Add update button to DOM
						*/
					const popUpInfo = document.createElement('p')
					popUpInfo.innerHTML = '<button>Update</button>'
					popUpInfo.onclick = () => {
						reg.waiting.postMessage({action: 'skipWaiting'})
					}
					return document.body.appendChild(popUpInfo)
				}

				/**
					* Check if new sw version in installing
					*/
				if(reg.installing) {
					progressTracker(reg.installing)
					return console.log('New verion is installing')
				}

				/**
					* Check for new sw versions
					*/
				reg.addEventListener('updatefound', e => {
					progressTracker(reg.installing)
					return console.log('New verion is found and installing')
				})

				/**
					* Reload on controller change
					*/
				reg.addEventListener('controllerchange', e => {
					window.location.reload()
				})

				console.log('Service Worker Registered');
			});

	navigator.serviceWorker.ready.then(function(reg) {
		console.log('Service Worker Ready');
	});
}

/**
	* Check if new sw version is installed and ready to update
	*/
const progressTracker = (worker) => {
	worker.addEventListener('statechange', e => {
		if(worker.state === 'installed') {
			console.log('Update ready')
		}
	})
}
