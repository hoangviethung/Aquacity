const GGMapInit = () => {
	const mapSelector = document.querySelector('#map');
	const dealerLocatorList = document.querySelector('.dealer-locator-list .list');

	if (mapSelector) {
		let map, itemClicked, markers = [];
		const locations = locationsInput;
		const mapOption = {
			zoom: 12,
			styles: [{
					'featureType': 'administrative',
					'elementType': 'labels.text.fill',
					'stylers': [{
						'color': '#444444',
					}, ],
				},
				{
					'featureType': 'landscape',
					'elementType': 'all',
					'stylers': [{
						'color': '#f2f2f2',
					}, ],
				},
				{
					'featureType': 'poi',
					'elementType': 'all',
					'stylers': [{
						'visibility': 'off',
					}, ],
				},
				{
					'featureType': 'road',
					'elementType': 'all',
					'stylers': [{
							'saturation': -100,
						},
						{
							'lightness': 45,
						},
					],
				},
				{
					'featureType': 'road.highway',
					'elementType': 'all',
					'stylers': [{
						'visibility': 'simplified',
					}, ],
				},
				{
					'featureType': 'road.arterial',
					'elementType': 'labels.icon',
					'stylers': [{
						'visibility': 'off',
					}, ],
				},
				{
					'featureType': 'transit',
					'elementType': 'all',
					'stylers': [{
						'visibility': 'off',
					}, ],
				},
				{
					'featureType': 'water',
					'elementType': 'all',
					'stylers': [{
							'color': '#0c6db5',
						},
						{
							'visibility': 'on',
						},
					],
				},
			],
		};

		const infoWindow = new google.maps.InfoWindow();

		const addMarkers = () => {
			const bounds = new google.maps.LatLngBounds();
			locations.forEach((location, index) => {
				let locationLatLng = new google.maps.LatLng(location.lat, location.lng);
				let marker = new google.maps.Marker({
					map: map,
					title: location.name,
					position: locationLatLng,
					icon: './assets/icons/marker-icon.svg',
				});
				bounds.extend(marker.position);
				markers.push(marker);
				showInfoMarkerOnMap(marker, index);
			});

			map.fitBounds(bounds);
		};

		const showInfoMarkerOnMap = (marker, index) => {
			google.maps.event.addListener(marker, 'click', function() {
				infoWindow.setContent(`
					<h3>${locations[index].name}</h3>
					<p>${locations[index].address}</p>
					<p>${locations[index].phone}</p>
				`);
				itemClicked = index;
				infoWindow.open(map, marker);
				map.panTo(marker.getPosition());
				map.setZoom(12);
			})
		};

		const getLocationList = () => {
			if (dealerLocatorList) {
				dealerLocatorList.innerHTML = '';
				markers.forEach((marker, index) => {
					if (map.getBounds().contains(marker.getPosition())) {
						const newMarker = document.createElement('div');
						newMarker.classList.add('dealer-locator-item');
						newMarker.innerHTML = `
							<h3>${locations[index].name}</h3>
							<p>${locations[index].address}</p>
							<p>${locations[index].phone}</p>
						`;
						newMarker.setAttribute('marker-id', `${index}`);
						newMarker.addEventListener('click', () => {
							itemClicked = index;
							const markerIndex = newMarker.getAttribute('marker-id');
							google.maps.event.trigger(markers[markerIndex], 'click');
						});
						dealerLocatorList.appendChild(newMarker);
					}
				});
			}
		};

		// const searchLocation = () => {
		// 	var map = new google.maps.Map(document.getElementById('map'), {
		// 		center: {
		// 			lat: -33.8688,
		// 			lng: 151.2195
		// 		},
		// 		zoom: 13,
		// 		mapTypeId: 'roadmap'
		// 	});

		// 	// Create the search box and link it to the UI element.
		// 	var input = document.getElementById('pac-input');
		// 	var searchBox = new google.maps.places.SearchBox(input);
		// 	map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

		// 	// Bias the SearchBox results towards current map's viewport.
		// 	map.addListener('bounds_changed', function() {
		// 		searchBox.setBounds(map.getBounds());
		// 	});

		// 	var markers = [];
		// 	// Listen for the event fired when the user selects a prediction and retrieve
		// 	// more details for that place.
		// 	searchBox.addListener('places_changed', function() {
		// 		var places = searchBox.getPlaces();

		// 		if (places.length == 0) {
		// 			return;
		// 		}

		// 		// Clear out the old markers.
		// 		markers.forEach(function(marker) {
		// 			marker.setMap(null);
		// 		});
		// 		markers = [];

		// 		// For each place, get the icon, name and location.
		// 		var bounds = new google.maps.LatLngBounds();
		// 		places.forEach(function(place) {
		// 			if (!place.geometry) {
		// 				console.log("Returned place contains no geometry");
		// 				return;
		// 			}
		// 			var icon = {
		// 				url: place.icon,
		// 				size: new google.maps.Size(71, 71),
		// 				origin: new google.maps.Point(0, 0),
		// 				anchor: new google.maps.Point(17, 34),
		// 				scaledSize: new google.maps.Size(25, 25)
		// 			};

		// 			// Create a marker for each place.
		// 			markers.push(new google.maps.Marker({
		// 				map: map,
		// 				icon: icon,
		// 				title: place.name,
		// 				position: place.geometry.location
		// 			}));

		// 			if (place.geometry.viewport) {
		// 				// Only geocodes have viewport.
		// 				bounds.union(place.geometry.viewport);
		// 			} else {
		// 				bounds.extend(place.geometry.location);
		// 			}
		// 		});
		// 		map.fitBounds(bounds);
		// 	});
		// }

		const initialize = () => {
			map = new google.maps.Map(mapSelector, mapOption);
			addMarkers();
			let listener = google.maps.event.addListener(map, 'idle', () => {
				if (map.getZoom() > 12) {
					map.setZoom(12);
				}
				google.maps.event.removeListener(listener);
			});
			google.maps.event.addListener(map, 'bounds_changed', getLocationList);
		};

		google.maps.event.addDomListener(window, 'load', initialize);
	}
};

export default GGMapInit;