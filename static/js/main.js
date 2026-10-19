const slides = document.querySelector('.slides');

const slider = document.querySelector('.slider');

const video = document.querySelectorAll('.bg_video');

const info = document.querySelectorAll('.slide_info_txt');
const info2 = document.querySelectorAll('.slide_info_data');
const pp = document.querySelectorAll('.poster');
const logo = document.querySelectorAll('.logo');



let currentIndex = 0;
let autoPlayInterval;
let grow_k1 = 60;
let w_el = document.querySelector('.p_rand1').offsetWidth;
console.log(w_el);

function grow(classe) {
    const el = classe.target;
    const w = el.offsetWidth;
    const h = el.offsetHeight;

    el.style.width = `${w + grow_k1}px`;
    el.style.height = `${h + grow_k1}px`;
}
function ungrow(classe) {
    const el = classe.target;
    const w = el.offsetWidth;
    const h = el.offsetHeight;
    el.style.width = `${w - grow_k1}px`;
    el.style.height = `${h - grow_k1}px`;
}

function rand(num_max) {
    const ii = rando(1, num_max);
    const el = document.querySelector(`.p_rand${ii}`);

    const parent_div = document.querySelector('.random_box');
    const all_el = parent_div.querySelectorAll('img');
    for (var q = 0; q < all_el.length; q++) {
        all_el[q].style.boxShadow = `0 0 0 rgba(255, 255, 255, 1)`;
        all_el[q].style.filter = `grayscale(100%)`;
        all_el[q].style.width = `${w_el}px`;

    }

    const w = el.offsetWidth;
    el.style.boxShadow = ` 0 0 20px rgba(255, 255, 255, 1)`;
    el.style.filter = `grayscale(0%)`;
    for (var q = 0; q < all_el.length; q++) {
        all_el[q].style.width = `${w - 20}px`;
    }
    el.style.width = `${w + 20 * all_el.length}px`;

    const res = document.querySelector('.res');
    res.textContent = `Вам выпал: №${ii}`;
}


function goToSlide(index) {
    const slideCount = document.querySelectorAll('.slide').length;
    const slide = document.querySelectorAll('.slide');

    const verticalScrollPosition = window.pageYOffset;
    // console.log(verticalScrollPosition);    

    if (index < 0) {
        index = slideCount - 1; // Если текущий слайд первый, переходим на последний
    } else if (index >= slideCount) {
        index = 0; // Если текущий слайд последний, переходим на первый
    }
    currentIndex = index; // Запоминаем текущий индекс
    slide[currentIndex].scrollIntoView({
        inline: 'start',   // привязать к левому краю
        block: 'nearest',
        behavior: 'smooth'
    });

    window.scrollTo(0, verticalScrollPosition)
}

function startAutoPlay() {
    autoPlayInterval = setInterval(() => {
        goToSlide(currentIndex + 1);
    }, 3000);
}

function stopAutoPlay() {
    clearInterval(autoPlayInterval);
}

// Запускаем автопрокрутку при загрузке страницы
startAutoPlay();


function trans() {
    const slider = document.querySelector('.slider');

    const video = document.querySelectorAll('.bg_video');

    const info = document.querySelectorAll('.slide_info_txt');
    const info2 = document.querySelectorAll('.slide_info_data');
    const pp = document.querySelectorAll('.poster');
    const logo = document.querySelectorAll('.logo');

    for (const el of video) {
    el.currentTime = 5 * 60; // 5 min
    }

    currentIndex = 0;
    stopAutoPlay();
    startAutoPlay();

    slider.addEventListener('mouseenter', stopAutoPlay);
    slider.addEventListener('mouseleave', startAutoPlay);

    // Video
    slider.addEventListener('mouseenter', function() {
    video[currentIndex].play();
    pp[currentIndex].style.transform = 'translate(-50%, 0)';
    logo[currentIndex].style.transform = 'translate(0, -50%)';
    info[currentIndex].style.color = 'rgba(0, 0, 0, 0)';
    info2[currentIndex].style.color = 'rgba(0, 0, 0, 0)';
    });

    slider.addEventListener('mouseleave', function() {
    video[currentIndex].pause();
    pp[currentIndex].style.transform = 'translate(0, 0)';
    logo[currentIndex].style.transform = 'translate(0, 0)';
    info[currentIndex].style.color = 'rgba(255, 255, 255, 0.642)';
    info2[currentIndex].style.color = 'rgba(255, 255, 255, 0.822)';
    });
    
}

trans();