const Loading = () => {
	let loading = document.getElementById('loading');
	let progress = document.getElementById('progress');
	let progressStat = document.getElementById('progstat');
	let images = document.images;
	let imagesLength = images.length;
	let counter = 0;

	const showPage = () => {
		document.querySelector('body').classList.add('show-page');

		// if (document.getElementById('js-page-verify').getAttribute('class') === 'index-page') {
		// 	const isScroll = localStorage.getItem('isScroll');
		// 	const nextIndex = localStorage.getItem('nextIndex');
		// 	const currentIndex = 1;
		// 	console.log(isScroll, nextIndex, currentIndex);
		// 	localStorage.removeItem('isScroll');
		// 	localStorage.removeItem('nextIndex');
		// 	console.log(localStorage.getItem('isScroll'), localStorage.getItem('nextIndex'), currentIndex);
		// }
	}

	const turnOffLoadingScreen = callback => {
		loading.style.opacity = '0';
		setTimeout(function() {
			loading.style.display = 'none';
			loading.parentNode.removeChild(loading);
			return callback();
		}, 800)
	};

	const progressing = () => {
		let n = 100 / imagesLength * (counter += 1);
		if (progress.style.width = `${n}`, progressStat.innerHTML = `${n}`, counter === imagesLength) {
			setTimeout(() => {
				return turnOffLoadingScreen(showPage);
			}, 2400);
		}
	};

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
};

export default Loading;