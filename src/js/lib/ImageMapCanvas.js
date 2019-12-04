export default class ImageMapCanvas {

	strokeStyle = '#e8de8b';
	fillColour = 'rgba(7, 65, 76,.25)';
	lineWidth = 5;

	clearAllImageMap = () => {
		this.canvasContext.clearRect(0, 0, this.canvas.width, this.canvas.height);
	}

	drawPolygon = (coords) => {
		// set style
		this.canvasContext.strokeStyle = this.strokeStyle;
		this.canvasContext.fillStyle = this.fillColour;
		this.canvasContext.lineWidth = this.lineWidth;

		const coordsRef = coords.split(",");
		const regionLength = coordsRef.length;
		this.canvasContext.save();
		this.canvasContext.beginPath();
		this.canvasContext.moveTo(coordsRef[0], coordsRef[1]);
		for (let i = 0; i < regionLength; i++) {
			if (i % 2 == 0 && i > 1) {
				this.canvasContext.lineTo(coordsRef[i], coordsRef[i + 1]);
			}
		}
		this.canvasContext.closePath();
		this.canvasContext.stroke();
		this.canvasContext.fill();
		this.canvasContext.restore();
	}

	registerEvents() {
		Array.from(this.map.querySelectorAll('area')).forEach(mapArea => {
			let coords;
			mapArea.addEventListener('mouseover', () => {
				coords = mapArea.getAttribute('coords');
				this.drawPolygon(coords, true);
			});
			mapArea.addEventListener('mouseout', () => {
				this.clearAllImageMap();
			})
		})
	}

	setSizeImageMapCanvas = () => {
		const width = this.canvas.clientWidth;
		const height = this.canvas.clientHeight;
		this.canvas.setAttribute('width', width);
		this.canvas.setAttribute('height', height);
	}

	init() {
		imageMapResize();
		this.canvas.style.backgroundImage = `url('${this.imageUrl}')`;
		this.canvas.classList.add('background-added');
		this.setSizeImageMapCanvas();
		window.addEventListener('resize', () => {
			this.clearAllImageMap();
			this.setSizeImageMapCanvas();
		})
		this.registerEvents();
	}

	constructor(selector, opts) {
		// initialize value
		this.selector = document.querySelector(selector);
		this.map = this.selector.querySelector('map');
		this.canvas = this.selector.querySelector('canvas');
		this.canvasContext = this.canvas.getContext("2d");
		this.mapImage = this.selector.querySelector('img');
		this.imageUrl = this.mapImage.getAttribute('src');

		// Start plugins
		if (this.canvas) {
			this.init();
		}
	}
}