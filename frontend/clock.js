const headerOptions = document.querySelectorAll('.header-option');

const clock = document.querySelector('.clock');
const hours = document.getElementById('hours');
const minutes = document.getElementById('minutes');
const seconds = document.getElementById('seconds');

const music = document.querySelector('#music-display');
const album = document.getElementById('album');
const song = document.getElementById('song');
const artist = document.getElementById('artist');

headerOptions.forEach((option) => {
	option.addEventListener('click', () => {
		headerOptions.forEach((option) => {
			if (option.classList[1] === 'selected')
				option.classList.remove('selected');
		});
		option.classList.add('selected');

		const selected = document.querySelector('.selected');

		let titleWin = document.querySelector('.title-win');
		titleWin.innerText = selected.innerText;
		/*
		if (selected.dataset.option === 'clock') {
			clock.style.display = 'flex';
			music.style.display = 'none';
		}

		if (selected.dataset.option === 'music') {
			music.style.display = 'flex';
			clock.style.display = 'none';
		}
*/
	});
});

const clockDisplay = setInterval(function time() {
	let dateToday = new Date();
	let h = dateToday.getHours();
	let m = dateToday.getMinutes();
	let s = dateToday.getSeconds();
	h = h % 12;
	h = h ? h : 12;

	if (h < 10) h = '0' + h;
	if (m < 10) m = '0' + m;
	if (s < 10) s = '0' + s;

	hours.textContent = h;
	minutes.textContent = m;
	seconds.textContent = s;
});
