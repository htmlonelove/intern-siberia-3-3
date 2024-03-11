const bathsGalleries = document.querySelectorAll('.bath-card__slider-wrapper');
const breakpoint = window.matchMedia('(min-width: 768px)');
let sliders = [];

const initSlider = (gallery) => {
  const navigation = {
    prevEl: gallery.querySelector('.bath-card__nav-btn--prev'),
    nextEl: gallery.querySelector('.bath-card__nav-btn--next'),
  };
  const icon = gallery.querySelector('.bath-card__nav-icon');

  // eslint-disable-next-line no-undef
  const slider = new Swiper(gallery, {
    loop: true,
    loopAdditionalSlides: 5,
    loopFillGroupWithBlank: true,
    allowTouchMove: true,
    effect: 'fade',
    navigation,
    pagination: {
      el: gallery.querySelector('.bath-card__pagination'),
      clickable: true,
      bulletElement: 'button',
    },
    a11y: {
      prevSlideMessage: 'Предыдущий слайд',
      nextSlideMessage: 'Следующий слайд',
    },
  });

  sliders.push(slider);

  slider.on('slideNextTransitionStart', () => {
    gallery.classList.remove('back');
    gallery.classList.add('next');
  });

  slider.on('slidePrevTransitionStart', () => {
    gallery.classList.remove('next');
    gallery.classList.add('back');
  });

  const onBtnMouseOut = (evt, elDirection) => {
    if ((elDirection === 'prevEl') && (evt.relatedTarget === navigation.nextEl)) {
      icon.style.transform = 'scale(1) translate3d(0px, 0px, 0px)';
    } else if ((elDirection === 'nextEl') && (evt.relatedTarget === navigation.prevEl)) {
      icon.style.transform = 'scale(-1) translate3d(0px, 0px, 0px)';
    }
  };

  const onBtnMouseMove = (evt, elDirection) => {
    const btnRect = navigation[elDirection].getBoundingClientRect();
    const galleryRect = gallery.getBoundingClientRect();

    if (elDirection === 'nextEl') {
      icon.style.transform = 'scale(1) translate3d(0px, 0px, 0px)';
    } else {
      icon.style.transform = 'scale(-1) translate3d(0px, 0px, 0px)';
    }

    icon.style.left = `${evt.clientX - galleryRect.left}px`;
    icon.style.top = `${evt.clientY - btnRect.top}px`;
  };

  navigation.prevEl.addEventListener('pointermove', (evt) => onBtnMouseMove(evt, 'prevEl'));
  navigation.nextEl.addEventListener('pointermove', (evt) => onBtnMouseMove(evt, 'nextEl'));
  navigation.prevEl.addEventListener('pointerout', (evt) => setTimeout(() => {
    onBtnMouseOut(evt, 'prevEl');
  }, 100));
  navigation.nextEl.addEventListener('pointerout', (evt) => setTimeout(() => {
    onBtnMouseOut(evt, 'nextEl');
  }, 100));

  return slider;
};

const breakpointChecker = () => {
  if (breakpoint.matches) {
    setTimeout(() => {
      bathsGalleries.forEach(initSlider);
    }, 0);
  } else {
    if (sliders) {
      sliders.forEach((el) => {
        if (!el.closest('.bath-card--simple')) {
          el.destroy(true, true);
        }
      });
    }

    bathsGalleries.forEach((gallery) => {
      if (!gallery.closest('.bath-card--simple')) {
        gallery.classList.remove('next');
        gallery.classList.remove('back');
      } else {
        setTimeout(() => {
          initSlider(gallery);
        }, 0);
      }
    });
  }
};

const initBathGallery = () => {
  if (!bathsGalleries) {
    return;
  }

  breakpoint.addListener(breakpointChecker);
  breakpointChecker();
};

export {initBathGallery, initSlider};
