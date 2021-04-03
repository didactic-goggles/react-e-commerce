window.addEventListener('DOMContentLoaded', () => {
	const mainNav = document.querySelector('#mainNav');
	if(mainNav) {
		[...mainNav.querySelectorAll('.nav-item.dropdown')].forEach(navItem => {
			const dropdown = new bootstrap.Dropdown(navItem.querySelector('.dropdown-toggle'));
			navItem.addEventListener('mouseover', event => {
				dropdown.show();
			});
			navItem.addEventListener('mouseleave', event => {
				dropdown.hide();
			})
		})
	}
})