module.exports = (() => {
	Array.from(document.querySelectorAll('[data-bg]')).forEach(item => {
		const imgUrl = item.getAttribute('data-bg');
		item.setAttribute('style',`background-image: url(${imgUrl});background-repeat: no-repeat;background-size: cover; background-position: center;`)
	})
})();