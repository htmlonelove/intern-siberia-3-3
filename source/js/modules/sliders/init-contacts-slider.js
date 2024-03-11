const contactsSliderBlock = document.querySelector('.contacts .swiper');
const contactsControlsBlock = document.querySelector('.contacts__navigation');
const breakpoint = window.matchMedia('(min-width: 768px)');
let contactsSlider;

const initDesktopSlider = () => {
  contactsSlider = new window.Swiper(contactsSliderBlock, {
    speed: 0,
    allowTouchMove: false,
    effect: 'fade',
    loop: true, // для индексов
  });

  contactsControlsBlock.addEventListener('click', ({target}) => {
    if (target.closest('.btn-tab')) {
      contactsSlider.slideTo(+target.dataset.index + 1);
    }
  });

  contactsSlider.on('slideChangeTransitionStart', () => {
    const activeSlide = contactsSliderBlock.querySelector('.swiper-slide-duplicate-active') || contactsSliderBlock.querySelector('.swiper-slide-active');
    const activeButton = contactsControlsBlock.querySelector('.btn-tab.is-active');
    const currentButton = contactsControlsBlock.querySelector(`[data-index="${activeSlide.dataset.swiperSlideIndex}"]`);
    activeButton.classList.remove('is-active');
    currentButton.classList.add('is-active');
  });
};

const breakpointChecker = () => {
  if (breakpoint.matches) {
    initDesktopSlider();
  } else {
    if (contactsSlider) {
      contactsSlider.destroy(true, true);
    }
  }
};

const initContactsSlider = () => {
  if (!contactsSliderBlock) {
    return;
  }

  breakpoint.addListener(breakpointChecker);
  breakpointChecker();
};

export {initContactsSlider};
