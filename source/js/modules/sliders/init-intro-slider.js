const introSlider = document.querySelector('.intro__slider-wrapper');
// eslint-disable-next-line no-unused-vars

const renderCustomBullet = (slideCaptions) => {
  return (index) => {
    const previewData = slideCaptions[index].dataset.preview;
    const preview = JSON.parse(previewData);

    return `<button class="swiper-pagination-bullet">
              <span class="intro__slider-bullet">
                <picture>
                  <source type="image/webp" srcset="${preview.webp}, ${preview.webp2x} 2x">
                  <img src="${preview.jpg}, ${preview.jpg2x} 2x" width="645" height="968" alt="Слайд ${index + 1}">
                </picture>
              </span>
              <svg>
                <circle r="17" cx="19" cy="19"></circle>
              </svg>
              <span class="intro__slider-caption text text--small">
                <span>${slideCaptions[index].dataset.caption}</span>
              </span>
            </button>
  `;
  };
};

const initSwiper = (slideCaptions) => {
  // eslint-disable-next-line no-undef, no-unused-vars
  const swiper = new Swiper(introSlider, {
    speed: 0,
    loop: true,
    loopAdditionalSlides: 3,
    effect: 'fade',
    autoplay: {
      disableOnInteraction: true,
      delay: 6000,
    },
    a11y: {
      prevSlideMessage: 'Предыдущий слайд',
      nextSlideMessage: 'Следующий слайд',
    },
    allowTouchMove: false,
    pagination: {
      clickable: true,
      el: '.intro__slider-pagination',
      renderBullet: renderCustomBullet(slideCaptions),
    },
  });

  const pagination = document.querySelector('.intro--cuisine .swiper-pagination');
  // let bulletWidth;

  // const setBulletWidth = () => {
  //   bulletWidth =
  //     document.querySelector('.swiper-pagination-bullet-active .intro__slider-caption').offsetWidth +
  //     document.querySelector('.swiper-pagination-bullet-active .intro__slider-bullet').offsetWidth + 32;

  //   document.documentElement.style.setProperty('--bullet-width', `${bulletWidth}px`);
  // };

  // setBulletWidth();

  const animationHandler = (e) => {
    if (e.target.closest('.swiper-pagination-bullet')) {
      pagination.classList.add('is-static');
    }
  };

  document.addEventListener('click', animationHandler);

  swiper.on('slideNextTransitionStart', () => {
    introSlider.classList.remove('back');
    introSlider.classList.add('next');

  });

  swiper.on('slidePrevTransitionStart', () => {
    introSlider.classList.remove('next');
    introSlider.classList.add('back');
  });

  // swiper.on('activeIndexChange', () => {
  //   setBulletWidth();
  // });
};

const initIntroSlider = () => {
  if (introSlider) {
    const slideCaptions = introSlider.querySelectorAll('[data-caption]');

    initSwiper(slideCaptions);
  }
};

export {initIntroSlider};
