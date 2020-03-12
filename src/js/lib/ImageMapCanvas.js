export default function() {
	const setSizeCanvas = (mapImage, canvas) => {
		const width = mapImage.clientWidth;
		const height = mapImage.clientHeight;
		canvas.setAttribute('width', width);
		canvas.setAttribute('height', height);
	}

	const clearCanvas = (canvasContext, canvas) => {
		canvasContext.clearRect(0, 0, canvas.width, canvas.height);
	}

	const mapElements = Array.from(document.querySelectorAll('.imgMapCanvas'))

	for (let mapElement of mapElements) {
		const map = mapElement.querySelector('map');
		const canvas = mapElement.querySelector('canvas');
		const canvasContext = canvas.getContext("2d");
		const mapImage = mapElement.querySelector('img');
		const imageUrl = mapImage.getAttribute('src');
		const areas = Array.from(map.querySelectorAll('area'))
		const dataCanvas = mapElement.getAttribute('data-canvas')

		// Initialize map canvas
		imageMapResize();
		// Set background 
		canvas.style.backgroundImage = `url('${imageUrl}')`;
		canvas.classList.add('background-added');
		// Set size for canvas
		setSizeCanvas(mapImage, canvas)
		// Re-initialize canvas when window resize
		window.addEventListener('resize', () => {
			clearCanvas(canvasContext, canvas)
			setSizeCanvas(mapImage, canvas);
		})

		// Draw Canvas and some effects
		const drawMap = () => {
			clearCanvas(canvasContext, canvas);

			areas.forEach(area => {
				if (dataCanvas == 'label') {
					area.addEventListener('mouseenter', (e) => {
						const shape = area.getAttribute('shape');
						const alt = area.getAttribute('alt');
						canvasContext.lineWidth = 3;
						canvasContext.fillStyle = 'rgba(7, 65, 76,.4)';
						Array.from(mapElement.querySelectorAll(`area[alt="${alt}"]`)).forEach(item => {
							const coords = item.getAttribute('coords');
							const coordsRef = coords.split(",");
							console.log(coordsRef);
							if (shape === 'poly') {
								canvasContext.strokeStyle = '#e8de8b';
								canvasContext.beginPath();
								canvasContext.moveTo(coordsRef[0], coordsRef[1]);
								for (let i = 0; i < coordsRef.length; i++) {
									if (i % 2 == 0 && i > 1) {
										canvasContext.lineTo(coordsRef[i], coordsRef[i + 1]);
									}
								}
								canvasContext.closePath();
								canvasContext.stroke();
								canvasContext.fill();
							}
							if (shape === 'circle') {
								canvasContext.strokeStyle = 'rgba(7, 65, 76, 1)';
								canvasContext.beginPath();
								canvasContext.arc(coordsRef[0], coordsRef[1], coordsRef[2], 0, 2 * Math.PI);
								canvasContext.closePath();
								canvasContext.stroke();
								canvasContext.fill();
							}
						})
						// set class active
						mapElement.closest('.imagemap-with-list').querySelector(`[data-utilities-target="${e.target.alt}"]`).classList.add('active')
					});
					area.addEventListener('mouseout', (e) => {
						mapElement.closest('.imagemap-with-list').querySelector(`[data-utilities-target="${e.target.alt}"]`).classList.remove('active')
						clearCanvas(canvasContext, canvas);
					})
				} else if (dataCanvas == "auto") {
					const coords = area.getAttribute('coords');
					const coordsRef = coords.split(",");
					let degreeStep = 90 / 100;
					let degree = 0;
					let opacity = 0;
					const getOpacityPeriod = degrees => {
						return Math.abs(Math.sin(degrees * (Math.PI / 180))) * 3 / 2;
					}
					const effect = () => {
						clearCanvas(canvasContext, canvas);
						canvasContext.lineWidth = 2;
						canvasContext.strokeStyle = '#e8de8b';
						canvasContext.opacity = 0.5;
						canvasContext.fillStyle = `rgba(7, 65, 76, ${opacity})`;
						canvasContext.beginPath();
						canvasContext.moveTo(coordsRef[0], coordsRef[1]);
						for (let i = 0; i < coordsRef.length; i++) {
							if (i % 2 == 0 && i > 1) {
								canvasContext.lineTo(coordsRef[i], coordsRef[i + 1]);
							}
						}
						canvasContext.closePath();
						canvasContext.stroke();
						canvasContext.fill();
					}
					const autoEffect = setInterval(() => {
						degree += degreeStep;
						opacity = getOpacityPeriod(degree) / 2;
						effect();
					}, 1000 / 200);
				} else {
					area.addEventListener('mouseenter', () => {
						const coords = area.getAttribute('coords');
						const coordsRef = coords.split(",");
						canvasContext.lineWidth = 3;
						canvasContext.strokeStyle = '#e8de8b';
						canvasContext.fillStyle = 'rgba(7, 65, 76,.4)';
						canvasContext.beginPath();
						canvasContext.moveTo(coordsRef[0], coordsRef[1]);
						for (let i = 0; i < coordsRef.length; i++) {
							if (i % 2 == 0 && i > 1) {
								canvasContext.lineTo(coordsRef[i], coordsRef[i + 1]);
							}
						}
						canvasContext.closePath();
						canvasContext.stroke();
						canvasContext.fill();
					})
					area.addEventListener('mouseout', () => {
						clearCanvas(canvasContext, canvas);
					})
				}
			})

			Array.from(document.querySelectorAll('[data-utilities-target]')).forEach(textItem => {
				textItem.addEventListener('mouseenter', () => {
					const alt = textItem.getAttribute('data-utilities-target');
					textItem.classList.add('active')
					Array.from(mapElement.querySelectorAll(`area[alt="${alt}"]`)).forEach(area => {
						const shape = area.getAttribute('shape');
						const coords = area.getAttribute('coords');
						const coordsRef = coords.split(",");
						canvasContext.lineWidth = 3;
						canvasContext.fillStyle = 'rgba(7, 65, 76,.4)';
						if (shape === 'poly') {
							canvasContext.strokeStyle = '#e8de8b';
							canvasContext.beginPath();
							canvasContext.moveTo(coordsRef[0], coordsRef[1]);
							for (let i = 0; i < coordsRef.length; i++) {
								if (i % 2 == 0 && i > 1) {
									canvasContext.lineTo(coordsRef[i], coordsRef[i + 1]);
								}
							}
							canvasContext.closePath();
							canvasContext.stroke();
							canvasContext.fill();
						}
						if (shape === 'circle') {

							canvasContext.strokeStyle = 'rgba(7, 65, 76, 1)';
							canvasContext.beginPath();
							canvasContext.arc(coordsRef[0], coordsRef[1], coordsRef[2], 0, 2 * Math.PI);
							canvasContext.closePath();
							canvasContext.stroke();
							canvasContext.fill();
						}
					})
				})

				textItem.addEventListener('mouseout', () => {
					textItem.classList.remove('active')
					clearCanvas(canvasContext, canvas);
				})
			})
		}
		drawMap();
	}
}