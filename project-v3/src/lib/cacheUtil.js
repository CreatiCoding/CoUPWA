const self = {
	cacheImage: (cacheName, ImageReqeust, type) => {
		var myInit = {
			method: "GET",
			headers: {
				"Content-Type": "image/" + type
			},
			mode: "no-cors",
			cache: "default"
		};
		var myRequest = new Request(ImageReqeust);
		return caches.open(cacheName).then(cache => {
			return cache.match(myRequest, myInit).then(function(response) {
				if (response) {
					return response;
				} else {
					return fetch(myRequest, myInit).then(function(response) {
						cache.put(myRequest, response.clone());
						return response;
					});
				}
			});
		});
	}
};

export default self;
