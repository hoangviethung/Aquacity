const Loading = () => {
	return new Promise((resolve, reject) => {

		let loading = document.getElementById('loading');
		let progress = document.getElementById('progress');
		let progressStat = document.getElementById('progstat');
		let images = document.images;
		let imagesLength = images.length;
		let counter = 0;

		const turnOffLoadingScreen = () => {
			loading.style.opacity = '0';
			setTimeout(function() {
				loading.style.display = 'none';
				loading.parentNode.removeChild(loading);
				resolve();
			}, 800)
		};

		const progressing = () => {
			let n = 100 / imagesLength * (counter += 1);
			if (progress.style.width = `${n}`, progressStat.innerHTML = `${n}`, counter === imagesLength) {
				setTimeout(() => {
					return turnOffLoadingScreen();
				}, 2400);
			}
		};

		if (loading) {
			if (imagesLength === 0) {
				return turnOffLoadingScreen();
			} else {
				for (let i = 0; i < imagesLength; i++) {
					let img = new Image;
					img.onload = progressing;
					img.onerror = progressing;
					img.src = images[i].src
				}
			}
		}
	})
};

export default Loading;