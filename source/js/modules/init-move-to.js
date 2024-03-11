import {MoveTo} from '../vendor/moveTo';

const moveTo = new MoveTo({
  tolerance: 20,
  duration: 1500,
  easing: 'easeOutQuart',
});

const initMoveTo = () => {
  const triggers = document.querySelectorAll('[data-move-to]');

  triggers.forEach((trigger) => {
    trigger.addEventListener('click', (evt) => {
      evt.preventDefault();
      initMoveToBlock(trigger);
      trigger.blur();
    });
  });
};

const initMoveToBlock = (clickEl, delayTime) => {
  setTimeout(() => {
    const target = document.querySelector(clickEl.dataset.moveTo);

    moveTo.move(target);
    document.querySelector('.header').classList.add('is-hidden');
  }, delayTime ? delayTime : 0);
};

export {initMoveTo, initMoveToBlock};
