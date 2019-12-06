module.exports = (gsap, fp) => {
	const menuIconDesktop = document.querySelector('.header-nav-icon .menu-toggle');
	const menuWrapper = document.querySelector('.header-nav-wrapper');
	const menuClose = document.querySelector('.header-nav-wrapper .header-nav-close');
	const currentPage = document.getElementById('js-page-verify').getAttribute('class');
	const checkScreenSize = window.innerWidth > 1024;
	menuIconDesktop.addEventListener('click', () => {
		if (checkScreenSize) {
			fp.canBeScrolled = false;
		}
		menuIconDesktop.classList.add('active');
		setTimeout(() => {
			if (checkScreenSize) {
				gsap.fromTo('main', {
					css: {
						scale: '1',
						background: 'rgba(7, 65, 76, 0)',
					}
				}, {
					duration: 0.6,
					css: {
						overflow: 'hidden',
						scale: '.8',
						background: 'rgb(7, 65, 76)',
					}
				})
			}
			gsap.fromTo(menuWrapper, {
				left: '100%',
			}, {
				left: 0,
				duration: 1,
				onComplete: function() {
					menuWrapper.classList.add('active');
				}
			})
		}, 400);
	})
	menuClose.addEventListener('click', () => {
		if (checkScreenSize) {
			fp.canBeScrolled = false;
		}
		menuWrapper.classList.remove('active');
		setTimeout(() => {
			if (checkScreenSize) {
				gsap.fromTo('main', {
					css: {
						scale: '.8',
						background: 'rgba(7, 65, 76, 1)',
					}
				}, {
					duration: 0.6,
					css: {
						scale: '1',
						overflow: 'visible',
						background: 'rgba(7, 65, 76, 0)',
					}
				})
			}
			gsap.fromTo(menuWrapper, {
				left: 0,
			}, {
				left: '100%',
				duration: 1,
				onComplete: function() {
					menuWrapper.classList.remove('active');
					menuIconDesktop.classList.remove('active');
					document.querySelector('main').removeAttribute('style');
					if (checkScreenSize) {
						fp.canBeScrolled = true;
					}
				}
			})
		}, 800);
	})

	// Click menu
	Array.prototype.forEach.call(menuWrapper.querySelectorAll('nav a'), (item, index) => {
		item.addEventListener('click', e => {
			e.preventDefault();
			Array.prototype.forEach.call(menuWrapper.querySelectorAll('nav a'), (ele, eleIndex) => {
				ele.classList.remove('active');
			})
			item.classList.add('active');
			if (currentPage === 'index-page') {
				if (checkScreenSize) {
					const nextIndex = Number(item.getAttribute('fp-target'));
					const nextSection = Array.from(document.querySelectorAll('#fullpage .fp-wrapper .fp-section'))[nextIndex];
					const currentIndex = Number(currentSection.getAttribute('fp-index'));
					const currentSection = document.querySelector('.fp-section[fp-active="1"]');
					let scrollDirection;
					if (currentIndex < nextIndex) {
						scrollDirection = 'down';
						fp.canBeScrolled = true;
					}
					if (currentIndex > nextIndex) {
						scrollDirection = 'up';
						fp.canBeScrolled = true;
					}
					if (fp.canBeScrolled) {
						menuWrapper.classList.remove('active');
						gsap.fromTo('main', {
							css: {
								scale: '.8',
								background: 'rgb(7, 65, 76)',
							}
						}, {
							duration: 0.6,
							css: {
								scale: '1',
								overflow: 'visible',
								background: 'transparent',
							}
						})
						gsap.fromTo(menuWrapper, {
							left: 0,
						}, {
							left: '100%',
							duration: 1,
							onComplete: function() {
								menuWrapper.classList.remove('active');
								menuIconDesktop.classList.remove('active');
								document.querySelector('main').removeAttribute('style');
							}
						})
						fp.runEffect(currentSection, nextSection, scrollDirection);
					}
				} else {
					const nextIndex = Number(item.getAttribute('fp-target'));
					const nextSection = document.querySelector(`#fullpage #sec-${nextIndex + 1}`);
					menuWrapper.classList.remove('active');
					gsap.fromTo(menuWrapper, {
						left: 0,
					}, {
						left: '100%',
						duration: 1,
						onComplete: function() {
							menuIconDesktop.classList.remove('active');
							window.scrollTo({
								behavior: 'smooth',
								top: nextSection.offsetTop - 60
							})
						}
					})
				}
			} else {

			}
		})
	})
}