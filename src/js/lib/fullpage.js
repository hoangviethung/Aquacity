import {
	gsap
} from "../../../bower_components/gsap/esm/index.js";
import U from "./utilities";

export default class FullPage {
	canBeScrolled = true;
	titles = false;
	titlesArray = [];
	hashArray = [];
	on = {
		init: function() {
			console.log(1);
		},
		afterRunEffect: function() {
			return;
		},
	}

	generateFullpageHTML() {
		const sectionList = U.qAll(this.selector, this.section);
		this.navigator = document.createElement('div');
		this.navigator.classList.add('fp-navigation');
		this.navigator.id = 'fp-navigation';
		if (sectionList) {
			sectionList.forEach((item, index) => {
				item.classList.add('fp-section');
				item.setAttribute('fp-index', index);
				if (index === 0) {
					this.currentIndex = index;
					item.classList.add('active');
					item.setAttribute('fp-active', 1);
				} else {
					item.setAttribute('fp-active', -1);
				}
				if (this.titles) {
					if (item.getAttribute('fp-title')) {
						this.titlesArray.push(item.getAttribute('fp-title'));
						this.hashArray.push(U.alias(item.getAttribute('fp-title')));
						this.navigator.insertAdjacentHTML('beforeend', `<div class="fp-nav-item"><a fp-target="${index}" fp-hash="${U.alias(item.getAttribute('fp-title'))}"><span>${index+1}</span><span class="title">${item.getAttribute('fp-title')}</span></a></div>`);
					} else {
						this.navigator.insertAdjacentHTML('beforeend', `<div class="fp-nav-item"><a fp-target="${index}" fp-hash="${U.alias(item.getAttribute('fp-title'))}"><span>${index+1}</span></a></div>`);
					}
				}
			})
			U.qAll(this.navigator, '.fp-nav-item')[0].classList.add('active');
		}
		this.selector.classList.add('fp-container');
		this.selector.innerHTML = `<div class="fp-wrapper">${this.selector.innerHTML}</div>`;
		this.selector.appendChild(this.navigator);
	}

	run() {
		document.addEventListener('wheel', e => {
			const loading = U.q('#loading');

			if (!loading) {

				let scrollDirection;

				if (this.canBeScrolled) {
					this.canBeScrolled = false;

					if (e.deltaY > 0) {
						scrollDirection = 'down';
					} else {
						scrollDirection = 'up';
					}

					this.getScrollState(scrollDirection);

					setTimeout(() => {
						this.canBeScrolled = true;
					}, 2000);
				}
			}
		});
	}

	getScrollState(direction) {
		let nextSection, currentSection = U.q(this.selector, '[fp-active="1"]');

		if (direction === 'down') {
			nextSection = currentSection.nextElementSibling;
		} else {
			nextSection = currentSection.previousElementSibling;
		}

		if (nextSection) {
			this.runEffect(currentSection, nextSection, direction, this.on.afterRunEffect);
		}
	}

	runEffect(currentSection, nextSection, direction, callback) {
		const currentIndex = Number(currentSection.getAttribute('fp-index'));
		const nextIndex = Number(nextSection.getAttribute('fp-index'));
		const navItems = U.qAll(this.navigator, '.fp-nav-item');
		navItems[currentIndex].classList.remove('active');
		navItems[nextIndex].classList.add('active');
		const hashUrl = navItems[nextIndex].querySelector('a').getAttribute('fp-hash');
		window.location.hash = hashUrl;


		const onAnimateCompleted = (currentSection, nextSection, cb) => {
			currentSection.classList.remove('active');
			currentSection.setAttribute('fp-active', -1);
			nextSection.classList.add('active');
			nextSection.setAttribute('fp-active', 1)
			nextSection.classList.remove('sliding');
			nextSection.removeAttribute('style');
			this.currentIndex = Number(nextSection.getAttribute('fp-index'));
			const sectionLength = U.qAll(this.selector, this.section).length;
			if (this.currentIndex === sectionLength - 1) {
				U.gId('next-section').style.opacity = '0'
			} else {
				U.gId('next-section').style.opacity = '1'
			}

			if (cb) {
				cb();
			}
		}

		if (direction === 'down') {
			gsap.fromTo(nextSection, {
				top: '100%',
			}, {
				top: '0%',
				duration: 0.8,
				onStart: function() {
					nextSection.classList.add('sliding');
				},
				onComplete: onAnimateCompleted,
				onCompleteParams: [currentSection, nextSection, callback],
			})
		} else {
			gsap.fromTo(nextSection, {
				bottom: '100%',
			}, {
				bottom: '0%',
				duration: 0.8,
				onStart: function() {
					nextSection.classList.add('sliding');
				},
				onComplete: onAnimateCompleted,
				onCompleteParams: [currentSection, nextSection],
			})
		}
	}

	navigate() {
		U.qAll(this.navigator, '.fp-nav-item a').forEach((item, index) => {
			item.addEventListener('click', e => {
				e.preventDefault();
				const sectionList = U.qAll(this.selector, this.section);
				if (this.canBeScrolled) {
					
					this.canBeScrolled = false;
					const nextSection = sectionList[index];
					const currentSection = sectionList[this.currentIndex];
					let scrollDirection;
					if (index > this.currentIndex) {
						scrollDirection = 'down';
					} else if (index < this.currentIndex) {
						scrollDirection = 'up';
					} else {
						scrollDirection = undefined;
					}
					if (scrollDirection) {
						this.runEffect(currentSection, nextSection, scrollDirection, this.on.afterRunEffect);
					}
					setTimeout(() => {
						this.canBeScrolled = true;
					}, 2000);
				}
			})
		})
	}

	setActiveNavigation(href) {
		const hrefValue = `#${href}`

		U.qAll(this.navigator, '.item').forEach(item => {
			item.classList.remove('active');
		})
		U.qAll(this.navigator, `.item a[href='${hrefValue}']`).parentElement.classList.add('active')
	}

	mouseScrollDown() {
		U.gId('next-section').addEventListener('click', e => {
			if (this.canBeScrolled) {
				this.canBeScrolled = false;
				const currentSection = U.q(this.selector, '[fp-active="1"]');
				const nextSection = currentSection.nextElementSibling;
				this.runEffect(currentSection, nextSection, 'down')
				setTimeout(() => {
					this.canBeScrolled = true;
				}, 2000);
			}
		})
	}

	constructor(selector, opts) {
		this.selector = document.querySelector(selector);
		this.section = opts.section;
		this.titles = opts.titles;
		this.on.afterRunEffect = opts.on.afterRunEffect;
		this.on.init = opts.on.init;

		if (this.selector) {
			this.generateFullpageHTML();
			this.on.init();
			this.navigate();
			let hashUrl = window.location.hash;
			if (hashUrl.length > 0) {
				document.querySelector(`[fp-hash="${hashUrl.split('#')[1]}"]`).click();
			} else {
				let hashUrl = U.qAll(this.navigator, '.fp-nav-item')[0].querySelector('a').getAttribute('fp-hash');
				window.location.hash = hashUrl;
			}
			this.run();
			this.mouseScrollDown();
		}
	}
}