import {
	gsap
} from "../../bower_components/gsap/esm/index.js";
import Header from "./lib/Header";
import Tab from './lib/Tab';
import Loading from "./lib/Loading";
import FullPage from "./lib/Fullpage";
import ImageMapCanvas from "./lib/ImageMapCanvas";

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
	let fullpage
	if (document.getElementById('fullpage')) {
		if (window.innerWidth >= 1025) {
			fullpage = new FullPage('#fullpage', {
				section: '.section',
				titles: true,
				on: {
					init: function() {
						getSVGImage();
					},
					afterRunEffect: function() {
						const currentIndex = Number(document.querySelector('#fullpage [fp-active="1"]').getAttribute('fp-index'));
						Array.prototype.forEach.call(document.querySelectorAll('.header-nav-wrapper nav a'), (ele, eleIndex) => {
							ele.classList.remove('active');
						})
						Array.from(document.querySelectorAll('.header-nav-wrapper nav a'))[currentIndex].classList.add('active');
						if (document.getElementById('js-page-verify').getAttribute('class') === 'index-page') {
							document.querySelector('header .header-nav-icon').classList.remove('active');
							document.querySelector('.section .frame-1 .button-toggle').classList.remove('active');
							document.querySelector('.section .frame-2').classList.remove('active');
						}
						localStorage.removeItem('isScroll');
						localStorage.removeItem('nextIndex');
						customFancybox(fullpage)
					}
				}
			});

			if (document.getElementById('js-page-verify').getAttribute('class') === 'index-page') {
				const callback = () => {
					localStorage.removeItem('isScroll');
					localStorage.removeItem('nextIndex');
					const currentIndex = Number(document.querySelector('#fullpage [fp-index="0"]').getAttribute('fp-index'));
					Array.prototype.forEach.call(document.querySelectorAll('.header-nav-wrapper nav a'), (ele, eleIndex) => {
						ele.classList.remove('active');
					})
					Array.from(document.querySelectorAll('.header-nav-wrapper nav a'))[currentIndex].classList.add('active');
					if (document.getElementById('js-page-verify').getAttribute('class') === 'index-page') {
						document.querySelector('header .header-nav-icon').classList.remove('active');
						document.querySelector('.section .frame-1 .button-toggle').classList.remove('active');
						document.querySelector('.section .frame-2').classList.remove('active');
					}
				}

				if (localStorage.getItem('isScroll')) {
					if (localStorage.getItem('nextIndex') != 0) {
						const targetIndex = localStorage.getItem('nextIndex');
						const targetSection = document.querySelector(`.fp-section[fp-index="${targetIndex}"]`);
						const currentSection = document.querySelector(`.fp-section[fp-index="0"]`);
						fullpage.runEffect(currentSection, targetSection, 'down', callback);
						localStorage.removeItem('isScroll');
						localStorage.removeItem('nextIndex');
					}
				}

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
			};
		}
		Header(gsap, fullpage);
	}
}

