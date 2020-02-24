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
				if (item && item.parentElement) {
					item.parentElement.innerHTML = data.srcElement.response;
				}
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
						console.log(this);

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
					}
				}
			});

			customFancybox(fullpage);
			customFancybox2(fullpage);

			document.querySelector('#widget-left .go-first').addEventListener('click', e => {
				e.preventDefault();

				if (document.getElementById('fullpage')) {
					const currentSection = document.querySelector('.fp-section[fp-active="1"]');
					const currentPosition = currentSection.getAttribute('fp-index');
					const contactSection = document.querySelector('.fp-section[fp-index="0"]');
					const contactPosition = contactSection.getAttribute('fp-index');

					if (currentPosition < contactPosition) {
						fullpage.runEffect(currentSection, contactSection, 'down');
					}
					if (currentPosition > contactPosition) {
						fullpage.runEffect(currentSection, contactSection, 'up');
					}
				}
			})

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


			if (document.getElementById('js-page-verify').getAttribute('class') === 'gallery-page') {

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


				if (localStorage.getItem('isScroll') && Number(localStorage.getItem('nextIndex')) <= Array.from(document.querySelectorAll('#fullpage .section')).length) {
					if (localStorage.getItem('nextIndex') != 0) {
						const targetIndex = localStorage.getItem('nextIndex');
						const targetSection = document.querySelector(`.fp-section[fp-index="${targetIndex}"]`);
						const currentSection = document.querySelector(`.fp-section[fp-index="0"]`);
						fullpage.runEffect(currentSection, targetSection, 'down', callback);
						localStorage.removeItem('isScroll');
						localStorage.removeItem('nextIndex');
					}
				}
			}
		}
		Header(gsap, fullpage);
	} else {

		Header(gsap);
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

	const imageMap_5 = new ImageMapCanvas('.villas-2 .imgMapCanvas');
	const imageMap_6 = new ImageMapCanvas('.villas-3 .imgMapCanvas');
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
	$('.area-3 area, .area-3 .fronts-list .item a').on('click', function() {
		const index = Number($(this).attr('index'));
		$.fancybox.open({
			src: '#popup-fronts',
			type: 'inline',
			opts: {
				hash: false,
				closeExisting: true,
				animationDuration: 800,
				smallBtn: "auto",
				touch: false,
				animationEffect: 'zoom-in-out',
				beforeLoad: function() {
					if (param) {
						param.canBeScrolled = false;
					}
				},
				beforeShow: function(instance, current) {
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

	$('.popup-fronts .btn-viewmore').on('click', function() {
		const src = $(this).attr('data-src');
		$.fancybox.open({
			src: src,
			type: 'inline',
			opts: {
				hash: false,
				closeExisting: true,
				animationDuration: 800,
				smallBtn: "auto",
				touch: false,
				animationEffect: 'zoom-in-out',
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
			}
		})
	})
}

const customFancybox2 = param => {
	$('.villas-3 area, .villas-3 .fronts-list .item a').on('click', function() {
		const index = Number($(this).attr('index'));
		$.fancybox.open({
			src: '#popup-villas3',
			type: 'inline',
			opts: {
				hash: false,
				closeExisting: true,
				animationDuration: 800,
				smallBtn: "auto",
				touch: false,
				animationEffect: 'zoom-in-out',
				beforeLoad: function() {
					if (param) {
						param.canBeScrolled = false;
					}
				},
				beforeShow: function(instance, current) {
					$('.villas-3 .list-items .item').eq(index).trigger('click')
				},
				afterClose: function() {
					if (param) {
						param.canBeScrolled = true;
					}
				}
			}
		})
	})

	$('.villas-3 .btn-viewmore').on('click', function() {
		const src = $(this).attr('data-src');
		$.fancybox.open({
			src: src,
			type: 'inline',
			opts: {
				hash: false,
				closeExisting: true,
				animationDuration: 800,
				smallBtn: "auto",
				touch: false,
				animationEffect: 'zoom-in-out',
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
			}
		})
	})

	$('.villas-5 .btn-discover').fancybox({
		hash: false,
		closeExisting: true,
		animationDuration: 800,
		smallBtn: "auto",
		touch: false,
		animationEffect: 'zoom-in-out',
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
}

const Area4TabFronts = () => {
	const tab1 = new Tab('#popup-fronts .tab-container');
	const tab2 = new Tab('#popup-villas3 .tab-container');
}

const ripple1 = () => {
	try {
		$('.area-4 .col-md-auto.img').ripples({
			resolution: 256,
			perturbance: 0.01,
			interactive: false
		})
		setInterval(function() {
			var $el = $('.area-4 .col-md-auto.img');
			var x = Math.random() * $el.outerWidth();
			var y = Math.random() * $el.outerHeight();
			var dropRadius = 30;
			var strength = 0.04 + Math.random() * 0.04;
			$el.ripples("drop", x, y, dropRadius, strength);
		}, 3000);
	} catch (err) {}
}

const ripple2 = () => {
	try {
		$('.area-6 .img').ripples({
			resolution: 256,
			perturbance: 0.01,
			interactive: false
		})
		setInterval(function() {
			var $el = $('.area-6 .img');
			var x = Math.random() * $el.outerWidth();
			var y = Math.random() * $el.outerHeight();
			var dropRadius = 30;
			var strength = 0.04 + Math.random() * 0.04;
			$el.ripples("drop", x, y, dropRadius, strength);
		}, 3000);
	} catch (error) {}
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

const villasSlider1 = () => {
	const slider1 = new Swiper('.villas-6 .title-slider .swiper-container', {
		observer: true,
		observeParents: true,
		slidesPerView: 1,
		autoplay: {
			delay: 3000,
			disableOnInteraction: false,
		},
		speed: 1200,
		loop: true,
		navigation: {
			prevEl: '.villas-6 .title-slider .swiper-prev',
			nextEl: '.villas-6 .title-slider .swiper-next'
		}
	});
	const slider2 = new Swiper('.villas-6 .info-slider .swiper-container', {
		observer: true,
		observeParents: true,
		slidesPerView: 1,
		autoplay: {
			delay: 2500,
			disableOnInteraction: false,
		},
		speed: 1700,
		loop: true,
		navigation: {
			prevEl: '.villas-6 .info-slider .swiper-prev',
			nextEl: '.villas-6 .info-slider .swiper-next'
		}
	})
}

const villasSlider2 = () => {
	const slider1 = new Swiper('.villas-7 .title-slider .swiper-container', {
		observer: true,
		observeParents: true,
		slidesPerView: 1,
		autoplay: {
			delay: 3000,
			disableOnInteraction: false,
		},
		speed: 1200,
		loop: true,
		navigation: {
			prevEl: '.villas-7 .title-slider .swiper-prev',
			nextEl: '.villas-7 .title-slider .swiper-next'
		}
	});
	const slider2 = new Swiper('.villas-7 .info-slider .swiper-container', {
		observer: true,
		observeParents: true,
		slidesPerView: 1,
		autoplay: {
			delay: 2500,
			disableOnInteraction: false,
		},
		speed: 1700,
		loop: true,
		navigation: {
			prevEl: '.villas-7 .info-slider .swiper-prev',
			nextEl: '.villas-7 .info-slider .swiper-next'
		}
	})
}

const galleryImage = () => {
	const image = new Swiper('.section-gallery-image .swiper-container', {
		slidesPerView: 1,
		loop: true,
		spaceBetween: 70,
		loopAdditionalSlides: 2,
		centeredSlides: true,
		autoplay: {
			delay: 3400,
			disableOnInteraction: false,
		},
		speed: 1100,
		observeParents: true,
		observer: true,
		navigation: {
			prevEl: '.section-gallery-image .image-slider .swiper-prev',
			nextEl: '.section-gallery-image .image-slider .swiper-next',
		},
	});
	const video = new Swiper('.section-gallery-video .swiper-container', {
		slidesPerView: 1,
		loop: true,
		spaceBetween: 70,
		loopAdditionalSlides: 2,
		centeredSlides: true,
		autoplay: {
			delay: 3400,
			disableOnInteraction: false,
		},
		speed: 1100,
		observeParents: true,
		observer: true,
		navigation: {
			prevEl: '.section-gallery-video .video-slider .swiper-prev',
			nextEl: '.section-gallery-video .video-slider .swiper-next',
		},
	});

	$('.section-gallery-video .video-slider .video-item[data-href]').fancybox({
		closeExisting: true,
		hash: false,
	})
}

const brochureSlider = () => {
	return new Swiper('.section-brochure-list .swiper-container', {
		slidesPerView: 1,
		spaceBetween: 90,
		speed: 1000,
		loop: true,
		breakpoints: {
			1025: {
				slidesPerView: 2,
			},
		},
		navigation: {
			prevEl: ".section-brochure-list .swiper-prev",
			nextEl: ".section-brochure-list .swiper-next"
		}

	})
}

const generateFormLienHeTrangIndex = () => {
	const checkIdDom = document.getElementById('js-page-verify');
	if (checkIdDom) {
		const checkIndexPage = Array.from(checkIdDom.classList);
		if (checkIndexPage.includes('index-page')) {
			const formIndex9 = document.querySelector('#sec-9 form').outerHTML;
			document.querySelector('#form-register-now').innerHTML = formIndex9;
		}
	}
	$('#btn-register-now .btn-register-now').on('click', (e) => {
		console.log(1);

		$.fancybox.open({
			src: '#form-register-now',
			type: 'inline',
			opts: {
				closeExisting: true,
				hash: false
			}
		})
	})
	// setTimeout(() => {
	// 	$.fancybox.open({
	// 		src: '#form-register-now',
	// 		type: 'inline',
	// 		opts: {
	// 			closeExisting: true,
	// 			hash: false
	// 		}
	// 	})
	// }, 62000);
}


const newsRelatedSlider = () => {

	if (window.innerWidth > 1024) {
		const swiperContainer = document.createElement('div');
		const swiperWrapper = document.createElement('div');
		swiperContainer.classList.add('swiper-container');
		swiperWrapper.classList.add('swiper-wrapper');

		const newsItems = Array.from(document.querySelectorAll('.news-related .news-item'));
		const newsItemsWrapper = document.querySelector('.news-related .news-items');
		newsItems.forEach(item => {
			const swiperSlide = document.createElement('div');
			swiperSlide.classList.add('swiper-slide');
			swiperSlide.append(item);
			swiperWrapper.appendChild(swiperSlide);
		})
		swiperContainer.appendChild(swiperWrapper);
		if (newsItemsWrapper) {
			newsItemsWrapper.appendChild(swiperContainer);
		}
	}
	return new Swiper('.news-related .swiper-container', {
		slidesPerView: 2,
		loop: true,
		spaceBetween: 30,
		navigation: {
			prevEl: '.news-related .swiper-prev',
			nextEl: '.news-related .swiper-next'
		},
		breakpoints: {
			1200: {
				slidesPerView: 3
			},
		}
	})
}

// ==> Call functions here
document.addEventListener('DOMContentLoaded', () => {
	// GGMapInit();
	const className = document.getElementById('js-page-verify').getAttribute('class');
	document.querySelector('body').classList.add(className);
	if (window.innerWidth >= 1025) {
		if (!document.querySelector('body').classList.contains('elite-page')) {
			document.querySelector('body').setAttribute('style', `overflow: hidden`)
		}
	}
	fullpage();
	sliderArea_1();
	// setLinkDownload();
	sectionVitriTab();
	Area4TabFronts();
	activeFrame2Section4();
	sliderSection7();
	imageMapCanvas();
	changeMapByTime();
	villasSlider1();
	villasSlider2();
	galleryImage();
	brochureSlider();
	generateFormLienHeTrangIndex();
	newsRelatedSlider();
	if (window.innerWidth < 1025) {
		customFancybox();
		customFancybox2();
	}
	if (window.innerWidth >= 1025) {
		ripple1();
		ripple2();
	}
	document.querySelector('body').classList.add('show-page');
	Loading(() => {
		new WOW({
			offset: 150,
		}).init();
	});

	// document.querySelector('body').classList.add('show-page');
	getSVGImage();
});

export {
	fullpage
}