const navMenu = document.getElementById('nav-menu');
const close = document.getElementById('nav-close');
const open = document.getElementById('nav-open');

open.addEventListener('click', () => {
	console.log('open');
	navMenu.classList.toggle('translate-x-0');
});

close.addEventListener('click', () => {
	console.log('close');
	navMenu.classList.toggle('translate-x-0');
});
