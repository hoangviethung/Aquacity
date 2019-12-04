import Tab from './lib/tab';
import FullPage from "./lib/fullpage";
import ImageMapCanvas from "./lib/ImageMapCanvas";
import Swiper from "../../bower_components/swiper/package/js/swiper.esm.browser.bundle";
import Loading from "./lib/loading";

(() => {
	Array.from(document.querySelectorAll('.svg-image')).forEach(item => {
		const imgUrl = item.getAttribute('src');
		const httpRequest = new XMLHttpRequest();
		httpRequest.onload = data => {
			item.parentElement.innerHTML = data.srcElement.response;
		}
		httpRequest.open('GET', imgUrl)
		httpRequest.send();
	})
})()

const fullpage = () => {
	const device = navigator.platform.includes('Win32') || navigator.platform.includes('MacIntel');
	if (window.innerWidth >= 1025 && device) {
		if (document.getElementById('fullpage')) {
			const fullpage = new FullPage('#fullpage', {
				selector: '.fp-section',
				navigator: '#fullpage-navigation',
			});
			const subscribe = document.querySelector('#widget-left .subscribe');
			subscribe.addEventListener('click', e => {
				e.preventDefault();
				const currentSection = document.querySelector('.fp-section[data-active="1"]');
				const currentPosition = currentSection.getAttribute('data-index');
				const contactSection = document.querySelector('.fp-section[data-index="8"]');
				const contactPosition = contactSection.getAttribute('data-index');

				if (currentPosition < contactPosition) {
					fullpage.runEffect(currentSection, contactSection, 'down');
				} else if (currentPosition > contactPosition) {
					fullpage.runEffect(currentSection, contactSection, 'up');
				} else {
					return;
				}
			})
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
		return new Swiper('#sec-7 .swiper-container', {
			slidesPerView: 1,
			observer: true,
			observeParents: true,
			spaceBetween: 10,
			speed: 900,
			loop: true,
			navigation: {
				prevEl: '#sec-7 .video-items .swiper-prev',
				nextEl: '#sec-7 .video-items .swiper-next'
			},
			breakpoints: {
				1025: {
					slidesPerView: 3,
				},
				576: {
					slidesPerView: 2,
				}
			},
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
	}
}

const imageMapCanvas = () => {
	const imageMap_1 = new ImageMapCanvas('#sec-2 .imgMapCanvas');
	const imageMap_2 = new ImageMapCanvas('#sec-5 .imgMapCanvas');
}

const changeMapByTime = () => {
	const section3 = document.getElementById('sec-3');
	Array.from(section3.querySelectorAll('.tab-titles .tab-title')).forEach(item => {
		item.addEventListener('click', () => {
			section3.querySelector(`.img .road-path.active`).classList.remove('active');
			const itemID = item.getAttribute('toggle-for');
			const pathSVG = section3.querySelector(`.img #${itemID}`);
			pathSVG.classList.add('active');
		})
	})
}


// ==> Call functions here
document.addEventListener('DOMContentLoaded', () => {
	// GGMapInit();
	fullpage();
	sectionVitriTab();
	activeFrame2Section4();
	sliderSection7();
	imageMapCanvas();
	changeMapByTime();
	objectFitImages('.ofcv');
	objectFitImages('.ofct');
	Loading();
});