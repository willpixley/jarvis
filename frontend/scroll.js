const container = document.getElementById('container');
let startX = 0;
let currentScroll = 0;
let isSwiping = false;

// Swipe logic
container.addEventListener('touchstart', (e) => {
	startX = e.touches[0].clientX;
	currentScroll = container.scrollLeft;
	isSwiping = true;
});

container.addEventListener('touchmove', (e) => {
	if (!isSwiping) return;
	const deltaX = startX - e.touches[0].clientX;
	container.scrollLeft = currentScroll + deltaX;
});

container.addEventListener('touchend', () => {
	if (!isSwiping) return;
	isSwiping = false;

	snapToScreen();
});

// Arrow key logic
document.addEventListener('keydown', (e) => {
	const screenWidth = window.innerWidth;
	const currentIndex = Math.round(container.scrollLeft / screenWidth);

	if (
		e.key === 'ArrowRight' &&
		currentIndex < container.children.length - 1
	) {
		// Move to the next screen
		container.scrollTo({
			left: (currentIndex + 1) * screenWidth,
			behavior: 'smooth',
		});
	} else if (e.key === 'ArrowLeft' && currentIndex > 0) {
		// Move to the previous screen
		container.scrollTo({
			left: (currentIndex - 1) * screenWidth,
			behavior: 'smooth',
		});
	}
});

// Snap to the closest screen
function snapToScreen() {
	const screenWidth = window.innerWidth;
	const currentIndex = Math.round(container.scrollLeft / screenWidth);

	container.scrollTo({
		left: currentIndex * screenWidth,
		behavior: 'smooth',
	});
}
