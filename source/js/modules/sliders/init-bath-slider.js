const bathSlider = document.querySelector('.bath-slider');
// eslint-disable-next-line no-unused-vars
let swiper;

const initBathSlider = () => {
  // eslint-disable-next-line no-undef
  swiper = new Swiper(bathSlider, {
    slidesPerView: 1.03,
    spaceBetween: 16,
    slidesOffsetBefore: 18,
    centeredSlides: true,

    navigation: {
      nextEl: '.bath-slider .slider-nav__btn--next',
      prevEl: '.bath-slider .slider-nav__btn--prev',
    },
    breakpoints: {
      768: {
        slidesPerView: 1.345,
        spaceBetween: 42,
        slidesOffsetBefore: 0,
        grabCursor: true,
        centeredSlides: false,
      },
    },
    on: {
      // eslint-disable-next-line object-shorthand
      afterInit: function () {
        const setSource = () => {
          const videos = bathSlider.querySelectorAll('video');

          videos.forEach((item) => {
            item.src = item.getAttribute('data-video-src');
          });
        };

        setSource();
      },
    },
  });
};

export {initBathSlider};
