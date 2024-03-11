/* eslint-disable object-shorthand */
const valuesSwiper = document.querySelector('.values__swiper');
const breakpoint = window.matchMedia('(max-width: 768px)');

/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
let swiper;

const initSwiper = () => {
  if (swiper) {
    swiper.destroy(true, true);
  }

  if (breakpoint.matches) {
    swiper = new Swiper(valuesSwiper, {
      loop: true,
      slidesPerView: 'auto',

      pagination: {
        el: '.swiper-pagination',
        type: 'fraction',
        renderFraction: function (currentClass, totalClass) {
          return '<span class="' + currentClass + '"></span>' +
          '<span class="' + totalClass + '"></span>';
        },
      },
    });
  }
};

const initValuesSwiper = () => {
  if (valuesSwiper) {

    breakpoint.addListener(initSwiper);
    initSwiper();
  }
};


export {initValuesSwiper};
