const advantagesSlider = document.querySelector('.advantages__wrapper');
const breakpoint = window.matchMedia('(min-width: 768px)');
// eslint-disable-next-line no-unused-vars
let swiper;

const initSwiper = () => {
  if (breakpoint.matches) {
    // eslint-disable-next-line no-undef
    swiper = new Swiper(advantagesSlider, {
      speed: 0,
      loop: true,
      loopAdditionalSlides: 3,
      loopFillGroupWithBlank: true,

      effect: 'fade',
      // slidesPerGroup: 3,
      // slidesPerView: 3,
      // spaceBetween: 16,
      a11y: {
        prevSlideMessage: 'Предыдущий слайд',
        nextSlideMessage: 'Следующий слайд',
      },
      navigation: {
        nextEl: '.advantages .slider-nav__btn--next',
        prevEl: '.advantages .slider-nav__btn--prev',
      },
    });

    swiper.on('slideNextTransitionStart', () => {
      advantagesSlider.classList.remove('back');
      advantagesSlider.classList.add('next');
    });

    swiper.on('slidePrevTransitionStart', () => {
      advantagesSlider.classList.remove('next');
      advantagesSlider.classList.add('back');
    });
  } else {
    // advantagesSlider.classList.remove('next');
    // advantagesSlider.classList.remove('back');

    if (swiper) {
      swiper.destroy(true, true);
    }
    // eslint-disable-next-line no-undef
    // swiper = new Swiper(advantagesSlider, {
    //   loop: true,
    //   slidesPerView: 'auto',
    //   freeMode: true,
    // });
  }
};

const initAdvantagesSlider = () => {
  if (advantagesSlider) {

    breakpoint.addListener(initSwiper);
    initSwiper();
  }
};

export {initAdvantagesSlider};
