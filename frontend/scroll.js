const scrollContainer = document.querySelector('.horizontal-snap');
let startX = 0;
let scrollLeft = 0;

// Detect touch start
scrollContainer.addEventListener('touchstart', (e) => {
	startX = e.touches[0].pageX;
	scrollLeft = scrollContainer.scrollLeft;
});

// Detect touch move
scrollContainer.addEventListener('touchmove', (e) => {
	const moveX = e.touches[0].pageX;
	const distance = startX - moveX;
	scrollContainer.scrollLeft = scrollLeft + distance;
});

// Snap to nearest section after swipe
scrollContainer.addEventListener('touchend', () => {
	const screenWidth = window.innerWidth;
	const scrollPosition = scrollContainer.scrollLeft;
	const index = Math.round(scrollPosition / screenWidth);
	scrollContainer.scrollTo({
		left: index * screenWidth,
		behavior: 'smooth',
	});
});

document.getElementById('minimize').addEventListener('click', () => {
	remote.getCurrentWindow().minimize();
});

document.getElementById('close').addEventListener('click', () => {
	remote.getCurrentWindow().close();
});
