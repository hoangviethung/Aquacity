import FullPage from "./fullpage";
import {
	Tab
} from '../../vendors/tab';
import Swiper from "swiper";
import Loading from "../../vendors/loading";
// export for others scripts to use
// import GGMapInit from "../../vendors/map";

const homepageAnimation = () => {
	const fullpage = () => {
		const device = navigator.platform.includes('Win32') || navigator.platform.includes('MacIntel');
		if (window.innerWidth >= 1025 && device) {
			if (document.getElementById('fullpage')) {
				return new FullPage('#fullpage', {
					selector: '.fp-section',
					navigator: '#fullpage-navigation',
				});
			}
		} else {
			return void(0);
		}
	}

	const sectionVitriTab = () => {
		return new Tab('#sec-3 .tab-container');
	}

	const activeFrame2Section4 = () => {
		const btnToggle = document.querySelector('#sec-4 .frame-1 .button-toggle');
		if (btnToggle) {
			btnToggle.addEventListener('click', () => {
				btnToggle.classList.toggle('active');
				document.querySelector('#sec-4 .frame-2').classList.toggle('active');
				document.querySelector('header .header-nav-icon').classList.toggle('active');
			})
		}
	}

	const sliderSection7 = () => {
		if (document.getElementById('sec-7')) {
			if (window.innerWidth >= 1025) {
				return new Swiper('#sec-7 .swiper-container', {
					slidesPerView: 3,
					observer: true,
					observeParents: true,
					spaceBetween: 10,
					loop: true,
					on: {
						init: function() {
							Array.from(document.querySelectorAll('#sec-7 .video-items .item')).forEach(item => {
								item.addEventListener('click', () => {
									const url = item.querySelector('a').getAttribute('data-href');
									const imgUrl = item.querySelector('.img img').getAttribute('src')

									document.querySelector('#sec-7 .video-block>a').setAttribute('href', url);
									document.querySelector('#sec-7 .video-block>a>img').setAttribute('src', imgUrl);
								})
							})
						}
					}
				})
			} else {
				let tempHTML = '';
				Array.from(document.querySelectorAll('#sec-7 .video-items .item')).forEach(item => {
					const url = item.querySelector('a').getAttribute('data-href');
					item.querySelector('a').setAttribute('href', url)
					item.querySelector('a').setAttribute('data-fancybox', '')
					tempHTML += item.outerHTML.toString();
				})
				document.querySelector('#sec-7 .video-items').innerHTML = tempHTML;
			}
		}
	}

	(() => {
		fullpage();
		sectionVitriTab();
		activeFrame2Section4();
		sliderSection7();
	})();
}

const imageMap = () => {
	$('map').imageMapResize();
	Array.from(document.querySelectorAll('area')).forEach(item => {
		const marker = document.createElement('div');
		const infoMarker = document.createElement('div');
		marker.classList.add('marker');
		infoMarker.classList.add('info-marker');
		item.addEventListener('click', e => {
			e.preventDefault();
		})
		item.addEventListener('mouseenter', e => {
			const mouseEnterHandler = () => {
				infoMarker.classList.remove('active');
				infoMarker.setAttribute('style', "");
				return new Promise((resolve, reject) => {
					let boxSize;
					if (window.innerWidth >= 1660) {
						boxSize = 450;
					} else {
						boxSize = 350;
					}
					const size = Number(item.getAttribute('coords').split(',')[2]);
					const top = Number(item.getAttribute('coords').split(',')[1]);
					const left = Number(item.getAttribute('coords').split(',')[0]);
					const img = document.createElement('img');
					const imageUrl = item.getAttribute('href');
					const offsetTop = document.querySelector('.imgmap').getBoundingClientRect().top;
					img.setAttribute('src', imageUrl);
					infoMarker.innerHTML = img.outerHTML
					marker.setAttribute('style', `
						top: ${top - (size * 0.95) + offsetTop + 0.5}px;
						left: ${left - (size * 0.95)}px;
						width: ${size * 2}px;
						height: ${size * 2}px;
					`);
					if (left - (size * 0.95) + 50 <= Number(window.innerWidth - boxSize - 60)) {
						infoMarker.setAttribute('style', `
						top: ${top - (size * 0.95) + offsetTop}px;
						left: ${left - (size * 0.95)}px;
						margin-left: 50px;
						transform-origin: 0 0;
					`);
					} else {
						infoMarker.setAttribute('style', `
						top: ${top - (size * 0.95) + offsetTop}px;
						left: ${left - (size * 0.95) + 50 - boxSize}px;
						margin-left: -${50 + size}px;
						transform-origin: 100% 0;
					`);
					}
					document.querySelector('body').append(marker);
					document.querySelector('body').append(infoMarker);

					resolve();
				})
			}

			mouseEnterHandler().then(() => {
				setTimeout(() => {
					infoMarker.classList.add('active');
				}, 50);
			});
		});

		item.addEventListener('mouseout', e => {
			marker.parentNode.removeChild(marker);
			infoMarker.parentNode.removeChild(infoMarker);
			infoMarker.classList.remove('active');
		})
	})
}

// ==> Call functions here
document.addEventListener('DOMContentLoaded', () => {
	// GGMapInit();
	imageMap();
	homepageAnimation();
	objectFitImages('.ofcv');
	objectFitImages('.ofct');
	// Loading();
});