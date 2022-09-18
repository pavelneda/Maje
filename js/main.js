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

function init100vh() {
	function setHeight() {
		var vh = window.innerHeight * 0.01;
		if (vh < 4) vh = 4;
		document.documentElement.style.setProperty('--vh', `${vh}px`);
		bannerHeight();
	}
	setHeight();
	window.addEventListener('resize', setHeight);
};


function initVideoBtn() {
	const videoBtn = document.querySelector('.video__btn');
	videoBtn.addEventListener('click', function () {
		this.classList.toggle('active');
		const video = this.closest('.swiper-slide').querySelector('video');
		if (video.muted) {
			video.muted = false;
		} else {
			video.muted = true;
		}
	})
}

const categories = document.querySelectorAll('.help__categories-item');
const categoriesWrapper = document.querySelector('.help__categories');
const helpTitle = document.querySelector('.help__title');
const helpText = document.querySelector('.help__text');
const helpAnswers = document.querySelector('.help__answers');
const helpQuesions = document.querySelector('.help__quesions')

const mainFaq = document.querySelector('#main__faq');
const mainFaqCategory = document.querySelector('#main__faq-category');
const mainFaqQuesion = document.querySelector('#main__faq-quesion');
const quesionsWrapper = document.querySelector('.help__quesions');

if (new URL(window.location.href).pathname === '/Maje/faq.html' || new URL(window.location.href).pathname === '/faq.html') {
    const selectCategory = helpAnswers.querySelector('select');
    const quesionsData = JSON.parse(document.querySelector('[type="application/json"]').textContent);

    categories.forEach(category => {
        category.addEventListener('click', function () {
            sessionStorage.removeItem('quesion');
            chooseCategory(this.dataset.name);
        })
    });


    mainFaq.addEventListener('click', function () {
        categoriesWrapper.classList.remove('hide');
        helpTitle.classList.remove('hide');
        helpText.classList.remove('hide');
        helpAnswers.classList.remove('active')

        mainFaqQuesion.classList.remove('active');
        mainFaqCategory.classList.remove('active');
        sessionStorage.removeItem('category');
        sessionStorage.removeItem('quesion');
    })

    mainFaqCategory.addEventListener('click', function () {
        let active = helpAnswers.querySelector('.help__quesions-item.active');
        if (active) active.click();
    })


    selectCategory.addEventListener('change', function () {
        helpAnswers.querySelector(`[data-name="${this.value}"]`).click();
    })

    if (sessionStorage.getItem('category')) {
        chooseCategory(sessionStorage.getItem('category'));
        if (sessionStorage.getItem('quesion')) {
            const quesion = helpQuesions.querySelector(`[data-name="${sessionStorage.getItem('quesion')}"]`);
            quesion.classList.add('active');
            mainFaqQuesion.innerHTML = quesion.dataset.name;
            mainFaqQuesion.classList.toggle('active');
        }
    }




    function initQuesions() {
        const quesions = document.querySelectorAll('.help__quesions-item');
        quesions.forEach(quesion => {
            quesion.addEventListener('click', function () {
                const oldActive = helpAnswers.querySelector('.help__quesions-item.active');
                sessionStorage.setItem('quesion', quesion.dataset.name)
                if (oldActive && oldActive !== this) {
                    oldActive.classList.remove('active');
                    mainFaqQuesion.classList.remove('active');
                }
                if (oldActive === this) {
                    sessionStorage.removeItem('quesion');
                }
                this.classList.toggle('active');
                mainFaqQuesion.innerHTML = quesion.dataset.name;
                mainFaqQuesion.classList.toggle('active');
            })
        });
    }

    function chooseCategory(categoryName) {
        mainFaqQuesion.classList.remove('active');

        if (helpAnswers.querySelector('.help__categories-item.active'))
            helpAnswers.querySelector('.help__categories-item.active').classList.remove('active');
        helpAnswers.querySelector(`[data-name="${categoryName}"]`).classList.add('active');

        categoriesWrapper.classList.add('hide');
        helpTitle.classList.add('hide');
        helpText.classList.add('hide');

        helpAnswers.classList.add('active')

        mainFaqCategory.innerHTML = categoryName;
        mainFaqCategory.classList.add('active');

        quesionsData.forEach(el => {
            if (el.category === categoryName) {
                let innerHTML = '';
                el.quesions.forEach(quesion => {
                    let item = `<div class="help__quesions-item" data-name="${quesion.name}">
                <div class="help__quesions-name">
                    ${quesion.name}
                    <span class="plus icon">+</span>
                    <span class="minus icon">-</span>
                </div>
                <div class="content">
                    ${quesion.answer}
                </div>
                </div>`;
                    innerHTML += item;
                });
                alert(quesionsWrapper)
                alert(innerHTML)
                quesionsWrapper.innerHTML = innerHTML;
            }
        });
        initQuesions();
        selectCategory.value = categoryName;
        sessionStorage.setItem('category', categoryName);
    }

}
let clearSearchBtn = document.querySelectorAll('.cross');
clearSearchBtn.forEach(function (btn) {
    btn.addEventListener('click', function () {
        return btn.previousElementSibling.value = '';
    });
});

window.addEventListener('scroll', function () {
    const header = document.querySelector('.header');
    const y = document.querySelector('.announce__bar').offsetHeight;
    let url = new URL(window.location.href);

    if(pageYOffset > y){
        if(url.pathname === '/') header.classList.add('fixed');
        header.style.position = 'fixed';
        header.style.top = '0';
    }else{
        if(url.pathname === '/') header.classList.remove('fixed');
        header.style.position = '';
        header.style.top = '';
    }
});
let url = new URL(window.location.href);

if(url.pathname === '/') {
    init100vh();
    initVideoBtn();
}
