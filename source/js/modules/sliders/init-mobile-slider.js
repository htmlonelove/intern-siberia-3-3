const sliderWrappers = document.querySelectorAll('[data-slider="mobile"]');
const breakpoint = window.matchMedia('(max-width: 767px)');
let sliders = [];

const initSwiper = (wrapper) => {
  const isLoop = wrapper.hasAttribute('data-no-loop') ? false : true;

  setTimeout(() => {
    // eslint-disable-next-line no-undef
    const swiper = new Swiper(wrapper, {
      loop: isLoop,
      slidesPerView: 'auto',
      centeredSlides: true,
      spaceBetween: 16,
      slidesOffsetBefore: -12,
    });

    sliders.push(swiper);
  }, 0);
};

const breakpointChecker = () => {
  if (breakpoint.matches) {
    sliderWrappers.forEach(initSwiper);
  } else {
    if (sliders.length) {
      sliders.forEach((el) => {
        el.destroy(true, true);
      });
    }
  }
};

const initMobileSlider = () => {
  if (!sliderWrappers) {
    return;
  }

  breakpoint.addListener(breakpointChecker);
  breakpointChecker();
};

export {initMobileSlider, initSwiper};
