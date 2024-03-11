const bathsSliderBlock = document.querySelector('.baths__wrapper');
const bathsControlsBlock = document.querySelector('.baths__navigation');
const breakpoint = window.matchMedia('(min-width: 768px)');
let bathsSlider;

const initDesktopSlider = () => {
  bathsSlider = new window.Swiper(bathsSliderBlock, {
    speed: 1000,
    allowTouchMove: false,
    effect: 'fade',
    loop: true, // для индексов
  });

  bathsControlsBlock.addEventListener('click', ({target}) => {
    if (target.closest('.btn-tab')) {
      bathsSlider.slideTo(+target.dataset.index + 1);
    }
  });

  bathsSlider.on('slideChangeTransitionStart', () => {
    const activeSlide = bathsSliderBlock.querySelector('.baths__slide.swiper-slide-duplicate-active') || bathsSliderBlock.querySelector('.baths__slide.swiper-slide-active');
    const activeButton = bathsControlsBlock.querySelector('.btn-tab.is-active');
    const currentButton = bathsControlsBlock.querySelector(`[data-index="${activeSlide.dataset.swiperSlideIndex}"]`);
    activeButton.classList.remove('is-active');
    currentButton.classList.add('is-active');
  });

  bathsSlider.on('slideNextTransitionStart', () => {
    bathsSliderBlock.classList.remove('back');
    bathsSliderBlock.classList.add('next');
  });

  bathsSlider.on('slidePrevTransitionStart', () => {
    bathsSliderBlock.classList.remove('next');
    bathsSliderBlock.classList.add('back');
  });
};

const breakpointChecker = () => {
  if (bathsSlider) {
    bathsSlider.destroy(true, true);
  }

  if (breakpoint.matches) {
    setTimeout(() => {
      initDesktopSlider();
    }, 10);
  }
};

const initBathsSlider = () => {
  if (!bathsSliderBlock) {
    return;
  }

  breakpoint.addListener(breakpointChecker);
  breakpointChecker();
};

export {initBathsSlider};
