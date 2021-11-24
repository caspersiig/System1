const containers = document.querySelectorAll('.container');
const cards = document.querySelectorAll('.card');

for (let i = 0; i < containers.length; i++) {

	const {width, height} = containers[i].getBoundingClientRect();


	containers[i].addEventListener('mousemove', (event) => {
		const { offsetX, offsetY } = event;
		
		cards[i].style.setProperty('--x-pos', (offsetX / width) - 0.5);
		cards[i].style.setProperty('--y-pos', (offsetX / width) - 0.5);
		
	});
}