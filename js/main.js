const swiper = new Swiper('.swiper', {
	speed: 600,

	autoplay: {
		delay: 2600,
	},

	// Navigation arrows
	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev',
	},
});


$(".swiper").hover(
	function () {
		this.swiper.autoplay.stop();
	},
	function () {
		this.swiper.autoplay.start();
	}
);


function bannerHeight() {
	const banner = document.querySelector('.banner__swiper');
	const header = document.querySelector('.header');
	const announceBar = document.querySelector('.announce__bar');

	banner.setAttribute('style', `height: calc(100vh - ${header.offsetHeight}px - ${announceBar ? announceBar.offsetHeight : 0}px - 23px)`)
}



let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);

(function init100vh() {
	function setHeight() {
		var vh = window.innerHeight * 0.01;
		document.documentElement.style.setProperty('--vh', `${vh}px`);
		bannerHeight();
	}
	setHeight();
	window.addEventListener('resize', setHeight);
})();




videoBtn = document.querySelector('.video__btn');
videoBtn.addEventListener('click', function () {
	this.classList.toggle('active');
	const video = this.closest('.swiper-slide').querySelector('video');
	if (video.muted) {
		video.muted = false;
	}else{
		video.muted = true;
	}
})


