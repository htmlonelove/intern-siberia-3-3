import {bathCardTemplate} from './templates/bath-card-template';

const container = document.querySelector('.select-bath__wrapper');

export const renderCards = (baths) => {
  if (container) {
    baths.forEach((element) => {
      container.innerHTML += bathCardTemplate(element);
    });
  }
};
