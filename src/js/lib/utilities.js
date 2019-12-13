module.exports = {
	qAll(selector) {
		return Array.from(document.querySelectorAll(selector));
	},
	q(selector) {
		return document.querySelectorAll(selector);
	},
	gId(selector) {
		return document.getElementById(selector);
	}
}