const sectionVitriTab = () => {
	return new Tab('#sec-3 .tab-container', {
		isResponsive: false,
	});
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
	const imageMap_4 = new ImageMapCanvas('.area-3 .imgMapCanvas');
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

const setLinkDownload = () => {
	const className = document.getElementById('js-page-verify').getAttribute('class');
	if (className.includes('stella-page')) {
		document.querySelector('#widget-left .download').setAttribute('href', 'https://drive.google.com/file/d/1Wz2ra8qI1h5HWfWJsdLDC75YKsP72V9D/view')
	}
}

const customFancybox = param => {
	$('[data-fancybox]').not('.popup-fronts .btn-viewmore').not('.area-3 area').fancybox({
		hash: false,
		closeExisting: true,
		btnTpl: {
			close: '<button data-fancybox-close class="fancybox-button fancybox-button--close" title="{{CLOSE}}">' + '<svg xmlns="http://www.w3.org/2000/svg" width="55.37" height="56.06" viewBox="0 0 55.37 56.06"><defs><style>.cls-1 {fill: #4c8343;stroke: #4c8343;stroke-width: 3px;fill-rule: evenodd;}</style></defs><path class="cls-1" d="M3764.5,4309.98l5.25,5.25-46.52,46.52-5.25-5.25Z" transform="translate(-3716.16 -4308.47)"/><path id="Shape_774_copy" data-name="Shape 774 copy" class="cls-1" d="M3770.02,4357.71l-5.31,5.31-47.06-47.07,5.3-5.3Z" transform="translate(-3716.16 -4308.47)"/></svg>' + "</button>",
		},
		beforeLoad: function() {
			if (param) {
				param.canBeScrolled = false;
			}
		},
		afterClose: function() {
			if (param) {
				param.canBeScrolled = true;
			}
		}
	})

	// .fancybox({
	// 	animationDuration: 800,
	// 	animationEffect: 'zoom-in-out',
	// 	beforeShow: function() {
	// 		console.log($(this));
	// 	}
	// })
	$('.popup-fronts .btn-viewmore').on('click', function() {
		const index = Number($(this).attr('index'));
		const src = $(this).attr('data-src');
		$.fancybox.open({
			src: src,
			type: 'inline',
			opts: {
				hash: false,
				closeExiting: true,
				animationDuration: 800,
				parentEl: 'main',
				smallBtn: "auto",
				touch: false,
				animationEffect: 'zoom-in-out',
				beforeLoad: function() {
					if (param) {
						param.canBeScrolled = false;
					}
				},
				afterLoad: function(instance, current) {
					$('.popup-fronts .list-items .item').eq(index).trigger('click')
				},
				afterClose: function() {
					if (param) {
						param.canBeScrolled = true;
					}
				}
			}
		})
	})
	$('.area-3 area').on('click', function() {
		const index = Number($(this).attr('index'));
		const src = $(this).attr('data-src');
		$.fancybox.open({
			src: src,
			type: 'inline',
			opts: {
				hash: false,
				closeExiting: true,
				animationDuration: 800,
				parentEl: 'main',
				smallBtn: "auto",
				touch: false,
				animationEffect: 'zoom-in-out',
				beforeLoad: function() {
					if (param) {
						param.canBeScrolled = false;
					}
				},
				afterLoad: function(instance, current) {
					$('.popup-fronts .list-items .item').eq(index).trigger('click')
				},
				afterClose: function() {
					if (param) {
						param.canBeScrolled = true;
					}
				}
			}
		})
	})
}

const Area4TabFronts = () => {
	return new Tab('#popup-fronts .tab-container')
}

const ripple1 = () => {
	try {
		$('.area-4 .col-md-auto.img').ripples({
			resolution: 360,
			perturbance: 0.01,
			interactive: false
		})
	} catch (err) {}
	setInterval(function() {
		var $el = $('.area-4 .col-md-auto.img');
		var x = Math.random() * $el.outerWidth();
		var y = Math.random() * $el.outerHeight();
		var dropRadius = 30;
		var strength = 0.04 + Math.random() * 0.04;
		$el.ripples("drop", x, y, dropRadius, strength);
	}, 2000);
}

const ripple2 = () => {
	try {
		$('.area-6 .img').ripples({
			resolution: 360,
			perturbance: 0.01,
			interactive: false
		})
	} catch (error) {
		console.log(error);

	}
	setInterval(function() {
		var $el = $('.area-6 .img');
		var x = Math.random() * $el.outerWidth();
		var y = Math.random() * $el.outerHeight();
		var dropRadius = 30;
		var strength = 0.04 + Math.random() * 0.04;
		$el.ripples("drop", x, y, dropRadius, strength);
	}, 2000);
}

const sliderArea_1 = () => {
	return new Swiper('.area-1 .swiper-container', {
		slidesPerView: 1,
		navigation: {
			prevEl: '.area-1 .swiper-container .swiper-prev',
			nextEl: '.area-1 .swiper-container .swiper-next'
		},
		pagination: {
			el: '.area-1 .swiper-container .swiper-pagination',
			clickable: true,
			type: 'bullets'
		},
		on: {
			slideChangeTransitionEnd: function() {
				const video = document.querySelector('.area-1 .swiper-container .swiper-slide-active video');
				if (video) {
					video.play();
				} else {
					const video2 = document.querySelector('.area-1 .swiper-container .swiper-slide video');
					video2.pause();
				}
			}
		}
	})
}

// ==> Call functions here
document.addEventListener('DOMContentLoaded', () => {
	// GGMapInit();
	if (window.innerWidth >= 1025) {
		document.querySelector('body').setAttribute('style', `overflow: hidden`)
	}
	const className = document.getElementById('js-page-verify').getAttribute('class');
	document.querySelector('body').classList.add(className);
	fullpage();
	sliderArea_1();
	setLinkDownload();
	sectionVitriTab();
	Area4TabFronts();
	activeFrame2Section4();
	sliderSection7();
	imageMapCanvas();
	changeMapByTime();
	// customFancybox();
	if (window.innerWidth > 1025) {
		ripple1();
		ripple2();
	}
	Loading();
	getSVGImage();
});

export {
	fullpage
}