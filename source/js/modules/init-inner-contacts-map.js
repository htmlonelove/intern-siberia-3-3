import {modals} from './modals/init-modals';

const initInnerContactsMap = () => {
  const button = document.querySelector('[data-contacts-map="button"]');
  const container = document.querySelector('[data-contacts-map="container"]');
  const map = document.querySelector('[data-contacts-map="map"]');
  const breakpoint = window.matchMedia('(min-width: 768px)');

  if (!button || !container || !map) {
    return;
  }

  const onButtonClick = (evt) => {
    container.classList.toggle('is-active');
    map.classList.toggle('is-active');
    evt.currentTarget.classList.toggle('is-active');
  };

  const breakpointChecker = () => {
    if (breakpoint.matches) {
      button.addEventListener('click', onButtonClick);
    } else {
      button.setAttribute('data-open-modal', 'map');
      button.addEventListener('click', () => {
        modals.open('map');
      });
    }
  };

  breakpointChecker();

};

export {initInnerContactsMap};
