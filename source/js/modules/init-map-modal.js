const mapBlock = document.querySelector('.map');
const breakpoint = window.matchMedia('(min-width: 768px)');

const openModal = () => {
  mapBlock.classList.remove('is-closing');
  mapBlock.classList.add('is-active');
};

const clickHandler = () => {
  const showButton = document.querySelector('[data-open-map]');

  if (!breakpoint.matches) {
    if (showButton) {
      showButton.setAttribute('data-open-modal', 'map');
    }
  } else {
    if (showButton) {
      showButton.removeAttribute('data-open-modal', 'map');
      showButton.removeEventListener('click', openModal);
    }

    mapBlock.classList.remove('is-closing');
    mapBlock.classList.remove('is-active');
  }
};

const initMapModal = () => {
  if (!mapBlock) {
    return;
  }

  breakpoint.addListener(clickHandler);
  clickHandler();
};

export {initMapModal};
