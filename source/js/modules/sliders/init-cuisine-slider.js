const cuisineSlider = document.querySelector('.cuisine__slider-wrapper');
const breakpoint = window.matchMedia('(min-width: 768px)');
// eslint-disable-next-line no-unused-vars
let swiper;

const initSwiper = () => {
  // eslint-disable-next-line no-undef
  swiper = new Swiper(cuisineSlider, {
    speed: 0,
    loop: true,
    loopAdditionalSlides: 3,
    effect: 'fade',
    a11y: {
      prevSlideMessage: 'Предыдущий слайд',
      nextSlideMessage: 'Следующий слайд',
    },
    navigation: {
      nextEl: '.cuisine__slider-wrapper .slider-nav__btn--next',
      prevEl: '.cuisine__slider-wrapper .slider-nav__btn--prev',
    },
  });

  swiper.on('slideNextTransitionStart', () => {
    cuisineSlider.classList.remove('back');
    cuisineSlider.classList.add('next');
  });

  swiper.on('slidePrevTransitionStart', () => {
    cuisineSlider.classList.remove('next');
    cuisineSlider.classList.add('back');
  });
};

const breakpointChecker = () => {
  if (swiper) {
    swiper.destroy(true, true);
  }

  if (breakpoint.matches) {
    setTimeout(() => {
      initSwiper();
    }, 0);
  } else {
    cuisineSlider.classList.remove('next');
    cuisineSlider.classList.remove('back');
  }
};

const initCuisineSlider = () => {
  if (cuisineSlider) {

    breakpoint.addListener(breakpointChecker);
    breakpointChecker();
  }
};

export {initCuisineSlider};
