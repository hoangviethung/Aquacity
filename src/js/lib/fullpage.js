import {
	gsap
} from "../../../bower_components/gsap/esm/index.js";

module.exports = class FullPage {
	canBeScrolled = true;
	titles = false;
	titlesArray = [];
	on = {
		afterRunEffect: function() {
			return;
		},
	}

	generateFullpageComponent() {
		document.querySelector('body').setAttribute('style', `
			overflow: hidden;
		`)

		const sectionList = Array.from(this.selector.querySelectorAll(this.section));
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
						this.navigator.insertAdjacentHTML('beforeend', `<div class="fp-nav-item"><a fp-target="${index}"><span>${index+1}</span><span class="title">${item.getAttribute('fp-title')}</span></a></div>`);
					} else {
						this.navigator.insertAdjacentHTML('beforeend', `<div class="fp-nav-item"><a fp-target="${index}"><span>${index+1}</span></a></div>`);
						this.titlesArray.push('');
					}
				}
				Array.from(this.navigator.querySelectorAll('.fp-nav-item'))[0].classList.add('active');
			})
		}


		this.selector.classList.add('fp-container');
		this.selector.innerHTML = `<div class="fp-wrapper">${this.selector.innerHTML}</div>`;


		this.mask = document.createElement('div');
		this.mask.id = 'fp-mask';
		this.mask.classList.add('fp-mask');


		this.selector.appendChild(this.navigator);
		this.selector.appendChild(this.mask);
	}

	run() {
		document.addEventListener('wheel', e => {
			const loading = document.querySelector('#loading');
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
					}, 1750);
				}
			}
		});
		this.navigate();
	}

	getScrollState(direction) {
		let prevSection,
			nextSection,
			currentSection = this.selector.querySelector('[fp-active="1"]');
		if (direction === 'down') {
			nextSection = currentSection.nextElementSibling;
			if (nextSection) {
				this.runEffect(currentSection, nextSection, direction, this.on.afterRunEffect);
			}
		}
		if (direction === 'up') {
			prevSection = currentSection.previousElementSibling;
			if (prevSection) {
				this.runEffect(currentSection, prevSection, direction, this.on.afterRunEffect);
			}
		}
	}

	runEffect(currentSection, nextSection, direction, callback) {
		const fp = this;
		const mask = this.mask;

		const currentIndex = Number(currentSection.getAttribute('fp-index'));
		const nextIndex = Number(nextSection.getAttribute('fp-index'));
		const fullpageNavItems = Array.from(this.navigator.querySelectorAll('.fp-nav-item'));
		fullpageNavItems[currentIndex].classList.remove('active');
		fullpageNavItems[nextIndex].classList.add('active');

		// Run animation when change section
		mask.classList.add('sliding');

		if (direction === 'down') {
			mask.style.top = '100%';
			gsap.fromTo(mask, {
				top: '100%',
			}, {
				top: '0%',
				duration: .9,
				onComplete: function(e) {
					nextSection.classList.add('active');
					nextSection.setAttribute('fp-active', 1);
					currentSection.classList.remove('active');
					currentSection.setAttribute('fp-active', -1);
					fp.currentIndex = Number(nextSection.getAttribute('fp-index'));
					gsap.fromTo(mask, {
						opacity: 1,
					}, {
						opacity: 0,
						ease: 'none',
						delay: 0.1,
						duration: .3,
						onComplete: function() {
							mask.removeAttribute('style');
							mask.classList.remove('sliding');
						}
					})

					if (callback) {
						callback();
					}
				}
			})
		} else {
			mask.style.bottom = '100%';
			gsap.fromTo(mask, {
				bottom: '100%',
			}, {
				bottom: '0%',
				duration: .9,
				onComplete: function(e) {
					nextSection.classList.add('active');
					nextSection.setAttribute('fp-active', 1);
					currentSection.classList.remove('active');
					currentSection.setAttribute('fp-active', -1);
					fp.currentIndex = Number(nextSection.getAttribute('fp-index'));
					gsap.fromTo(mask, {
						opacity: 1,
					}, {
						opacity: 0,
						ease: 'none',
						delay: 0.1,
						duration: .3,
						onComplete: function() {
							mask.classList.remove('sliding');
							mask.removeAttribute('style');
						}
					})

					if (callback) {
						callback();
					}
				}
			})
		}
	}

	navigate() {
		Array.from(this.navigator.querySelectorAll('.fp-nav-item a')).forEach((item, index) => {
			item.addEventListener('click', e => {
				e.preventDefault();
				const sectionList = Array.from(this.selector.querySelectorAll(this.section));

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
		Array.from(this.navigator.querySelectorAll(`.item`)).forEach(item => {
			item.classList.remove('active');
		})
		this.navigator.querySelector(`.item a[href='${hrefValue}']`).parentElement.classList.add('active')
	}

	constructor(selector, opts) {
		this.selector = document.querySelector(selector);
		this.section = opts.section;
		this.titles = opts.titles;
		this.on.afterRunEffect = opts.on.afterRunEffect;

		if (this.selector) {
			this.generateFullpageComponent();
			this.run();
		}
	}
}