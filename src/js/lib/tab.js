export default class Tab {
	options = {};

	constructor(selector, obj) {
		this.selector = document.querySelector(selector);
		if (this.selector) {
			this.navigationItems = Array.from(this.selector.querySelectorAll("[toggle-for]"));
			this.contentList = Array.from(this.selector.querySelectorAll("[tab-id]"));
			// this.navigationList = this.selector.querySelector(obj.navigationList);
			// this.breakpoint = obj.responsive.breakpoint;
			// this.isResponsive = obj.responsive.isResponsive;
			this.init();
		}
	}

	runTabWhenClicked() {
		this.navigationItems.forEach((element, index) => {
			element.addEventListener("click", e => {
				e.preventDefault();
				const tabTarget = element.attributes["toggle-for"].value;
				const targetDOM = Array.from(this.selector.querySelectorAll(`[tab-id='${tabTarget}']`));
				Array.from(this.navigationItems).forEach((eleClicked, eleClickedIndex) => {
					if (eleClickedIndex != index) {
						eleClicked.classList.remove("active")
					}
				});
				Array.from(this.contentList).forEach(tabContentElement => {
					if (tabContentElement.attributes["tab-id"].value != tabTarget) {
						tabContentElement.style.display = "none"
						tabContentElement.classList.remove("show")
					}
				});
				element.classList.add("active");
				targetDOM.forEach(item => {
					item.style.display = "block";
				})
				setTimeout(() => {
					targetDOM.forEach(item => {
						item.classList.add("show");
					})
				}, 50);
			})
		})
	}

	activeFirstTab() {
		this.navigationItems[0].click();
	}

	selectHandler(select) {
		select.addEventListener('change', e => {
			document.querySelector(`[toggle-for=${e.srcElement.value}]`).click();
		})
	}

	runResponsive() {
		const createSelectOption = navigationItems => {
			let newTabSelect = document.createElement('select');
			navigationItems.forEach(item => {
				let newTabSelectOptionItem = document.createElement('option');
				newTabSelectOptionItem.setAttribute('value', item.getAttribute('toggle-for'));
				newTabSelectOptionItem.innerHTML = item.innerHTML;
				newTabSelect.appendChild(newTabSelectOptionItem)
			})
			this.selectHandler(newTabSelect);
			return newTabSelect;
		}

		const addOrRemoveSelect = bp => {
			const selectResponse = createSelectOption(this.navigationItems);
			if (bp.matches) {
				this.navigationList.appendChild(selectResponse);
				this.navigationItems.forEach(item => {
					item.setAttribute('style', 'display: none!important');
				})
			} else {
				if (this.navigationList.querySelector('select')) {
					this.navigationList.querySelector('select').parentNode.removeChild(this.navigationList.querySelector('select'));
					this.navigationItems.forEach(item => {
						item.removeAttribute('style');
					})
				}
			}
		}

		if (this.options) {
			if (this.isResponsive) {
				const bp = window.matchMedia(`(max-width: ${this.breakpoint}px)`)
				addOrRemoveSelect(bp)
				bp.addListener(addOrRemoveSelect);
			}
		}
	}

	init() {
		this.runTabWhenClicked();
		this.activeFirstTab();
		this.runResponsive();
	}
}