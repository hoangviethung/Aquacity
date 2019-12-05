import Tab from './lib/tab';
import FullPage from "./lib/fullpage";
import ImageMapCanvas from "./lib/ImageMapCanvas";
import Swiper from "../../bower_components/swiper/package/js/swiper.esm.browser.bundle";
import Loading from "./lib/loading";


const getSVGImage = () => {
	return Array.prototype.map.call(document.querySelectorAll('.svg-image'), item => {
		return new Promise((resolve, reject) => {
			const imgUrl = item.getAttribute('data-src');
			const request = new XMLHttpRequest();
			request.open('GET', imgUrl)
			request.onload = data => {
				item.parentElement.innerHTML = data.srcElement.response;
				resolve();
			}
			request.send();
		})
	})
}

const fullpage = () => {
	// const device = navigator.platform.includes('Win32') || navigator.platform.includes('MacIntel');
	if (window.innerWidth >= 1025) {
		if (document.getElementById('fullpage')) {
			const fullpage = new FullPage('#fullpage', {
				section: '.section',
				titles: true,
				on: {
					init: function() {
						getSVGImage();
					},
					afterRunEffect: function() {
						if (document.getElementById('js-page-verify').getAttribute('class') === 'index-page') {
							document.querySelector('header .header-nav-icon').classList.remove('active');
							document.querySelector('.section .frame-1 .button-toggle').classList.remove('active');
							document.querySelector('.section .frame-2').classList.remove('active');
						}
					}
				}
			});

			if (document.getElementById('js-page-verify').getAttribute('class') === 'index-page') {
				document.querySelector('#widget-left .subscribe').addEventListener('click', e => {
					e.preventDefault();
					const currentSection = document.querySelector('.fp-section[fp-active="1"]');
					const currentPosition = currentSection.getAttribute('fp-index');
					const contactSection = document.querySelector('.fp-section[fp-index="8"]');
					const contactPosition = contactSection.getAttribute('fp-index');

					if (currentPosition < contactPosition) {
						fullpage.runEffect(currentSection, contactSection, 'down');
					}
					if (currentPosition > contactPosition) {
						fullpage.runEffect(currentSection, contactSection, 'up');
					}
				})
			}
		}
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
	imageMap_2.customLabel();

	// Custom Canvas
	const imageMap_3 = new ImageMapCanvas('.area-2 .imgMapCanvas');
}

const changeMapByTime = () => {
	const section3 = document.getElementById('sec-3');
	if (section3) {
		Array.from(section3.querySelectorAll('.tab-titles .tab-title')).forEach(item => {
			item.addEventListener('click', () => {
				section3.querySelector(`.img .road-path.active`).classList.remove('active');
				const itemID = item.getAttribute('toggle-for');
				const pathSVG = section3.querySelector(`.img #${itemID}`);
				pathSVG.classList.add('active');
			})
		})
	}
}

const areaRipple = () => {
	$('.area-4 .img').ripples({
		resolution: 350,
		perturbance: 0.01,
		interactive: false,
	});
	setInterval(function() {
		var $el = $('.area-4 .img');
		var x = Math.random() * $el.outerWidth();
		var y = Math.random() * $el.outerHeight();
		var dropRadius = 20;
		var strength = 0.04 + Math.random() * 0.04;

		$el.ripples("drop", x, y, dropRadius, strength);
	}, 1000);
}

// ==> Call functions here
document.addEventListener('DOMContentLoaded', () => {
	// GGMapInit();
	if (window.innerWidth >= 1025) {
		document.querySelector('body').setAttribute('style', `overflow: hidden`)
	}
	const className = document.getElementById('js-page-verify').getAttribute('class');
	document.querySelector('body').classList.add(className);
	Promise.all(getSVGImage()).then(() => {
		fullpage();
		Loading();
		sectionVitriTab();
		activeFrame2Section4();
		sliderSection7();
		imageMapCanvas();
		changeMapByTime();
		areaRipple();
	})
});