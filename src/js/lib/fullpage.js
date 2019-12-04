import {
	gsap
} from "../../../bower_components/gsap/esm/index.js";

module.exports = class FullPage {
	clearActive() {
		document.querySelector('.section .frame-1 .button-toggle').classList.remove('active');
		document.querySelector('.section .frame-2').classList.remove('active');
		document.querySelector('header .header-nav-icon').classList.remove('active');
	}

	getScrollState(direction) {
		let prevSection, nextSection, currentSection = this.element.querySelector('[data-active="1"]');
		if (direction === 'down') {
			nextSection = currentSection.nextElementSibling;
			if (nextSection) {
				this.runEffect(currentSection, nextSection, direction);
			}
		}
		if (direction === 'up') {
			prevSection = currentSection.previousElementSibling;
			if (prevSection) {
				this.runEffect(currentSection, prevSection, direction);
			}
		}
	}

	runEffect(currentSection, nextSection, direction) {
		const _this = this;
		const mask = document.getElementById('fullpage-mask');
		// Run animation when change section
		const hrefValue = nextSection.getAttribute('id');
		mask.classList.add('sliding');
		nextSection.setAttribute('data-active', 1);
		this.setActiveNavigation(hrefValue);
		if (direction === 'down') {
			mask.style.top = '100%';
			gsap.fromTo(mask, {
				top: '100%',
			}, {
				top: '0%',
				duration: .8,
				onComplete: function(e) {
					currentSection.classList.remove('active');
					currentSection.setAttribute('data-active', -1);
					nextSection.classList.add('active');
					gsap.fromTo(mask, {
						opacity: 1,
					}, {
						opacity: 0,
						ease: 'power1',
						delay: 0.1,
						duration: .5,
						onComplete: function() {
							mask.removeAttribute('style');
							mask.classList.remove('sliding');
						}
					})
					// Close everything when change section
					_this.clearActive()
				}
			})
		} else {
			mask.style.bottom = '100%';
			gsap.fromTo(mask, {
				bottom: '100%',
			}, {
				bottom: '0%',
				duration: .8,
				onComplete: function(e) {
					currentSection.classList.remove('active');
					currentSection.setAttribute('data-active', -1);
					nextSection.classList.add('active');
					gsap.fromTo(mask, {
						opacity: 1,
					}, {
						opacity: 0,
						ease: 'power1',
						delay: 0.1,
						duration: .5,
						onComplete: function() {
							mask.classList.remove('sliding');
							mask.removeAttribute('style');
						}
					})
					// Close everything when change section
					_this.clearActive()
				}
			})
		}
	}

	navigation() {
		if (this.navigator) {
			let navItems = Array.from(this.navigator.querySelectorAll('.item a')).forEach(item => {
				item.addEventListener('click', e => {
					e.preventDefault();
					if (this.canBeScrolled) {
						this.canBeScrolled = false;
						const target = this.element.querySelector(item.getAttribute('href'));
						const active = this.element.querySelector('.fp-section.active');
						const targetIndex = Number(target.getAttribute('data-index'));
						const activeIndex = Number(active.getAttribute('data-index'));
						let scrollDirection;
						if (targetIndex > activeIndex) {
							scrollDirection = 'down';
						} else if (targetIndex < activeIndex) {
							scrollDirection = 'up';
						} else {
							scrollDirection = undefined;
						}
						if (scrollDirection) {
							this.runEffect(active, target, scrollDirection);
						}
						setTimeout(() => {
							this.canBeScrolled = true;
						}, 2000);
					}
				})
			})
		}
	}
	setActiveNavigation(href) {
		const hrefValue = `#${href}`
		Array.from(this.navigator.querySelectorAll(`.item`)).forEach(item => {
			item.classList.remove('active');
		})
		this.navigator.querySelector(`.item a[href='${hrefValue}']`).parentElement.classList.add('active')
	}
	run() {
		document.addEventListener('wheel', e => {
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
		})
		this.navigation();
	}
	constructor(element, opts) {
		this.element = document.querySelector(element);
		this.selector = opts.selector;
		this.frameList = Array.from(this.element.querySelectorAll(this.selector));
		this.navigator = document.querySelector(opts.navigator);
		if (this.frameList) {
			this.frameList.forEach((item, index) => {
				if (index === 0) {
					item.classList.add('active');
					item.setAttribute('data-active', 1);
				} else {
					item.setAttribute('data-active', -1);
				}
				item.setAttribute('data-index', index);
			})
		}
		if (this.navigator) {
			Array.from(this.navigator.querySelectorAll('.item'))[0].classList.add('active');
		}
		this.canBeScrolled = true;
		this.run();
	}
}