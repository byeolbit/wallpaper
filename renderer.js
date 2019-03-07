// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

let AERIAL = 'PLL58R4HBh0J9VHgsseeah6k7yLG_yNk5n'

loadYouTubePlayList(AERIAL);

function loadYouTubePlayList(src) {
    let videoSection = document.getElementById('video-section');
    let iframe = document.createElement('iframe');
    iframe.setAttribute('width', videoSection.clientWidth);
    iframe.setAttribute('height', videoSection.clientHeight);
    iframe.setAttribute(
        'src',
        `https://www.youtube.com/embed/?listType=playlist&list=${src}&vq=highres&autoplay=1`
    );
    videoSection.appendChild(iframe);
}

let _timeElement10Digits = Array.from(Array(10)).map((n, i) => i);
let _timeElement6Digits = _timeElement10Digits.slice(0, 6);
let _timeElement3Digits = _timeElement10Digits.slice(0, 3);
let _timeElementStructure = [
		[ _timeElement3Digits, _timeElement10Digits ],
		[ _timeElement6Digits, _timeElement10Digits ],
		[ _timeElement6Digits, _timeElement10Digits ]
	];

let clock = document.createElement('div');
clock.id = 'clock';
document.body.appendChild(clock);
let digitGroups = [];
requestAnimationFrame(update);

_timeElementStructure.forEach(digits => {
	let digitGroup = document.createElement('div');
	digitGroup.classList.add('digit-group');
	clock.appendChild(digitGroup);
	digitGroups.push(digitGroup);
	digits.forEach(digitList => {
		let digit = document.createElement('div');
		digit.classList.add('digit');
		digitList.forEach(n => {
			let ele = document.createElement('div');
			ele.classList.add('digit-number');
			ele.innerText = n;
			digit.appendChild(ele);
		});
		digitGroup.appendChild(digit);
	});
});

function update() {
	requestAnimationFrame(update);
	let date = new Date();
	let time = [ date.getHours(), date.getMinutes(), date.getSeconds() ]
		.map(n => `0${n}`.slice(-2).split('').map(e => +e))
		.reduce((p, n) => p.concat(n), []);
	time.forEach((n, i) => {
		let digit = digitGroups[Math.floor(i * 0.5)].children[i % 2].children;
		Array.from(digit).forEach((e, i2) => e.classList[i2 === n ? 'add' : 'remove']('highlight'));
	});
}
